import React from 'react';
import { Palette, Film, Sliders, Sun, Shield, Layers } from 'lucide-react';
import { MovieProject } from '../../types';

interface ColorTabProps {
  project: MovieProject;
}

export const ColorTab: React.FC<ColorTabProps> = ({ project }) => {
  const { colorGrading } = project;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Palette className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Color Grading & Look Book</h2>
            <p className="text-xs text-slate-400">LUT Style Profiles, Color Palettes & Contrast Curves</p>
          </div>
        </div>

        <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40">
          LUT: {colorGrading.lutStyle}
        </span>
      </div>

      {/* Color Swatches Grid */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Palette className="w-4 h-4 text-purple-400" />
          Primary Film Color Palette Swatches
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {colorGrading.palette.map((hex, i) => (
            <div key={i} className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-2">
              <div
                className="w-full h-16 rounded-xl border border-white/10 shadow-lg"
                style={{ backgroundColor: hex }}
              />
              <span className="text-xs font-mono text-slate-200 font-bold block">{hex}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Grading Curve Parameters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
          <p className="text-[10px] font-bold text-purple-400 uppercase">Contrast Curve</p>
          <p className="text-sm font-semibold text-white">{colorGrading.contrast}</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
          <p className="text-[10px] font-bold text-blue-400 uppercase">Exposure EV</p>
          <p className="text-sm font-semibold text-white">{colorGrading.exposure}</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
          <p className="text-[10px] font-bold text-pink-400 uppercase">Saturation</p>
          <p className="text-sm font-semibold text-white">{colorGrading.saturation}</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
          <p className="text-[10px] font-bold text-amber-400 uppercase">Highlights Tint</p>
          <p className="text-sm font-semibold text-white">{colorGrading.highlights}</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
          <p className="text-[10px] font-bold text-indigo-400 uppercase">Shadows Offset</p>
          <p className="text-sm font-semibold text-white">{colorGrading.shadows}</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
          <p className="text-[10px] font-bold text-emerald-400 uppercase">Film Stock Reference</p>
          <p className="text-sm font-semibold text-white">Kodak Vision3 500T 5219</p>
        </div>
      </div>

      {/* Film References List */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Film className="w-4 h-4 text-purple-400" />
          Cinematic Visual References
        </h3>

        <div className="flex flex-wrap gap-2">
          {colorGrading.filmReferences.map((ref, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200"
            >
              🎬 {ref}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
