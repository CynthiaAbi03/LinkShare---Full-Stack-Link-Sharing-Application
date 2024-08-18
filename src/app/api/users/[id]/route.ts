import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { setJWT, setUserDataCookie } from '@/lib/server/auth';
import { User } from '@/models/User.types';
import { getJwtSecretKey } from '@/lib/server/auth';
import { SignJWT } from 'jose';
import authConfig from '@/config/authConfig';
import { checkAuthorization } from '@/middleware';

export type T_updateUserRequest = {
  firstName: string;
  lastName: string;
  profilePicture: string;
  email: string;
};

export async function getUserProfilePic(request: Request, payload: any) {
  if (payload && payload.id) {
    const id = payload.id;
    try {
      const profilePicture = await prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          profilePicture: true,
        },
      });

      if (!profilePicture) {
        return NextResponse.json(
          { success: false, error: 'User or profile picture not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { success: true, data: profilePicture },
        { status: 200 }
      );
    } catch (err) {
      console.error('Error retrieving user profile pic', err);
      return NextResponse.json(
        { error: 'Failed to retriev user profile pic' },
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
    getUserProfilePic(request, payload)
  );
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  let errors: string[] = [];

  try {
    const { firstName, lastName, profilePicture, email } =
      (await request.json()) as T_updateUserRequest;

    //console.log('entered try block');
    if (!firstName && !lastName) {
      errors.push('First Name and Last Name are required');
      return NextResponse.json(
        {
          success: false,
          errors: errors,
        },
        {
          status: 400,
        }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { id: id } });

    if (!existingUser) {
      // 404 Not Found if user doesn't exist
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: {
        ...(firstName && { firstName }), // Update firstName
        ...(lastName && { lastName }), // Update lastName
        ...(profilePicture && { profilePicture }), // Update profilePic if provided
        ...(email && { email }), // Update email if provided
      },
    });

    const response = NextResponse.json({ success: true }, { status: 200 });

    return response;
  } catch (err) {
    console.error('Error updating user', err);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}
