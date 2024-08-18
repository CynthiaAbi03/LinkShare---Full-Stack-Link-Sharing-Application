import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { authentification } from '@/helpers';
import { getSafeUserData, User } from '@/models/User.types';
import authConfig from '@/config/authConfig';

import { getJwtSecretKey, setJWT, setUserDataCookie } from '@/lib/server/auth';
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
    return new Response(
      JSON.stringify({
        status: 'error',
        errors: errors,
      }),
      { status: 400 }
    );
  }

  if (password.length < 6) {
    errors.push('Password length should be more than 6 characters');
    return NextResponse.json(
      {
        status: 'error',
        errors: errors,
      },
      { status: 400 }
    );
  }


  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { status: 'error', message: 'User not found' },
        { status: 404 }
      );
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
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(authConfig.jwtExpiresString) // Token valid for 1 day
        .sign(getJwtSecretKey());

      const response = NextResponse.json({ success: true }, { status: 200 });

      response.cookies.set({
        name: 'token',
        value: token,
        path: '/',
        maxAge: authConfig.jwtExpires, // Cookie valid for 1 week
        httpOnly: true,
        sameSite: 'strict',
      });

      setUserDataCookie(safeUserData); // Set user data in cookie or session
      setJWT(token); //set token in next/headers cooke

      return response;
    } else {
      // Authentication failed
      return NextResponse.json(
        { status: 'error', message: 'Email or Password incorrect' },
        { status: 401 }
      );
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
