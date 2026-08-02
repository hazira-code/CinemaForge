import React, { useState } from 'react';
import { Award, Camera, Sun, Clock, Sparkles, Wand2, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';
import { MovieProject } from '../../types';

interface CommentaryTabProps {
  project: MovieProject;
}

export const CommentaryTab: React.FC<CommentaryTabProps> = ({ project }) => {
  const { directorCommentary, aiAnalysis } = project;
  const [activeTool, setActiveTool] = useState<'dialogue' | 'continuity' | 'pacing'>('dialogue');
  const [inputText, setInputText] = useState(project.screenplay[0]?.action || '');
  const [toolResult, setToolResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRunAiTool = async () => {
    if (!inputText.trim() || isProcessing) return;
    setIsProcessing(true);
    try {
      const res = await fetch('/api/ai-tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolType: activeTool,
          text: inputText,
          context: project.synopsis,
        }),
      });
      const data = await res.json();
      setToolResult(data.result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">AI Director Commentary & Masterclass</h2>
            <p className="text-xs text-slate-400">Professional Filmmaking Advice, Lighting Justifications & Scene Analysis</p>
          </div>
        </div>

        <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40">
          OSCAR DIRECTOR INSIGHTS
        </span>
      </div>

      {/* Director Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-2">
          <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
            <Camera className="w-4 h-4 text-blue-400" />
            Camera & Lens Selection Philosophy
          </h3>
          <p className="text-xs text-slate-200 leading-relaxed p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            {directorCommentary.cameraChoices}
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-2">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <Sun className="w-4 h-4 text-amber-400" />
            Lighting Setup & Emotional Contrast
          </h3>
          <p className="text-xs text-slate-200 leading-relaxed p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            {directorCommentary.lightingStrategy}
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-2">
          <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-400" />
            Narrative Pacing & Edit Rhythms
          </h3>
          <p className="text-xs text-slate-200 leading-relaxed p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            {directorCommentary.pacingInsights}
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 space-y-2">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Pro Filmmaker On-Set Advice
          </h3>
          <p className="text-xs text-slate-200 leading-relaxed p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            {directorCommentary.proAdvice}
          </p>
        </div>
      </div>

      {/* Interactive AI Script Assistant Tools */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-purple-400" />
          Interactive AI Script Consultant Tools
        </h3>

        {/* Tool Toggles */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTool('dialogue')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTool === 'dialogue'
                ? 'bg-purple-600/30 text-purple-300 border border-purple-500/50'
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            Dialogue Improvement
          </button>

          <button
            onClick={() => setActiveTool('continuity')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTool === 'continuity'
                ? 'bg-blue-600/30 text-blue-300 border border-blue-500/50'
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            Continuity Check
          </button>

          <button
            onClick={() => setActiveTool('pacing')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTool === 'pacing'
                ? 'bg-pink-600/30 text-pink-300 border border-pink-500/50'
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            Pacing Analysis
          </button>
        </div>

        <div className="space-y-3">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={3}
            placeholder="Paste scene dialogue or action lines to refine..."
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />

          <button
            onClick={handleRunAiTool}
            disabled={isProcessing}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/20"
          >
            {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
            <span>{isProcessing ? 'Analyzing...' : `Run AI ${activeTool.toUpperCase()} Tool`}</span>
          </button>

          {toolResult && (
            <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/40 text-xs text-purple-200 leading-relaxed">
              <span className="font-bold text-purple-300 block mb-1">AI Recommendation Output:</span>
              {toolResult}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
