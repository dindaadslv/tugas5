'use client';

import React, { useEffect, useRef } from 'react';
import { RainData } from '@/lib/types';
import { getBMKGColor } from '@/lib/constants';

interface Props {
  data: RainData[];
}

const RainfallCanvas: React.FC<Props> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ambil 20 data terakhir agar tidak terlalu sesak
    const displayData = data.slice(-20);
    const dpr = window.devicePixelRatio || 1;
    
    // Setup dimensi
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = 300 * dpr;
    ctx.scale(dpr, dpr);

    const p = 40;
    const chartW = rect.width - p * 2;
    const chartH = 300 - p * 2;
    const barW = chartW / displayData.length - 8;
    const maxVal = Math.max(...displayData.map(d => Number(d.ch)), 10);

    ctx.clearRect(0, 0, rect.width, 300);

    // Gambar Batang
    displayData.forEach((item, i) => {
      const val = Number(item.ch);
      const barH = (val / maxVal) * chartH;
      const x = p + i * (barW + 8);
      const y = 300 - p - barH;

      // Draw Bar
      ctx.fillStyle = getBMKGColor(val);
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]);
        ctx.fill();
      } else {
        ctx.fillRect(x, y, barW, barH);
      }

      // Draw Text Value
      if (val > 0) {
        ctx.fillStyle = '#475569';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(val.toString(), x + barW / 2, y - 5);
      }

      // Draw Date Label
      ctx.save();
      ctx.translate(x + barW / 2, 300 - p + 15);
      ctx.rotate(Math.PI / 4);
      ctx.font = '9px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.textAlign = 'left';
      ctx.fillText(item.tgl.split(' ')[0], 0, 0);
      ctx.restore();
    });

    // Axis line
    ctx.strokeStyle = '#f1f5f9';
    ctx.beginPath();
    ctx.moveTo(p, 300 - p);
    ctx.lineTo(rect.width - p, 300 - p);
    ctx.stroke();

  }, [data]);

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm w-full overflow-hidden">
      <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Grafik 20 Hari Terakhir</h3>
      <canvas ref={canvasRef} className="w-full h-[300px]" style={{ touchAction: 'none' }} />
    </div>
  );
};

export default RainfallCanvas;