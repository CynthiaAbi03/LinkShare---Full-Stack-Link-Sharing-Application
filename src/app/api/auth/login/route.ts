import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { authentification } from '@/helpers';
import { getJwtSecretKey, setUserDataCookie } from '@/lib/server/auth';
import { SignJWT } from 'jose';

export const dynamic = 'force-dynamic';

export type T_ApiUserLoginRequest = {
  email: string;
  password: string;
};

export async function POST(req: Request) {
  const reqBody = (await req.json()) as T_ApiUserLoginRequest;
  const errors: string[] = [];
  const { email, password } = reqBody;

  if (!email || !password) {
    errors.push('Email and password are required');
    return new Response(JSON.stringify({ errors }), { status: 400 });
  }

  if (password.length < 6) {
    errors.push('Password length should be more than 6 characters');
    return new Response(JSON.stringify({ errors }), { status: 400 });
  }

  function getSafeUserData(user: any) {
    const { password, salt, createdAt, updatedAt, ...safeData } = user;
    return safeData;
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const { salt, password: storedPassword } = user;
    const hashedPassword = authentification(salt, password);

    if (hashedPassword === storedPassword) {
      // Authentication successful
      const safeUserData = getSafeUserData(user);

      const token = await new SignJWT({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profilePicture: user.profilePicture,
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d') // Token valid for 7 days
        .sign(getJwtSecretKey());

      const response = NextResponse.json({ success: true, status: 200 });
      response.cookies.set({
        name: 'token',
        value: token,
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // Cookie valid for 30 days
        httpOnly: true,
        sameSite: 'strict',
      });

      //setUserDataCookie(safeUserData); // Set user data in cookie or session

      return response;
    } else {
      // Authentication failed
      return NextResponse.json(
        { message: 'Login or password incorrect' },
        { status: 401 }
      );
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: err },
      { status: 500 }
    );
  }
}
