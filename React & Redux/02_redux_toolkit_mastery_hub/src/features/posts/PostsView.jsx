import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, setSearchQuery, deletePost } from './postsSlice';

export default function PostsView() {
  const { items, status, error, searchQuery } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const filteredPosts = items.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="glass-panel" style={{ padding: '35px', maxWidth: '850px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <span style={{ color: '#818cf8', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Task 05: Async Operations & Middleware
        </span>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '6px' }}>API Data Fetcher (Async Thunk)</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Practicing createAsyncThunk lifecycle (pending, fulfilled, rejected).</p>
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <input 
          type="text" 
          placeholder="Search fetched posts..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          style={{ flex: 1, padding: '10px 16px', background: 'rgba(10, 14, 23, 0.7)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
        />
        <button 
          className="btn-primary" 
          onClick={() => dispatch(fetchPosts())}
          disabled={status === 'loading'}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <i className={`fa-solid fa-arrows-rotate ${status === 'loading' ? 'fa-spin' : ''}`}></i>
          Refetch API
        </button>
      </div>

      {status === 'loading' && (
        <div style={{ textAlign: 'center', padding: '50px 0', color: '#818cf8' }}>
          <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem', marginBottom: '12px' }}></i>
          <p style={{ fontWeight: 600 }}>Fetching data from external REST API...</p>
        </div>
      )}

      {status === 'failed' && (
        <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)', padding: '20px', borderRadius: '14px', textAlign: 'center', color: '#fb7185' }}>
          <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '1.5rem', marginBottom: '8px' }}></i>
          <h4>Error Loading Posts</h4>
          <p style={{ fontSize: '0.88rem' }}>{error}</p>
        </div>
      )}

      {status === 'succeeded' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {filteredPosts.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '30px', color: '#64748b' }}>No posts matching search.</div>
          ) : (
            filteredPosts.map(post => (
              <div 
                key={post.id} 
                style={{ 
                  background: 'rgba(255,255,255,0.02)', 
                  border: '1px solid rgba(255,255,255,0.06)', 
                  borderRadius: '16px', 
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#818cf8', fontWeight: 700, textTransform: 'uppercase' }}>Post #{post.id}</span>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '6px 0 10px', textTransform: 'capitalize', color: '#f8fafc' }}>
                    {post.title.slice(0, 40)}...
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                    {post.body.slice(0, 90)}...
                  </p>
                </div>
                
                <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'flex-end' }}>
                  <button 
                    onClick={() => dispatch(deletePost(post.id))}
                    style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.82rem' }}
                    onMouseOver={(e) => e.target.style.color = '#f43f5e'}
                    onMouseOut={(e) => e.target.style.color = '#64748b'}
                  >
                    <i className="fa-regular fa-trash-can"></i> Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
