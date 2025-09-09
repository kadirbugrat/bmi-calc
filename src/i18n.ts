export type Lang = "tr" | "en";

type Dict = Record<string, string>;

export const tr: Dict = {
  title: "BMI Hesaplayıcı",
  language: "Dil",
  lang_tr: "Türkçe",
  lang_en: "İngilizce",
  unit: "Birim",
  metric: "Metrik",
  imperial: "İngiliz",
  sex: "Cinsiyet",
  male: "Erkek",
  female: "Kadın",
  mode: "Mod",
  adult: "Yetişkin (18+)",
  child: "Çocuk/Ergen (2–20)",
  age: "Yaş",
  years: "yaş",
  height: "Boy",
  weight: "Kilo",
  cm: "cm",
  kg: "kg",
  ft: "ft",
  inch: "inch",
  lb: "lb",
  calculate: "Hesapla",
  reset: "Sıfırla",
  result: "Sonuç",
  bmi: "BMI",
  classification: "Sınıflandırma",
  advice: "Öneri",
  childNote:
    "Çocuk/ergen sınıflandırması için yaşa ve cinsiyete göre persentiller kullanılır.",
  disclaimer: "Bu uygulama medikal tanı koymaz. Sağlık uzmanına danışın.",
  nav_home: "Hesaplayıcı",
  nav_privacy: "Gizlilik",
  nav_about: "Hakkında",
  nav_support: "Destek",

  privacy_title: "Gizlilik Politikası",
  privacy_intro:
    "BodyScope BMI, kullanıcıdan kişisel veri toplamaz; hesaplamalar cihaz üzerinde yapılır ve internet gerekmez.",
  privacy_data_title: "Toplanan Veriler",
  privacy_data_body:
    "Uygulama; boy, kilo, yaş ve cinsiyet bilgileriyle BMI hesaplar. Bu veriler yalnızca cihazda işlenir ve kalıcı olarak saklanmaz.",
  privacy_permissions_title: "İzinler",
  privacy_permissions_body:
    "Uygulama kamera, konum veya rehber gibi izinler talep etmez.",
  privacy_ads_title: "Reklam ve Analitik",
  privacy_ads_body:
    "Varsayılan olarak reklam veya analitik içermez. Gelecekte eklenirse, kullanıcı onayı alınacaktır.",
  privacy_contact_title: "İletişim",
  privacy_email: "Sorular için e-posta: kadirbugrat@gmail.com",
  send_email: "E-posta gönder",

  about_title: "Hakkında",
  about_p1:
    "BodyScope BMI, yetişkin ve çocuk/ergenler için BMI hesaplama ve sınıflandırma yapan, çevrimdışı çalışan sade bir araçtır.",
  about_p2:
    "Yetişkin sınıflandırması WHO eşiklerine, çocuk/ergen sınıflandırması ise yaşa ve cinsiyete göre BMI persentillerine dayanır.",
  about_disclaimer:
    "Tıbbi tavsiye yerine geçmez. Gereksinimleriniz için sağlık profesyoneline başvurun.",
  about_version: "Sürüm: 1.0.0",

  support_title: "Destek",
  support_intro:
    "Geri bildirim, hata raporu veya özellik talebi için bize ulaşın.",
  support_email: "E-posta: kadirbugrat@gmail.com",
};

export const en: Dict = {
  title: "BMI Calculator",
  language: "Language",
  lang_tr: "Turkish",
  lang_en: "English",
  unit: "Units",
  metric: "Metric",
  imperial: "Imperial",
  sex: "Sex",
  male: "Male",
  female: "Female",
  mode: "Mode",
  adult: "Adult (18+)",
  child: "Child/Adolescent (2–20)",
  age: "Age",
  years: "years",
  height: "Height",
  weight: "Weight",
  cm: "cm",
  kg: "kg",
  ft: "ft",
  inch: "inch",
  lb: "lb",
  calculate: "Calculate",
  reset: "Reset",
  result: "Result",
  bmi: "BMI",
  classification: "Classification",
  advice: "Advice",
  childNote:
    "Child/adolescent classification uses age- and sex-specific BMI percentiles.",
  disclaimer:
    "This app does not provide medical diagnosis. Consult a healthcare professional.",
  nav_home: "Calculator",
  nav_privacy: "Privacy",
  nav_about: "About",
  nav_support: "Support",

  privacy_title: "Privacy Policy",
  privacy_intro:
    "BodyScope BMI does not collect personal data; calculations run on-device and do not require internet.",
  privacy_data_title: "Data Collected",
  privacy_data_body:
    "The app computes BMI using height, weight, age, and sex. These values are processed on the device and not stored permanently.",
  privacy_permissions_title: "Permissions",
  privacy_permissions_body:
    "The app does not request camera, location, or contacts permissions.",
  privacy_ads_title: "Ads & Analytics",
  privacy_ads_body:
    "By default, the app contains no ads or analytics. If added in the future, explicit user consent will be requested.",
  privacy_contact_title: "Contact",
  privacy_email: "For inquiries: kadirbugrat@gmail.com",
  send_email: "Send email",

  about_title: "About",
  about_p1:
    "BodyScope BMI is a simple, offline tool that calculates and classifies BMI for adults and children/adolescents.",
  about_p2:
    "Adult classification follows WHO thresholds; child/adolescent classification uses age- and sex-specific BMI percentiles.",
  about_disclaimer:
    "This is not medical advice. Please consult a healthcare professional for your needs.",
  about_version: "Version: 1.0.0",

  support_title: "Support",
  support_intro: "For feedback, bug reports, or feature requests, contact us.",
  support_email: "Email: kadirbugrat@gmail.com",
};

export const dict: Record<Lang, Dict> = { tr, en };
export const t = (lang: Lang) => (key: keyof typeof tr & keyof typeof en) =>
  dict[lang][key];
export type Translator = ReturnType<typeof t>;
