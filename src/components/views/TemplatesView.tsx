import React from 'react';
import { Sparkles, Film, ArrowRight, Flame } from 'lucide-react';
import { PRESET_TEMPLATES } from '../../data/templates';

interface TemplatesViewProps {
  onSelectTemplate: (prompt: string, genre?: string) => void;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({ onSelectTemplate }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div>
        <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest block mb-1">
          HOLLYWOOD GENRE ARCHETYPES
        </span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Preset Movie Concepts & Templates
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Select a studio concept below to instantly generate a full 15-module Hollywood pre-production package.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRESET_TEMPLATES.map((tpl) => (
          <div
            key={tpl.id}
            className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-purple-500/50 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {tpl.genre}
                </span>
                <Flame className="w-4 h-4 text-amber-500" />
              </div>

              <h2 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                {tpl.title}
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed">
                {tpl.description}
              </p>

              <blockquote className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs italic text-slate-400 font-serif">
                "{tpl.prompt}"
              </blockquote>
            </div>

            <button
              onClick={() => onSelectTemplate(tpl.prompt, tpl.genre)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 transition-all group-hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate Movie Concept</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
