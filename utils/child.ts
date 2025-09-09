// Full CDC/WHO integration scaffold. This loader reads LMS tables (L,M,S)
// Lightweight embedded fallback (subset) so app runs out-of-the-box.
const SUBSET = {
  male: [
    { ageMonths: 24, L: -1.268, M: 16.575, S: 0.0802 },
    { ageMonths: 60, L: -1.46, M: 15.742, S: 0.0833 },
    { ageMonths: 120, L: -2.036, M: 17.55, S: 0.095 },
    { ageMonths: 180, L: -2.145, M: 21.11, S: 0.121 },
    { ageMonths: 240, L: -2.219, M: 22.58, S: 0.125 },
  ],
  female: [
    { ageMonths: 24, L: -1.274, M: 16.352, S: 0.0851 },
    { ageMonths: 60, L: -1.467, M: 15.552, S: 0.0874 },
    { ageMonths: 120, L: -2.018, M: 17.34, S: 0.095 },
    { ageMonths: 180, L: -2.1, M: 20.85, S: 0.118 },
    { ageMonths: 240, L: -2.108, M: 21.58, S: 0.12 },
  ],
} as const;

let LMS_TABLE: {
  male: { ageMonths: number; L: number; M: number; S: number }[];
  female: { ageMonths: number; L: number; M: number; S: number }[];
} = SUBSET as any;

// Optional: switch to WHO by changing the import path.
// en üstteki LMS_TABLE aynı kalsın

export const loadFullLMS = async (source: 'cdc' | 'who' = 'cdc') => {
  try {
    const mod =
      source === 'cdc'
        ? await import('../assets/lms/cdc_bmi_lms.json')
        : await import('../assets/lms/who_bmi_lms.json');

    // Metro JSON importunda veri mod.default altında olabilir
    // @ts-ignore
    LMS_TABLE = (mod as any).default ?? (mod as any);
  } catch (e) {
    // Dosyalar yoksa SUBSET ile devam edeceğiz; sessizce geç.
  }
};


const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const getLMSInterpolated = (sex: Sex, months: number) => {
  const rows = LMS_TABLE[sex];
  if (!rows || rows.length === 0) throw new Error("LMS table missing");
  if (months <= rows[0].ageMonths) return rows[0];
  if (months >= rows[rows.length - 1].ageMonths) return rows[rows.length - 1];
  const i = rows.findIndex((r) => r.ageMonths >= months);
  const lo = rows[i - 1];
  const hi = rows[i];
  const t = (months - lo.ageMonths) / (hi.ageMonths - lo.ageMonths);
  return {
    ageMonths: months,
    L: lerp(lo.L, hi.L, t),
    M: lerp(lo.M, hi.M, t),
    S: lerp(lo.S, hi.S, t),
  };
};

// Compute percentile from BMI using LMS method
export const bmiPercentile = (bmi: number, sex: Sex, ageYears: number) => {
  const months = Math.round(ageYears * 12);
  const { L, M, S } = getLMSInterpolated(sex, months);
  const z =
    L === 0 ? Math.log(bmi / M) / S : (Math.pow(bmi / M, L) - 1) / (L * S);
  const p = 0.5 * (1 + erf(z / Math.SQRT2));
  return p * 100;
};

function erf(x: number) {
  const a1 = 0.254829592,
    a2 = -0.284496736,
    a3 = 1.421413741,
    a4 = -1.453152027,
    a5 = 1.061405429;
  const p = 0.3275911;
  const sign = x < 0 ? -1 : 1;
  const absx = Math.abs(x);
  const t = 1 / (1 + p * absx);
  const y =
    1 -
    ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-absx * absx);
  return sign * y;
}

export type ChildClass =
  | "Zayıf (<5p)"
  | "Sağlıklı (5–85p)"
  | "Fazla kilolu (85–95p)"
  | "Obez (≥95p)";

export const classifyChild = (percentile: number): ChildClass => {
  if (percentile < 5) return "Zayıf (<5p)";
  if (percentile < 85) return "Sağlıklı (5–85p)";
  if (percentile < 95) return "Fazla kilolu (85–95p)";
  return "Obez (≥95p)";
};

export const childAdvice = (c: ChildClass) => {
  switch (c) {
    case "Zayıf (<5p)":
      return "Büyüme ve beslenme değerlendirmesi için sağlık uzmanına başvurun.";
    case "Sağlıklı (5–85p)":
      return "Dengeli beslenme ve yaşa uygun fiziksel aktiviteyi sürdürün.";
    case "Fazla kilolu (85–95p)":
      return "Beslenme ve ekran süresi düzenlemeleri, aile odaklı aktivite artışı.";
    case "Obez (≥95p)":
      return "Çok yönlü değerlendirme ve izlem için klinik destek alın.";
  }
};
