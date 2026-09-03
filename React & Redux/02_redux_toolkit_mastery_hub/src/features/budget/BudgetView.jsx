import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTransaction, deleteTransaction } from './budgetSlice';

export default function BudgetView() {
  const { transactions } = useSelector((state) => state.budget);
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Food');

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0);
  const balance = totalIncome - totalExpense;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || Number(amount) <= 0) return;
    dispatch(addTransaction({ title, amount, type, category }));
    setTitle('');
    setAmount('');
  };

  return (
    <div className="glass-panel" style={{ padding: '35px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <span style={{ color: '#818cf8', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Task 06: Financial Ledger & Accounting Slice
        </span>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '6px' }}>Expense & Budget Tracker</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Tracking income vs expenses, category metrics, and computed savings balance.</p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '25px' }}>
        <div style={{ background: 'rgba(10, 14, 23, 0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '18px', textAlign: 'center' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase' }}>Total Income</span>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>+${totalIncome.toFixed(2)}</h3>
        </div>
        <div style={{ background: 'rgba(10, 14, 23, 0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '18px', textAlign: 'center' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase' }}>Total Expense</span>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fb7185', marginTop: '4px' }}>-${totalExpense.toFixed(2)}</h3>
        </div>
        <div style={{ background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '16px', padding: '18px', textAlign: 'center' }}>
          <span style={{ color: '#a5b4fc', fontSize: '0.8rem', textTransform: 'uppercase' }}>Net Balance</span>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>${balance.toFixed(2)}</h3>
        </div>
      </div>

      {/* Add Transaction Form */}
      <form onSubmit={handleSubmit} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '18px', marginBottom: '25px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1fr 1.2fr auto', gap: '10px', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Transaction description"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: '10px 14px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '0.88rem' }}
          />
          <input 
            type="number" 
            placeholder="Amount ($)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ padding: '10px 14px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '0.88rem' }}
          />
          <select 
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{ padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '0.88rem' }}
          >
            <option value="expense">Expense (-)</option>
            <option value="income">Income (+)</option>
          </select>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '0.88rem' }}
          >
            <option value="Food">Food & Dining</option>
            <option value="Salary">Salary / Work</option>
            <option value="Hosting">Cloud / Server</option>
            <option value="Shopping">Shopping</option>
            <option value="General">General</option>
          </select>
          <button type="submit" className="btn-primary" style={{ padding: '10px 16px' }}>
            + Add
          </button>
        </div>
      </form>

      {/* Transaction History List */}
      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px' }}>Transaction Ledger</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '250px', overflowY: 'auto' }}>
        {transactions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>No transactions recorded.</div>
        ) : (
          transactions.map(t => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div>
                <span style={{ fontWeight: 600, fontSize: '0.92rem' }}>{t.title}</span>
                <span style={{ marginLeft: '10px', fontSize: '0.75rem', background: 'rgba(255,255,255,0.05)', color: '#94a3b8', padding: '2px 8px', borderRadius: '8px' }}>{t.category}</span>
                <span style={{ marginLeft: '8px', fontSize: '0.72rem', color: '#64748b' }}>{t.date}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ fontWeight: 700, fontSize: '1rem', color: t.type === 'income' ? '#34d399' : '#fb7185' }}>
                  {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                </span>
                <button 
                  onClick={() => dispatch(deleteTransaction(t.id))}
                  style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }}
                  onMouseOver={(e) => e.target.style.color = '#f43f5e'}
                  onMouseOut={(e) => e.target.style.color = '#64748b'}
                >
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
