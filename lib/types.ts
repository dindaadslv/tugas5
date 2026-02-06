export interface RainData {
  tgl: string;
  ch: string | number;
  intensitas: string;
}

export interface ChartStats {
  total: number;
  avg: number;
  max: number;
}

export interface LegendItem {
  label: string;
  color: string;
}