import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Server-Side Session Verifier
 * File: auth.js
 * Runs exclusively in React Server Components or Server Actions
 */
export async function getServerSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('auth_token')?.value;

  if (!sessionToken) {
    return null;
  }

  // In production: verify JWT signature or validate Firebase ID token via Admin SDK
  try {
    return {
      userId: 'USR-FAIZ-801',
      name: 'Mohammad Faiz',
      email: 'faiz@indixpert.com',
      role: 'FULL_STACK_LEAD'
    };
  } catch (err) {
    return null;
  }
}

export async function requireAuth() {
  const session = await getServerSession();
  if (!session) {
    redirect('/signin');
  }
  return session;
}
