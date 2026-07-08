import { useAuth } from '../context/AuthContext';
import { t } from '../data/helpers';

export default function ProfileView({ viewingUser, onClose, uiLang }) {
  const { user: currentUser } = useAuth();
  const profileUser = viewingUser || currentUser;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center',
      alignItems: 'center', zIndex: 1000
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: 16, padding: 24, width: '90%', maxWidth: 400,
        maxHeight: '80%', overflowY: 'auto', textAlign: 'center'
      }} onClick={e => e.stopPropagation()}>
        {profileUser ? (
          <>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'linear-gradient(135deg, #166534, #4ADE80)',
              margin: '0 auto 12px', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 40, color: '#fff'
            }}>
              {profileUser.username?.charAt(0).toUpperCase() || '👤'}
            </div>
            <h3 style={{ margin: '0 0 4px', color: '#166534' }}>
              @{profileUser.username}
            </h3>
            <p style={{ color: '#6B7280', fontSize: 14 }}>
              {t(uiLang, 'profile')}
            </p>
            <div style={{
              margin: '16px 0', padding: 12, background: '#f0fdf4',
              borderRadius: 12, fontSize: 14
            }}>
              <p style={{ margin: 0 }}>
                {viewingUser
                  ? `Viewing ${profileUser.username}'s posts`
                  : 'This is your profile'}
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                border: 'none', background: '#166534', color: '#fff',
                padding: '8px 24px', borderRadius: 20, cursor: 'pointer', fontWeight: 'bold'
              }}
            >
              Close
            </button>
          </>
        ) : (
          <>
            <h3 style={{ color: '#166534' }}>{t(uiLang, 'profile')}</h3>
            <p style={{ color: '#6B7280' }}>Please sign in to view your profile.</p>
            <button
              onClick={onClose}
              style={{
                marginTop: 12, border: 'none', background: '#166534', color: '#fff',
                padding: '8px 24px', borderRadius: 20, cursor: 'pointer', fontWeight: 'bold'
              }}
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}