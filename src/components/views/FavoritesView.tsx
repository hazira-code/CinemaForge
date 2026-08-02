import React from 'react';
import { Star, Film, ChevronRight, Trash2, Download } from 'lucide-react';
import { MovieProject } from '../../types';
import { downloadPDF } from '../../utils/exporter';

interface FavoritesViewProps {
  projects: MovieProject[];
  onSelectProject: (project: MovieProject) => void;
  onToggleFavorite: (id: string) => void;
  onDeleteProject: (id: string) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  projects,
  onSelectProject,
  onToggleFavorite,
  onDeleteProject,
}) => {
  const favorites = projects.filter((p) => p.isFavorite);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div>
        <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block mb-1">
          CURATED SELECTIONS ({favorites.length})
        </span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Favorite Movies</h1>
      </div>

      <div className="space-y-4">
        {favorites.length === 0 ? (
          <div className="glass-panel p-12 text-center text-slate-400 space-y-2 rounded-3xl">
            <Star className="w-12 h-12 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold">No favorite movies saved yet.</p>
            <p className="text-xs text-slate-500">Star any project to pin it here for rapid access.</p>
          </div>
        ) : (
          favorites.map((project) => (
            <div
              key={project.id}
              className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
            >
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {project.genre}
                </span>

                <h2 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  {project.title}
                </h2>

                <p className="text-xs text-slate-300 line-clamp-2">{project.logline}</p>
              </div>

              <div className="flex items-center gap-2 self-end md:self-auto">
                <button
                  onClick={() => onToggleFavorite(project.id)}
                  className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  title="Remove from Favorites"
                >
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </button>

                <button
                  onClick={() => downloadPDF(project)}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all"
                  title="Export Screenplay PDF"
                >
                  <Download className="w-4 h-4" />
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
