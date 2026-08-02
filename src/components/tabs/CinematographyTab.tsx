import React from 'react';
import { Aperture, Sun, Move, Maximize2, Layers, Thermometer, Eye } from 'lucide-react';
import { MovieProject } from '../../types';

interface CinematographyTabProps {
  project: MovieProject;
}

export const CinematographyTab: React.FC<CinematographyTabProps> = ({ project }) => {
  const { cinematography } = project;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-blue-500/30 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Aperture className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Director of Photography Guide</h2>
            <p className="text-xs text-slate-400">Optical Specs, Lighting Architecture & Visual Aesthetics</p>
          </div>
        </div>

        <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-mono bg-blue-500/20 text-blue-300 border border-blue-500/40">
          MOOD: {cinematography.mood.toUpperCase()}
        </span>
      </div>

      {/* Optical & Lens Specs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Maximize2 className="w-4 h-4" />
            <span>Camera Angles</span>
          </div>
          <p className="text-sm font-semibold text-white">{cinematography.cameraAngle}</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
            <Aperture className="w-4 h-4" />
            <span>Lens Package</span>
          </div>
          <p className="text-sm font-semibold text-white">{cinematography.cameraLens}</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>Depth of Field</span>
          </div>
          <p className="text-sm font-semibold text-white">{cinematography.depthOfField}</p>
        </div>
      </div>

      {/* Lighting Architecture Section */}
      <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-400" />
            Lighting Setup & Color Temperature
          </h3>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <Thermometer className="w-3.5 h-3.5 inline mr-1" />
            {cinematography.colorTemperature}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <p className="text-[10px] font-bold text-amber-400 uppercase mb-1">Key Light</p>
            <p className="text-xs text-slate-200 font-medium">{cinematography.lighting.key}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <p className="text-[10px] font-bold text-blue-400 uppercase mb-1">Fill Light</p>
            <p className="text-xs text-slate-200 font-medium">{cinematography.lighting.fill}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <p className="text-[10px] font-bold text-purple-400 uppercase mb-1">Rim / Backlight</p>
            <p className="text-xs text-slate-200 font-medium">{cinematography.lighting.backlight}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <p className="text-[10px] font-bold text-emerald-400 uppercase mb-1">Practicals & Ambient</p>
            <p className="text-xs text-slate-200 font-medium">{cinematography.lighting.practicals}</p>
          </div>
        </div>
      </div>

      {/* Movement & Composition */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <h3 className="text-xs font-bold text-pink-400 uppercase tracking-wider flex items-center gap-2">
            <Move className="w-4 h-4" />
            Camera Movement Mode
          </h3>
          <p className="text-xs text-slate-200 leading-relaxed">{cinematography.movementStyle}</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Composition & Framing Rules
          </h3>
          <p className="text-xs text-slate-200 leading-relaxed">{cinematography.compositionRules}</p>
        </div>
      </div>
    </div>
  );
};
