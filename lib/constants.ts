import harianRaw from '@/data/harian.json';
import { LegendItem, RainData } from './types';

// Konversi data string ke number agar aman diolah
export const INITIAL_DATA: RainData[] = harianRaw.map(item => ({
  ...item,
  ch: parseFloat(item.ch.toString())
}));

export const LEGEND_ITEMS: LegendItem[] = [
  { label: 'Tidak Ada Hujan (0 mm)', color: '#e2e8f0' },
  { label: 'Hujan Ringan (0.5 - 20 mm)', color: '#60a5fa' },
  { label: 'Hujan Sedang (20 - 50 mm)', color: '#3b82f6' },
  { label: 'Hujan Lebat (50 - 100 mm)', color: '#ef4444' },
  { label: 'Sangat Lebat (> 100 mm)', color: '#7f1d1d' },
];

export const getBMKGColor = (ch: number) => {
  if (ch <= 0) return '#e2e8f0';
  if (ch <= 20) return '#60a5fa';
  if (ch <= 50) return '#3b82f6';
  if (ch <= 100) return '#ef4444';
  return '#7f1d1d';
};