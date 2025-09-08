// Place full CDC/WHO BMI-for-age LMS JSON files here:
// - cdc_bmi_lms.json : { "male": [{"ageMonths":24,"L":-1.268,"M":16.575,"S":0.0802}, ...], "female": [...] }
// - who_bmi_lms.json : same shape
// Data covers 24–240 months (2–20 years), monthly rows preferred.


// ---------- README (snippet) ----------
// 1) Kurulum
// npm i
// npm run start
// 2) Android ilk build
// expo run:android
// 3) Yayın (EAS)
// eas init
// app.json -> android.package doldur
// eas build -p android --profile production
// Play Console'a AAB yükle
// 4) Çocuk/Ergen LMS (tam veri):
// - assets/lms/cdc_bmi_lms.json dosyasını tam tabloyla doldurun (24–240 ay). Biçim örneği yukarıda.
// - Uygulama açılışında loadFullLMS('cdc') ile otomatik yüklenir. Dosya yoksa SUBSET ile çalışır.
// 5) Gizlilik/Hakkında/Destek sayfaları üst sekmelerde hazır.