export default function HomePage() {
  const taskCards = [
    {
      id: 'task-1',
      title: 'Task 1: Product Catalog & Cart',
      route: '/task-1-products',
      icon: 'fa-solid fa-store',
      tag: 'Client Component & State',
      badgeColor: 'badge-indigo',
      description:
        'Dynamic e-commerce catalog featuring live search, category pills, price sorting, modal quick-view, and an interactive shopping cart with tax calculation.',
      features: ['Live Query Search', 'Category Filtering', 'Cart State Drawer', 'Dynamic Price Sorting']
    },
    {
      id: 'task-2',
      title: 'Task 2: Contact Form & Route Handler',
      route: '/task-2-contact-form',
      icon: 'fa-solid fa-paper-plane',
      tag: 'API Route & Forms',
      badgeColor: 'badge-purple',
      description:
        'Controlled contact form with real-time validation, posting directly to Next.js Route Handler (/api/contact) with live status and payload echoes.',
      features: ['Next.js Route Handler', 'Form Validation', 'Async POST Request', 'Live API Monitor']
    },
    {
      id: 'task-3',
      title: 'Task 3: Engineering Team Directory',
      route: '/task-3-users',
      icon: 'fa-solid fa-users-gear',
      tag: 'Data Architecture',
      badgeColor: 'badge-emerald',
      description:
        'Interactive team directory featuring full-stack developer profiles, skill badges, live availability status, and department filtering.',
      features: ['Team Department Filter', 'Multi-skill Tagging', 'Profile Modal View', 'Instant Search']
    },
    {
      id: 'task-4',
      title: 'Task 4: Sprint Task Planner',
      route: '/task-4-todo',
      icon: 'fa-solid fa-list-check',
      tag: 'State & LocalStorage',
      badgeColor: 'badge-amber',
      description:
        'Comprehensive sprint board with priority tagging (High, Medium, Low), milestone progress bar, category filters, and persistent localStorage sync.',
      features: ['LocalStorage Persistence', 'Priority & Category Tags', 'Sprint Progress Bar', 'Filter Tabs']
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div
        className="glass-card"
        style={{
          padding: '40px',
          marginBottom: '40px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'inline-flex', gap: '8px', marginBottom: '14px' }}>
          <span className="badge badge-purple">Full Stack April Batch 2025</span>
          <span className="badge badge-indigo">Next.js 14 App Router</span>
        </div>

        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '12px' }}>
          Next.js Practical Tasks Hub
        </h1>

        <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '680px', margin: '0 auto 24px' }}>
          Explore interactive Next.js micro-applications covering Client Components, Server Route Handlers, 
          state management, form handling, dynamic routing, and persistent browser storage.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <a href="/task-1-products" className="btn-primary">
            <i className="fa-solid fa-play"></i>
            Launch Task 1 (Products)
          </a>
          <a href="/task-2-contact-form" className="btn-secondary">
            <i className="fa-solid fa-paper-plane"></i>
            Launch Task 2 (Contact API)
          </a>
        </div>
      </div>

      {/* Task Cards Grid */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>
            <i className="fa-solid fa-cubes" style={{ color: '#6366f1', marginRight: '10px' }}></i>
            Completed Practical Tasks
          </h2>
          <span style={{ color: '#64748b', fontSize: '0.85rem' }}>4 Practical Modules Ready</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {taskCards.map((card) => (
            <div
              key={card.id}
              className="glass-card glass-card-hover"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: 'rgba(99, 102, 241, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#818cf8',
                      fontSize: '1.3rem'
                    }}
                  >
                    <i className={card.icon}></i>
                  </div>
                  <span className={`badge ${card.badgeColor}`}>{card.tag}</span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>
                  {card.title}
                </h3>

                <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '18px', lineHeight: 1.5 }}>
                  {card.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                  {card.features.map((feat) => (
                    <span
                      key={feat}
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.74rem',
                        color: '#cbd5e1'
                      }}
                    >
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={card.route}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Open {card.title.split(':')[0]}</span>
                <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.85rem' }}></i>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Built-in API Route Handlers Section */}
      <div className="glass-card" style={{ padding: '30px', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <i className="fa-solid fa-server" style={{ color: '#10b981' }}></i>
          Built-in Next.js Route Handlers (Backend API)
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '18px' }}>
          These backend API endpoints are implemented inside <code>app/api/</code> and handle server-side request routing:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div style={{ background: '#0b1120', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#34d399' }}>GET /api/products</span>
              <a href="/api/products" target="_blank" className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                Test Endpoint ↗
              </a>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.8rem' }}>
              Returns full product catalog with query parameter filtering (<code>?category=Electronics&q=phone</code>).
            </p>
          </div>

          <div style={{ background: '#0b1120', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#818cf8' }}>POST /api/contact</span>
              <a href="/api/contact" target="_blank" className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                View Schema ↗
              </a>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.8rem' }}>
              Accepts JSON contact submissions, performs validation, and generates a unique tracking reference code.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
