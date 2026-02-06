'use client';

import React, { useMemo } from 'react';
import { INITIAL_DATA, LEGEND_ITEMS } from '@/lib/constants';
import { ChartStats } from '@/lib/types';
import RainfallCanvas from '@/components/RainfallCanvas';

export default function Home() {
  const data = INITIAL_DATA;

  const stats = useMemo<ChartStats>(() => {
    const validData = data.map(d => Number(d.ch));
    const total = validData.reduce((sum, val) => sum + val, 0);
    const rainyDays = validData.filter(val => val > 0).length;
    const avg = rainyDays > 0 ? total / rainyDays : 0;
    const max = Math.max(...validData);
    return { total, avg, max };
  }, [data]);

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header ala BMKG */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-blue-600 text-white p-3 rounded-xl shadow-lg shadow-blue-100 text-2xl">🌧️</div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">Monitoring Curah Hujan</h1>
            <p className="text-slate-500 text-xs font-medium">Stasiun Ibun, Bandung • Data Terolah Des 2025 - Feb 2026</p>
          </div>
        </div>

        {/* Statistik Ringkas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard label="Total Curah Hujan" value={stats.total.toFixed(1)} unit="mm" color="text-blue-600" />
          <StatCard label="Rata-rata (Hari Hujan)" value={stats.avg.toFixed(1)} unit="mm" color="text-emerald-600" />
          <StatCard label="CH Tertinggi" value={stats.max.toFixed(1)} unit="mm" color="text-amber-500" />
        </div>

        {/* Chart Canvas */}
        <RainfallCanvas data={data} />

        {/* Legenda Intensitas */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Keterangan Intensitas (BMKG)</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {LEGEND_ITEMS.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-[10px] text-slate-500 font-medium leading-tight">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <footer className="text-center py-4">
          <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">
            Data Processed Successfully • Canvas API Rendered
          </p>
        </footer>
      </div>
    </main>
  );
}

function StatCard({ label, value, unit, color }: any) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm transition-transform hover:scale-[1.02]">
      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">{label}</p>
      <p className={`text-3xl font-black ${color}`}>{value} <span className="text-sm font-normal text-slate-300">{unit}</span></p>
    </div>
  );
}