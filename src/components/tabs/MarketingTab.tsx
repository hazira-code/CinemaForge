import React, { useState } from 'react';
import { Megaphone, Copy, Check, Share2, Sparkles, Hash, FileText } from 'lucide-react';
import { MovieProject } from '../../types';
import { copyToClipboard } from '../../utils/exporter';

interface MarketingTabProps {
  project: MovieProject;
}

export const MarketingTab: React.FC<MarketingTabProps> = ({ project }) => {
  const { marketingPackage } = project;
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    copyToClipboard(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-pink-500/30 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Film Marketing & Press Campaign</h2>
            <p className="text-xs text-slate-400">Trailer Script, Press Releases, SEO Keywords & Social Media Campaigns</p>
          </div>
        </div>

        <span className="text-xs font-mono px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40">
          PROMO CAMPAIGN
        </span>
      </div>

      {/* Trailer Script */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-pink-400 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-400" />
            Cinematic Teaser Trailer Script
          </h3>
          <button
            onClick={() => handleCopy(marketingPackage.trailerScript, 'trailer')}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
          >
            {copiedKey === 'trailer' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === 'trailer' ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
        <p className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-200 leading-relaxed whitespace-pre-line select-all">
          {marketingPackage.trailerScript}
        </p>
      </div>

      {/* Social Media Campaign */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Instagram Caption */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Instagram Announcement Post</span>
            <button
              onClick={() => handleCopy(marketingPackage.instagramCaption, 'ig')}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              {copiedKey === 'ig' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'ig' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <p className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 leading-relaxed">
            {marketingPackage.instagramCaption}
          </p>
        </div>

        {/* Twitter Thread */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">X / Twitter Launch Thread</span>
            <button
              onClick={() => handleCopy(marketingPackage.twitterThread, 'tw')}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              {copiedKey === 'tw' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'tw' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <p className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 leading-relaxed whitespace-pre-line">
            {marketingPackage.twitterThread}
          </p>
        </div>
      </div>

      {/* Press Release & SEO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3 md:col-span-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              Official Hollywood Press Release
            </span>
            <button
              onClick={() => handleCopy(marketingPackage.pressRelease, 'press')}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              {copiedKey === 'press' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'press' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <p className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 leading-relaxed">
            {marketingPackage.pressRelease}
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <Hash className="w-4 h-4 text-cyan-400" />
            SEO Keywords
          </span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {marketingPackage.seoKeywords.map((kw, i) => (
              <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-cyan-300 font-mono">
                #{kw}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
