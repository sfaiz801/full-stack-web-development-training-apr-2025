import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CounterView from './features/counter/CounterView';
import TodosView from './features/todos/TodosView';
import CartView from './features/cart/CartView';
import AuthView from './features/auth/AuthView';
import PostsView from './features/posts/PostsView';
import BudgetView from './features/budget/BudgetView';
import StateInspectorModal from './components/StateInspectorModal';

const TABS = [
  { id: 'counter', name: 'Counter', icon: 'fa-calculator', label: '01. Basics' },
  { id: 'todos', name: 'To-Do Tasks', icon: 'fa-list-check', label: '02. CRUD' },
  { id: 'cart', name: 'Shopping Cart', icon: 'fa-cart-shopping', label: '03. Cart' },
  { id: 'auth', name: 'Auth & Session', icon: 'fa-user-shield', label: '04. Auth' },
  { id: 'posts', name: 'Async Thunk API', icon: 'fa-cloud-arrow-down', label: '05. Async' },
  { id: 'budget', name: 'Budget Ledger', icon: 'fa-wallet', label: '06. Finance' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('counter');
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  const cartCount = useSelector((state) => state.cart.items.reduce((a, b) => a + b.quantity, 0));
  const todoCount = useSelector((state) => state.todos.items.filter(i => !i.completed).length);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div style={{ minHeight: '100vh', padding: '30px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Top App Header */}
      <header style={{ maxWidth: '950px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px', flexWrap: 'wrap', gap: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #764abc, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', color: '#fff', boxShadow: '0 8px 20px rgba(118, 74, 188, 0.4)' }}>
            <i className="fa-solid fa-atom"></i>
          </div>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>Redux Toolkit Mastery Hub</h1>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Full-Stack Training • Interactive Practice Lab</p>
          </div>
        </div>

        <button 
          className="btn-secondary"
          onClick={() => setIsInspectorOpen(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}
        >
          <i className="fa-solid fa-layer-group" style={{ color: '#818cf8' }}></i>
          Inspect Redux State Tree
        </button>
      </header>

      {/* Navigation Tabs Bar */}
      <div style={{ maxWidth: '950px', width: '100%', display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '30px' }}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: '1',
                minWidth: '140px',
                padding: '14px 12px',
                borderRadius: '16px',
                border: isActive ? '1px solid #6366f1' : '1px solid rgba(255,255,255,0.06)',
                background: isActive ? 'rgba(99, 102, 241, 0.15)' : 'rgba(22, 28, 45, 0.6)',
                color: isActive ? '#fff' : '#94a3b8',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: isActive ? '#818cf8' : '#64748b', textTransform: 'uppercase' }}>{tab.label}</span>
                <i className={`fa-solid ${tab.icon}`} style={{ color: isActive ? '#818cf8' : '#64748b' }}></i>
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                {tab.name}
                {tab.id === 'cart' && cartCount > 0 && (
                  <span style={{ background: '#6366f1', color: '#fff', fontSize: '0.7rem', padding: '1px 6px', borderRadius: '10px' }}>{cartCount}</span>
                )}
                {tab.id === 'todos' && todoCount > 0 && (
                  <span style={{ background: '#f59e0b', color: '#000', fontSize: '0.7rem', padding: '1px 6px', borderRadius: '10px', fontWeight: 800 }}>{todoCount}</span>
                )}
                {tab.id === 'auth' && isAuth && (
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Task Viewport */}
      <main style={{ maxWidth: '950px', width: '100%', flex: 1 }}>
        {activeTab === 'counter' && <CounterView />}
        {activeTab === 'todos' && <TodosView />}
        {activeTab === 'cart' && <CartView />}
        {activeTab === 'auth' && <AuthView />}
        {activeTab === 'posts' && <PostsView />}
        {activeTab === 'budget' && <BudgetView />}
      </main>

      {/* Live State Inspector Modal */}
      <StateInspectorModal isOpen={isInspectorOpen} onClose={() => setIsInspectorOpen(false)} />
    </div>
  );
}
