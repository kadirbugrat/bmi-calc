export const calcBMI = (kg: number, cm: number) => {
  const m = cm / 100;
  const bmi = kg / (m * m);
  return Number.isFinite(bmi) ? Number(bmi.toFixed(1)) : NaN;
};

export type AdultClass =
  | "Zayıf"
  | "Normal"
  | "Fazla kilolu"
  | "Obezite Sınıf I"
  | "Obezite Sınıf II"
  | "Obezite Sınıf III";

export const classifyAdult = (bmi: number): AdultClass => {
  if (bmi < 18.5) return "Zayıf";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Fazla kilolu";
  if (bmi < 35) return "Obezite Sınıf I";
  if (bmi < 40) return "Obezite Sınıf II";
  return "Obezite Sınıf III";
};

export const adultAdvice = (c: AdultClass) => {
  switch (c) {
    case "Zayıf":
      return "Kalori alımını artırın, direnç egzersizleri ve gerektiğinde profesyonel destek.";
    case "Normal":
      return "Mevcut alışkanlıkları sürdürün: dengeli beslenme, düzenli aktivite.";
    case "Fazla kilolu":
      return "Kalori/kıvam kontrolü, haftada 150+ dk orta yoğunlukta aktivite.";
    case "Obezite Sınıf I":
      return "Hedefli kilo yönetimi planı, aktivite artırımı, gerekirse klinik danışmanlık.";
    case "Obezite Sınıf II":
      return "Çok disiplinli yaklaşım düşünün; medikal değerlendirme önerilir.";
    case "Obezite Sınıf III":
      return "Uzman değerlendirmesi şart; kapsamlı kilo yönetimi programı.";
  }
};
