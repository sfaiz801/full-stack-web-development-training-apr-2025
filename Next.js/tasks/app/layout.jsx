import './globals.css';

export const metadata = {
  title: 'Next.js Practice Tasks | Full Stack April Batch',
  description: 'Interactive Next.js tasks covering components, API Route Handlers, state management, and forms.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>
        {/* Navigation */}
        <header style={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(9, 14, 23, 0.85)',
          backdropFilter: 'blur(16px)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            maxWidth: '1100px',
            margin: '0 auto',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', textDecoration: 'none', fontWeight: 800, fontSize: '1.2rem' }}>
              <i className="fa-brands fa-react" style={{ color: '#6366f1', fontSize: '1.5rem' }}></i>
              <span>Next.js Tasks</span>
            </a>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="/" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600 }}>Home</a>
              <a href="/task-1-products" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600 }}>Task 1: Products</a>
              <a href="/task-2-contact-form" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600 }}>Task 2: Contact API</a>
              <a href="/task-3-users" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600 }}>Task 3: Team</a>
              <a href="/task-4-todo" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600 }}>Task 4: Sprint Board</a>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main style={{ maxWidth: '1100px', margin: '30px auto', padding: '0 20px', minHeight: 'calc(100vh - 180px)' }}>
          {children}
        </main>

        {/* Footer */}
        <footer style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '24px 20px',
          textAlign: 'center',
          color: '#64748b',
          fontSize: '0.85rem'
        }}>
          <p>Full Stack April Batch 2025 • Next.js 14 App Router Practice Environment</p>
        </footer>
      </body>
    </html>
  );
}
