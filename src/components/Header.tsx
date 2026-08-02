import React from 'react';
import {
  Menu,
  Sparkles,
  Download,
  Share2,
  Film,
  Search,
  Clapperboard,
  CheckCircle2,
  HelpCircle,
  Wand2
} from 'lucide-react';
import { MovieProject } from '../types';

interface HeaderProps {
  currentProject: MovieProject | null;
  onOpenSidebar: () => void;
  onNewProject: () => void;
  onExport: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isGenerating?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentProject,
  onOpenSidebar,
  onNewProject,
  onExport,
  searchQuery,
  setSearchQuery,
  isGenerating,
}) => {
  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0B0F19]/80 border-b border-slate-800/80 backdrop-blur-xl px-4 lg:px-8 flex items-center justify-between gap-4">
      {/* Left: Mobile Menu & Current Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenSidebar}
          className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900/60 border border-slate-800/80 lg:hidden"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Film className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">Active Studio:</span>
        </div>

        <div className="min-w-0">
          <h2 className="text-sm sm:text-base font-bold text-white truncate flex items-center gap-2">
            {currentProject ? currentProject.title : 'Prompt Cinema AI Studio'}
            {currentProject && (
              <span className="hidden md:inline-block text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
                {currentProject.genre}
              </span>
            )}
          </h2>
        </div>
      </div>

      {/* Middle: Search bar */}
      <div className="hidden md:flex items-center relative max-w-xs w-full">
        <Search className="w-4 h-4 text-slate-500 absolute left-3" />
        <input
          type="text"
          placeholder="Search scene, shot, asset..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900/80 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 pl-9 pr-3 py-1.5 rounded-xl focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
        />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2.5 flex-shrink-0">
        {isGenerating ? (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-300 text-xs font-medium animate-pulse">
            <Wand2 className="w-4 h-4 animate-spin text-purple-400" />
            <span className="hidden sm:inline">Generating Cinema Package...</span>
          </div>
        ) : (
          <button
            onClick={onNewProject}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-600/20 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Prompt</span>
          </button>
        )}

        {currentProject && (
          <button
            onClick={onExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all text-xs font-medium"
            title="Export Package"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Export</span>
          </button>
        )}
      </div>
    </header>
  );
};
