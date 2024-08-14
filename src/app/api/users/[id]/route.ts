import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { setUserDataCookie } from '@/lib/server/auth';
import { User } from '@/models/User.types';
import { getJwtSecretKey } from '@/lib/server/auth';
import { SignJWT } from 'jose';

export type T_updateUserRequest = {
  firstName: string;
  lastName: string;
  profilePicture: string;
  email: string;
};
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  let errors: string[] = [];

  function getSafeUserData(user: User) {
    const { password, salt, profilePicture, ...safeData } = user;
    return safeData;
  }

  try {
    const { firstName, lastName, profilePicture, email } =
      (await request.json()) as T_updateUserRequest;

    console.log('entered try block');
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

    const safeUserData = getSafeUserData(updatedUser);
    const token = await new SignJWT({
      id: updatedUser.id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
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

    setUserDataCookie(safeUserData); // Set user data in cookie or session
    return response;
  } catch (err) {
    console.error('Error updating user', err);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}
