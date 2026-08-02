import React, { useState } from 'react';
import { Mic, Volume2, Square, Play, Sparkles, Clock, Music } from 'lucide-react';
import { MovieProject } from '../../types';
import { speakNarrationText } from '../../utils/audioSynth';

interface VoiceTabProps {
  project: MovieProject;
}

export const VoiceTab: React.FC<VoiceTabProps> = ({ project }) => {
  const { voiceover } = project;
  const [isPlaying, setIsPlaying] = useState(false);
  const [synthHandle, setSynthHandle] = useState<{ stop: () => void } | null>(null);

  const handlePlayNarration = () => {
    if (isPlaying) {
      synthHandle?.stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      const handle = speakNarrationText(voiceover.narration, () => {
        setIsPlaying(false);
      });
      setSynthHandle(handle);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-amber-500/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Voice-Over & Dialogue Audio</h2>
            <p className="text-xs text-slate-400">Narration Scripts, Voice Cues & Atmospheric Cues</p>
          </div>
        </div>

        <button
          onClick={handlePlayNarration}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg transition-all ${
            isPlaying
              ? 'bg-rose-600 text-white shadow-rose-600/30 animate-pulse'
              : 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:from-amber-400 hover:to-orange-400 shadow-amber-500/20'
          }`}
        >
          {isPlaying ? <Square className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-slate-950" />}
          <span>{isPlaying ? 'Stop Voice Narration' : 'Listen Narration Preview'}</span>
        </button>
      </div>

      {/* Main Narration Box */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-amber-400" />
          Master Narration Script
        </h3>
        <blockquote className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-100 text-base italic leading-relaxed font-serif">
          "{voiceover.narration}"
        </blockquote>
      </div>

      {/* Voice Profiles & Ambience Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Character Voice Profiles */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Mic className="w-4 h-4 text-orange-400" />
            Voice Profiles & Delivery
          </h3>

          <div className="space-y-3">
            {voiceover.characterVoices.map((cv, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-white">{cv.character}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/20 text-orange-300">
                    {cv.speed} Speed
                  </span>
                </div>
                <p className="text-xs text-slate-300"><span className="text-slate-400">Style:</span> {cv.voiceStyle}</p>
                <p className="text-xs text-slate-300"><span className="text-slate-400">Emotion:</span> {cv.emotion}</p>
                <p className="text-xs text-amber-300 font-mono"><span className="text-slate-400">Pause Cue:</span> {cv.pauseTiming}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Background Ambience */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Music className="w-4 h-4 text-emerald-400" />
            Background Audio Ambience
          </h3>

          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 leading-relaxed space-y-2">
            <p className="font-semibold text-emerald-400 uppercase tracking-wider text-[10px]">Foley & Environmental Layer</p>
            <p className="text-slate-200">{voiceover.backgroundAmbience}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
