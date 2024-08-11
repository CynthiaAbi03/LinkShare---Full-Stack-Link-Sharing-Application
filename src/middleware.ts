import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJwtToken } from './lib/server/auth';

// List of routes that require authentication
const authRoutes = [
  '/create-link/*',
  '/profile-details/*',
  '/profile-preview/*',
  'auth/signup',
];

//Function to check if a path matches a pattern with wildcard

function matchesWildcard(path: string, pattern: string): boolean {
  if (pattern.endsWith('/*')) {
    const basePattern = pattern.slice(0, -2);
    return path.startsWith(basePattern);
  }
  return path === pattern;
}

/**
 * Middleware function to handle authentication and redirection logic
 */

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Set default home path '/' to login
  if (url.pathname === '/') {
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  // Construct the login URL with redirect parameter
  const LOGIN = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login?redirect=${request.nextUrl.pathname + request.nextUrl.search}`;

  // Check if the request path requires authentication
  if (
    authRoutes.some((pattern) =>
      matchesWildcard(request.nextUrl.pathname, pattern)
    )
  ) {
    const token = request.cookies.get('token');

    // For API routes, return unauthorized instead of redirecting to login
    if (request.nextUrl.pathname.startsWith('/api')) {
      if (!token) {
        const response = { success: false, message: 'Unauthorized' };
        return NextResponse.json(response, { status: 401 });
      }
    }

    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(LOGIN);
    }
    try {
      // Decode and verify JWT token
      const payload = await verifyJwtToken(token.value);

      // If verification fails, delete the token and redirect to login
      if (!payload) {
        request.cookies.delete('token');
        return NextResponse.redirect(LOGIN);
      }

      // Uncomment this block if you need to secure admin routes
      // if (request.nextUrl.pathname.startsWith('/admin')) {
      //   if (payload.role !== 'admin') {
      //     return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/access-denied`);
      //   }
      // }
    } catch (error) {
      // On verification error, delete the token and redirect to login
      request.cookies.delete('token');
      return NextResponse.redirect(LOGIN);
    }
  }

  // Handle scenario where a logged-in user tries to access the login page
  let redirectToApp = false;

  // If on the login page, check if the user is already logged in
  if (request.nextUrl.pathname === '/auth/login') {
    const token = request.cookies.get('token');

    if (token) {
      try {
        const payload = await verifyJwtToken(token.value);

        // If payload is valid, set flag to redirect to the app
        if (payload) {
          redirectToApp = true;
        } else {
          // If payload is invalid, delete the token
          request.cookies.delete('token');
        }
      } catch (error) {
        // On verification error, delete the token
        request.cookies.delete('token');
      }
    }
  }

  // If the user is authenticated, prevent access to the signup page
  if (request.nextUrl.pathname === '/auth/signup') {
    const token = request.cookies.get('token');

    if (token) {
      try {
        const payload = await verifyJwtToken(token.value);

        // If payload is valid, set flag to redirect to the app
        if (payload) {
          redirectToApp = true;
        } else {
          // If payload is invalid, delete the token
          request.cookies.delete('token');
        }
      } catch (error) {
        // On verification error, delete the token
        request.cookies.delete('token');
      }
    }
  }

  // If redirectToApp flag is set, redirect to the app's create-link page
  if (redirectToApp) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/create-link`
    );
  }

  // If no special handling needed, continue to the next middleware or route handler
  return NextResponse.next();
}
