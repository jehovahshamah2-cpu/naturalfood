import { LANGUAGES } from '../data/constants';

export default function LanguageSelector({ current, onSelect, onClose }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center',
      alignItems: 'center', zIndex: 1000
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: 16, padding: 20, maxHeight: '80%',
        overflowY: 'auto', width: 320
      }} onClick={e => e.stopPropagation()}>
        <h3 style={{ margin: '0 0 12px', color: '#166534' }}>Select Language</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {LANGUAGES.slice(0, 15).map(lang => (
            <div
              key={lang.code}
              onClick={() => onSelect(lang.code)}
              style={{
                padding: '8px 12px', borderRadius: 8, cursor: 'pointer',
                background: current === lang.code ? '#e0f2fe' : 'transparent',
                fontWeight: current === lang.code ? 'bold' : 'normal',
                display: 'flex', alignItems: 'center', gap: 10,
                transition: 'background 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
              onMouseLeave={e => {
                if (current !== lang.code) e.currentTarget.style.background = 'transparent';
              }}
            >
              <span style={{ fontSize: 20 }}>{lang.flag}</span>
              <span>{lang.name}</span>
              {current === lang.code && <span style={{ marginLeft: 'auto' }}>✓</span>}
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          style={{
            marginTop: 16, width: '100%', border: 'none', background: '#e5e7eb',
            color: '#374151', padding: '10px', borderRadius: 12, cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}