import React, { useState } from 'react';
import { Film, Trash2, Star, Download, ChevronRight, Calendar, Search } from 'lucide-react';
import { MovieProject } from '../../types';
import { downloadPDF } from '../../utils/exporter';

interface HistoryViewProps {
  projects: MovieProject[];
  onSelectProject: (project: MovieProject) => void;
  onDeleteProject: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  projects,
  onSelectProject,
  onDeleteProject,
  onToggleFavorite,
}) => {
  const [filter, setFilter] = useState('');

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(filter.toLowerCase()) ||
      p.genre.toLowerCase().includes(filter.toLowerCase()) ||
      p.logline.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-pink-400 uppercase tracking-widest block mb-1">
            SAVED FILM PROJECTS ({projects.length})
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">My Movie Vault</h1>
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search projects..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 pl-9 pr-3 py-2 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="glass-panel p-12 text-center text-slate-400 space-y-2 rounded-3xl">
            <Film className="w-12 h-12 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold">No movie projects found.</p>
          </div>
        ) : (
          filtered.map((project) => (
            <div
              key={project.id}
              className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {project.genre}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  {project.title}
                </h2>

                <p className="text-xs text-slate-300 line-clamp-2">{project.logline}</p>
              </div>

              <div className="flex items-center gap-2 self-end md:self-auto">
                <button
                  onClick={() => onToggleFavorite(project.id)}
                  className={`p-2.5 rounded-xl border transition-all ${
                    project.isFavorite
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                  title="Favorite Project"
                >
                  <Star className={`w-4 h-4 ${project.isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
                </button>

                <button
                  onClick={() => downloadPDF(project)}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all"
                  title="Export Screenplay PDF"
                >
                  <Download className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onDeleteProject(project.id)}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition-all"
                  title="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onSelectProject(project)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-xs flex items-center gap-2 shadow-md shadow-purple-600/20"
                >
                  <span>Open Studio</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
