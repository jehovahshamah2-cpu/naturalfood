import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { t, getTranslatedComment } from '../data/helpers';

export default function CommentSection({ postId, comments, onClose, uiLang }) {
  const { user, accessToken } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!newComment.trim() || !accessToken) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/comments/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ text: newComment })
      });
      if (res.ok) {
        setNewComment('');
        onClose();
      }
    } catch (err) {
      console.error('Failed to post comment', err);
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
        background: '#fff', borderRadius: 16, padding: 20, width: '90%', maxWidth: 500,
        maxHeight: '80%', overflowY: 'auto'
      }} onClick={e => e.stopPropagation()}>
        <h3 style={{ marginTop: 0 }}>{t(uiLang, 'comment')}</h3>

        {/* Orodha ya maoni */}
        {(comments || []).length === 0 && (
          <p style={{ color: '#888', textAlign: 'center' }}>No comments yet. Be the first!</p>
        )}
        {(comments || []).map(c => (
          <div key={c.id} style={{
            borderBottom: '1px solid #eee', padding: '10px 0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', background: '#e5e7eb',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16
              }}>
                {c.avatar || '👤'}
              </div>
              <div>
                <strong>{c.user}</strong>
                <p style={{ margin: '2px 0 0', color: '#555' }}>{c.text}</p>
              </div>
            </div>
            {/* Replies zinaweza kuongezwa hapa kwa siku zijazo */}
          </div>
        ))}

        {/* Fomu ya kuongeza maoni */}
        {user && (
          <div style={{ marginTop: 16 }}>
            <textarea
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder={t(uiLang, 'addThoughts')}
              rows={3}
              style={{
                width: '100%', padding: 10, borderRadius: 12, border: '1px solid #d1d5db',
                fontFamily: 'Georgia, serif', fontSize: 14, resize: 'vertical'
              }}
            />
            <button
              onClick={handleSubmit}
              disabled={loading || !newComment.trim()}
              style={{
                marginTop: 8, background: '#166534', color: '#fff', border: 'none',
                padding: '8px 20px', borderRadius: 20, cursor: 'pointer', fontWeight: 'bold',
                opacity: loading ? 0.6 : 1
              }}
            >
              {loading ? '...' : t(uiLang, 'share')}
            </button>
          </div>
        )}

        {!user && (
          <p style={{ color: '#888', textAlign: 'center', marginTop: 12 }}>
            Sign in to comment.
          </p>
        )}
      </div>
    </div>
  );
}