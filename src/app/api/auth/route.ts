import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkAuthorization } from '@/middleware';
import { getSafeUserData } from '@/models/User.types';
import { getJwtSecretKey, setJWT, setUserDataCookie } from '@/lib/server/auth';
import authConfig from '@/config/authConfig';
import { SignJWT } from 'jose';

// function to get all user data from server

async function getAllUsers(request: NextRequest, payload: any) {
  if (payload && payload.id) {
    const userId = payload.id; // Extract the userId from the payload
    //console.log(payload, 'get request');
    try {
      // Fetch the user data based on the userId
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return NextResponse.json(
          { success: false, error: 'User not found' },
          { status: 404 }
        );
      }

      const safeUserData = getSafeUserData(user);
      const token = await new SignJWT({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(authConfig.jwtExpiresString)
        .sign(getJwtSecretKey());

      const response = NextResponse.json({ success: true }, { status: 200 });
      response.cookies.set({
        name: 'token',
        value: token,
        path: '/',
        maxAge: authConfig.jwtExpires,
        httpOnly: true,
        sameSite: 'strict',
      });

      setUserDataCookie(safeUserData); // Set user data in cookie or session
      setJWT(token);
      return response;
    } catch (error) {
      console.error('Error retrieving user data', error);
      return NextResponse.json(
        { success: false, error: 'Failed to retrieve user data' },
        { status: 500 }
      );
    }
  } else {
    console.log('no payload');
    return NextResponse.json({ sucess: false }, { status: 401 });
  }
}

// Default export to wrap the handler with authorization check
export async function GET(request: NextRequest) {
  return checkAuthorization(request, (payload) =>
    getAllUsers(request, payload)
  );
}
