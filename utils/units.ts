export type Units = "metric" | "imperial";

export const toMetric = (
  units: Units,
  height: { cm?: number; ft?: number; inch?: number },
  weight: { kg?: number; lb?: number }
) => {
  let cm = 0;
  let kg = 0;
  if (units === "metric") {
    cm = height.cm ?? 0;
    kg = weight.kg ?? 0;
  } else {
    const totalInches = (height.ft ?? 0) * 12 + (height.inch ?? 0);
    cm = totalInches * 2.54;
    kg = (weight.lb ?? 0) * 0.45359237;
  }
  return { cm, kg };
};

export const formatNumber = (n: number) => {
  if (Number.isNaN(n) || !Number.isFinite(n)) return "-";
  return n.toLocaleString("tr-TR", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });
};
