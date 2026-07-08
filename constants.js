// =============================================================================
// constants.js – Data zote za kudumu za "Feed the World"
// =============================================================================

// 200+ world languages — used both for the UI language picker (top-left of the app,
// sets the language of every button/label) and the per-post Translate picker
// (translates one post's content). Languages with a real dictionary entry in
// UI_STRINGS below render fully translated UI text; all others safely fall back
// to English until their translation is added.
export const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "sw", name: "Swahili", flag: "🇹🇿" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "pt", name: "Portuguese", flag: "🇧🇷" },
  { code: "ha", name: "Hausa", flag: "🇳🇬" },
  { code: "yo", name: "Yoruba", flag: "🇳🇬" },
  { code: "ig", name: "Igbo", flag: "🇳🇬" },
  { code: "am", name: "Amharic", flag: "🇪🇹" },
  { code: "so", name: "Somali", flag: "🇸🇴" },
  { code: "zu", name: "Zulu", flag: "🇿🇦" },
  { code: "xh", name: "Xhosa", flag: "🇿🇦" },
  { code: "af", name: "Afrikaans", flag: "🇿🇦" },
  { code: "rw", name: "Kinyarwanda", flag: "🇷🇼" },
  { code: "rn", name: "Kirundi", flag: "🇧🇮" },
  { code: "ln", name: "Lingala", flag: "🇨🇩" },
  { code: "lg", name: "Luganda", flag: "🇺🇬" },
  { code: "ny", name: "Chichewa", flag: "🇲🇼" },
  { code: "sn", name: "Shona", flag: "🇿🇼" },
  { code: "st", name: "Sesotho", flag: "🇱🇸" },
  { code: "tn", name: "Setswana", flag: "🇧🇼" },
  { code: "ts", name: "Tsonga", flag: "🇿🇦" },
  { code: "ve", name: "Venda", flag: "🇿🇦" },
  { code: "wo", name: "Wolof", flag: "🇸🇳" },
  { code: "ff", name: "Fula", flag: "🇸🇳" },
  { code: "bm", name: "Bambara", flag: "🇲🇱" },
  { code: "ti", name: "Tigrinya", flag: "🇪🇷" },
  { code: "om", name: "Oromo", flag: "🇪🇹" },
  { code: "mg", name: "Malagasy", flag: "🇲🇬" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", flag: "🇧🇩" },
  { code: "ur", name: "Urdu", flag: "🇵🇰" },
  { code: "ta", name: "Tamil", flag: "🇮🇳" },
  { code: "te", name: "Telugu", flag: "🇮🇳" },
  { code: "ml", name: "Malayalam", flag: "🇮🇳" },
  { code: "kn", name: "Kannada", flag: "🇮🇳" },
  { code: "gu", name: "Gujarati", flag: "🇮🇳" },
  { code: "mr", name: "Marathi", flag: "🇮🇳" },
  { code: "pa", name: "Punjabi", flag: "🇮🇳" },
  { code: "or", name: "Odia", flag: "🇮🇳" },
  { code: "ne", name: "Nepali", flag: "🇳🇵" },
  { code: "si", name: "Sinhala", flag: "🇱🇰" },
  { code: "zh", name: "Chinese (Simplified)", flag: "🇨🇳" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "nl", name: "Dutch", flag: "🇳🇱" },
  { code: "pl", name: "Polish", flag: "🇵🇱" },
  { code: "tr", name: "Turkish", flag: "🇹🇷" },
  { code: "vi", name: "Vietnamese", flag: "🇻🇳" },
  { code: "th", name: "Thai", flag: "🇹🇭" },
  { code: "id", name: "Indonesian", flag: "🇮🇩" },
  { code: "ms", name: "Malay", flag: "🇲🇾" },
  { code: "tl", name: "Filipino", flag: "🇵🇭" }
];

