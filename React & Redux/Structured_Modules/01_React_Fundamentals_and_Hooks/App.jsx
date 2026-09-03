import React, { useState, useEffect, useRef } from 'react';

/**
 * StudentCard Component
 * Demonstrates: Props destructuring, default props, and children composition
 */
export function StudentCard({ name, track, score, children }) {
  return (
    <div className="p-4 bg-slate-900 border border-slate-700 rounded-lg">
      <h3 className="text-lg font-bold text-sky-400">{name}</h3>
      <p className="text-sm text-slate-400">Track: {track} | Score: <span className="text-emerald-400 font-semibold">{score}%</span></p>
      {children && <div className="mt-2 text-xs text-slate-300">{children}</div>}
    </div>
  );
}

/**
 * App Component
 * Demonstrates: useState, useEffect (lifecycle cleanup), and useRef for DOM focus
 */
export default function App() {
  const [count, setCount] = useState(0);
  const [secondsActive, setSecondsActive] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsActive(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer); // Cleanup function
  }, []);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-slate-950 text-slate-100 min-h-screen">
      <header className="text-center">
        <h1 className="text-2xl font-extrabold text-sky-400">React Fundamentals &amp; Core Hooks</h1>
        <p className="text-slate-400">useState, useEffect lifecycle, and useRef DOM access</p>
      </header>

      {/* State & Lifecycle */}
      <section className="p-6 bg-slate-800 rounded-xl border border-slate-700 space-y-4">
        <h2 className="text-xl font-bold text-indigo-400">1. State &amp; Lifecycle</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-900 rounded-lg">
            <span className="text-xs text-slate-400">COUNTER STATE</span>
            <p className="text-3xl font-bold text-sky-400">{count}</p>
            <button onClick={() => setCount(c => c + 1)} className="mt-2 px-3 py-1 bg-sky-500 rounded text-slate-900 font-bold">
              Increment
            </button>
          </div>
          <div className="p-4 bg-slate-900 rounded-lg">
            <span className="text-xs text-slate-400">SESSION TIMER (useEffect)</span>
            <p className="text-3xl font-bold text-emerald-400">{secondsActive}s</p>
            <p className="text-xs text-slate-400 mt-2">Cleaned up on unmount</p>
          </div>
        </div>
      </section>

      {/* Props & Composition */}
      <section className="p-6 bg-slate-800 rounded-xl border border-slate-700 space-y-4">
        <h2 className="text-xl font-bold text-indigo-400">2. Props &amp; Component Composition</h2>
        <div className="grid grid-cols-2 gap-4">
          <StudentCard name="Mohammad Faiz" track="Full Stack Engineering" score={96}>
            <span className="text-sky-400">Full-Stack Track Completed</span>
          </StudentCard>
          <StudentCard name="Amina Khan" track="Frontend Specialization" score={92}>
            <span className="text-purple-400">UI/UX Sprint Active</span>
          </StudentCard>
        </div>
      </section>

      {/* useRef DOM Access */}
      <section className="p-6 bg-slate-800 rounded-xl border border-slate-700 space-y-4">
        <h2 className="text-xl font-bold text-indigo-400">3. Imperative DOM Access (useRef)</h2>
        <input ref={inputRef} type="text" placeholder="Type or trigger auto-focus..." className="w-full p-2 bg-slate-900 rounded border border-slate-700" />
        <button onClick={handleFocus} className="px-4 py-2 bg-indigo-500 rounded font-semibold">
          Focus Input via Ref
        </button>
      </section>
    </div>
  );
}
