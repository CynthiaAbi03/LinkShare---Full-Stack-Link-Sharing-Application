import { AuthProvider } from '@/context/AuthContext';
// import { CookieProvider } from '@/context/CookieProvider';
import getCookie from '@/lib/server/userCookie';
import { cookies } from 'next/headers';

export function Providers({ children }: { children: React.ReactNode }) {
  //const cookie = getCookie();
  return (
    // <CookieProvider cookie={getCookie()}>
      <AuthProvider>{children}</AuthProvider>
    // </CookieProvider>
  );
}
