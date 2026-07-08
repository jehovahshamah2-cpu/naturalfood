import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function PostCard({
  post, uiLang, postLang, translatedCache,
  onLike, onSave, onBookmark, onRepost,
  onTranslate, onOpenShare, onOpenComment,
  onAuthorClick, onSubscribeToUser
}) {
  const { user } = useAuth();
  const [showFull, setShowFull] = useState(false);
  const trans = translatedCache?.[`${post.id}-${postLang}`];
  const title = (postLang !== 'en' && trans) ? trans.title : post.title;
  const body  = (postLang !== 'en' && trans) ? trans.body : post.body;
  const isOwn = user && user.uid === post.userId;
  const canSubscribe = post.followers >= 500_000 && user && !isOwn;

  return (
    <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', padding: 16, marginBottom: 16 }}>
      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => onAuthorClick(post.author)}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: post.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginRight: 10 }}>{post.avatar}</div>
        <div style={{ flex: 1 }}>
          <strong>{post.author}</strong>
          <span style={{ color: '#888', marginLeft: 6, fontSize: 13 }}>{post.handle}</span>
          <div style={{ fontSize: 12, color: '#aaa' }}>{post.time}</div>
        </div>
        {canSubscribe && (
          <button onClick={onSubscribeToUser} style={{ border: 'none', background: '#166534', color: '#fff', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 'bold', cursor: 'pointer' }}>
            Subscribe 0.1π
          </button>
        )}
      </div>

      {/* Tag */}
      <div style={{ display: 'inline-block', margin: '10px 0', padding: '2px 10px', borderRadius: 12, background: post.tagColor, color: '#fff', fontSize: 12, fontWeight: 'bold' }}>{post.tag?.toUpperCase()}</div>

      {/* Image */}
      <div style={{ height: 180, borderRadius: 12, margin: '10px 0', background: post.imageBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 50 }}>{post.image}</div>

      <h2 style={{ margin: 0, fontSize: 20 }}>{title}</h2>
      <p style={{ lineHeight: 1.6, color: '#333' }}>
        {showFull ? body : body.substring(0, 120) + (body.length > 120 ? '...' : '')}
        {body.length > 120 && (
          <button onClick={() => setShowFull(!showFull)} style={{ border: 'none', background: 'none', color: '#0E7490', cursor: 'pointer', marginLeft: 4 }}>{showFull ? 'Less' : 'More'}</button>
        )}
      </p>

      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
        <Btn icon={post.liked ? '❤️' : '🤍'} label={post.likes} onClick={onLike} />
        <Btn icon="💬" label={post.comments} onClick={onOpenComment} />
        <Btn icon={post.saved ? '🔖' : '📄'} label="Save" onClick={onSave} />
        <Btn icon={post.bookmarked ? '🔖' : '📌'} onClick={onBookmark} />
        <Btn icon={post.reposted ? '🔄' : '🔁'} label={post.reposts} onClick={onRepost} />
        <Btn icon="🌐" onClick={onTranslate} />
        <Btn icon="↗️" label="Share" onClick={onOpenShare} />
      </div>
    </div>
  );
}

function Btn({ icon, label, onClick }) {
  return <button onClick={onClick} style={{ border: 'none', background: 'transparent', fontSize: 15, cursor: 'pointer', color: '#555', display: 'flex', alignItems: 'center', gap: 4 }}>{icon} {label}</button>;
}