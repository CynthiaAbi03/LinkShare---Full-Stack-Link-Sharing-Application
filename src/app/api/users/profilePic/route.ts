import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { setJWT, setUserDataCookie } from '@/lib/server/auth';
import { User } from '@/models/User.types';
import { getJwtSecretKey } from '@/lib/server/auth';
import { SignJWT } from 'jose';
import authConfig from '@/config/authConfig';
import { checkAuthorization } from '@/middleware';

 async function getUserProfilePic(request: Request, payload: any) {
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
  