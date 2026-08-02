import React, { useState } from 'react';
import { Music, Play, Square, Disc, Sparkles, Copy, Check, Radio } from 'lucide-react';
import { MovieProject } from '../../types';
import { playCinematicMusicPreview, ActiveSynthHandle } from '../../utils/audioSynth';
import { copyToClipboard } from '../../utils/exporter';

interface MusicTabProps {
  project: MovieProject;
}

export const MusicTab: React.FC<MusicTabProps> = ({ project }) => {
  const { music } = project;
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSynth, setActiveSynth] = useState<ActiveSynthHandle | null>(null);
  const [copied, setCopied] = useState(false);

  const handleTogglePlay = () => {
    if (isPlaying) {
      activeSynth?.stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      const bpm = parseInt(music.tempo) || 74;
      const keyVal = music.key.includes('A') ? 'A' : 'D';
      const synth = playCinematicMusicPreview(bpm, keyVal);
      setActiveSynth(synth);
    }
  };

  const handleCopyPrompt = () => {
    copyToClipboard(music.musicPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Disc className={`w-6 h-6 ${isPlaying ? 'animate-spin' : ''}`} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Cinematic Music & Score</h2>
            <p className="text-xs text-slate-400">Orchestration, Tempo, Key & AI Music Prompts</p>
          </div>
        </div>

        <button
          onClick={handleTogglePlay}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xl transition-all ${
            isPlaying
              ? 'bg-rose-600 text-white shadow-rose-600/30 animate-pulse'
              : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 shadow-emerald-500/20'
          }`}
        >
          {isPlaying ? <Square className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-slate-950" />}
          <span>{isPlaying ? 'Stop Score Preview' : 'Play Synthesized Score Preview'}</span>
        </button>
      </div>

      {/* Music Spec Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <p className="text-[10px] font-bold text-emerald-400 uppercase mb-1">Musical Genre</p>
          <p className="text-sm font-semibold text-white">{music.genre}</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <p className="text-[10px] font-bold text-cyan-400 uppercase mb-1">Mood & Atmosphere</p>
          <p className="text-sm font-semibold text-white">{music.mood}</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <p className="text-[10px] font-bold text-purple-400 uppercase mb-1">Tempo & Key</p>
          <p className="text-sm font-mono font-semibold text-white">{music.tempo} • Key of {music.key}</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <p className="text-[10px] font-bold text-amber-400 uppercase mb-1">Influences & References</p>
          <p className="text-sm font-semibold text-white truncate">{music.referenceStyle}</p>
        </div>
      </div>

      {/* Instrumentation Tags */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Instrumentation & Orchestra Stems</h3>
        <div className="flex flex-wrap gap-2">
          {music.instrumentation.map((inst, i) => (
            <span
              key={i}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-emerald-300 flex items-center gap-1.5"
            >
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              <span>{inst}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Midjourney / Lyria Music Prompt */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Suno / Udio / Lyria Music Generation Prompt
          </h3>
          <button
            onClick={handleCopyPrompt}
            className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 flex items-center gap-1.5 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Prompt'}</span>
          </button>
        </div>

        <p className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-200 leading-relaxed select-all">
          {music.musicPrompt}
        </p>
      </div>
    </div>
  );
};