// Simple translations for demo (title + body per lang) for a few posts
export const TRANSLATIONS = {
  sw: {
    1: { title: "Uji wa Moringa na Mtama", body: "Kila asubuhi bibi yangu alitutengenezea hii. Majani ya moringa yaliyokaushwa kivulini, yaliyosagwa na mtama na tangawizi kidogo. Ongeza maji ya moto, koroga polepole. Iliwasha watoto saba na kutuweka imara msimu wote. Siri ni subira — kamwe usifanye haraka kukoroga." },
    2: { title: "Bizari & Pilipili Nyeusi kwa Maumivu ya Viungo", body: "Changanya kijiko ½ cha bizari na pilipili nyeusi kidogo katika maziwa ya nazi ya joto kila jioni. Piperine katika pilipili huongeza uingizaji wa curcumin kwa 2000%. Wagonjwa wangu wanaojaribu hii kwa siku 30 huripoti ugumu mdogo. Dawa za jadi zilijua hili daima — sayansi imekuja kuchelewa." },
    3: { title: "Kula na Msimu, Pona na Dunia", body: "Kiangazi: matango, tikiti, na peremende — vyakula vya kupoza. Baridi: mboga za mizizi, viungo vya kupasha joto, mchuzi wa mifupa. Miili yetu inajua mdundo huu. Kula kwa msimu si mtindo, ni jinsi wanadamu walivyoishi kwa maelfu ya miaka." },
    4: { title: "Mzizi wa Shatavari kwa Afya ya Wanawake", body: "Unatumiwa katika Ayurveda kwa zaidi ya miaka 4,000, Shatavari inamaanisha 'yeye aliye na waume mia' — ushahidi wa nguvu zake kwa uhai wa kike. Nilianza ibada ndogo ya chai kila asubuhi: kijiko 1 cha unga wa shatavari katika maziwa ya shayiri na iliki." },
    5: { title: "Dawa ya Mwerezi: Mafunzo", body: "Mwerezi umekuwa dawa yetu kwa vizazi. Tunaichoma kusafisha hewa, tunaloweka majani kwa mafua ya kifua, tunafunga vifurushi mlangoni. Wazee wanasema mwerezi unakumbuka anachojua ardhi. Weka mkono mdogo wa mwerezi katika maji yanayochemka, funika kichwa chako na kitambaa, na pumua kwa dakika kumi." }
  },
  fr: {
    1: { title: "Bouillie de Moringa et Millet", body: "Chaque matin, ma grand-mère nous préparait ceci. Des feuilles de moringa séchées à l'ombre, moulues avec du millet et un peu de gingembre. Ajoutez de l'eau chaude, remuez lentement. Elle a nourri sept enfants et nous a gardés forts toute la saison. Le secret est la patience — ne jamais se précipiter." },
    2: { title: "Curcuma et Poivre Noir pour les Douleurs Articulaires", body: "Mélangez ½ cuillère à café de curcuma avec une pincée de poivre noir dans du lait de coco chaud chaque soir. La pipérine dans le poivre augmente l'absorption de la curcumine de 2000%. La médecine traditionnelle le savait toujours — la science a juste rattrapé son retard." },
    3: { title: "Mangez avec les Saisons, Guérissez avec la Terre", body: "En été: concombres, pastèque, menthe — aliments rafraîchissants. En hiver: légumes racines, épices chauffantes, bouillons d'os. Nos corps connaissent ce rythme. Manger selon les saisons n'est pas une tendance, c'est la façon dont les humains ont survécu pendant des millénaires." },
    4: { title: "Racine de Shatavari pour la Santé Féminine", body: "Utilisé en Ayurveda depuis plus de 4 000 ans, le Shatavari signifie 'celle qui a cent maris' — un témoignage de son pouvoir pour la vitalité féminine. J'ai commencé un petit rituel de thé chaque matin: 1 cuillère à café de poudre de shatavari dans du lait d'avoine chaud avec de la cardamome." },
    5: { title: "Médecine du Cèdre: Un Enseignement", body: "Le cèdre est notre médecine depuis des générations. Nous le brûlons pour purifier l'air, nous trempons les feuilles pour les rhumes de poitrine, nous attachons des fagots à la porte. Les anciens disent que le cèdre se souvient de ce que la terre sait." }
  }
};

