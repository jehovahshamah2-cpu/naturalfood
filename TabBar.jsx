import { TABS } from '../data/constants';
import { t } from '../data/helpers';

export default function TabBar({ active, onTabChange, uiLang }) {
  // Vichupo vinavyoonekana kwenye safu ya juu
  // Tunachuja kutoonyesha AI Analysis (ni kipengele kwenye ukurasa wake)
  const visibleTabs = TABS.filter(tab => tab.id !== 'ai-analysis');

  return (
    <div style={{
      display: 'flex',
      overflowX: 'auto',
      gap: 6,
      padding: '6px 0',
      borderBottom: '1px solid #e5e7eb',
      marginBottom: 10,
      WebkitOverflowScrolling: 'touch'
    }}>
      {visibleTabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            border: 'none',
            background: active === tab.id ? '#166534' : 'transparent',
            color: active === tab.id ? '#fff' : '#374151',
            padding: '6px 14px',
            borderRadius: 20,
            fontWeight: 'bold',
            fontSize: 13,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'background 0.2s, color 0.2s'
          }}
        >
          <span>{tab.icon}</span>
          <span>{t(uiLang, tab.labelKey) || tab.label}</span>
        </button>
      ))}
    </div>
  );
}