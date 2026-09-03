'use client';

import { useState } from 'react';

/**
 * ClientCounter Component ('use client')
 * Boundary where interactive client-side React code begins.
 */
export default function ClientCounter() {
  const [likes, setLikes] = useState(0);

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-sky-400">Client Component Boundary ('use client')</h3>
        <span className="text-xs px-2 py-1 bg-sky-500/20 text-sky-400 rounded-full font-bold">CLIENT HYDRATED</span>
      </div>
      <p className="text-sm text-slate-400">
        Uses React 19 `useState` hooks and handles browser click events without affecting server rendering performance.
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setLikes(prev => prev + 1)}
          className="px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-slate-950 font-bold rounded-lg hover:opacity-90 transition"
        >
          👍 Like Project ({likes})
        </button>
        <button
          onClick={() => setLikes(0)}
          className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