// UI text dictionary — full translations for the app's core vocabulary (buttons, tabs, labels).
// Any language code not listed here, or any key missing within a listed language, safely falls
// back to English rather than showing a blank or broken string.
export const UI_STRINGS = {
  en: {
    appName: "Feed the World", tagline: "Traditional wisdom, shared with love",
    feed: "Feed", recipes: "Recipes", remedies: "Remedies", nutrition: "Nutrition", fertility: "Fertility",
    naturalTips: "Natural Tips", saved: "Saved", modernMedicine: "Modern Medicine", naturalCosmetics: "Natural Cosmetics",
    aiAnalysis: "AI Ingredient Analysis", analyzeFood: "Analyze Food", reels: "Reels", mavazi: "Clothing",
    all: "All", kids: "Kids", adults: "Adults", everyone: "Everyone", anyTime: "Any Time",
    morning: "Morning", afternoon: "Afternoon", evening: "Evening",
    share: "Share", post: "Post", postVideo: "Post Video", save: "Save", saved2: "Saved",
    like: "Like", comment: "Comment", bookmark: "Bookmark", repost: "Repost", edit: "Edit",
    follow: "Follow", following: "Following", message: "Message", translatePost: "Translate Post",
    readMore: "Read more", backToPost: "Back to Post", backToFeed: "Back to Feed",
    shareWithCommunity: "Share with the Community", saveChanges: "Save Changes",
    yourStory: "Your Story", title: "Title", profile: "Profile", myPosts: "My Posts",
    bookmarked: "Bookmarked", reposted: "Reposted", locked: "Locked", messages: "Messages",
    viewFullProfile: "View Full Profile", newPost: "New Post", addThoughts: "Add your thoughts...",
  },
  sw: {
    appName: "Lisha Dunia", tagline: "Hekima ya jadi, inayoshirikiwa kwa upendo",
    feed: "Mlisho", recipes: "Mapishi", remedies: "Dawa za Asili", nutrition: "Lishe", fertility: "Uzazi",
    naturalTips: "Vidokezo vya Asili", saved: "Vilivyohifadhiwa", modernMedicine: "Tiba ya Kisasa", naturalCosmetics: "Urembo wa Asili",
    aiAnalysis: "Uchambuzi wa Vyakula (AI)", analyzeFood: "Chambua Chakula", reels: "Reels", mavazi: "Mavazi",
    all: "Vyote", kids: "Watoto", adults: "Wakubwa", everyone: "Kila Mtu", anyTime: "Wakati Wowote",
    morning: "Asubuhi", afternoon: "Mchana", evening: "Jioni",
    share: "Shiriki", post: "Tuma", postVideo: "Tuma Video", save: "Hifadhi", saved2: "Imehifadhiwa",
    like: "Penda", comment: "Maoni", bookmark: "Alama", repost: "Sambaza Tena", edit: "Hariri",
    follow: "Fuata", following: "Unamfuata", message: "Tuma Ujumbe", translatePost: "Tafsiri Chapisho",
    readMore: "Soma zaidi", backToPost: "Rudi kwenye Chapisho", backToFeed: "Rudi kwenye Mlisho",
    shareWithCommunity: "Shiriki na Jumuiya", saveChanges: "Hifadhi Mabadiliko",
    yourStory: "Hadithi Yako", title: "Kichwa", profile: "Wasifu", myPosts: "Machapisho Yangu",
    bookmarked: "Yaliyowekwa Alama", reposted: "Yaliyosambazwa", locked: "Yaliyofungwa", messages: "Ujumbe",
    viewFullProfile: "Tazama Wasifu Kamili", newPost: "Chapisho Jipya", addThoughts: "Andika mawazo yako...",
  },
  fr: {
    appName: "Nourrir le Monde", tagline: "Sagesse traditionnelle, partagée avec amour",
    feed: "Fil", recipes: "Recettes", remedies: "Remèdes", nutrition: "Nutrition", fertility: "Fertilité",
    naturalTips: "Astuces Naturelles", saved: "Enregistrés", modernMedicine: "Médecine Moderne", naturalCosmetics: "Cosmétiques Naturels",
    all: "Tous", kids: "Enfants", adults: "Adultes", everyone: "Tout le monde", anyTime: "À tout moment",
    morning: "Matin", afternoon: "Après-midi", evening: "Soir",
    share: "Partager", post: "Publier", postVideo: "Publier une Vidéo", save: "Enregistrer", saved2: "Enregistré",
    like: "J'aime", comment: "Commenter", bookmark: "Marquer", repost: "Repartager", edit: "Modifier",
    follow: "Suivre", following: "Abonné", message: "Message", translatePost: "Traduire le Post",
    readMore: "Lire plus", backToPost: "Retour au Post", backToFeed: "Retour au Fil",
    shareWithCommunity: "Partager avec la Communauté", saveChanges: "Enregistrer les Modifications",
    yourStory: "Votre Histoire", title: "Titre", profile: "Profil", myPosts: "Mes Publications",
    bookmarked: "Marqués", reposted: "Repartagés", locked: "Verrouillés", messages: "Messages",
    viewFullProfile: "Voir le Profil Complet", newPost: "Nouvelle Publication", addThoughts: "Ajoutez vos pensées...",
  }
};

