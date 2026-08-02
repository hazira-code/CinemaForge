import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, FileText, Camera, Aperture, Image, Video, Mic, Music, Volume2, Palette, Film, Briefcase, Sparkles, Megaphone, Award, Download, Star } from 'lucide-react';
import { MovieProject } from '../types';
import { StoryTab } from './tabs/StoryTab';
import { ScriptTab } from './tabs/ScriptTab';
import { ShotListTab } from './tabs/ShotListTab';
import { CinematographyTab } from './tabs/CinematographyTab';
import { StoryboardTab } from './tabs/StoryboardTab';
import { VideoPromptTab } from './tabs/VideoPromptTab';
import { VoiceTab } from './tabs/VoiceTab';
import { MusicTab } from './tabs/MusicTab';
import { SoundTab } from './tabs/SoundTab';
import { ColorTab } from './tabs/ColorTab';
import { TimelineTab } from './tabs/TimelineTab';
import { ProductionTab } from './tabs/ProductionTab';
import { PosterTab } from './tabs/PosterTab';
import { MarketingTab } from './tabs/MarketingTab';
import { CommentaryTab } from './tabs/CommentaryTab';
import { ExportTab } from './tabs/ExportTab';

interface WorkspaceProps {
  project: MovieProject;
  onToggleFavorite: (id: string) => void;
}

export const Workspace: React.FC<WorkspaceProps> = ({ project, onToggleFavorite }) => {
  const [activeTab, setActiveTab] = useState<
    | 'story'
    | 'script'
    | 'shotlist'
    | 'cinematography'
    | 'storyboard'
    | 'video'
    | 'voice'
    | 'music'
    | 'sound'
    | 'color'
    | 'timeline'
    | 'production'
    | 'poster'
    | 'marketing'
    | 'commentary'
    | 'export'
  >('story');

  const tabs = [
    { id: 'story', label: 'Story & Plot', icon: BookOpen },
    { id: 'script', label: 'Screenplay', icon: FileText },
    { id: 'shotlist', label: 'Shot List', icon: Camera },
    { id: 'cinematography', label: 'Cinematography', icon: Aperture },
    { id: 'storyboard', label: 'AI Storyboards', icon: Image },
    { id: 'video', label: 'AI Video Prompts', icon: Video },
    { id: 'voice', label: 'Voice Narration', icon: Mic },
    { id: 'music', label: 'Music Score', icon: Music },
    { id: 'sound', label: 'Foley & SFX', icon: Volume2 },
    { id: 'color', label: 'Color Grading', icon: Palette },
    { id: 'timeline', label: 'Editing Timeline', icon: Film },
    { id: 'production', label: 'Production Plan', icon: Briefcase },
    { id: 'poster', label: 'Key Art & Posters', icon: Sparkles },
    { id: 'marketing', label: 'Marketing & Press', icon: Megaphone },
    { id: 'commentary', label: 'Director Masterclass', icon: Award },
    { id: 'export', label: 'Export Hub', icon: Download },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Workspace Subheader Banner */}
      <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-bold text-purple-400 uppercase tracking-widest">
              HOLLYWOOD PRE-PRODUCTION BIBLE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            {project.title}
          </h1>
          <p className="text-xs text-slate-400">{project.genre} • Director: AI Studio</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggleFavorite(project.id)}
            className={`p-2.5 rounded-2xl border transition-all flex items-center gap-2 text-xs font-semibold ${
              project.isFavorite
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Star className={`w-4 h-4 ${project.isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span className="hidden sm:inline">{project.isFavorite ? 'Favorited' : 'Favorite'}</span>
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="overflow-x-auto no-scrollbar py-1">
        <div className="flex items-center gap-1.5 min-w-max p-1 bg-slate-950/80 rounded-2xl border border-slate-800/80">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all relative ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Display */}
      <div className="pt-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'story' && <StoryTab project={project} />}
            {activeTab === 'script' && <ScriptTab project={project} />}
            {activeTab === 'shotlist' && <ShotListTab project={project} />}
            {activeTab === 'cinematography' && <CinematographyTab project={project} />}
            {activeTab === 'storyboard' && <StoryboardTab project={project} />}
            {activeTab === 'video' && <VideoPromptTab project={project} />}
            {activeTab === 'voice' && <VoiceTab project={project} />}
            {activeTab === 'music' && <MusicTab project={project} />}
            {activeTab === 'sound' && <SoundTab project={project} />}
            {activeTab === 'color' && <ColorTab project={project} />}
            {activeTab === 'timeline' && <TimelineTab project={project} />}
            {activeTab === 'production' && <ProductionTab project={project} />}
            {activeTab === 'poster' && <PosterTab project={project} />}
            {activeTab === 'marketing' && <MarketingTab project={project} />}
            {activeTab === 'commentary' && <CommentaryTab project={project} />}
            {activeTab === 'export' && <ExportTab project={project} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
