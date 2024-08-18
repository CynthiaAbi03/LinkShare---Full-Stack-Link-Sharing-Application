import cookie from 'cookie';
import { AuthUser } from '@/models/User.types';
// import { useCookies } from '@/context/CookieProvider';

export function getUserData(): AuthUser | null {
  const cookies = cookie.parse(document.cookie);
  const { userData } = cookies;

  // Check if userData exists and is a string

  if (!userData || typeof userData !== 'string') return null;

  //if (!cookie) return null;

  try {
    //console.log(cookie, 'logged in client');
    const userDataParsed = JSON.parse(userData);
    //console.log(userDataParsed, 'logged in client');
    return userDataParsed as AuthUser;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
}

export function isLoggedIn(): boolean {
  const userData = getUserData();
  return !!userData;
}
