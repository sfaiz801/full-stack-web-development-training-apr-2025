'use client';

import { useEffect } from 'react';

/**
 * Error Boundary Component
 * Path: app/products/[id]/error.jsx
 * Catches server or client rendering errors in route segment
 */
export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Route segment error captured:', error);
  }, [error]);

  return (
    <div className="p-6 bg-rose-950/40 border border-rose-800 rounded-xl max-w-xl mx-auto space-y-4 text-center">
      <h2 className="text-xl font-bold text-rose-300">Something went wrong!</h2>
      <p className="text-sm text-slate-400">{error.message || 'Unable to fetch dynamic product details.'}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-rose-600 text-white font-bold rounded-lg hover:bg-rose-500 transition"
      >
        Try Again
      </button>
    </div>
  );
}
