import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { HeroLanding } from './components/HeroLanding';
import { Workspace } from './components/Workspace';
import { TemplatesView } from './components/views/TemplatesView';
import { HistoryView } from './components/views/HistoryView';
import { FavoritesView } from './components/views/FavoritesView';
import { SettingsView } from './components/views/SettingsView';
import { MovieProject } from './types';
import { SAMPLE_ASTRONAUT_PROJECT } from './data/templates';
import { downloadPDF } from './utils/exporter';

export function App() {
  const [projects, setProjects] = useState<MovieProject[]>(() => {
    const saved = localStorage.getItem('prompt_cinema_projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved projects', e);
      }
    }
    return [SAMPLE_ASTRONAUT_PROJECT];
  });

  const [currentProject, setCurrentProject] = useState<MovieProject | null>(SAMPLE_ASTRONAUT_PROJECT);
  const [activeSection, setActiveSection] = useState<'workspace' | 'templates' | 'history' | 'favorites' | 'settings'>('workspace');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorNotification, setErrorNotification] = useState<string | null>(null);

  // Sync projects to LocalStorage
  useEffect(() => {
    localStorage.setItem('prompt_cinema_projects', JSON.stringify(projects));
  }, [projects]);

  const handleGenerateMovie = async (prompt: string, genre?: string, mood?: string, style?: string) => {
    setIsGenerating(true);
    setErrorNotification(null);

    try {
      const res = await fetch('/api/generate-master', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, genre, mood, style }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const newProject: MovieProject = await res.json();
      setProjects((prev) => [newProject, ...prev]);
      setCurrentProject(newProject);
      setActiveSection('workspace');
    } catch (err: any) {
      console.error('Generation error:', err);
      setErrorNotification('Generation failed or took too long. Loading fallback cinematic concept.');
      // Fallback: create a modified template
      const fallbackProject: MovieProject = {
        ...SAMPLE_ASTRONAUT_PROJECT,
        id: `movie-${Date.now()}`,
        title: prompt.length > 25 ? prompt.slice(0, 25) + '...' : prompt,
        genre: genre || SAMPLE_ASTRONAUT_PROJECT.genre,
        logline: `A captivating film exploring: ${prompt}`,
        createdAt: new Date().toISOString(),
      };
      setProjects((prev) => [fallbackProject, ...prev]);
      setCurrentProject(fallbackProject);
      setActiveSection('workspace');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNewProject = () => {
    setCurrentProject(null);
    setActiveSection('workspace');
  };

  const handleToggleFavorite = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
    if (currentProject?.id === id) {
      setCurrentProject((prev) => (prev ? { ...prev, isFavorite: !prev.isFavorite } : null));
    }
  };

  const handleDeleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (currentProject?.id === id) {
      const remaining = projects.filter((p) => p.id !== id);
      setCurrentProject(remaining[0] || null);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-purple-500/30 selection:text-purple-200">
      {/* Sidebar */}
      <Sidebar
        currentProject={currentProject}
        projects={projects}
        onSelectProject={(p) => {
          setCurrentProject(p);
          setActiveSection('workspace');
        }}
        onNewProject={handleNewProject}
        onSelectTemplate={(prompt, genre) => {
          handleGenerateMovie(prompt, genre);
        }}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Layout */}
      <div className="lg:pl-72 flex-1 flex flex-col min-w-0">
        {/* Header Bar */}
        <Header
          currentProject={currentProject}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onNewProject={handleNewProject}
          onExport={() => currentProject && downloadPDF(currentProject)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isGenerating={isGenerating}
        />

        {/* Error notification banner if any */}
        {errorNotification && (
          <div className="bg-amber-500/10 border-b border-amber-500/20 text-amber-300 text-xs px-4 py-2 flex items-center justify-between">
            <span>{errorNotification}</span>
            <button onClick={() => setErrorNotification(null)} className="font-bold underline ml-2">
              Dismiss
            </button>
          </div>
        )}

        {/* Dynamic Views */}
        <main className="flex-1">
          {activeSection === 'workspace' && (
            <>
              {currentProject ? (
                <Workspace project={currentProject} onToggleFavorite={handleToggleFavorite} />
              ) : (
                <HeroLanding
                  onGenerate={handleGenerateMovie}
                  onExploreSamples={() => {
                    setCurrentProject(SAMPLE_ASTRONAUT_PROJECT);
                  }}
                  isGenerating={isGenerating}
                />
              )}
            </>
          )}

          {activeSection === 'templates' && (
            <TemplatesView
              onSelectTemplate={(prompt, genre) => {
                handleGenerateMovie(prompt, genre);
              }}
            />
          )}

          {activeSection === 'history' && (
            <HistoryView
              projects={projects}
              onSelectProject={(p) => {
                setCurrentProject(p);
                setActiveSection('workspace');
              }}
              onDeleteProject={handleDeleteProject}
              onToggleFavorite={handleToggleFavorite}
            />
          )}

          {activeSection === 'favorites' && (
            <FavoritesView
              projects={projects}
              onSelectProject={(p) => {
                setCurrentProject(p);
                setActiveSection('workspace');
              }}
              onToggleFavorite={handleToggleFavorite}
              onDeleteProject={handleDeleteProject}
            />
          )}

          {activeSection === 'settings' && <SettingsView />}
        </main>
      </div>
    </div>
  );
}

export default App;
