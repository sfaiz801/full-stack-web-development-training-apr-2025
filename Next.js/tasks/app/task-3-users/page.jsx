'use client';

import { useState, useMemo } from 'react';

const mockUsers = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Lead Full-Stack Engineer',
    team: 'Core Platform',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    email: 'sarah.m@techcorp.io',
    skills: ['Next.js', 'FastAPI', 'AWS Lambda', 'PostgreSQL'],
    status: 'Active',
    bio: 'Architecting scalable serverless microservices and high-performance React frontends.'
  },
  {
    id: 2,
    name: 'David Chen',
    role: 'Senior Backend Developer',
    team: 'API & Infrastructure',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    email: 'david.chen@techcorp.io',
    skills: ['Python', 'FastAPI', 'Docker', 'Redis', 'SQL'],
    status: 'Active',
    bio: 'Specializing in asynchronous Python APIs, database schema indexing, and caching.'
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'UI/UX & Frontend Architect',
    team: 'Design Systems',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
    email: 'elena.r@techcorp.io',
    skills: ['React 19', 'Next.js 14', 'Tailwind', 'Figma'],
    status: 'Away',
    bio: 'Crafting pixel-perfect micro-interactions and accessible component design systems.'
  },
  {
    id: 4,
    name: 'Marcus Vance',
    role: 'Cloud & DevOps Specialist',
    team: 'Cloud Engineering',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    email: 'marcus.v@techcorp.io',
    skills: ['AWS EC2', 'ECS', 'Terraform', 'CI/CD', 'Docker'],
    status: 'Active',
    bio: 'Automating multi-region cloud infrastructures and container orchestration.'
  },
  {
    id: 5,
    name: 'Aisha Patel',
    role: 'Data Engineer & Database Admin',
    team: 'Data Operations',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
    email: 'aisha.p@techcorp.io',
    skills: ['PostgreSQL', 'Stored Procedures', 'Python', 'ETL'],
    status: 'Active',
    bio: 'Optimizing high-throughput SQL queries, triggers, and analytics pipelines.'
  },
  {
    id: 6,
    name: 'Liam Gallagher',
    role: 'Security & QA Engineer',
    team: 'Quality Assurance',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&q=80',
    email: 'liam.g@techcorp.io',
    skills: ['OAuth2', 'JWT', 'Jest', 'Playwright', 'FastAPI Security'],
    status: 'Offline',
    bio: 'Hardening REST endpoints and building end-to-end integration test suites.'
  }
];

export default function UsersDirectoryPage() {
  const [users] = useState(mockUsers);
  const [search, setSearch] = useState('');
  const [filterTeam, setFilterTeam] = useState('All');
  const [selectedUser, setSelectedUser] = useState(null);

  const teams = ['All', 'Core Platform', 'API & Infrastructure', 'Design Systems', 'Cloud Engineering', 'Data Operations', 'Quality Assurance'];

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesTeam = filterTeam === 'All' || u.team === filterTeam;
      const matchesSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.role.toLowerCase().includes(search.toLowerCase()) ||
        u.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
      return matchesTeam && matchesSearch;
    });
  }, [users, search, filterTeam]);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span className="badge badge-emerald">Task 3: Team Directory</span>
          <span className="badge badge-indigo">Data Modeling & Filtering</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
          Engineering Team & User Profiles
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
          Explore full-stack profiles, skill tags, team allocations, and real-time query filtering.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="glass-card"
        style={{
          padding: '20px',
          marginBottom: '30px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ position: 'relative', flex: '1', minWidth: '260px' }}>
          <i
            className="fa-solid fa-search"
            style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}
          ></i>
          <input
            type="text"
            placeholder="Search by name, role or skill (e.g. Next.js, FastAPI)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
            style={{ paddingLeft: '40px' }}
          />
        </div>

        <select
          value={filterTeam}
          onChange={(e) => setFilterTeam(e.target.value)}
          className="form-select"
          style={{ width: '220px' }}
        >
          {teams.map((t) => (
            <option key={t} value={t}>
              {t === 'All' ? 'All Teams' : t}
            </option>
          ))}
        </select>
      </div>

      {/* Grid of Profiles */}
      {filteredUsers.length === 0 ? (
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
          <p style={{ color: '#94a3b8' }}>No team members match your criteria.</p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
            gap: '24px'
          }}
        >
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="glass-card glass-card-hover"
              style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{ position: 'relative' }}>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(99, 102, 241, 0.4)' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      background: user.status === 'Active' ? '#10b981' : user.status === 'Away' ? '#f59e0b' : '#6b7280',
                      border: '2px solid #090e17'
                    }}
                  ></span>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{user.name}</h3>
                  <div style={{ color: '#818cf8', fontSize: '0.85rem', fontWeight: 600 }}>{user.role}</div>
                  <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{user.team}</div>
                </div>
              </div>

              <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '16px', flex: 1 }}>
                {user.bio}
              </p>

              {/* Skills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                {user.skills.map((s) => (
                  <span
                    key={s}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      color: '#cbd5e1'
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ color: '#64748b', fontSize: '0.8rem' }}>
                  <i className="fa-solid fa-envelope" style={{ marginRight: '6px' }}></i>
                  {user.email}
                </span>

                <button
                  onClick={() => setSelectedUser(user)}
                  className="btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                >
                  Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* User Modal */}
      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
          <div
            className="glass-card"
            style={{ maxWidth: '480px', width: '100%', padding: '28px', background: '#0f172a' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <span className="badge badge-indigo">{selectedUser.team}</span>
              <button
                onClick={() => setSelectedUser(null)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <img
                src={selectedUser.avatar}
                alt={selectedUser.name}
                style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 12px', border: '3px solid #6366f1' }}
              />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{selectedUser.name}</h3>
              <p style={{ color: '#818cf8', fontWeight: 600, fontSize: '0.95rem' }}>{selectedUser.role}</p>
            </div>

            <p style={{ color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center', marginBottom: '20px' }}>
              {selectedUser.bio}
            </p>

            <div style={{ background: '#090e17', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '10px' }}>
                Tech Expertise
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedUser.skills.map((skill) => (
                  <span key={skill} className="badge badge-purple">{skill}</span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedUser(null)}
              className="btn-primary"
              style={{ width: '100%' }}
            >
              Close Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
