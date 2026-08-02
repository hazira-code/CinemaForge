import React, { useState } from 'react';
import { Settings, Cpu, Key, Volume2, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-pro');
  const [enableAudioSynth, setEnableAudioSynth] = useState(true);
  const [enableHighResPrompts, setEnableHighResPrompts] = useState(true);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div>
        <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest block mb-1">
          PLATFORM PREFERENCES
        </span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Studio Configuration</h1>
        <p className="text-sm text-slate-400 mt-1">
          Configure AI intelligence models, audio synthesis engines, and export formatting parameters.
        </p>
      </div>

      <div className="space-y-6">
        {/* AI Model Intelligence */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">AI Engine Model Selection</h2>
              <p className="text-xs text-slate-400">Google Gemini Models for Pre-Production Generation</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <button
              onClick={() => setSelectedModel('gemini-2.5-pro')}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedModel === 'gemini-2.5-pro'
                  ? 'bg-purple-600/20 border-purple-500/50 text-white shadow-lg shadow-purple-600/10'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm text-purple-300">Gemini 2.5 Pro</span>
                <CheckCircle2 className={`w-4 h-4 ${selectedModel === 'gemini-2.5-pro' ? 'text-purple-400' : 'text-slate-600'}`} />
              </div>
              <p className="text-xs text-slate-300">Highest creative depth, rich dialogue, and Hollywood narrative pacing.</p>
            </button>

            <button
              onClick={() => setSelectedModel('gemini-2.5-flash')}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedModel === 'gemini-2.5-flash'
                  ? 'bg-blue-600/20 border-blue-500/50 text-white shadow-lg shadow-blue-600/10'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm text-blue-300">Gemini 2.5 Flash</span>
                <CheckCircle2 className={`w-4 h-4 ${selectedModel === 'gemini-2.5-flash' ? 'text-blue-400' : 'text-slate-600'}`} />
              </div>
              <p className="text-xs text-slate-300">Ultra-fast sub-second generation speed for rapid concept iteration.</p>
            </button>
          </div>
        </div>

        {/* API Key Status */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">API Credentials & Security</h2>
              <p className="text-xs text-slate-400">Environment keys managed automatically via AI Studio platform secrets</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-semibold text-slate-200">GEMINI_API_KEY</span>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              ACTIVE & SECURE (Server-side)
            </span>
          </div>
        </div>

        {/* Audio Synth Options */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Synthesized Audio Previews</h2>
              <p className="text-xs text-slate-400">Web Audio API sound engines for music scores and narration</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div>
              <p className="text-xs font-bold text-slate-200">Enable Synthesized Audio Score & Speech</p>
              <p className="text-[11px] text-slate-400">Generates real-time cinematic audio tones and voice speech previews in-browser.</p>
            </div>
            <input
              type="checkbox"
              checked={enableAudioSynth}
              onChange={(e) => setEnableAudioSynth(e.target.checked)}
              className="w-5 h-5 rounded bg-slate-900 border-slate-800 text-purple-600 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
