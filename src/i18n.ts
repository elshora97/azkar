import type { CategoryId } from './data/api'

export type Lang = 'en' | 'ar' | 'fr' | 'id' | 'ur'

/**
 * Ship Arabic only for now: locks the UI to Arabic and hides the language picker,
 * transliteration and translation. Set to false to bring the other languages back.
 */
export const ARABIC_ONLY = true

export const LANGS: { id: Lang; label: string; native: string; rtl: boolean }[] = [
  { id: 'en', label: 'English', native: 'English', rtl: false },
  { id: 'ar', label: 'Arabic', native: 'العربية', rtl: true },
  { id: 'fr', label: 'French', native: 'Français', rtl: false },
  { id: 'id', label: 'Bahasa', native: 'Bahasa Indonesia', rtl: false },
  { id: 'ur', label: 'Urdu', native: 'اردو', rtl: true },
]

interface Strings {
  appName: string
  categories: Record<CategoryId, string>
  subtitles: Record<CategoryId, string>
  completed: string
  of: string
  resetAll: string
  reset: string
  tapToCount: string
  done: string
  play: string
  pause: string
  settings: string
  language: string
  display: string
  arabicText: string
  transliteration: string
  translation: string
  theme: string
  light: string
  dark: string
  live: string
  cached: string
  offlineCopy: string
  resetsDaily: string
  englishFallback: string
  allDone: string
  close: string
  previous: string
  next: string
  swipeHint: string
  offline: string
  offlineAudio: string
  download: string
  audioSavedOf: string
  allAudioSaved: string
  downloadFailed: string
  offlineReady: string
  updateAvailable: string
  reload: string
  install: string
  installHint: string
  youAreOffline: string
  iosInstallTitle: string
  iosStepShare: string
  iosStepAdd: string
  iosStepConfirm: string
  dismiss: string
  times: string
  audioUnavailable: string
}

