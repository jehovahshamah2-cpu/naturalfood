import { useState, useEffect, useMemo } from 'react';
import { useAuth } from './context/AuthContext';
import { usePosts } from './hooks/usePosts';
import { useFilters } from './hooks/useFilters';
import { usePayments } from './hooks/usePayments';
import TabBar from './components/TabBar';
import PostCard from './components/PostCard';
import CreatePostForm from './components/CreatePostForm';
import CommentSection from './components/CommentSection';
import ProfileView from './components/ProfileView';
import LanguageSelector from './components/LanguageSelector';
import AIAnalysis from './components/AIAnalysis';
import { INIT_POSTS, CATEGORIES, TABS } from './data/constants';
import { t } from './data/helpers';

export default function App() {
  // Mfumo wa hali za jumla
  const { user, accessToken, loading: authLoading, signIn, signOut } = useAuth();
  const { posts, toggleAction, addPost } = usePosts(INIT_POSTS, accessToken);
  const { buyPremium, subscribeToUser } = usePayments();

  const [activeTab, setActiveTab] = useState('feed');
  const [globalLang, setGlobalLang] = useState('en');
  const [showCreate, setShowCreate] = useState(false);
  const [openComment, setOpenComment] = useState(null);
  const [viewingProfileOf, setViewingProfileOf] = useState(null);
  const [premiumActive, setPremiumActive] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [filters, setFilters] = useState({
    activeCategory: 'all',
    activeRecipeAge: 'all', activeRecipeTime: 'all',
    activeRemedyAge: 'all', activeRemedyTime: 'all',
    activeNutritionAge: 'all',
    activeFertilityGender: 'all',
    activeCosmeticsCategory: 'cos_all',
    activeMavaziType: 'all', activeMavaziGender: 'all', activeMavaziOccasion: 'all'
  });
  const [showLangPicker, setShowLangPicker] = useState(null);
  const [postLangs, setPostLangs] = useState({});
  const [translatedPostCache, setTranslatedPostCache] = useState({});
  const [shareToast, setShareToast] = useState(null);

  // Idadi ya watumiaji kutoka backend (mfano)
  useEffect(() => {
    // Badilisha na endpoint halisi
    setUserCount(500000);
  }, []);

  const isPremiumAvailable = userCount >= 1_000_000;

  // Chuja posta
  const filteredPosts = useFilters(posts, activeTab, filters);

  // Shughuli za posta
  const handleLike = (id) => toggleAction(id, 'like');
  const handleSave = (id) => toggleAction(id, 'save');
  const handleBookmark = (id) => toggleAction(id, 'bookmark');
  const handleRepost = (id) => toggleAction(id, 'repost');

  const handleTranslate = async (post) => {
    const lang = postLangs[post.id] || globalLang;
    if (lang === 'en') return;
    const cacheKey = `${post.id}-${lang}`;
    if (translatedPostCache[cacheKey]) return;
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: post.title, body: post.body, targetLang: lang })
      });
      if (res.ok) {
        const data = await res.json();
        setTranslatedPostCache(prev => ({ ...prev, [cacheKey]: data }));
      }
    } catch (err) { console.error(err); }
  };

  const handleBuyPremium = async () => {
    try {
      await buyPremium();
      setPremiumActive(true);
    } catch (err) {
      alert('Payment failed: ' + err.message);
    }
  };

  const handleSubscribeToUser = async (username, uid) => {
    try {
      await subscribeToUser(username, uid);
    } catch (err) {
      alert('Payment failed: ' + err.message);
    }
  };

  if (authLoading) return <div style={{ padding: 20 }}>Loading Pi SDK...</div>;

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', fontFamily: 'Georgia, serif', padding: 10, paddingBottom: 80 }}>
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, color: '#166534' }}>{t(globalLang, 'appName')}</h1>
          <p style={{ margin: 0, fontSize: 12, color: '#6B8E4E' }}>{t(globalLang, 'tagline')}</p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button onClick={() => setShowLangPicker('global')} style={iconBtn}>🌐</button>
          {user ? (
            <>
              <span>@{user.username}</span>
              <button onClick={signOut} style={smallBtn}>Sign out</button>
            </>
          ) : (
            <button onClick={signIn} style={signInBtn}>Sign in with Pi</button>
          )}
        </div>
      </div>

      <TabBar active={activeTab} onTabChange={setActiveTab} uiLang={globalLang} />

      {/* Language picker */}
      {showLangPicker === 'global' && (
        <LanguageSelector current={globalLang} onSelect={(c) => { setGlobalLang(c); setShowLangPicker(null); }} onClose={() => setShowLangPicker(null)} />
      )}

      {/* Premium banner */}
      {activeTab === 'feed' && !premiumActive && isPremiumAvailable && (
        <div style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', padding: 12, borderRadius: 12, margin: '10px 0', textAlign: 'center', color: '#fff' }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>Unlock Premium Content for 0.5 Pi!</p>
          <button onClick={handleBuyPremium} style={{ marginTop: 8, background: '#166534', color: '#fff', border: 'none', padding: '8px 24px', borderRadius: 20, cursor: 'pointer', fontWeight: 'bold' }}>
            Subscribe Now – 0.5π
          </button>
        </div>
      )}

      {/* Feed content */}
      {activeTab === 'feed' && (
        <>
          <div style={{ display: 'flex', overflowX: 'auto', gap: 6, margin: '10px 0' }}>
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => setFilters(f => ({ ...f, activeCategory: cat.id }))}
                style={{
                  padding: '4px 12px', borderRadius: 20, border: 'none',
                  background: filters.activeCategory === cat.id ? '#166534' : '#e5e7eb',
                  color: filters.activeCategory === cat.id ? '#fff' : '#333',
                  fontWeight: 'bold', fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap'
                }}>
                {cat.label}
              </button>
            ))}
          </div>
          {filteredPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              uiLang={globalLang}
              postLang={postLangs[post.id] || globalLang}
              translatedCache={translatedPostCache}
              onLike={() => handleLike(post.id)}
              onSave={() => handleSave(post.id)}
              onBookmark={() => handleBookmark(post.id)}
              onRepost={() => handleRepost(post.id)}
              onTranslate={() => { setShowLangPicker(post.id); handleTranslate(post); }}
              onOpenShare={() => setShareToast('Link copied!')}
              onOpenComment={() => setOpenComment(post.id)}
              onAuthorClick={(author) => setViewingProfileOf({ username: author, uid: post.userId })}
              onSubscribeToUser={() => {
                if (post.followers >= 500000) handleSubscribeToUser(post.author, post.userId);
              }}
            />
          ))}
        </>
      )}

      {activeTab === 'ai-analysis' && <AIAnalysis uiLang={globalLang} />}

      {/* FAB */}
      {user && (
        <button onClick={() => setShowCreate(true)} style={fabStyle}>＋</button>
      )}

      {/* Modals */}
      {openComment !== null && <CommentSection postId={openComment} comments={[]} onClose={() => setOpenComment(null)} uiLang={globalLang} />}
      {showCreate && <CreatePostForm onClose={() => setShowCreate(false)} onSubmit={() => { setShowCreate(false); addPost(); }} uiLang={globalLang} />}
      {viewingProfileOf && <ProfileView viewingUser={viewingProfileOf} onClose={() => setViewingProfileOf(null)} uiLang={globalLang} />}
      {showLangPicker && typeof showLangPicker === 'number' && (
        <LanguageSelector
          current={postLangs[showLangPicker] || globalLang}
          onSelect={(c) => { setPostLangs(prev => ({ ...prev, [showLangPicker]: c })); setShowLangPicker(null); }}
          onClose={() => setShowLangPicker(null)}
        />
      )}
      {shareToast && <div style={toastStyle}>{shareToast}</div>}
    </div>
  );
}

// Styling
const iconBtn = { border: 'none', background: 'transparent', fontSize: 20, cursor: 'pointer' };
const smallBtn = { border: 'none', background: '#eee', borderRadius: 12, padding: '4px 12px', cursor: 'pointer' };
const signInBtn = { border: 'none', background: '#166534', color: '#fff', borderRadius: 12, padding: '8px 16px', cursor: 'pointer' };
const fabStyle = { position: 'fixed', bottom: 30, right: 30, width: 56, height: 56, borderRadius: '50%', background: '#166534', color: '#fff', border: 'none', fontSize: 24, cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' };
const toastStyle = { position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', background: '#333', color: '#fff', padding: '8px 16px', borderRadius: 20 };