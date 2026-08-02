import React from 'react';
import { Film, Clock, Scissors, Play, Gauge } from 'lucide-react';
import { MovieProject } from '../../types';

interface TimelineTabProps {
  project: MovieProject;
}

export const TimelineTab: React.FC<TimelineTabProps> = ({ project }) => {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-violet-500/30 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Post-Production Editing Timeline</h2>
            <p className="text-xs text-slate-400">Assembly Cut, Transitions, Speed Ramps & Audio Syne Cues</p>
          </div>
        </div>

        <span className="text-xs font-mono px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/40">
          24.000 FPS TIMELINE
        </span>
      </div>

      {/* Editing Sequence Cards */}
      <div className="space-y-4">
        {project.editingTimeline.map((item, idx) => (
          <div
            key={idx}
            className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-violet-500/40 transition-all space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-violet-300">
                <Clock className="w-4 h-4 text-violet-400" />
                <span>TIMECODE: {item.timecode}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 border border-slate-800 text-slate-300">
                  <Scissors className="w-3 h-3 inline mr-1 text-pink-400" />
                  {item.cutType}
                </span>

                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  <Gauge className="w-3 h-3 inline mr-1 text-violet-400" />
                  {item.speed}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Visual Shot Type</span>
                <span className="text-slate-100 font-semibold">{item.shotType}</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Audio Sync Cue</span>
                <span className="text-violet-300 font-mono">{item.audioCue}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
