import React from 'react';
import { Camera, Eye, Clock, ShieldAlert, ArrowUpRight, ListFilter } from 'lucide-react';
import { MovieProject } from '../../types';

interface ShotListTabProps {
  project: MovieProject;
}

export const ShotListTab: React.FC<ShotListTabProps> = ({ project }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-5 rounded-2xl border border-cyan-500/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Camera Shot List</h2>
            <p className="text-xs text-slate-400">Cinematographer & First AC Production Schedule</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-cyan-300 font-mono">
          <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            {project.shotList.length} TOTAL SHOTS
          </span>
        </div>
      </div>

      {/* Shot Cards Grid / Table */}
      <div className="space-y-4">
        {project.shotList.map((shot, idx) => (
          <div
            key={idx}
            className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white font-bold font-mono text-xs flex items-center justify-center shadow-md shadow-cyan-600/20">
                  {shot.shotNumber}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    Scene {shot.sceneNumber} • {shot.shotType}
                  </h3>
                  <p className="text-xs text-slate-400">{shot.frameSize} Frame</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  {shot.duration}
                </span>

                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                    shot.priority === 'High'
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      : shot.priority === 'Medium'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}
                >
                  {shot.priority} Priority
                </span>
              </div>
            </div>

            {/* Spec Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <p className="text-[10px] font-semibold text-slate-400 uppercase mb-1">Camera Lens</p>
                <p className="font-mono text-cyan-300 font-semibold">{shot.lens}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <p className="text-[10px] font-semibold text-slate-400 uppercase mb-1">Movement</p>
                <p className="font-mono text-slate-200 font-medium">{shot.movement}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 sm:col-span-2">
                <p className="text-[10px] font-semibold text-slate-400 uppercase mb-1">Narrative Purpose</p>
                <p className="text-slate-200 leading-snug">{shot.purpose}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
