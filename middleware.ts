import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, NextRequest } from 'next/server';

export const config = {
  // matcher: '/:locale*'
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
};

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  const { data } = await supabase.auth.getSession();

  if (
    request.nextUrl.pathname.indexOf('icon') > -1 ||
    request.nextUrl.pathname.indexOf('chrome') > -1
  ) {
    return NextResponse.next();
  }

  if (data.session === null && request.nextUrl.pathname.indexOf('dashboard') > -1) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (
    data.session &&
    (request.nextUrl.pathname.indexOf('login') > -1 ||
      request.nextUrl.pathname.indexOf('signup') > -1)
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return response;
}
