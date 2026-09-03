import React from 'react';
import { useSelector } from 'react-redux';

export default function StateInspectorModal({ isOpen, onClose }) {
  const globalState = useSelector((state) => state);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '750px',
        width: '100%',
        maxHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '28px',
        border: '1px solid rgba(99, 102, 241, 0.4)',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fa-solid fa-code" style={{ color: '#818cf8' }}></i>
              Live Redux Store Tree Inspector
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem' }}>Inspect the exact current snapshot of all 6 active slices in real-time.</p>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer' }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div style={{
          background: '#070a13',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '14px',
          padding: '20px',
          overflowY: 'auto',
          flex: 1
        }}>
          <pre className="code-font" style={{ fontSize: '0.85rem', color: '#38bdf8', lineHeight: 1.5, margin: 0 }}>
            {JSON.stringify(globalState, null, 2)}
          </pre>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '18px' }}>
          <button className="btn-primary" onClick={onClose}>
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
