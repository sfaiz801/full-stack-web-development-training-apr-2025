import './globals.css';

/**
 * RootLayout Component (Server Component)
 * - Persists across route transitions without re-rendering
 * - Injects global HTML structure, fonts, and metadata
 */
export const metadata = {
  title: 'Next.js App Router Mastery | Mohammad Faiz',
  description: 'Full Stack Web Development Training Portfolio - Next.js 15 & React 19',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased">
        <header className="border-b border-slate-800 px-6 py-4 flex justify-between items-center">
          <span className="font-extrabold text-sky-400">Next.js 15 Portfolio</span>
          <nav className="flex gap-4 text-sm text-slate-400">
            <a href="/" className="hover:text-white">Home</a>
            <a href="/products" className="hover:text-white">Products</a>
            <a href="/dashboard" className="hover:text-white">Dashboard</a>
          </nav>
        </header>
        <main className="p-6 max-w-5xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