export const STRINGS: Record<Lang, Strings> = {
  en: {
    appName: 'Azkar',
    categories: { morning: 'Morning', evening: 'Evening', prayer: 'After Prayer', sleep: 'Sleep', duas: 'Daily Duas' },
    subtitles: {
      morning: 'Begin the day in remembrance',
      evening: 'Close the day with gratitude',
      prayer: 'After the obligatory prayer',
      sleep: 'Before you rest',
      duas: 'For the moments of the day',
    },
    completed: 'completed',
    of: 'of',
    resetAll: 'Reset all',
    reset: 'Reset',
    tapToCount: 'Tap to count',
    done: 'Done',
    play: 'Play recitation',
    pause: 'Pause recitation',
    settings: 'Settings',
    language: 'Language',
    display: 'Display',
    arabicText: 'Arabic text',
    transliteration: 'Transliteration',
    translation: 'Translation',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    live: 'Live · Hisn al-Muslim',
    cached: 'Saved copy',
    offlineCopy: 'Offline copy',
    resetsDaily: 'Counters reset each day',
    englishFallback: 'Translation not yet available — showing English',
    allDone: 'All complete. May Allah accept it from you.',
    close: 'Close',
    previous: 'Previous',
    next: 'Next',
    swipeHint: 'Swipe or use the arrows to move between azkar',
    offline: "Offline",
    offlineAudio: "{category} recitations",
    download: "Download",
    audioSavedOf: "{n} of {total} saved for offline",
    allAudioSaved: "All recitations saved for offline",
    downloadFailed: "Download failed — check your connection",
    offlineReady: "Ready to work offline",
    updateAvailable: "A new version is available",
    reload: "Update",
    install: "Install app",
    installHint: "Add Azkar to your home screen",
    youAreOffline: "Offline",
    iosInstallTitle: "Install Azkar on your iPhone",
    iosStepShare: "Tap the Share button in the browser bar",
    iosStepAdd: "Choose “Add to Home Screen”",
    iosStepConfirm: "Tap “Add” — Azkar opens like an app, even offline",
    dismiss: "Not now",
    times: '×',
    audioUnavailable: 'No recitation for this wording',
  },
  ar: {
    appName: 'أذكار',
    categories: { morning: 'الصباح', evening: 'المساء', prayer: 'بعد الصلاة', sleep: 'النوم', duas: 'أدعية' },
    subtitles: {
      morning: 'ابدأ يومك بذكر الله',
      evening: 'اختم يومك بالشكر',
      prayer: 'بعد السلام من الصلاة المفروضة',
      sleep: 'قبل أن تنام',
      duas: 'لأحوال اليوم',
    },
    completed: 'مكتمل',
    of: 'من',
    resetAll: 'إعادة الكل',
    reset: 'إعادة',
    tapToCount: 'اضغط للعد',
    done: 'تم',
    play: 'تشغيل التلاوة',
    pause: 'إيقاف التلاوة',
    settings: 'الإعدادات',
    language: 'اللغة',
    display: 'العرض',
    arabicText: 'النص العربي',
    transliteration: 'النطق اللاتيني',
    translation: 'الترجمة',
    theme: 'المظهر',
    light: 'فاتح',
    dark: 'داكن',
    live: 'مباشر · حصن المسلم',
    cached: 'نسخة محفوظة',
    offlineCopy: 'نسخة دون اتصال',
    resetsDaily: 'تُصفَّر العدادات كل يوم',
    englishFallback: 'الترجمة غير متوفرة — تُعرض الإنجليزية',
    allDone: 'اكتملت الأذكار. تقبّل الله منك.',
    close: 'إغلاق',
    previous: 'السابق',
    next: 'التالي',
    swipeHint: 'اسحب أو استخدم الأسهم للتنقل بين الأذكار',
    offline: "دون اتصال",
    offlineAudio: "تلاوات {category}",
    download: "تنزيل",
    audioSavedOf: "{n} من {total} محفوظة دون اتصال",
    allAudioSaved: "كل التلاوات محفوظة دون اتصال",
    downloadFailed: "فشل التنزيل — تحقق من الاتصال",
    offlineReady: "التطبيق جاهز للعمل دون اتصال",
    updateAvailable: "يتوفر إصدار جديد",
    reload: "تحديث",
    install: "تثبيت التطبيق",
    installHint: "أضف أذكار إلى الشاشة الرئيسية",
    youAreOffline: "دون اتصال",
    iosInstallTitle: "ثبّت أذكار على جهازك",
    iosStepShare: "اضغط زر المشاركة في شريط المتصفح",
    iosStepAdd: "اختر «إضافة إلى الشاشة الرئيسية»",
    iosStepConfirm: "اضغط «إضافة» ليعمل كتطبيق حتى دون اتصال",
    dismiss: "لاحقًا",
    times: '×',
    audioUnavailable: 'لا توجد تلاوة لهذه الصيغة',
  },
  fr: {
    appName: 'Azkar',
    categories: { morning: 'Matin', evening: 'Soir', prayer: 'Après la prière', sleep: 'Sommeil', duas: 'Douas' },
    subtitles: {
      morning: 'Commencer la journée dans le rappel',
      evening: 'Clore la journée avec gratitude',
      prayer: 'Après la prière obligatoire',
      sleep: 'Avant de dormir',
      duas: 'Pour les moments de la journée',
    },
    completed: 'terminés',
    of: 'sur',
    resetAll: 'Tout réinitialiser',
    reset: 'Réinitialiser',
    tapToCount: 'Touchez pour compter',
    done: 'Terminé',
    play: 'Écouter la récitation',
    pause: 'Mettre en pause',
    settings: 'Réglages',
    language: 'Langue',
    display: 'Affichage',
    arabicText: 'Texte arabe',
    transliteration: 'Translittération',
    translation: 'Traduction',
    theme: 'Thème',
    light: 'Clair',
    dark: 'Sombre',
    live: 'En ligne · Hisn al-Muslim',
    cached: 'Copie enregistrée',
    offlineCopy: 'Copie hors ligne',
    resetsDaily: 'Les compteurs se remettent à zéro chaque jour',
    englishFallback: 'Traduction pas encore disponible — affichage en anglais',
    allDone: "Tout est terminé. Qu'Allah l'accepte de vous.",
    close: 'Fermer',
    previous: 'Précédent',
    next: 'Suivant',
    swipeHint: 'Balayez ou utilisez les flèches pour naviguer',
    offline: "Hors ligne",
    offlineAudio: "Récitations — {category}",
    download: "Télécharger",
    audioSavedOf: "{n} sur {total} disponibles hors ligne",
    allAudioSaved: "Toutes les récitations sont disponibles hors ligne",
    downloadFailed: "Échec du téléchargement — vérifiez la connexion",
    offlineReady: "Prêt à fonctionner hors ligne",
    updateAvailable: "Une nouvelle version est disponible",
    reload: "Mettre à jour",
    install: "Installer l'app",
    installHint: "Ajouter Azkar à l'écran d'accueil",
    youAreOffline: "Hors ligne",
    iosInstallTitle: "Installer Azkar sur votre iPhone",
    iosStepShare: "Touchez le bouton Partager du navigateur",
    iosStepAdd: "Choisissez « Sur l’écran d’accueil »",
    iosStepConfirm: "Touchez « Ajouter » — Azkar s’ouvre comme une app, même hors ligne",
    dismiss: "Plus tard",
    times: '×',
    audioUnavailable: 'Pas de récitation pour cette formulation',
  },
  id: {
    appName: 'Azkar',
    categories: { morning: 'Pagi', evening: 'Petang', prayer: 'Setelah Salat', sleep: 'Tidur', duas: 'Doa Harian' },
    subtitles: {
      morning: 'Awali hari dengan zikir',
      evening: 'Tutup hari dengan syukur',
      prayer: 'Setelah salat fardu',
      sleep: 'Sebelum beristirahat',
      duas: 'Untuk setiap momen',
    },
    completed: 'selesai',
    of: 'dari',
    resetAll: 'Atur ulang semua',
    reset: 'Atur ulang',
    tapToCount: 'Ketuk untuk menghitung',
    done: 'Selesai',
    play: 'Putar bacaan',
    pause: 'Jeda bacaan',
    settings: 'Pengaturan',
    language: 'Bahasa',
    display: 'Tampilan',
    arabicText: 'Teks Arab',
    transliteration: 'Transliterasi',
    translation: 'Terjemahan',
    theme: 'Tema',
    light: 'Terang',
    dark: 'Gelap',
    live: 'Daring · Hisnul Muslim',
    cached: 'Salinan tersimpan',
    offlineCopy: 'Salinan luring',
    resetsDaily: 'Penghitung diatur ulang setiap hari',
    englishFallback: 'Terjemahan belum tersedia — menampilkan bahasa Inggris',
    allDone: 'Semua selesai. Semoga Allah menerimanya.',
    close: 'Tutup',
    previous: 'Sebelumnya',
    next: 'Berikutnya',
    swipeHint: 'Geser atau gunakan panah untuk berpindah',
    offline: "Luring",
    offlineAudio: "Bacaan {category}",
    download: "Unduh",
    audioSavedOf: "{n} dari {total} tersimpan luring",
    allAudioSaved: "Semua bacaan tersimpan luring",
    downloadFailed: "Unduhan gagal — periksa koneksi",
    offlineReady: "Siap digunakan tanpa internet",
    updateAvailable: "Versi baru tersedia",
    reload: "Perbarui",
    install: "Pasang aplikasi",
    installHint: "Tambahkan Azkar ke layar utama",
    youAreOffline: "Luring",
    iosInstallTitle: "Pasang Azkar di iPhone Anda",
    iosStepShare: "Ketuk tombol Bagikan di bilah peramban",
    iosStepAdd: "Pilih “Tambah ke Layar Utama”",
    iosStepConfirm: "Ketuk “Tambah” — Azkar terbuka seperti aplikasi, bahkan luring",
    dismiss: "Nanti",
    times: '×',
    audioUnavailable: 'Tidak ada bacaan untuk lafaz ini',
  },
  ur: {
    appName: 'اذکار',
    categories: { morning: 'صبح', evening: 'شام', prayer: 'نماز کے بعد', sleep: 'سونے سے پہلے', duas: 'روزمرہ دعائیں' },
    subtitles: {
      morning: 'دن کا آغاز اللہ کے ذکر سے',
      evening: 'دن کا اختتام شکر کے ساتھ',
      prayer: 'فرض نماز کے بعد',
      sleep: 'آرام سے پہلے',
      duas: 'دن کے مختلف مواقع کے لیے',
    },
    completed: 'مکمل',
    of: 'میں سے',
    resetAll: 'سب دوبارہ',
    reset: 'دوبارہ',
    tapToCount: 'گننے کے لیے دبائیں',
    done: 'مکمل',
    play: 'تلاوت سنیں',
    pause: 'تلاوت روکیں',
    settings: 'ترتیبات',
    language: 'زبان',
    display: 'ڈسپلے',
    arabicText: 'عربی متن',
    transliteration: 'رومن تلفظ',
    translation: 'ترجمہ',
    theme: 'تھیم',
    light: 'روشن',
    dark: 'تاریک',
    live: 'آن لائن · حصن المسلم',
    cached: 'محفوظ نسخہ',
    offlineCopy: 'آف لائن نسخہ',
    resetsDaily: 'کاؤنٹر ہر روز صفر ہو جاتے ہیں',
    englishFallback: 'ترجمہ ابھی دستیاب نہیں — انگریزی دکھائی جا رہی ہے',
    allDone: 'سب مکمل۔ اللہ قبول فرمائے۔',
    close: 'بند کریں',
    previous: 'پچھلا',
    next: 'اگلا',
    swipeHint: 'اذکار کے درمیان جانے کے لیے سوائپ کریں یا تیر استعمال کریں',
    offline: "آف لائن",
    offlineAudio: "{category} کی تلاوتیں",
    download: "ڈاؤن لوڈ",
    audioSavedOf: "{total} میں سے {n} آف لائن محفوظ",
    allAudioSaved: "تمام تلاوتیں آف لائن محفوظ ہیں",
    downloadFailed: "ڈاؤن لوڈ ناکام — کنکشن چیک کریں",
    offlineReady: "ایپ آف لائن استعمال کے لیے تیار ہے",
    updateAvailable: "نیا ورژن دستیاب ہے",
    reload: "اپ ڈیٹ",
    install: "ایپ انسٹال کریں",
    installHint: "اذکار کو ہوم اسکرین پر شامل کریں",
    youAreOffline: "آف لائن",
    iosInstallTitle: "اذکار کو اپنے آئی فون پر انسٹال کریں",
    iosStepShare: "براؤزر میں شیئر کا بٹن دبائیں",
    iosStepAdd: "«ہوم اسکرین میں شامل کریں» منتخب کریں",
    iosStepConfirm: "«شامل کریں» دبائیں — ایپ آف لائن بھی چلے گی",
    dismiss: "بعد میں",
    times: '×',
    audioUnavailable: 'اس عبارت کی تلاوت دستیاب نہیں',
  },
}
