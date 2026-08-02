import React from 'react';
import { motion } from 'motion/react';
import {
  Film,
  Sparkles,
  Users,
  Compass,
  Bookmark,
  Award,
  Zap,
  Target,
  FileText,
  Flame
} from 'lucide-react';
import { MovieProject } from '../../types';

interface StoryTabProps {
  project: MovieProject;
}

export const StoryTab: React.FC<StoryTabProps> = ({ project }) => {
  return (
    <div className="space-y-8">
      {/* Title & Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
            {project.genre}
          </span>
          <span className="text-xs text-slate-400 font-mono">
            CREATIVE ASSET PACKAGE #001
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
          {project.title}
        </h1>
        <p className="text-lg text-purple-300 italic font-medium mb-6">
          "{project.tagline}"
        </p>

        {/* Logline & Hook */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2 mb-2">
              <Compass className="w-4 h-4 text-blue-400" />
              Official Logline
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              {project.logline}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-pink-400 flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-pink-400" />
              High-Concept Hook
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              {project.hook}
            </p>
          </div>
        </div>
      </div>

      {/* Synopsis Section */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-purple-400" />
          Full Cinematic Synopsis
        </h2>
        <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-line bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80">
          {project.synopsis}
        </div>
      </div>

      {/* Three-Act Structure */}
      <div>
        <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-amber-400" />
          Three-Act Narrative Structure
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-panel p-5 rounded-2xl border border-blue-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Act I</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">Setup & Catalyst</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {project.threeActStructure.act1}
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-purple-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Act II</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">Conflict & Midpoint</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {project.threeActStructure.act2}
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-pink-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">Act III</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-500/20 text-pink-300">Climax & Resolution</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {project.threeActStructure.act3}
            </p>
          </div>
        </div>
      </div>

      {/* Character Roster */}
      <div>
        <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-cyan-400" />
          Main Characters & Motivations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.characters.map((char, index) => (
            <div
              key={index}
              className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white">{char.name}</h3>
                  <p className="text-xs text-cyan-400 font-medium">{char.role} • {char.archetype}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-300 font-bold text-xs">
                  0{index + 1}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase mb-1">Personality Traits</p>
                <p className="text-xs text-slate-200">{char.personality}</p>
              </div>

              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase mb-1">Backstory</p>
                <p className="text-xs text-slate-300">{char.backstory}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/60">
                <p className="text-[11px] font-semibold text-amber-400 uppercase mb-1 flex items-center gap-1">
                  <Target className="w-3 h-3 text-amber-400" />
                  Core Motivation
                </p>
                <p className="text-xs text-slate-200 font-medium italic">"{char.motivation}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Twist, Ending & Themes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-5 rounded-2xl border border-pink-500/30">
          <h3 className="text-sm font-bold text-pink-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-400" />
            Central Plot Twist
          </h3>
          <p className="text-xs text-slate-200 leading-relaxed">
            {project.plotTwist}
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            Climactic Ending
          </h3>
          <p className="text-xs text-slate-200 leading-relaxed">
            {project.ending}
          </p>
        </div>
      </div>

      {/* Themes Tags */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-400 uppercase mr-2 flex items-center gap-1.5">
          <Bookmark className="w-4 h-4 text-purple-400" />
          Thematic Pillars:
        </span>
        {project.themes.map((theme, i) => (
          <span
            key={i}
            className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30"
          >
            #{theme}
          </span>
        ))}
      </div>
    </div>
  );
};
