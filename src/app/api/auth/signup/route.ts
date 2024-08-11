import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '../../../../lib/prisma';
import { authentification, random } from '@/helpers';
import { User } from '../../../../models/User.types';
import { AuthUser } from '../../../../models/User.types';
import { getJwtSecretKey, setUserDataCookie } from '@/lib/server/auth';
import { SignJWT } from 'jose';

export const dynamic = 'force-dynamic';

export type T_ApiUserSignUpRequest = {
  email: string;
  password: string;
};

export async function POST(req: Request) {
  const reqBody = (await req.json()) as T_ApiUserSignUpRequest;
  const errors: string[] = [];
  const { email, password } = reqBody;
  //console.log(email, password, 'req body');

  if (!email || !password) {
    errors.push('Email and password are required');
    return NextResponse.json(
      {
        status: 'error',
        errors: errors,
      },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    errors.push('Password length should be more than 6 characters');
    return new Response(
      JSON.stringify({
        status: 'error',
        errors: errors,
      }),
      { status: 400 }
    );
  }

  function getSafeUserData(user: User) {
    const { password, salt, ...safeData } = user;
    return safeData;
  }

  try {
    console.log('entered try block');

    const salt = random();
    const hashedPassword = authentification(salt, password);

    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        salt: salt,
      },
    });

    const safeUserData = getSafeUserData(user);

    const token = await new SignJWT({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1d') // Token valid for 1 day
      .sign(getJwtSecretKey());

    const response = NextResponse.json({ success: true, status: 200 });
    response.cookies.set({
      name: 'token',
      value: token,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // Cookie valid for 1 week
      httpOnly: true,
      sameSite: 'strict',
    });

    setUserDataCookie(safeUserData);

    return response;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        return new Response(
          JSON.stringify({ status: 'error', message: 'User already exists' }),
          { status: 400 }
        );
      }
    }
    return new Response(JSON.stringify({ message: err }), { status: 400 });
  }
}
