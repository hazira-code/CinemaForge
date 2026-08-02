import React from 'react';
import { motion } from 'motion/react';
import {
  Clapperboard,
  Film,
  Sparkles,
  History,
  Star,
  Settings,
  PlusCircle,
  Tv,
  X,
  ChevronRight,
  Flame
} from 'lucide-react';
import { MovieProject } from '../types';
import { PRESET_TEMPLATES } from '../data/templates';

interface SidebarProps {
  currentProject: MovieProject | null;
  projects: MovieProject[];
  onSelectProject: (project: MovieProject) => void;
  onNewProject: () => void;
  onSelectTemplate: (prompt: string, genre?: string) => void;
  isOpen: boolean;
  onClose: () => void;
  activeSection: 'workspace' | 'templates' | 'history' | 'favorites' | 'settings';
  setActiveSection: (section: 'workspace' | 'templates' | 'history' | 'favorites' | 'settings') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentProject,
  projects,
  onSelectProject,
  onNewProject,
  onSelectTemplate,
  isOpen,
  onClose,
  activeSection,
  setActiveSection,
}) => {
  const favorites = projects.filter((p) => p.isFavorite);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 w-72 bg-[#0B0F19]/90 border-r border-slate-800/80 backdrop-blur-xl z-50 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-500 p-0.5 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center">
                <Clapperboard className="w-5 h-5 text-purple-400 animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="font-bold text-base tracking-tight bg-gradient-to-r from-white via-slate-200 to-purple-300 bg-clip-text text-transparent">
                PROMPT CINEMA
              </h1>
              <p className="text-[10px] text-purple-400 font-mono tracking-wider">HOLLYWOOD AI v2.5</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Create Button */}
        <div className="p-4">
          <button
            onClick={() => {
              onNewProject();
              onClose();
            }}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/25 transition-all duration-200 group active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
            <span>Create New Movie</span>
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
          {/* Main Navigation */}
          <div className="space-y-1">
            <div className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Platform Nav
            </div>

            <button
              onClick={() => {
                setActiveSection('workspace');
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeSection === 'workspace'
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Film className="w-4 h-4 text-purple-400" />
              <span>Current Studio</span>
              {currentProject && (
                <span className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              )}
            </button>

            <button
              onClick={() => {
                setActiveSection('templates');
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeSection === 'templates'
                  ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Genre Templates</span>
            </button>

            <button
              onClick={() => {
                setActiveSection('history');
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeSection === 'history'
                  ? 'bg-pink-600/20 text-pink-300 border border-pink-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <History className="w-4 h-4 text-pink-400" />
              <span>My Movies ({projects.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveSection('favorites');
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeSection === 'favorites'
                  ? 'bg-amber-600/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Star className="w-4 h-4 text-amber-400" />
              <span>Favorites ({favorites.length})</span>
            </button>
          </div>

          {/* Quick Movie History List */}
          <div>
            <div className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Recent Projects</span>
              <Tv className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <div className="space-y-1">
              {projects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    onSelectProject(p);
                    setActiveSection('workspace');
                    onClose();
                  }}
                  className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-center justify-between group ${
                    currentProject?.id === p.id
                      ? 'bg-slate-800/80 text-white border border-slate-700/80 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="truncate pr-2">
                    <p className="truncate text-xs font-medium">{p.title}</p>
                    <p className="text-[10px] text-slate-400 truncate">{p.genre}</p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-purple-400 transition-colors flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Templates Quick Picks */}
          <div>
            <div className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Preset Concepts</span>
              <Flame className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <div className="space-y-1.5">
              {PRESET_TEMPLATES.slice(0, 3).map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => {
                    onSelectTemplate(tpl.prompt, tpl.genre);
                    onClose();
                  }}
                  className="w-full text-left p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/60 hover:border-purple-500/30 transition-all group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-slate-200 group-hover:text-purple-300 transition-colors">
                      {tpl.title}
                    </span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full border ${tpl.badgeColor}`}>
                      {tpl.genre.split('/')[0]}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 line-clamp-1">{tpl.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer / User Profile */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/40">
          <button
            onClick={() => {
              setActiveSection('settings');
              onClose();
            }}
            className="w-full flex items-center justify-between p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all text-xs"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-0.5">
                <div className="w-full h-full bg-[#0B0F19] rounded-full flex items-center justify-center font-bold text-[10px] text-white">
                  DIR
                </div>
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-200">Director Mode</p>
                <p className="text-[10px] text-slate-400">Gemini 3.6 Pro</p>
              </div>
            </div>
            <Settings className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </aside>
    </>
  );
};
