const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const translate = require('translate');

// Pakia tafsiri za ndani kutoka translations.json
const TRANSLATIONS_FILE = path.join(__dirname, '..', 'data', 'translations.json');

const loadLocalTranslations = () => {
  try {
    const raw = fs.readFileSync(TRANSLATIONS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

// Tafsiri post moja – inatumia translate package (bure)
router.post('/', async (req, res) => {
  try {
    const { title, body, targetLang } = req.body;
    if (!title || !body || !targetLang) {
      return res.status(400).json({ error: 'Missing title, body, or targetLang' });
    }

    // Ikiwa tayari ni Kiingereza, hakuna haja ya kutafsiri
    if (targetLang === 'en') {
      return res.json({ title, body });
    }

    // 1. Angalia kama tafsiri ipo kwenye data ya ndani
    const localTranslations = loadLocalTranslations();
    // Tunahitaji post id – kwa kuwa hatuna kwenye ombi hili, tutaruka ukaguzi wa ndani kwa sasa
    // Ila unaweza kutuma pia postId kwenye body ili uangalie.

    // 2. Tumia translate package (Google Translate – bure, lakini inaweza kuwa na vikwazo)
    try {
      // Weka lugha ya kuingiza (Kiingereza kwa default)
      translate.engine = 'google'; // chaguo: google, deepl, libre
      translate.from = 'en';

      const translatedTitle = await translate(title, { to: targetLang });
      const translatedBody = await translate(body, { to: targetLang });

      return res.json({
        title: translatedTitle,
        body: translatedBody
      });
    } catch (translateErr) {
      // Ikiwa tafsiri ya nje imeshindwa, rudisha Kiingereza
      console.warn('External translation failed, returning original:', translateErr.message);
      return res.json({
        title,
        body,
        note: 'Translation service unavailable. Showing original English.'
      });
    }
  } catch (err) {
    console.error('Translate route error:', err);
    res.status(500).json({
      title: req.body?.title || '',
      body: req.body?.body || '',
      error: 'Translation failed, showing original text.'
    });
  }
});

module.exports = router;