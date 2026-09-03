/**
 * Loading Component
 * Path: app/products/[id]/loading.jsx
 * Automatically wrapped in React Suspense by Next.js App Router
 */
export default function Loading() {
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl max-w-xl mx-auto animate-pulse space-y-4">
      <div className="h-4 bg-slate-800 rounded w-1/4"></div>
      <div className="h-8 bg-slate-800 rounded w-3/4"></div>
      <div className="h-6 bg-slate-800 rounded w-1/3"></div>
      <div className="h-10 bg-slate-800 rounded w-full"></div>
    </div>
  );
}
