import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CREATE_TYPES, CATEGORY_GUIDE } from '../data/constants';
import { t } from '../data/helpers';

export default function CreatePostForm({ onClose, onSubmit, uiLang }) {
  const { accessToken } = useAuth();
  const [step, setStep] = useState(1);
  const [type, setType] = useState('Recipe');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const guide = CATEGORY_GUIDE[type] || {};

  const handleSubmit = async () => {
    if (!title.trim() || !body.trim()) {
      setError('Title and body are required.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          title: title.trim(),
          body: body.trim(),
          tag: type,
          category: CATEGORY_GUIDE[type]?.icon ? type.toLowerCase().replace(/\s+/g, '_') : 'tip'
        })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create post');
      }
      const newPost = await res.json();
      onSubmit(newPost);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center',
      alignItems: 'center', zIndex: 1000
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: 16, padding: 24, width: '90%', maxWidth: 500,
        maxHeight: '80%', overflowY: 'auto'
      }} onClick={e => e.stopPropagation()}>

        {step === 1 && (
          <>
            <h3 style={{ margin: '0 0 16px', color: '#166534' }}>
              {t(uiLang, 'newPost')} — Choose a Category
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {CREATE_TYPES.map(tp => (
                <button
                  key={tp}
                  onClick={() => { setType(tp); setStep(2); }}
                  style={{
                    padding: '10px 18px', border: 'none', borderRadius: 24,
                    background: type === tp ? '#166534' : '#f3f4f6',
                    color: type === tp ? '#fff' : '#374151',
                    cursor: 'pointer', fontWeight: 'bold', fontSize: 14,
                    display: 'flex', alignItems: 'center', gap: 6
                  }}
                >
                  <span>{CATEGORY_GUIDE[tp]?.icon || '📝'}</span>
                  {tp}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span style={{ fontSize: 24 }}>{guide.icon || '📝'}</span>
              <h3 style={{ margin: 0, color: '#166534' }}>{type}</h3>
            </div>
            <p style={{ color: '#6B7280', fontSize: 14, margin: '0 0 16px' }}>{guide.hint}</p>

            <div style={{ marginBottom: 12 }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 4 }}>
                {t(uiLang, 'title')}
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder={guide.titlePlaceholder || t(uiLang, 'title')}
                style={{
                  width: '100%', padding: 10, borderRadius: 12,
                  border: '1px solid #d1d5db', fontSize: 14, fontFamily: 'Georgia, serif',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 4 }}>
                {t(uiLang, 'yourStory')}
              </label>
              <textarea
                value={body}
                onChange={e => setBody(e.target.value)}
                placeholder={guide.bodyPlaceholder || t(uiLang, 'yourStory')}
                rows={5}
                style={{
                  width: '100%', padding: 10, borderRadius: 12,
                  border: '1px solid #d1d5db', fontSize: 14,
                  fontFamily: 'Georgia, serif', resize: 'vertical',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {error && (
              <p style={{ color: '#DC2626', fontSize: 13, margin: '0 0 12px' }}>{error}</p>
            )}

            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  border: 'none', background: '#e5e7eb', color: '#374151',
                  padding: '8px 20px', borderRadius: 20, cursor: 'pointer', fontWeight: 'bold'
                }}
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  border: 'none', background: '#166534', color: '#fff',
                  padding: '8px 24px', borderRadius: 20, cursor: 'pointer', fontWeight: 'bold',
                  opacity: loading ? 0.6 : 1
                }}
              >
                {loading ? 'Posting...' : t(uiLang, 'share')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}