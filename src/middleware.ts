import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/astro/server';
import { getUserAccessSummary } from './lib/db';

// Routes that never require authentication.
// Everything else requires sign-in; org/event scope is enforced per page/API.
const isPublicRoute = createRouteMatcher([
  '/login',
  '/signup',
  '/invite/accept',
  '/api/webhooks/(.*)',
  '/api/health',
  '/api/auth/(.*)',
  '/_astro/(.*)',
  '/favicon.ico',
  '/favicon.png',
  '/favicon.svg',
]);

export const onRequest = clerkMiddleware(async (auth, context, next) => {
  const { userId, sessionClaims } = auth();
  const { url, request, redirect, locals } = context;
  const pathname = url.pathname;

  // Get email from session claims (provider-dependent key naming)
  let email =
    (sessionClaims?.email as string | undefined) ??
    (sessionClaims?.email_address as string | undefined);

  // Fallback: fetch user from Clerk if email not in session claims
  if (userId && !email) {
    try {
      const user = await clerkClient(context).users.getUser(userId);
      email = user.primaryEmailAddress?.emailAddress ?? user.emailAddresses[0]?.emailAddress ?? null;
    } catch {
      // Ignore errors, email will remain null
    }
  }

  const summary = userId
    ? await getUserAccessSummary(userId)
    : { hasMembership: false, hasOrganizerRole: false, organizationCount: 0, eventCount: 0 };

  locals.user = userId
    ? {
        id: userId,
        email: email ?? null,
        role: summary.hasOrganizerRole ? 'organizer' : summary.hasMembership ? 'staff' : 'none',
      }
    : null;
  locals.isStaff = summary.hasMembership;
  locals.isAdmin = summary.hasOrganizerRole;
  locals.isScanner = summary.hasMembership;
  locals.hasOrganization = summary.organizationCount > 0;
  locals.hasEvent = summary.eventCount > 0;

  // Dev-only: bypass auth when BYPASS_AUTH_FOR_TESTS and X-Test-Mode: 1 present
  const testBypass =
    process.env.NODE_ENV !== 'production' &&
    process.env.BYPASS_AUTH_FOR_TESTS === 'true' &&
    request.headers.get('X-Test-Mode') === '1';
  if (testBypass) {
    locals.user = {
      id: 'test-user',
      email: 'test@example.com',
      role: 'organizer',
    };
    locals.isStaff = true;
    locals.isAdmin = true;
    locals.isScanner = true;
    locals.hasOrganization = true;
    locals.hasEvent = true;
  }

  // Public routes + RSVP POST (unauthenticated form submission)
  if (isPublicRoute(context.request)) return next();
  if (pathname === '/api/attendees' && request.method === 'POST') return next();

  // Everything else requires authentication
  if (!userId && !testBypass) {
    if (pathname.startsWith('/api/')) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
    const returnTo = encodeURIComponent(pathname + url.search);
    return redirect(`/login?returnTo=${returnTo}&required=auth`);
  }

  return next();
});
