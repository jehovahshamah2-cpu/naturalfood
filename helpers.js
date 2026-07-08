// =============================================================================
// helpers.js – Misaada ya tafsiri na maandishi
// =============================================================================

import { LANGUAGES, TRANSLATIONS, UI_STRINGS } from './constants';

/**
 * Inatafuta tafsiri ya posta kutoka kwenye akiba ya ndani au TRANSLATIONS.
 * @param {object} post - Posta yenye title na body
 * @param {string} lang - Lugha lengwa (mf. 'sw', 'fr')
 * @param {object} cache - Akiba ya tafsiri zilizofanywa na AI (hiari)
 * @returns {object} { title, body }
 */
export const getTranslated = (post, lang, cache = {}) => {
  if (lang === "en") return { title: post.title, body: post.body };
  const cacheKey = `${post.id}-${lang}`;
  if (cache && cache[cacheKey]) return cache[cacheKey];
  if (TRANSLATIONS[lang] && TRANSLATIONS[lang][post.id]) return TRANSLATIONS[lang][post.id];
  return { title: post.title, body: post.body };
};

/**
 * Inatafsiri maandishi ya maoni kwa kutumia jina la lugha kama kiambishi awali.
 * @param {string} text - Maandishi asilia ya maoni
 * @param {string} lang - Lugha lengwa
 * @returns {string} Maandishi yaliyotafsiriwa (kwa sasa, kiambishi awali tu)
 */
export const getTranslatedComment = (text, lang) => {
  if (lang === "en") return text;
  const langName = LANGUAGES.find(l => l.code === lang)?.name || lang;
  return `[${langName}] ${text}`;
};

/**
 * Inarudisha maandishi yaliyotafsiriwa ya UI kufuatana na lugha.
 * Ikiwa hakuna tafsiri, inarudisha Kiingereza.
 * @param {string} lang - Lugha (mf. 'sw', 'fr')
 * @param {string} key - Ufunguo wa maandishi (mf. 'feed', 'share')
 * @returns {string} Maandishi yaliyotafsiriwa
 */
export const t = (lang, key) => {
  const dict = UI_STRINGS[lang] || UI_STRINGS.en;
  return dict[key] ?? UI_STRINGS.en[key] ?? key;
};