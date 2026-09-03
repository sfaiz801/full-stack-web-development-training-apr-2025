import { requireAuth } from './auth';

/**
 * Protected Dashboard Page (React Server Component)
 * Path: app/dashboard/page.jsx
 * Guarantees zero unauthenticated HTML renders on the server.
 */
export default async function ProtectedDashboard() {
  const session = await requireAuth();

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-sky-400">Secure Server Dashboard</h1>
        <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full font-bold">
          SESSION VERIFIED
        </span>
      </div>

      <div className="p-4 bg-slate-950 rounded-lg space-y-2">
        <p className="text-slate-300">Logged in as: <strong>{session.name}</strong> ({session.email})</p>
        <p className="text-xs text-slate-500">Security Clearance: {session.role}</p>
      </div>
    </div>
  );
}