// Initial posts (seed data) — in production, this would come from the database.
export const INIT_POSTS = [
  {
    id: 1, userId: "demo_uid", author: "Mama Adaeze", handle: "@adaeze_roots", avatar: "🌿", avatarBg: "#5C7A3E",
    category: "recipe", recipeAge: "kids", recipeTime: "morning", tag: "Recipe", tagColor: "#D97706", time: "2h ago",
    title: "Moringa & Millet Porridge", body: "Every morning my grandmother made this for us. Moringa leaves dried in the shade, ground with millet and a little ginger. Add warm water, stir slow. It fed seven children and kept us strong all season. The secret is patience — never rush the stirring.",
    image: "🌾", imageBg: "linear-gradient(135deg, #6B8E4E 0%, #A0C060 100%)", likes: 142, comments: 38,
    liked: false, saved: false, bookmarked: false, reposts: 14, reposted: false, isVideo: false, followers: 600000
  },
  {
    id: 2, userId: "demo_uid", author: "Dr. Kofi Mensah", handle: "@kofi.natural", avatar: "🍃", avatarBg: "#2D6A4F",
    category: "remedy", remedyAge: "adults", remedyTime: "evening", tag: "Remedy", tagColor: "#059669", time: "5h ago",
    title: "Turmeric & Black Pepper for Joint Pain", body: "Combine ½ tsp turmeric with a pinch of black pepper in warm coconut milk each evening. The piperine in pepper increases curcumin absorption by 2000%. My patients who try this for 30 days consistently report reduced stiffness. Traditional medicine always knew this — science just caught up.",
    image: "🟡", imageBg: "linear-gradient(135deg, #D97706 0%, #F59E0B 100%)", likes: 287, comments: 64,
    liked: true, saved: true, bookmarked: false, reposts: 31, reposted: false, isVideo: false, followers: 600000
  },
  {
    id: 3, userId: "demo_uid", author: "Fatimah Al-Rashid", handle: "@fatimah_seasons", avatar: "🌸", avatarBg: "#7C3D5E",
    category: "nutrition", nutritionAge: "adults", tag: "Nutrition", tagColor: "#7C3D5E", time: "1d ago",
    title: "Eat with the Season, Heal with the Earth", body: "In summer: cucumbers, watermelon, mint — cooling foods. In winter: root vegetables, warming spices, bone broths. Our bodies know this rhythm. Seasonal eating isn't a trend, it's how humans survived for millennia.",
    image: "🍂", imageBg: "linear-gradient(135deg, #92400E 0%, #D97706 100%)", likes: 198, comments: 51,
    liked: false, saved: false, bookmarked: true, reposts: 22, reposted: true, isVideo: false, followers: 1000
  },
  {
    id: 4, userId: "demo_uid", author: "Priya Nair", handle: "@priya_wellness", avatar: "🪷", avatarBg: "#9D4E6B",
    category: "fertility", fertilityGender: "female", tag: "Fertility", tagColor: "#BE185D", time: "1d ago",
    title: "Shatavari Root for Her Cycle Health", body: "Used in Ayurveda for over 4,000 years, Shatavari means 'she who has a hundred husbands' — a testament to its power for feminine vitality. She started a small tea ritual each morning: 1 tsp shatavari powder in warm oat milk with cardamom. Three months in, her cycles are regular for the first time in years.",
    image: "🌺", imageBg: "linear-gradient(135deg, #BE185D 0%, #F472B6 100%)", likes: 334, comments: 89,
    liked: false, saved: true, bookmarked: false, reposts: 56, reposted: false, isVideo: false, followers: 500
  },
  {
    id: 5, userId: "demo_uid", author: "Elder Thomas Crow", handle: "@thomascrow_teaches", avatar: "🦅", avatarBg: "#44403C",
    category: "wellness", tag: "Wellness", tagColor: "#57534E", time: "2d ago",
    title: "Cedar Medicine: A Teaching", body: "Cedar has been our medicine for generations. We burn it to clear the air, we steep the leaves for chest colds, we tie bundles at the door. The elders say cedar remembers what the earth knows.",
    image: "🌲", imageBg: "linear-gradient(135deg, #166534 0%, #4ADE80 100%)", likes: 421, comments: 103,
    liked: true, saved: false, bookmarked: false, reposts: 78, reposted: false, isVideo: false, followers: 600000
  }
];

