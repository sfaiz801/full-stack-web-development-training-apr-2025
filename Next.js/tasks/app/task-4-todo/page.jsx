'use client';

import { useState, useEffect } from 'react';

const defaultTasks = [
  { id: 1, text: 'Configure Next.js App Router and dynamic route structure', priority: 'High', category: 'Frontend', completed: true },
  { id: 2, text: 'Design relational database schema and stored procedures in PostgreSQL', priority: 'High', category: 'Database', completed: false },
  { id: 3, text: 'Implement FastAPI authentication endpoint with JWT tokens', priority: 'Medium', category: 'Backend', completed: false },
  { id: 4, text: 'Set up AWS EC2 instance and Docker container deployment', priority: 'Medium', category: 'Cloud', completed: false },
  { id: 5, text: 'Integrate Redux Toolkit slices for cart and authentication states', priority: 'Low', category: 'Frontend', completed: true },
];

export default function TaskPlannerPage() {
  const [tasks, setTasks] = useState(defaultTasks);
  const [filter, setFilter] = useState('All');
  const [newTaskText, setNewTaskText] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [newCategory, setNewCategory] = useState('Frontend');

  // Load from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem('next_practice_tasks');
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse local storage tasks', e);
      }
    }
  }, []);

  // Save to localStorage
  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem('next_practice_tasks', JSON.stringify(newTasks));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newTask = {
      id: Date.now(),
      text: newTaskText.trim(),
      priority: newPriority,
      category: newCategory,
      completed: false,
    };

    saveTasks([newTask, ...tasks]);
    setNewTaskText('');
  };

  const toggleTask = (id) => {
    const updated = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    saveTasks(updated);
  };

  const deleteTask = (id) => {
    const updated = tasks.filter((t) => t.id !== id);
    saveTasks(updated);
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'Active') return !t.completed;
    if (filter === 'Completed') return t.completed;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '820px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span className="badge badge-amber">Task 4: Interactive State & Storage</span>
          <span className="badge badge-emerald">Task Planner</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
          Full-Stack Sprint Task Planner
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
          Track daily milestones across Frontend, Backend, Database, and Cloud modules.
        </p>
      </div>

      {/* Progress Bar Card */}
      <div className="glass-card" style={{ padding: '24px', marginBottom: '25px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fa-solid fa-chart-line" style={{ color: '#6366f1' }}></i>
            <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Sprint Progress</span>
          </div>
          <span style={{ fontWeight: 800, color: '#818cf8', fontSize: '1.1rem' }}>
            {completedCount} / {tasks.length} ({progressPercent}%)
          </span>
        </div>
        <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #6366f1, #10b981)',
              transition: 'width 0.4s ease'
            }}
          ></div>
        </div>
      </div>

      {/* Add Task Form */}
      <div className="glass-card" style={{ padding: '24px', marginBottom: '25px' }}>
        <form onSubmit={handleAddTask} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Add new task (e.g. Write unit tests for FastAPI router)..."
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              className="form-control"
              style={{ flex: 1, minWidth: '240px' }}
            />
            <button type="submit" className="btn-primary">
              <i className="fa-solid fa-plus"></i> Add Task
            </button>
          </div>

          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 600 }}>Priority:</span>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value)}
                className="form-select"
                style={{ width: '120px', padding: '6px 10px', fontSize: '0.85rem' }}
              >
                <option value="High">🔴 High</option>
                <option value="Medium">🟡 Medium</option>
                <option value="Low">🟢 Low</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 600 }}>Category:</span>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="form-select"
                style={{ width: '140px', padding: '6px 10px', fontSize: '0.85rem' }}
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Database">Database</option>
                <option value="Cloud">Cloud / AWS</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['All', 'Active', 'Completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              style={{
                background: filter === tab ? '#6366f1' : 'rgba(255,255,255,0.05)',
                color: filter === tab ? '#fff' : '#94a3b8',
                border: 'none',
                padding: '6px 16px',
                borderRadius: '10px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {completedCount > 0 && (
          <button
            onClick={() => saveTasks(tasks.filter((t) => !t.completed))}
            className="btn-danger"
            style={{ fontSize: '0.8rem' }}
          >
            Clear Completed
          </button>
        )}
      </div>

      {/* Task List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredTasks.length === 0 ? (
          <div className="glass-card" style={{ padding: '36px', textAlign: 'center', color: '#94a3b8' }}>
            <p>No tasks found in this view.</p>
          </div>
        ) : (
          filteredTasks.map((t) => {
            const priorityBadge =
              t.priority === 'High' ? 'badge-rose' : t.priority === 'Medium' ? 'badge-amber' : 'badge-emerald';

            return (
              <div
                key={t.id}
                className="glass-card"
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  background: t.completed ? 'rgba(15, 23, 42, 0.4)' : 'rgba(22, 28, 45, 0.75)',
                  opacity: t.completed ? 0.75 : 1
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleTask(t.id)}
                    style={{
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer',
                      accentColor: '#6366f1'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        textDecoration: t.completed ? 'line-through' : 'none',
                        color: t.completed ? '#64748b' : '#f8fafc'
                      }}
                    >
                      {t.text}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                      <span className={`badge ${priorityBadge}`} style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                        {t.priority}
                      </span>
                      <span className="badge badge-indigo" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                        {t.category}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => deleteTask(t.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#64748b',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    padding: '8px'
                  }}
                  title="Delete Task"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
