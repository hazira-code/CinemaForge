import React from 'react';
import { Download, FileText, Code, FileSpreadsheet, Check, Share2, Package, Terminal } from 'lucide-react';
import { MovieProject } from '../../types';
import { downloadPDF, downloadMarkdown, downloadJSON, downloadStreamlitApp } from '../../utils/exporter';

interface ExportTabProps {
  project: MovieProject;
}

export const ExportTab: React.FC<ExportTabProps> = ({ project }) => {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-blue-500/30 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Download className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Hollywood Export Hub</h2>
            <p className="text-xs text-slate-400">Download Complete Pre-Production Packages in Industry Standard Formats & Streamlit Apps</p>
          </div>
        </div>

        <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-mono bg-blue-500/20 text-blue-300 border border-blue-500/40">
          STREAMLIT & REACT READY
        </span>
      </div>

      {/* Export Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* PDF Screenplay Package */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-blue-500/40 transition-all space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Full Screenplay PDF</h3>
              <p className="text-xs text-slate-400 mt-1">
                Formatted with Final Draft specifications, industry margins, scene headings, and character dialogue.
              </p>
            </div>
          </div>
          <button
            onClick={() => downloadPDF(project)}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20"
          >
            <Download className="w-4 h-4" />
            <span>Download Screenplay PDF</span>
          </button>
        </div>

        {/* Markdown Production Bible */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-purple-500/40 transition-all space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Production Bible (Markdown)</h3>
              <p className="text-xs text-slate-400 mt-1">
                Comprehensive markdown package containing story, shot lists, cinematography specs, lighting, and sound cues.
              </p>
            </div>
          </div>
          <button
            onClick={() => downloadMarkdown(project)}
            className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-purple-300 hover:text-white hover:bg-purple-600/20 font-semibold text-xs flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Bible (.md)</span>
          </button>
        </div>

        {/* Streamlit Python Version */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-emerald-500/40 transition-all space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Streamlit App Script (.py)</h3>
              <p className="text-xs text-slate-400 mt-1">
                Standalone Python Streamlit application (`streamlit_app.py`) for running this film project locally or in Streamlit Cloud.
              </p>
            </div>
          </div>
          <button
            onClick={() => downloadStreamlitApp(project)}
            className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-300 hover:text-white hover:bg-emerald-600/20 font-semibold text-xs flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Streamlit Script</span>
          </button>
        </div>

        {/* Full JSON Export */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-pink-500/40 transition-all space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Full Master JSON Dataset</h3>
              <p className="text-xs text-slate-400 mt-1">
                Complete raw JSON dump containing all 15 pre-production modules, prompt structures, and parameters.
              </p>
            </div>
          </div>
          <button
            onClick={() => downloadJSON(project)}
            className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-pink-300 hover:text-white hover:bg-pink-600/20 font-semibold text-xs flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download JSON Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
