'use client';

import { useState } from 'react';

export default function ContactFormPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'General',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit form.');
      }

      setResult(data);
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'General',
        message: ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '8px' }}>
          <span className="badge badge-purple">Task 2: Route Handlers & Forms</span>
          <span className="badge badge-indigo">API Integration</span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
          Interactive Contact & Feedback Form
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '6px' }}>
          Connected directly to Next.js App Router Route Handler (<code>/api/contact</code>).
        </p>
      </div>

      {/* Main Grid: Form + Info Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Contact Form Card */}
        <div className="glass-card" style={{ padding: '32px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fa-solid fa-paper-plane" style={{ color: '#6366f1' }}></i>
            Send a Message
          </h2>

          {error && (
            <div
              style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#f87171',
                padding: '12px 16px',
                borderRadius: '12px',
                marginBottom: '20px',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <i className="fa-solid fa-circle-exclamation"></i>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Full Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Alex Johnson"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address *</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="alex@example.com"
                className="form-control"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="General">General Inquiry</option>
                  <option value="Feedback">Course Feedback</option>
                  <option value="Support">Technical Support</option>
                  <option value="Collaboration">Collaboration</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Topic summary"
                  className="form-control"
                />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label className="form-label" htmlFor="message">Message *</label>
                <span style={{ fontSize: '0.75rem', color: formData.message.length < 10 ? '#f87171' : '#34d399' }}>
                  {formData.message.length} / min 10 chars
                </span>
              </div>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your detailed message here (at least 10 characters)..."
                className="form-control"
                style={{ resize: 'vertical' }}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', padding: '12px' }}
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  Sending via Route Handler...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-paper-plane"></i>
                  Submit Inquiry
                </>
              )}
            </button>
          </form>
        </div>

        {/* Status / Output Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Submission Response Box */}
          <div className="glass-card" style={{ padding: '28px', flex: 1 }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-solid fa-bolt" style={{ color: '#fbbf24' }}></i>
              API Response Monitor
            </h3>

            {result ? (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div
                  style={{
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    color: '#34d399',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <i className="fa-solid fa-circle-check" style={{ fontSize: '1.2rem' }}></i>
                  <div>
                    <strong>Status 200 OK:</strong> {result.message}
                  </div>
                </div>

                <div style={{ background: '#0b1120', padding: '16px', borderRadius: '12px', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: '#64748b' }}>Reference ID:</span>
                    <span style={{ color: '#818cf8', fontWeight: 700 }}>{result.referenceId}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: '#64748b' }}>Timestamp:</span>
                    <span style={{ color: '#cbd5e1' }}>{new Date(result.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: '#64748b' }}>Sender:</span>
                    <span style={{ color: '#cbd5e1' }}>{result.data.name} ({result.data.email})</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Category:</span>
                    <span className="badge badge-purple">{result.data.category}</span>
                  </div>
                </div>

                <button
                  onClick={() => setResult(null)}
                  className="btn-secondary"
                  style={{ fontSize: '0.85rem', padding: '8px 14px' }}
                >
                  Clear Status
                </button>
              </div>
            ) : (
              <div style={{ color: '#64748b', fontSize: '0.9rem', textAlign: 'center', padding: '30px 10px' }}>
                <i className="fa-solid fa-satellite-dish" style={{ fontSize: '2rem', marginBottom: '10px', color: '#475569' }}></i>
                <p>Submit the form to witness real-time Next.js API Route Handler response payloads.</p>
              </div>
            )}
          </div>

          {/* Technical Info Box */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#818cf8', marginBottom: '10px' }}>
              🛠️ Technical Concepts Demonstrated
            </h4>
            <ul style={{ fontSize: '0.85rem', color: '#94a3b8', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>App Router Route Handler (<code>app/api/contact/route.js</code>).</li>
              <li>HTTP POST body parsing using <code>request.json()</code>.</li>
              <li>Input sanitation and status code handling (400 vs 200).</li>
              <li>Controlled form state and async dispatch via <code>fetch()</code>.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
