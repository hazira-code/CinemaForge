import React from 'react';
import { Volume2, Zap, Clock, Play, Radio } from 'lucide-react';
import { MovieProject } from '../../types';
import { playFoleySoundPreview } from '../../utils/audioSynth';

interface SoundTabProps {
  project: MovieProject;
}

export const SoundTab: React.FC<SoundTabProps> = ({ project }) => {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-cyan-500/30 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Foley & Sound Effects Timeline</h2>
            <p className="text-xs text-slate-400">Audio Design Cues, Impacts, Transitions & Environmental FX</p>
          </div>
        </div>

        <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
          {project.soundEffects.length} SFX CUES
        </span>
      </div>

      {/* SFX Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {project.soundEffects.map((sfx, idx) => (
          <div
            key={idx}
            className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {sfx.category}
              </span>

              <button
                onClick={() => playFoleySoundPreview(sfx.category)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-cyan-300 hover:text-white flex items-center gap-1.5 transition-all"
              >
                <Play className="w-3 h-3 fill-cyan-400 text-cyan-400" />
                <span>Trigger SFX</span>
              </button>
            </div>

            <h3 className="text-sm font-bold text-white">{sfx.sound}</h3>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              <span className="flex items-center gap-1 font-mono text-cyan-300">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {sfx.timing}
              </span>
              <span className="italic text-slate-400">{sfx.notes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
