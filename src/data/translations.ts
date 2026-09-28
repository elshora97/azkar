// French, Bahasa Indonesia and Urdu meanings for the most-recited azkar, keyed by Hisn Muslim item ID.
// The API only ships Arabic + English; items not listed here fall back to English in the UI.
// Use `<id>:evening` for the evening wording of a combined morning/evening item.
export type ExtraLang = 'fr' | 'id' | 'ur'

export const TRANSLATIONS: Record<string, Partial<Record<ExtraLang, string>>> = {
  75: {
    fr: "Je cherche refuge auprès d'Allah contre Satan le lapidé. « Allah ! Point de divinité à part Lui, le Vivant, Celui qui subsiste par Lui-même. Ni somnolence ni sommeil ne Le saisissent… » (Âyat al-Kursî, 2:255)",
    id: 'Aku berlindung kepada Allah dari setan yang terkutuk. "Allah, tidak ada tuhan selain Dia, Yang Mahahidup, Yang terus-menerus mengurus makhluk-Nya, tidak mengantuk dan tidak tidur…" (Ayat Kursi, 2:255)',
    ur: 'میں شیطان مردود سے اللہ کی پناہ مانگتا ہوں۔ "اللہ، اس کے سوا کوئی معبود نہیں، وہ زندہ ہے، سب کا تھامنے والا، نہ اسے اونگھ آتی ہے نہ نیند…" (آیت الکرسی، ۲:۲۵۵)',
  },
  76: {
    fr: "Réciter les sourates al-Ikhlâs (112), al-Falaq (113) et an-Nâs (114), trois fois chacune.",
    id: 'Membaca surat Al-Ikhlas (112), Al-Falaq (113) dan An-Nas (114), masing-masing tiga kali.',
    ur: 'سورۃ الاخلاص (۱۱۲)، سورۃ الفلق (۱۱۳) اور سورۃ الناس (۱۱۴) تین تین مرتبہ پڑھیں۔',
  },
  77: {
    fr: "Nous voici au matin et le royaume appartient à Allah. Louange à Allah ; nulle divinité sauf Allah, Seul, sans associé. À Lui la royauté et la louange, et Il est capable de toute chose. Seigneur, je Te demande le bien de ce jour et de ce qui le suit, et je cherche refuge auprès de Toi contre le mal de ce jour et de ce qui le suit. Seigneur, préserve-moi de la paresse et de la décrépitude, du châtiment du Feu et de celui de la tombe.",
    id: 'Kami memasuki pagi dan kerajaan milik Allah. Segala puji bagi Allah; tidak ada tuhan selain Allah semata, tiada sekutu bagi-Nya. Milik-Nya kerajaan dan pujian, dan Dia Mahakuasa atas segala sesuatu. Ya Rabb, aku memohon kebaikan hari ini dan sesudahnya, dan berlindung dari keburukan hari ini dan sesudahnya. Ya Rabb, aku berlindung dari kemalasan dan keburukan masa tua, dari siksa neraka dan siksa kubur.',
    ur: 'ہم نے صبح کی اور ساری بادشاہی اللہ کی ہے، تمام تعریفیں اللہ کے لیے ہیں۔ اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں۔ اسی کی بادشاہی اور اسی کی تعریف ہے اور وہ ہر چیز پر قادر ہے۔ اے رب! میں تجھ سے اس دن اور اس کے بعد کی بھلائی مانگتا ہوں اور اس کے شر سے پناہ چاہتا ہوں۔ اے رب! سستی، بڑھاپے کی خرابی، جہنم اور قبر کے عذاب سے تیری پناہ۔',
  },
  '77:evening': {
    fr: "Nous voici au soir et le royaume appartient à Allah. Louange à Allah ; nulle divinité sauf Allah, Seul, sans associé. Seigneur, je Te demande le bien de cette nuit et de ce qui la suit, et je cherche refuge auprès de Toi contre son mal. Seigneur, préserve-moi de la paresse et de la décrépitude, du châtiment du Feu et de celui de la tombe.",
    id: 'Kami memasuki sore dan kerajaan milik Allah. Segala puji bagi Allah; tidak ada tuhan selain Allah semata, tiada sekutu bagi-Nya. Ya Rabb, aku memohon kebaikan malam ini dan sesudahnya, dan berlindung dari keburukannya. Ya Rabb, aku berlindung dari kemalasan dan keburukan masa tua, dari siksa neraka dan siksa kubur.',
    ur: 'ہم نے شام کی اور ساری بادشاہی اللہ کی ہے، تمام تعریفیں اللہ کے لیے ہیں۔ اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے۔ اے رب! میں تجھ سے اس رات اور اس کے بعد کی بھلائی مانگتا ہوں اور اس کے شر سے پناہ چاہتا ہوں۔ اے رب! سستی، بڑھاپے کی خرابی، جہنم اور قبر کے عذاب سے تیری پناہ۔',
  },
  78: {
    fr: "Ô Allah, c'est par Toi que nous atteignons le matin et le soir, par Toi que nous vivons et mourons, et vers Toi est la résurrection.",
    id: 'Ya Allah, dengan-Mu kami memasuki pagi dan sore, dengan-Mu kami hidup dan mati, dan kepada-Mu kebangkitan.',
    ur: 'اے اللہ! تیرے ہی حکم سے ہم نے صبح اور شام کی، تیرے ہی حکم سے ہم جیتے اور مرتے ہیں، اور تیری ہی طرف اٹھ کر جانا ہے۔',
  },
  '78:evening': {
    fr: "Ô Allah, c'est par Toi que nous atteignons le soir et le matin, par Toi que nous vivons et mourons, et vers Toi est le retour.",
    id: 'Ya Allah, dengan-Mu kami memasuki sore dan pagi, dengan-Mu kami hidup dan mati, dan kepada-Mu tempat kembali.',
    ur: 'اے اللہ! تیرے ہی حکم سے ہم نے شام اور صبح کی، تیرے ہی حکم سے ہم جیتے اور مرتے ہیں، اور تیری ہی طرف لوٹنا ہے۔',
  },
  79: {
    fr: "Ô Allah, Tu es mon Seigneur, nulle divinité sauf Toi. Tu m'as créé et je suis Ton serviteur ; je respecte Ton pacte autant que je peux. Je cherche refuge auprès de Toi contre le mal que j'ai commis, je reconnais Tes bienfaits et je reconnais mon péché : pardonne-moi, car nul ne pardonne les péchés sauf Toi. (Sayyid al-Istighfâr)",
    id: 'Ya Allah, Engkau Rabbku, tidak ada tuhan selain Engkau. Engkau menciptakanku dan aku hamba-Mu; aku berada di atas perjanjian-Mu semampuku. Aku berlindung dari keburukan perbuatanku, aku mengakui nikmat-Mu dan dosaku, maka ampunilah aku, karena tiada yang mengampuni dosa selain Engkau. (Sayyidul Istighfar)',
    ur: 'اے اللہ! تو میرا رب ہے، تیرے سوا کوئی معبود نہیں۔ تو نے مجھے پیدا کیا اور میں تیرا بندہ ہوں، اپنی طاقت کے مطابق تیرے عہد پر قائم ہوں۔ اپنے کیے کے شر سے تیری پناہ، تیری نعمتوں کا اور اپنے گناہ کا اقرار کرتا ہوں، پس مجھے بخش دے، تیرے سوا کوئی گناہ نہیں بخشتا۔ (سید الاستغفار)',
  },
  82: {
    fr: "Ô Allah, accorde la santé à mon corps, à mon ouïe et à ma vue. Nulle divinité sauf Toi. Ô Allah, je cherche refuge auprès de Toi contre la mécréance, la pauvreté et le châtiment de la tombe.",
    id: 'Ya Allah, sehatkan badanku, pendengaranku dan penglihatanku. Tidak ada tuhan selain Engkau. Ya Allah, aku berlindung dari kekufuran, kefakiran dan siksa kubur.',
    ur: 'اے اللہ! میرے بدن، میرے کانوں اور میری آنکھوں کو عافیت دے، تیرے سوا کوئی معبود نہیں۔ اے اللہ! کفر، محتاجی اور قبر کے عذاب سے تیری پناہ۔',
  },
  83: {
    fr: "Allah me suffit, nulle divinité sauf Lui. En Lui je place ma confiance, et Il est le Seigneur du Trône immense.",
    id: 'Cukuplah Allah bagiku, tidak ada tuhan selain Dia. Kepada-Nya aku bertawakal, dan Dia Rabb pemilik Arsy yang agung.',
    ur: 'مجھے اللہ کافی ہے، اس کے سوا کوئی معبود نہیں، اسی پر میں نے بھروسہ کیا اور وہی عرشِ عظیم کا رب ہے۔',
  },
  86: {
    fr: "Au nom d'Allah, avec le nom duquel rien sur terre ni dans le ciel ne peut nuire, et Il est l'Audient, l'Omniscient.",
    id: 'Dengan nama Allah yang bersama nama-Nya tidak ada sesuatu pun di bumi dan di langit yang dapat membahayakan, dan Dia Maha Mendengar lagi Maha Mengetahui.',
    ur: 'اللہ کے نام سے، جس کے نام کے ساتھ زمین و آسمان میں کوئی چیز نقصان نہیں پہنچا سکتی، اور وہ سننے والا جاننے والا ہے۔',
  },
  87: {
    fr: "J'agrée Allah comme Seigneur, l'Islam comme religion et Muhammad ﷺ comme Prophète.",
    id: 'Aku rida Allah sebagai Rabb, Islam sebagai agama, dan Muhammad ﷺ sebagai nabi.',
    ur: 'میں اللہ کے رب ہونے، اسلام کے دین ہونے اور محمد ﷺ کے نبی ہونے پر راضی ہوں۔',
  },
  88: {
    fr: "Ô Vivant, ô Celui qui subsiste par Lui-même, par Ta miséricorde j'implore Ton secours : arrange toutes mes affaires et ne me confie pas à moi-même, ne serait-ce qu'un clin d'œil.",
    id: 'Wahai Yang Mahahidup, wahai Yang terus-menerus mengurus, dengan rahmat-Mu aku memohon pertolongan: perbaikilah seluruh urusanku dan jangan serahkan aku kepada diriku walau sekejap mata.',
    ur: 'اے زندہ! اے سب کو تھامنے والے! تیری رحمت کے واسطے مدد مانگتا ہوں، میرے سب کام درست کر دے اور مجھے پلک جھپکنے کے برابر بھی میرے نفس کے حوالے نہ کر۔',
  },
  91: {
    fr: 'Gloire et louange à Allah.',
    id: 'Mahasuci Allah dan segala puji bagi-Nya.',
    ur: 'اللہ پاک ہے اپنی تعریف کے ساتھ۔',
  },
  92: {
    fr: "Nulle divinité sauf Allah, Seul, sans associé. À Lui la royauté et la louange, et Il est capable de toute chose.",
    id: 'Tidak ada tuhan selain Allah semata, tiada sekutu bagi-Nya. Milik-Nya kerajaan dan pujian, dan Dia Mahakuasa atas segala sesuatu.',
    ur: 'اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں، اسی کی بادشاہی اور اسی کی تعریف ہے اور وہ ہر چیز پر قادر ہے۔',
  },
  93: {
    fr: "Nulle divinité sauf Allah, Seul, sans associé. À Lui la royauté et la louange, et Il est capable de toute chose.",
    id: 'Tidak ada tuhan selain Allah semata, tiada sekutu bagi-Nya. Milik-Nya kerajaan dan pujian, dan Dia Mahakuasa atas segala sesuatu.',
    ur: 'اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں، اسی کی بادشاہی اور اسی کی تعریف ہے اور وہ ہر چیز پر قادر ہے۔',
  },
  96: {
    fr: "Je demande pardon à Allah et je me repens à Lui.",
    id: 'Aku memohon ampun kepada Allah dan bertobat kepada-Nya.',
    ur: 'میں اللہ سے بخشش مانگتا ہوں اور اسی کی طرف توبہ کرتا ہوں۔',
  },
  97: {
    fr: "Je cherche refuge dans les paroles parfaites d'Allah contre le mal de ce qu'Il a créé.",
    id: 'Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari keburukan makhluk yang Dia ciptakan.',
    ur: 'میں اللہ کے کامل کلمات کی پناہ مانگتا ہوں اس کی مخلوق کے شر سے۔',
  },
  98: {
    fr: 'Ô Allah, prie sur notre Prophète Muhammad et accorde-lui la paix.',
    id: 'Ya Allah, limpahkanlah shalawat dan salam kepada nabi kami Muhammad.',
    ur: 'اے اللہ! ہمارے نبی محمد ﷺ پر درود و سلام بھیج۔',
  },
  66: {
    fr: "Je demande pardon à Allah (trois fois). Ô Allah, Tu es la Paix et de Toi vient la paix ; béni sois-Tu, ô Détenteur de la majesté et de la générosité.",
    id: 'Aku memohon ampun kepada Allah (tiga kali). Ya Allah, Engkau As-Salam dan dari-Mu keselamatan; Mahaberkah Engkau, wahai Pemilik keagungan dan kemuliaan.',
    ur: 'میں اللہ سے بخشش مانگتا ہوں (تین بار)۔ اے اللہ! تو سلامتی والا ہے اور تجھ ہی سے سلامتی ہے، تو بابرکت ہے اے جلال اور عزت والے۔',
  },
  67: {
    fr: "Nulle divinité sauf Allah, Seul, sans associé… Ô Allah, nul ne peut retenir ce que Tu donnes ni donner ce que Tu retiens, et la fortune du fortuné ne lui sert à rien auprès de Toi.",
    id: 'Tidak ada tuhan selain Allah semata, tiada sekutu bagi-Nya… Ya Allah, tidak ada yang dapat menahan apa yang Engkau berikan dan tidak ada yang dapat memberi apa yang Engkau tahan, dan kekayaan tidak bermanfaat bagi pemiliknya di hadapan-Mu.',
    ur: 'اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے… اے اللہ! جو تو دے اسے کوئی روکنے والا نہیں اور جو تو روکے اسے کوئی دینے والا نہیں، اور کسی مالدار کو تیرے مقابلے میں اس کی مالداری نفع نہیں دیتی۔',
  },
  69: {
    fr: "Gloire à Allah, louange à Allah, Allah est le plus grand (33 fois chacun), puis : nulle divinité sauf Allah, Seul, sans associé ; à Lui la royauté et la louange, et Il est capable de toute chose.",
    id: 'Mahasuci Allah, segala puji bagi Allah, Allah Mahabesar (masing-masing 33 kali), lalu: tidak ada tuhan selain Allah semata, tiada sekutu bagi-Nya; milik-Nya kerajaan dan pujian, dan Dia Mahakuasa atas segala sesuatu.',
    ur: 'سبحان اللہ، الحمد للہ، اللہ اکبر (ہر ایک ۳۳ بار)، پھر: اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اسی کی بادشاہی اور تعریف ہے اور وہ ہر چیز پر قادر ہے۔',
  },
  73: {
    fr: 'Ô Allah, je Te demande une science utile, une subsistance licite et des œuvres agréées.',
    id: 'Ya Allah, aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang baik, dan amal yang diterima.',
    ur: 'اے اللہ! میں تجھ سے نفع دینے والا علم، پاکیزہ رزق اور مقبول عمل مانگتا ہوں۔',
  },
  102: {
    fr: "C'est en Ton nom, mon Seigneur, que je m'allonge et en Ton nom que je me relève. Si Tu reprends mon âme, fais-lui miséricorde ; si Tu la relâches, protège-la comme Tu protèges Tes serviteurs vertueux.",
    id: 'Dengan nama-Mu, ya Rabbku, aku meletakkan lambungku dan dengan-Mu aku mengangkatnya. Jika Engkau menahan jiwaku, rahmatilah ia; jika Engkau melepaskannya, jagalah ia sebagaimana Engkau menjaga hamba-hamba-Mu yang saleh.',
    ur: 'اے میرے رب! تیرے نام سے میں نے اپنا پہلو رکھا اور تیرے ہی نام سے اٹھاؤں گا۔ اگر تو میری جان روک لے تو اس پر رحم کر، اور اگر چھوڑ دے تو اس کی ویسے حفاظت کر جیسے اپنے نیک بندوں کی کرتا ہے۔',
  },
  104: {
    fr: 'Ô Allah, préserve-moi de Ton châtiment le jour où Tu ressusciteras Tes serviteurs.',
    id: 'Ya Allah, lindungilah aku dari azab-Mu pada hari Engkau membangkitkan hamba-hamba-Mu.',
    ur: 'اے اللہ! مجھے اپنے عذاب سے بچا جس دن تو اپنے بندوں کو اٹھائے گا۔',
  },
  105: {
    fr: 'En Ton nom, ô Allah, je meurs et je vis.',
    id: 'Dengan nama-Mu, ya Allah, aku mati dan aku hidup.',
    ur: 'اے اللہ! تیرے ہی نام سے مرتا اور جیتا ہوں۔',
  },
  111: {
    fr: "Ô Allah, je Te soumets mon âme, je Te confie mes affaires, je tourne mon visage vers Toi et je m'appuie sur Toi, par désir et par crainte de Toi. Il n'y a de refuge ni de salut que vers Toi. Je crois en Ton Livre que Tu as révélé et en Ton Prophète que Tu as envoyé.",
    id: 'Ya Allah, aku serahkan diriku kepada-Mu, aku pasrahkan urusanku kepada-Mu, aku hadapkan wajahku kepada-Mu, dan aku sandarkan punggungku kepada-Mu, karena harap dan takut kepada-Mu. Tiada tempat berlindung dan menyelamatkan diri kecuali kepada-Mu. Aku beriman kepada kitab-Mu yang Engkau turunkan dan nabi-Mu yang Engkau utus.',
    ur: 'اے اللہ! میں نے اپنی جان تیرے سپرد کی، اپنا معاملہ تیرے حوالے کیا، اپنا چہرہ تیری طرف کیا اور تیری رغبت اور خوف سے تجھ پر ٹیک لگائی۔ تجھ سے بچنے کی کوئی جائے پناہ نہیں مگر تیری ہی طرف۔ میں تیری نازل کردہ کتاب اور تیرے بھیجے ہوئے نبی پر ایمان لایا۔',
  },
  1: {
    fr: "Louange à Allah qui nous a rendu la vie après nous avoir fait mourir, et vers Lui est la résurrection.",
    id: 'Segala puji bagi Allah yang menghidupkan kami setelah mematikan kami, dan kepada-Nya kebangkitan.',
    ur: 'تمام تعریفیں اللہ کے لیے ہیں جس نے ہمیں موت کے بعد زندگی دی اور اسی کی طرف اٹھ کر جانا ہے۔',
  },
  16: {
    fr: "Au nom d'Allah, je place ma confiance en Allah, et il n'y a de force ni de puissance qu'en Allah.",
    id: 'Dengan nama Allah, aku bertawakal kepada Allah, tiada daya dan kekuatan kecuali dengan Allah.',
    ur: 'اللہ کے نام سے، میں نے اللہ پر بھروسہ کیا، اور اللہ کے بغیر نہ کوئی طاقت ہے نہ قوت۔',
  },
  18: {
    fr: "Au nom d'Allah nous entrons, au nom d'Allah nous sortons, et en notre Seigneur nous plaçons notre confiance.",
    id: 'Dengan nama Allah kami masuk, dengan nama Allah kami keluar, dan kepada Rabb kami, kami bertawakal.',
    ur: 'اللہ کے نام سے ہم داخل ہوئے، اللہ کے نام سے ہم نکلے، اور اپنے رب پر ہم نے بھروسہ کیا۔',
  },
  121: {
    fr: "Ô Allah, je cherche refuge auprès de Toi contre le souci et la tristesse, l'incapacité et la paresse, l'avarice et la lâcheté, le poids des dettes et la domination des hommes.",
    id: 'Ya Allah, aku berlindung kepada-Mu dari kegelisahan dan kesedihan, kelemahan dan kemalasan, kekikiran dan sifat pengecut, lilitan utang dan penindasan orang.',
    ur: 'اے اللہ! میں فکر اور غم، عاجزی اور سستی، بخل اور بزدلی، قرض کے بوجھ اور لوگوں کے غلبے سے تیری پناہ مانگتا ہوں۔',
  },
  124: {
    fr: "Nulle divinité sauf Toi ; gloire à Toi, j'étais certes parmi les injustes.",
    id: 'Tidak ada tuhan selain Engkau, Mahasuci Engkau, sungguh aku termasuk orang-orang yang zalim.',
    ur: 'تیرے سوا کوئی معبود نہیں، تو پاک ہے، بے شک میں ہی ظالموں میں سے تھا۔',
  },
  139: {
    fr: "Ô Allah, rien n'est facile sauf ce que Tu rends facile, et Tu rends la difficulté facile quand Tu le veux.",
    id: 'Ya Allah, tidak ada kemudahan kecuali apa yang Engkau jadikan mudah, dan Engkau menjadikan kesulitan mudah jika Engkau kehendaki.',
    ur: 'اے اللہ! کوئی کام آسان نہیں مگر جسے تو آسان کر دے، اور تو جب چاہے مشکل کو آسان کر دیتا ہے۔',
  },
  180: {
    fr: "Louange à Allah qui m'a nourri de ceci et me l'a accordé sans force ni puissance de ma part.",
    id: 'Segala puji bagi Allah yang memberiku makanan ini dan memberikannya kepadaku tanpa daya dan kekuatan dariku.',
    ur: 'تمام تعریفیں اللہ کے لیے ہیں جس نے مجھے یہ کھلایا اور میری کسی طاقت و قوت کے بغیر مجھے عطا کیا۔',
  },
}