export const TAG_OPTIONS = [
  { tag: "Recipe", tabId: "recipes", categoryId: "recipe", icon: "🍲", color: "#D97706" },
  { tag: "Remedy", tabId: "remedies", categoryId: "remedy", icon: "🌿", color: "#059669" },
  { tag: "Nutrition", tabId: "nutrition", categoryId: "nutrition", icon: "🥗", color: "#7C3D5E" },
  { tag: "Fertility", tabId: "fertility", categoryId: "fertility", icon: "🌸", color: "#BE185D" },
  { tag: "Tip", tabId: "tips", categoryId: "tip", icon: "💡", color: "#2563EB" },
  { tag: "Modern Medicine", tabId: "modern", categoryId: "modern", icon: "💊", color: "#0E7490" },
  { tag: "Natural Cosmetics", tabId: "cosmetics", categoryId: "cosmetics", icon: "💅", color: "#BE185D" },
  { tag: "Clothing", tabId: "mavazi", categoryId: "mavazi", icon: "👗", color: "#4338CA" }
];

export const AGE_OPTIONS = [
  { id: "all", label: "All Ages", icon: "🌍" },
  { id: "kids", label: "Kids", icon: "🧒" },
  { id: "adults", label: "Adults", icon: "🧑" }
];

export const TABS = [
  { id: "feed", label: "Feed", labelKey: "feed", icon: "🌿" },
  { id: "reels", label: "Reels", labelKey: "reels", icon: "🎬" },
  { id: "recipes", label: "Recipes", labelKey: "recipes", icon: "🍲" },
  { id: "remedies", label: "Remedies", labelKey: "remedies", icon: "🌱" },
  { id: "nutrition", label: "Nutrition", labelKey: "nutrition", icon: "🥗" },
  { id: "fertility", label: "Fertility", labelKey: "fertility", icon: "🌸" },
  { id: "tips", label: "Natural Tips", labelKey: "naturalTips", icon: "💡" },
  { id: "saved", label: "Saved", labelKey: "saved", icon: "🔖" },
  { id: "modern", label: "Modern Medicine", labelKey: "modernMedicine", icon: "💊" },
  { id: "cosmetics", label: "Natural Cosmetics", labelKey: "naturalCosmetics", icon: "💅" },
  { id: "mavazi", label: "Clothing", labelKey: "mavazi", icon: "👗" },
  { id: "ai-analysis", label: "AI Ingredient Analysis", labelKey: "aiAnalysis", icon: "🔬" }
];

export const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "recipe", label: "Recipes" },
  { id: "remedy", label: "Remedies" },
  { id: "nutrition", label: "Nutrition" },
  { id: "wellness", label: "Wellness" },
  { id: "fertility", label: "Fertility" },
  { id: "tips", label: "Tips" },
  { id: "modern", label: "Modern Medicine" },
  { id: "cosmetics", label: "Natural Cosmetics" }
];

export const CREATE_TYPES = ["Recipe", "Remedy", "Nutrition", "Wellness", "Fertility", "Tip", "Modern Medicine", "Natural Cosmetics", "Clothing"];

