// scripts/build-lms-json.mjs
// CDC & WHO LMS tablolarını indirip JSON’a çevirir.
// Çıktılar: assets/lms/cdc_bmi_lms.json ve assets/lms/who_bmi_lms.json

import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import xlsx from 'xlsx';

const outDir = path.join(process.cwd(), 'assets', 'lms');
fs.mkdirSync(outDir, { recursive: true });

// ---------- 1) CDC (2–20 yaş, aylık 24–240) ----------
const CDC_CSV =
  'https://www.cdc.gov/growthcharts/data/zscore/bmiagerev.csv'; // Kaynak: CDC Data Files

async function buildCDC() {
  console.log('CDC CSV indiriliyor...');
  const r = await fetch(CDC_CSV);
  if (!r.ok) throw new Error('CDC CSV indirilemedi: ' + r.statusText);
  const csv = await r.text();

  // Basit CSV parser
  const rows = csv
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => l.split(',').map((s) => s.replace(/^"|"$/g, '')));

  // Başlıkları bul
  const header = rows[0];
  const idx = (name) => header.indexOf(name);
  const sexI = idx('Sex');
  const ageI = idx('Agemos');
  const lI = idx('L');
  const mI = idx('M');
  const sI = idx('S');
  if ([sexI, ageI, lI, mI, sI].some((v) => v < 0)) {
    throw new Error('CDC CSV beklenen kolonları içermiyor.');
  }

  const acc = { male: [], female: [] };
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    const sex = r[sexI];
    const agemos = Number(r[ageI]);
    const L = Number(r[lI]);
    const M = Number(r[mI]);
    const S = Number(r[sI]);

    // 24–240 ay arası filtrele
    if (!Number.isFinite(agemos) || agemos < 24 || agemos > 240) continue;

    const row = { ageMonths: agemos, L, M, S };
    if (sex === '1') acc.male.push(row);
    else if (sex === '2') acc.female.push(row);
  }

  // artan yaşa göre sırala
  acc.male.sort((a, b) => a.ageMonths - b.ageMonths);
  acc.female.sort((a, b) => a.ageMonths - b.ageMonths);

  const out = path.join(outDir, 'cdc_bmi_lms.json');
  fs.writeFileSync(out, JSON.stringify(acc, null, 2), 'utf8');
  console.log('CDC JSON yazıldı ->', out);
}

// ---------- 2) WHO (5–19 yaş, 61–228 ay) + WHO 2–5 eklentisi ----------
// WHO 5–19 (z-score) Expanded tables (boys/girls, .xlsx)
const WHO_5_19_GIRLS =
  'https://cdn.who.int/media/docs/default-source/child-growth/growth-reference-5-19-years/bmi-for-age-(5-19-years)/bmi-girls-z-who-2007-exp.xlsx';
const WHO_5_19_BOYS =
  'https://cdn.who.int/media/docs/default-source/child-growth/growth-reference-5-19-years/bmi-for-age-(5-19-years)/bmi-boys-z-who-2007-exp.xlsx';

// WHO 2–5 (z-scores) – boys/girls (Excel); WHO Child Growth Standards sayfasından
const WHO_2_5_GIRLS =
  'https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/body-mass-index-for-age/bmi-girls-2-5-zscores.xlsx';
const WHO_2_5_BOYS =
  'https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/body-mass-index-for-age/bmi-boys-2-5-zscores.xlsx';

