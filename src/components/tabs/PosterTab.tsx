import React, { useState } from 'react';
import { Image, Sparkles, Copy, Check, RefreshCw, Layers } from 'lucide-react';
import { MovieProject } from '../../types';
import { copyToClipboard } from '../../utils/exporter';

interface PosterTabProps {
  project: MovieProject;
}

export const PosterTab: React.FC<PosterTabProps> = ({ project }) => {
  const { posterPrompts } = project;
  const [generatedPoster, setGeneratedPoster] = useState<string | null>(posterPrompts.generatedPosterUrl || null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleGeneratePoster = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: posterPrompts.moviePoster, aspectRatio: '3:4' }),
      });
      const data = await res.json();
      if (data.imageUrl) {
        setGeneratedPoster(data.imageUrl);
      }
    } catch (err) {
      console.error('Poster gen error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string, key: string) => {
    copyToClipboard(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-yellow-500/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
            <Image className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Poster & Key Art Prompts</h2>
            <p className="text-xs text-slate-400">Theatrical Key Art, Netflix Banner, YouTube Thumbnail & Instagram Graphics</p>
          </div>
        </div>

        <button
          onClick={handleGeneratePoster}
          disabled={isGenerating}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-yellow-500/20 transition-all hover:scale-105"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Rendering Theatrical Key Art...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>{generatedPoster ? 'Re-render AI Movie Poster' : 'Generate AI Movie Poster Preview'}</span>
            </>
          )}
        </button>
      </div>

      {/* Generated Poster Spotlight */}
      {generatedPoster && (
        <div className="glass-panel p-6 rounded-3xl border border-yellow-500/40 text-center space-y-4 max-w-md mx-auto">
          <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-widest">
            AI Generated Theatrical Key Art
          </h3>
          <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
            <img src={generatedPoster} alt="Movie Poster" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      {/* Prompts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Theatrical Poster */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider">Theatrical Poster (2:3 Aspect)</span>
            <button
              onClick={() => handleCopy(posterPrompts.moviePoster, 'poster')}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              {copiedKey === 'poster' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'poster' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <p className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-200 leading-relaxed select-all">
            {posterPrompts.moviePoster}
          </p>
        </div>

        {/* Netflix Thumbnail */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Netflix Widescreen Banner (16:9)</span>
            <button
              onClick={() => handleCopy(posterPrompts.netflixThumbnail, 'netflix')}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              {copiedKey === 'netflix' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'netflix' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <p className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-200 leading-relaxed select-all">
            {posterPrompts.netflixThumbnail}
          </p>
        </div>

        {/* YouTube Thumbnail */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">YouTube Trailer Thumbnail (16:9)</span>
            <button
              onClick={() => handleCopy(posterPrompts.youtubeThumbnail, 'youtube')}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              {copiedKey === 'youtube' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'youtube' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <p className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-200 leading-relaxed select-all">
            {posterPrompts.youtubeThumbnail}
          </p>
        </div>

        {/* Instagram Poster */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">Instagram Square Promo (1:1)</span>
            <button
              onClick={() => handleCopy(posterPrompts.instagramPoster, 'ig')}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              {copiedKey === 'ig' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'ig' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <p className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-200 leading-relaxed select-all">
            {posterPrompts.instagramPoster}
          </p>
        </div>
      </div>
    </div>
  );
};
