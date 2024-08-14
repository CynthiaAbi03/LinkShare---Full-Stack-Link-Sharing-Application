import cookie from 'cookie';
import { AuthUser } from '@/models/User.types';

export function getUserData() {
  const cookies = cookie.parse(document.cookie);
  const { userData } = cookies;
  //console.log(userData, 'logging userdata in cookie');

  // Check if userData exists and is a string
  if (!userData || typeof userData !== 'string') return null;

  try {
    return JSON.parse(userData) as AuthUser;
  } catch (error) {
    return null;
  }
}

export function isLoggedIn() {
  const userData = getUserData();
  return !!userData;
}