// Bir xlsx dosyasından (tek sayfa veya ilk sayfa) {ageMonths,L,M,S} çıkar
function extractWHO_LMS_from_xlsx(buf, sexLabel) {
  const wb = xlsx.read(buf, { type: 'buffer' });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const json = xlsx.utils.sheet_to_json(ws, { defval: null });

  // WHO tablolarında genelde AGE (years or months), L, M, S kolonları bulunur.
  // Bazı dosyalarda AgeYears/Agemos şeklinde olabilir; ihtimalleri karşılayalım.
  const findKey = (obj, candidates) =>
    candidates.find((k) => Object.keys(obj).some((x) => String(x).toLowerCase().includes(k)));

  const out = [];
  for (const row of json) {
    const ageKey = findKey(row, ['agemonth', 'agemos', 'age (months)', 'months', 'age']);
    const lKey = findKey(row, [' l', ' l ', 'l']);
    const mKey = findKey(row, [' m', ' m ', 'm']);
    const sKey = findKey(row, [' s', ' s ', 's']);

    if (!ageKey || !lKey || !mKey || !sKey) continue;

    let ageMonths = Number(row[ageKey]);
    if (!Number.isFinite(ageMonths) && row[ageKey] != null) {
      // bazı WHO tablolarında yaş yıl olarak gelebilir; 12 ile çarp
      const ageYears = Number(row[ageKey]);
      if (Number.isFinite(ageYears)) ageMonths = Math.round(ageYears * 12);
    }

    const L = Number(row[lKey]);
    const M = Number(row[mKey]);
    const S = Number(row[sKey]);

    if ([ageMonths, L, M, S].every((v) => Number.isFinite(v))) {
      out.push({ ageMonths, L, M, S });
    }
  }

  // sıralama + tekrarları temizle
  const map = new Map();
  for (const r of out) map.set(r.ageMonths, r);
  return Array.from(map.values()).sort((a, b) => a.ageMonths - b.ageMonths);
}

async function fetchBuf(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error('İndirme hatası: ' + url);
  return Buffer.from(await r.arrayBuffer());
}

async function buildWHO() {
  console.log('WHO XLSX indiriliyor (5–19)...');
  const girls519 = await fetchBuf(WHO_5_19_GIRLS);
  const boys519 = await fetchBuf(WHO_5_19_BOYS);

  console.log('WHO XLSX indiriliyor (2–5)...');
  let girls25 = [], boys25 = [];
  try {
    girls25 = extractWHO_LMS_from_xlsx(await fetchBuf(WHO_2_5_GIRLS), 'female');
    boys25 = extractWHO_LMS_from_xlsx(await fetchBuf(WHO_2_5_BOYS), 'male');
  } catch (e) {
    console.warn('WHO 2–5 verileri bulunamadı, yalnızca 5–19 yüklenecek.');
  }

  const female519 = extractWHO_LMS_from_xlsx(girls519, 'female');
  const male519 = extractWHO_LMS_from_xlsx(boys519, 'male');

  // 2–5 (24–60) ile 5–19 (61–228) birleştir
  const female = [...girls25.filter((r) => r.ageMonths >= 24 && r.ageMonths <= 60), ...female519];
  const male = [...boys25.filter((r) => r.ageMonths >= 24 && r.ageMonths <= 60), ...male519];

  // tekrarları (çakışan aylar) temizle
  const uniqByMonth = (arr) =>
    Array.from(new Map(arr.map((r) => [r.ageMonths, r])).values()).sort((a, b) => a.ageMonths - b.ageMonths);

  const outData = {
    female: uniqByMonth(female),
    male: uniqByMonth(male),
  };

  const out = path.join(outDir, 'who_bmi_lms.json');
  fs.writeFileSync(out, JSON.stringify(outData, null, 2), 'utf8');
  console.log('WHO JSON yazıldı ->', out);
}

(async () => {
  try {
    await buildCDC();
    await buildWHO();
    console.log('TAMAMLANDI ✅');
  } catch (e) {
    console.error('HATA:', e);
    console.error('\\nİPUCU: Linkler engellenirse dosyaları elle indirip scripts’i şu yollarla okutabilirsin:');
    console.error('  - CDC CSV: assets/raw/bmiagerev.csv');
    console.error('  - WHO xlsx (girls/boys 5–19, girls/boys 2–5): assets/raw/… .xlsx');
  }
})();
