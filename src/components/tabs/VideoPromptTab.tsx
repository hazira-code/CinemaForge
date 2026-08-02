import React, { useState } from 'react';
import { Video, Sparkles, Copy, Check, Tv, Cpu, Shield, Zap } from 'lucide-react';
import { MovieProject } from '../../types';
import { copyToClipboard } from '../../utils/exporter';

interface VideoPromptTabProps {
  project: MovieProject;
}

export const VideoPromptTab: React.FC<VideoPromptTabProps> = ({ project }) => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopyPrompt = (promptText: string, idx: number) => {
    copyToClipboard(promptText);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-purple-500/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">AI Video Prompts</h2>
            <p className="text-xs text-slate-400">Formatted for Google Veo, Runway Gen-3 Alpha, Sora, Luma Dream Machine & Pika</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40">
            24 FPS CINEMATIC
          </span>
        </div>
      </div>

      {/* Video Cards */}
      <div className="space-y-6">
        {project.videoPrompts.map((vp, idx) => {
          const fullPromptText = `${vp.subject}, ${vp.action}, ${vp.cameraMovement}, ${vp.lighting}, ${vp.environment}, ${vp.style}, ${vp.lens}, ${vp.aspectRatio}, ${vp.motion}, ${vp.physics}`;

          return (
            <div
              key={idx}
              className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-purple-500/40 transition-all space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-600/20 text-purple-300 font-bold text-xs flex items-center justify-center border border-purple-500/30">
                    V{idx + 1}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      Target Engine: {vp.targetPlatform}
                    </h3>
                    <p className="text-xs text-purple-300">{vp.mood} • {vp.aspectRatio} Aspect Ratio</p>
                  </div>
                </div>

                <button
                  onClick={() => handleCopyPrompt(fullPromptText, idx)}
                  className="px-3.5 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/30 text-xs font-semibold text-purple-200 flex items-center gap-1.5 transition-all"
                >
                  {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedIdx === idx ? 'Copied Prompt' : 'Copy Video Prompt'}</span>
                </button>
              </div>

              {/* Master Prompt Output */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <p className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Full Prompt String</p>
                <p className="text-xs text-slate-200 font-mono select-all leading-relaxed">{fullPromptText}</p>
              </div>

              {/* Parameter Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase block">Subject & Action</span>
                  <span className="text-slate-200 font-medium">{vp.subject} — {vp.action}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase block">Camera Movement</span>
                  <span className="text-slate-200 font-medium">{vp.cameraMovement}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase block">Lighting & Lens</span>
                  <span className="text-slate-200 font-medium">{vp.lighting} ({vp.lens})</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase block">Motion & Physics</span>
                  <span className="text-slate-200 font-medium">{vp.motion} ({vp.physics})</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
