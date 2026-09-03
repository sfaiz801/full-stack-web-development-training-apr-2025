import ClientCounter from './ClientCounter';

/**
 * HomePage (React Server Component - Default)
 * Fetches data securely on the server with zero client bundle overhead,
 * then composes Client Components at leaf nodes.
 */
async function getTrainingMetrics() {
  // Simulated server-only database query
  return {
    modulesCompleted: 6,
    totalProjects: 18,
    activeLearner: 'Mohammad Faiz',
    cohort: 'April 2025'
  };
}

export default async function HomePage() {
  const metrics = await getTrainingMetrics();

  return (
    <section className="space-y-6">
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
        <h1 className="text-3xl font-bold text-sky-400">Next.js 15 Server Component</h1>
        <p className="text-slate-400 mt-2">
          This entire view was rendered on the server. No client-side JavaScript was needed for this text.
        </p>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-slate-950 rounded-lg">
            <span className="text-xs text-slate-500">MODULES COMPLETED</span>
            <p className="text-2xl font-bold text-emerald-400">{metrics.modulesCompleted}</p>
          </div>
          <div className="p-4 bg-slate-950 rounded-lg">
            <span className="text-xs text-slate-500">LEARNER PROFILE</span>
            <p className="text-2xl font-bold text-indigo-400">{metrics.activeLearner}</p>
          </div>
        </div>
      </div>

      {/* Boundary: Embedding interactive Client Component */}
      <ClientCounter />
    </section>
  );
}
