import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount, setStep, reset } from './counterSlice';

export default function CounterView() {
  const { value, step, history } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const [customAmount, setCustomAmount] = useState('10');

  return (
    <div className="glass-panel" style={{ padding: '35px', maxWidth: '650px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <span style={{ color: '#818cf8', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Task 01: Fundamental Redux State
        </span>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '6px' }}>Counter & Multiplier</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Practicing actions, reducers, step modifiers and history log.</p>
      </div>

      <div style={{ 
        background: 'rgba(10, 14, 23, 0.6)', 
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '20px', 
        padding: '30px', 
        textAlign: 'center',
        marginBottom: '25px'
      }}>
        <div style={{ fontSize: '4.5rem', fontWeight: 800, color: '#818cf8', textShadow: '0 0 25px rgba(99, 102, 241, 0.5)' }}>
          {value}
        </div>
        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Current Step Multiplier: <strong style={{ color: '#fff' }}>{step}</strong></div>
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
        <button className="btn-secondary" style={{ flex: 1, padding: '14px', fontSize: '1.2rem' }} onClick={() => dispatch(decrement())}>
          <i className="fa-solid fa-minus"></i> -{step}
        </button>
        <button className="btn-danger" style={{ padding: '14px 20px' }} onClick={() => dispatch(reset())}>
          <i className="fa-solid fa-rotate-left"></i> Reset
        </button>
        <button className="btn-primary" style={{ flex: 1, padding: '14px', fontSize: '1.2rem' }} onClick={() => dispatch(increment())}>
          <i className="fa-solid fa-plus"></i> +{step}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '15px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Set Step Multiplier</label>
          <input 
            type="number" 
            min="1"
            value={step}
            onChange={(e) => dispatch(setStep(e.target.value))}
            style={{ width: '100%', padding: '8px 12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
          />
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '15px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Add Custom Amount</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="number" 
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              style={{ flex: 1, padding: '8px 12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
            />
            <button className="btn-primary" style={{ padding: '8px 14px' }} onClick={() => dispatch(incrementByAmount(Number(customAmount) || 0))}>
              Add
            </button>
          </div>
        </div>
      </div>

      {history.length > 0 && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '15px' }}>
          <h4 style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '10px' }}>Recent Actions Log</h4>
          <div style={{ maxHeight: '120px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {history.slice(0, 5).map((log, idx) => (
              <div key={idx} style={{ fontSize: '0.8rem', color: '#cbd5e1', background: 'rgba(255,255,255,0.02)', padding: '6px 12px', borderRadius: '6px' }}>
                • {log}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
