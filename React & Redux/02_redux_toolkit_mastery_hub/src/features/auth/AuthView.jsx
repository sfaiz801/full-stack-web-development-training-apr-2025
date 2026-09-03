import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, updateProfile, toggleNotifications } from './authSlice';

export default function AuthView() {
  const { isAuthenticated, user, role, preferences } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [nameInput, setNameInput] = useState('Faiz Siddiqui');
  const [emailInput, setEmailInput] = useState('faiz@antigravity.dev');
  const [roleInput, setRoleInput] = useState('Lead Full Stack Developer');

  return (
    <div className="glass-panel" style={{ padding: '35px', maxWidth: '650px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <span style={{ color: '#818cf8', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Task 04: Authentication & User Session State
        </span>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '6px' }}>User Session & Settings</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Global user login state, dynamic role switching, and user preference toggles.</p>
      </div>

      {isAuthenticated ? (
        <div>
          {/* User Profile Card */}
          <div style={{ 
            background: 'rgba(10, 14, 23, 0.6)', 
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px', 
            padding: '25px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '25px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem', color: '#fff' }}>
                {user.avatar}
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{user.name}</h3>
                <p style={{ color: '#818cf8', fontSize: '0.85rem', fontWeight: 600 }}>{role}</p>
                <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{user.email}</p>
              </div>
            </div>

            <button className="btn-danger" onClick={() => dispatch(logout())}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Sign Out
            </button>
          </div>

          {/* Edit Profile Form */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px', marginBottom: '20px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px' }}>Edit Profile in Redux Store</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Display Name</label>
                <input 
                  type="text" 
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Designation / Role</label>
                <input 
                  type="text" 
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                />
              </div>
            </div>
            <button 
              className="btn-secondary" 
              style={{ width: '100%', padding: '8px' }}
              onClick={() => dispatch(updateProfile({ name: nameInput, role: roleInput }))}
            >
              Update Store Profile
            </button>
          </div>

          {/* Preferences */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '14px 18px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Email Notifications</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Receive daily build and deployment updates</div>
            </div>
            <input 
              type="checkbox" 
              checked={preferences.emailNotifications}
              onChange={() => dispatch(toggleNotifications())}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '30px 20px', background: 'rgba(10, 14, 23, 0.6)', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(99,102,241,0.15)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 18px' }}>
            <i className="fa-solid fa-user-lock"></i>
          </div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '6px' }}>You are currently Logged Out</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '25px', maxWidth: '380px', margin: '0 auto 25px' }}>
            Click below to simulate user authentication and dispatch login action with prefilled user state.
          </p>

          <button 
            className="btn-primary" 
            style={{ padding: '12px 30px', fontSize: '1rem' }}
            onClick={() => dispatch(login({ name: nameInput, email: emailInput, role: roleInput, avatar: 'FS' }))}
          >
            <i className="fa-solid fa-right-to-bracket"></i> Login as Faiz Siddiqui
          </button>
        </div>
      )}
    </div>
  );
}
