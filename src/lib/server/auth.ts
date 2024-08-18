import { jwtVerify, JWTPayload, decodeJwt } from 'jose';
import { cookies } from 'next/headers';
import { AuthUser, User_Public } from '@/models/User.types';
import { SignJWT } from 'jose';
import authConfig from '@/config/authConfig';
export function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT Secret key is not set');
  }

  const enc: Uint8Array = new TextEncoder().encode(secret);
  return enc;
}

export async function verifyJwtToken(
  token: string
): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());

    return payload;
  } catch (error) {
    return null;
  }
}

export async function getJwt(
  token: string | undefined
): Promise<AuthUser | null> {
  // const cookieStore = cookies();
  // const token = cookieStore.get('token');
  if (token) {
    try {
      const payload = await verifyJwtToken(token);
      if (payload) {
        const authPayload: AuthUser = {
          id: payload.id as string,
          firstName: payload.firstName as string,
          lastName: payload.lastName as string,
          email: payload.email as string,
          profilePicture: payload.profilePicture as string,
        };
        return authPayload;
      }
    } catch (error) {
      return null;
    }
  }
  return null;
}

export function setUserDataCookie(userData: User_Public) {
  const cookieStore = cookies();
  // console.log(userData,'logged in next/headers cookie store');
  cookieStore.set({
    name: 'userData',
    value: JSON.stringify(userData),
    path: '/',
    maxAge: 86400, // 24 hours
    sameSite: 'lax',
  });
}

export function setJWT(token: string) {
  // const token = await new SignJWT({
  //   id: userData.id,
  //   firstName: userData.firstName,
  //   lastName: userData.lastName,
  //   email: userData.email,
  // })
  //   .setProtectedHeader({ alg: 'HS256' })
  //   .setIssuedAt()
  //   .setExpirationTime(authConfig.jwtExpiresString)
  //   .sign(getJwtSecretKey());

  const cookieStore = cookies();

  cookieStore.set({
    name: 'token',
    value: token,
    path: '/',
    maxAge: authConfig.jwtExpires,
    sameSite: 'lax',
    httpOnly: true,
  });
}

export function getUserDataServer() {
  try {
    const cookieStore = cookies();
    const cookieData = cookieStore.get('userData');
    if (!cookieData) return null;

    return JSON.parse(cookieData.value);
  } catch (_) {
    return null;
  }
}

export async function logout() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  if (token) {
    try {
      cookieStore.delete('token');
    } catch (_) {}
  }

  const userData = cookieStore.get('userData');
  if (userData) {
    try {
      cookieStore.delete('userData');
      return true;
    } catch (_) {}
  }

  return null;
}
