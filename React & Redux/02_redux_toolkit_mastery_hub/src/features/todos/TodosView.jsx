import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo, setFilter, clearCompleted } from './todosSlice';

export default function TodosView() {
  const { items, filter } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [category, setCategory] = useState('Learning');

  const filteredItems = items.filter(item => {
    if (filter === 'active') return !item.completed;
    if (filter === 'completed') return item.completed;
    return true;
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addTodo({ text: text.trim(), category }));
    setText('');
  };

  return (
    <div className="glass-panel" style={{ padding: '35px', maxWidth: '650px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <span style={{ color: '#818cf8', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Task 02: CRUD & Filter State
        </span>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '6px' }}>To-Do Task Manager</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Managing complex collections, toggle completion, and filter slices.</p>
      </div>

      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
        <input 
          type="text" 
          placeholder="What do you want to accomplish?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ flex: 1, padding: '12px 16px', background: 'rgba(10, 14, 23, 0.7)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '0.95rem' }}
        />
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: '12px', background: 'rgba(10, 14, 23, 0.7)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#cbd5e1' }}
        >
          <option value="Learning">Learning</option>
          <option value="Coding">Coding</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
        <button type="submit" className="btn-primary" style={{ padding: '12px 20px' }}>
          <i className="fa-solid fa-plus"></i> Add
        </button>
      </form>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '4px', borderRadius: '10px' }}>
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => dispatch(setFilter(f))}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: 'none',
                background: filter === f ? '#6366f1' : 'transparent',
                color: filter === f ? '#fff' : '#94a3b8',
                fontWeight: 600,
                fontSize: '0.82rem',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {f} ({items.filter(i => f === 'all' ? true : f === 'active' ? !i.completed : i.completed).length})
            </button>
          ))}
        </div>

        <button 
          onClick={() => dispatch(clearCompleted())}
          style={{ background: 'transparent', border: 'none', color: '#fb7185', fontSize: '0.82rem', cursor: 'pointer', fontWeight: 600 }}
        >
          Clear Completed
        </button>
      </div>

      {/* Task List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '320px', overflowY: 'auto' }}>
        {filteredItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>No tasks found in this view.</div>
        ) : (
          filteredItems.map(item => (
            <div 
              key={item.id} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '14px 16px',
                background: item.completed ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '14px',
                transition: 'all 0.2s'
              }}
            >
              <div 
                onClick={() => dispatch(toggleTodo(item.id))} 
                style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', flex: 1 }}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '6px',
                  border: item.completed ? 'none' : '2px solid #64748b',
                  background: item.completed ? '#10b981' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  color: '#fff'
                }}>
                  {item.completed && <i className="fa-solid fa-check"></i>}
                </div>
                <div>
                  <span style={{ 
                    fontSize: '0.95rem', 
                    color: item.completed ? '#64748b' : '#f8fafc',
                    textDecoration: item.completed ? 'line-through' : 'none' 
                  }}>
                    {item.text}
                  </span>
                  <span style={{ 
                    marginLeft: '10px', 
                    fontSize: '0.72rem', 
                    background: 'rgba(99,102,241,0.15)', 
                    color: '#818cf8', 
                    padding: '2px 8px', 
                    borderRadius: '10px' 
                  }}>
                    {item.category}
                  </span>
                </div>
              </div>

              <button 
                onClick={() => dispatch(deleteTodo(item.id))}
                style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: '6px' }}
                onMouseOver={(e) => e.target.style.color = '#f43f5e'}
                onMouseOut={(e) => e.target.style.color = '#64748b'}
              >
                <i className="fa-regular fa-trash-can"></i>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
