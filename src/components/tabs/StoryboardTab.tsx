import React, { useState } from 'react';
import { Image, Sparkles, Copy, Check, RefreshCw, Eye, Download, Layers } from 'lucide-react';
import { MovieProject, StoryboardFrame } from '../../types';
import { copyToClipboard } from '../../utils/exporter';

interface StoryboardTabProps {
  project: MovieProject;
}

export const StoryboardTab: React.FC<StoryboardTabProps> = ({ project }) => {
  const [storyboardFrames, setStoryboardFrames] = useState<StoryboardFrame[]>(project.storyboardPrompts);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [generatingIdx, setGeneratingIdx] = useState<number | null>(null);

  const handleCopyPrompt = (promptText: string, idx: number) => {
    copyToClipboard(promptText);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleGeneratePreview = async (frame: StoryboardFrame, idx: number) => {
    setGeneratingIdx(idx);
    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: frame.imagePrompt, aspectRatio: '16:9' }),
      });
      const data = await res.json();
      if (data.imageUrl) {
        const updated = [...storyboardFrames];
        updated[idx] = { ...updated[idx], generatedImageUrl: data.imageUrl };
        setStoryboardFrames(updated);
      }
    } catch (err) {
      console.error('Image gen error:', err);
    } finally {
      setGeneratingIdx(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-pink-500/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
            <Image className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">AI Storyboard Prompts</h2>
            <p className="text-xs text-slate-400">Optimized for Midjourney v6, Flux.1, DALL-E 3 & Imagen 3</p>
          </div>
        </div>

        <span className="text-xs font-mono px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40">
          {storyboardFrames.length} KEY FRAMES
        </span>
      </div>

      {/* Frame Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {storyboardFrames.map((frame, idx) => (
          <div
            key={idx}
            className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-pink-500/40 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Image Preview Canvas or Placeholder */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center group">
                {frame.generatedImageUrl ? (
                  <img
                    src={frame.generatedImageUrl}
                    alt={frame.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="p-6 text-center space-y-2">
                    <Layers className="w-8 h-8 text-slate-600 mx-auto" />
                    <p className="text-xs font-semibold text-slate-400">Scene {frame.sceneNumber} • Frame {frame.frameNumber}</p>
                    <p className="text-[11px] text-slate-500 max-w-xs">{frame.title}</p>
                  </div>
                )}

                {/* Overlay Action Button */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <button
                    onClick={() => handleGeneratePreview(frame, idx)}
                    disabled={generatingIdx === idx}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold text-xs flex items-center gap-2 shadow-xl hover:scale-105 transition-all"
                  >
                    {generatingIdx === idx ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Rendering AI Preview...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>{frame.generatedImageUrl ? 'Re-render Frame' : 'Generate Visual AI Preview'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Title & Specs */}
              <div>
                <h3 className="text-base font-bold text-white flex items-center justify-between">
                  <span>Scene {frame.sceneNumber}: {frame.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-pink-300">
                    {frame.style}
                  </span>
                </h3>
              </div>

              {/* Prompts Box */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-pink-400 uppercase">Image Prompt (Midjourney / Flux)</span>
                    <button
                      onClick={() => handleCopyPrompt(frame.imagePrompt, idx)}
                      className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      {copiedIdx === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedIdx === idx ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-slate-200 leading-relaxed font-mono text-[11px] select-all bg-slate-900/90 p-2.5 rounded-xl border border-slate-800/80">
                    {frame.imagePrompt}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-rose-400 uppercase block mb-1">Negative Prompt</span>
                  <p className="text-slate-400 text-[10px] font-mono">{frame.negativePrompt}</p>
                </div>
              </div>

              {/* Technical Breakdown */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-slate-400 block text-[9px] uppercase font-semibold">Camera & Angle</span>
                  <span className="text-slate-200 font-medium">{frame.camera}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-slate-400 block text-[9px] uppercase font-semibold">Lighting & Atmosphere</span>
                  <span className="text-slate-200 font-medium">{frame.lighting}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-slate-400 block text-[9px] uppercase font-semibold">Character Expression</span>
                  <span className="text-slate-200 font-medium">{frame.expression}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-slate-400 block text-[9px] uppercase font-semibold">Rendering Engine</span>
                  <span className="text-slate-200 font-medium">{frame.renderingStyle}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
