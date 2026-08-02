import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Download,
  Copy,
  Plus,
  Check,
  AlignLeft,
  Sparkles,
  Edit3,
  Trash2
} from 'lucide-react';
import { MovieProject, ScreenplayScene } from '../../types';
import { downloadPDF, copyToClipboard } from '../../utils/exporter';

interface ScriptTabProps {
  project: MovieProject;
}

export const ScriptTab: React.FC<ScriptTabProps> = ({ project }) => {
  const [scenes, setScenes] = useState<ScreenplayScene[]>(project.screenplay);
  const [copied, setCopied] = useState(false);
  const [useCourierFont, setUseCourierFont] = useState(true);

  const handleCopy = () => {
    const text = scenes
      .map(
        (s) =>
          `SCENE ${s.sceneNumber}\n${s.heading}\n\n${s.action}\n\n` +
          s.dialogueLines
            .map((d) => `          ${d.character.toUpperCase()}\n` + (d.parenthetical ? `        ${d.parenthetical}\n` : '') + `    "${d.line}"`)
            .join('\n\n') +
          `\n\n          ${s.transition || 'CUT TO:'}`
      )
      .join('\n\n' + '='.repeat(40) + '\n\n');

    copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Script Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Screenplay Master</h2>
            <p className="text-xs text-slate-400">Industry Standard Hollywood Formatting (Final Draft Specs)</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setUseCourierFont(!useCourierFont)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
              useCourierFont
                ? 'bg-purple-600/30 border-purple-500/50 text-purple-200'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            Courier Font
          </button>

          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 hover:text-white flex items-center gap-1.5 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? 'Copied' : 'Copy Text'}</span>
          </button>

          <button
            onClick={() => downloadPDF(project)}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-purple-600/20 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all no-print"
            title="Print Screenplay"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Screenplay Paper View */}
      <div
        className={`bg-slate-950/90 text-slate-100 p-6 sm:p-12 rounded-3xl border border-slate-800/80 shadow-2xl space-y-12 max-w-4xl mx-auto ${
          useCourierFont ? 'screenplay-font' : 'font-sans'
        }`}
      >
        {/* Title Cover snippet */}
        <div className="text-center pb-8 border-b border-slate-800/80 uppercase tracking-widest space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-widest">{project.title}</h1>
          <p className="text-xs text-slate-400">Written by AI Studio & Director</p>
          <p className="text-[10px] text-slate-400 pt-2 font-mono">FADE IN:</p>
        </div>

        {/* Scene List */}
        {scenes.map((scene, sceneIdx) => (
          <div key={sceneIdx} className="space-y-6 relative group">
            {/* Scene Heading */}
            <div className="bg-slate-900/90 border-l-4 border-purple-500 py-2 px-4 rounded-r-xl flex items-center justify-between">
              <span className="font-bold text-sm sm:text-base text-purple-300 uppercase tracking-wider">
                SCENE {scene.sceneNumber}: {scene.heading}
              </span>
              <span className="text-[10px] font-mono text-slate-400">INT/EXT</span>
            </div>

            {/* Action Block */}
            <div className="text-sm text-slate-300 leading-relaxed px-2">
              {scene.action}
            </div>

            {/* Dialogue Block */}
            <div className="space-y-4 max-w-lg mx-auto py-2">
              {scene.dialogueLines.map((dialogue, dialIdx) => (
                <div key={dialIdx} className="text-center space-y-1">
                  <p className="font-bold text-xs uppercase tracking-widest text-blue-400">
                    {dialogue.character}
                  </p>
                  {dialogue.parenthetical && (
                    <p className="text-xs text-slate-400 italic">
                      {dialogue.parenthetical}
                    </p>
                  )}
                  <p className="text-sm text-slate-200 max-w-md mx-auto leading-normal">
                    "{dialogue.line}"
                  </p>
                </div>
              ))}
            </div>

            {/* Transition */}
            <div className="text-right text-xs text-purple-400 font-bold uppercase tracking-widest pt-2">
              {scene.transition || 'CUT TO:'}
            </div>
          </div>
        ))}

        <div className="text-center pt-12 border-t border-slate-800 text-xs font-mono text-slate-400 tracking-widest uppercase">
          FADE OUT. <br />
          <span className="text-[10px] text-purple-400 font-sans">THE END</span>
        </div>
      </div>
    </div>
  );
};