export const CATEGORY_GUIDE = {
  Recipe: {
    icon: "🍲",
    hint: "Share a traditional recipe or cooking tip — ingredients, steps, and the story behind it.",
    titlePlaceholder: "e.g. Moringa & Millet Porridge",
    bodyPlaceholder: "Describe the ingredients, how it's prepared, and why it matters to you...",
    keywordsByLang: { en: ["recipe", "cook", "ingredient", "spice", "meal"] }
  },
  Remedy: {
    icon: "🌿",
    hint: "Share a natural remedy — what it treats, how to prepare it, and how to use it safely.",
    titlePlaceholder: "e.g. Turmeric & Black Pepper for Joint Pain",
    bodyPlaceholder: "Explain the remedy, how to prepare and use it, and what it helps with...",
    keywordsByLang: { en: ["remedy", "heal", "pain", "herb", "treat"] }
  },
  Nutrition: {
    icon: "🥗",
    hint: "Share nutrition or seasonal eating guidance — what to eat, when, and why.",
    titlePlaceholder: "e.g. Eat with the Season, Heal with the Earth",
    bodyPlaceholder: "Share your nutrition tip, seasonal eating advice, or food wisdom...",
    keywordsByLang: { en: ["nutrition", "eat", "diet", "vitamin", "season"] }
  },
  Wellness: {
    icon: "🧘",
    hint: "Share a wellness practice — breathing, movement, mindfulness, or daily natural living habits.",
    titlePlaceholder: "e.g. Cedar Medicine: A Teaching",
    bodyPlaceholder: "Share your wellness practice, ritual, or teaching...",
    keywordsByLang: { en: ["wellness", "breathe", "meditation", "sleep", "calm"] }
  },
  Fertility: {
    icon: "🌸",
    hint: "Share fertility guidance for either men's or women's health.",
    titlePlaceholder: "e.g. Shatavari Root for Her Cycle Health",
    bodyPlaceholder: "Share your fertility tip, cycle wisdom, or natural support practice...",
    keywordsByLang: { en: ["fertility", "cycle", "hormone", "reproductive"] }
  },
  Tip: {
    icon: "💡",
    hint: "Share a general natural living tip that doesn't fit the other categories.",
    titlePlaceholder: "e.g. 5 Daily Habits for a Natural Life",
    bodyPlaceholder: "Share your natural living tip or daily habit...",
    keywordsByLang: {}
  },
  "Modern Medicine": {
    icon: "💊",
    hint: "Share evidence-based medical guidance.",
    titlePlaceholder: "e.g. When to See a Doctor Alongside Natural Remedies",
    bodyPlaceholder: "Share medical guidance, clinical context, or advice...",
    keywordsByLang: { en: ["doctor", "medicine", "clinic", "diagnosis"] }
  },
  "Natural Cosmetics": {
    icon: "💅",
    hint: "Share a natural beauty tip — skin care, hair care, makeup, or nail care.",
    titlePlaceholder: "e.g. Shea Butter & Honey Face Mask",
    bodyPlaceholder: "Share your natural beauty recipe or routine...",
    keywordsByLang: { en: ["beauty", "skin", "hair", "mask", "oil"] }
  },
  Clothing: {
    icon: "👗",
    hint: "Share shoes or clothing — for men, women, or kids.",
    titlePlaceholder: "e.g. Leather Sandals for the Wedding Season",
    bodyPlaceholder: "Describe the shoes or clothing, who it's for, and the occasion it suits...",
    keywordsByLang: { en: ["shoe", "dress", "shirt", "fabric", "wear"] }
  }
};

export const SHARE_PLATFORMS = [
  { name: "WhatsApp", icon: "💬", color: "#25D366" },
  { name: "Instagram", icon: "📸", color: "#E1306C" },
  { name: "Facebook", icon: "📘", color: "#1877F2" },
  { name: "Twitter/X", icon: "🐦", color: "#1DA1F2" },
  { name: "Email", icon: "📧", color: "#EA4335" },
  { name: "Copy Link", icon: "🔗", color: "#6B7280" }
];

export const COSMETICS_CATEGORIES = [
  { id: "cos_all", label: "All Beauty" },
  { id: "cos_supplies", label: "Beauty Supplies" },
  { id: "cos_makeup", label: "Makeup" },
  { id: "cos_skincare", label: "Skin Care" },
  { id: "cos_nails", label: "Nails Care" },
  { id: "cos_haircare", label: "Hair Care" }
];

export const PROFILE_SECTIONS = [
  { id: "posts", label: "My Posts", icon: "📝" },
  { id: "bookmarks", label: "Bookmarked", icon: "🔖" },
  { id: "saved", label: "Saved", icon: "❤️" },
  { id: "reposts", label: "Reposted", icon: "🔁" },
  { id: "locked", label: "Locked", icon: "🔒" }
];

export const SAMPLE_COMMENTS = {
  1: [
    { id: 1, user: "Aisha M.", avatar: "🌺", text: "My mother used to make this too! Thank you for sharing this memory.", likes: 12, liked: false, replies: [{ id: 11, user: "Mama Adaeze", avatar: "🌿", text: "Wonderful! Our grandmothers were the best healers 💚", likes: 4, liked: false }] },
    { id: 2, user: "John K.", avatar: "🌱", text: "Just tried this for the first time. Absolutely nourishing!", likes: 7, liked: false, replies: [] }
  ]
};