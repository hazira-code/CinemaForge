import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Wand2,
  Play,
  Film,
  Camera,
  Music,
  Tv,
  Clapperboard,
  ArrowRight,
  Flame,
  Zap,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { PRESET_TEMPLATES } from '../data/templates';

interface HeroLandingProps {
  onGenerate: (prompt: string, genre?: string, mood?: string, style?: string) => void;
  onExploreSamples: () => void;
  isGenerating: boolean;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({
  onGenerate,
  onExploreSamples,
  isGenerating,
}) => {
  const [prompt, setPrompt] = useState('A lonely astronaut discovers an abandoned city floating in space.');
  const [selectedGenre, setSelectedGenre] = useState('Sci-Fi / Space Thriller');
  const [selectedMood, setSelectedMood] = useState('Cinematic & Mysterious');
  const [selectedStyle, setSelectedStyle] = useState('Hollywood Blockbuster');
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleEnhance = async () => {
    if (!prompt.trim() || isEnhancing) return;
    setIsEnhancing(true);
    try {
      const res = await fetch('/api/enhance-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, style: selectedGenre }),
      });
      const data = await res.json();
      if (data.enhancedPrompt) {
        setPrompt(data.enhancedPrompt);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;
    onGenerate(prompt, selectedGenre, selectedMood, selectedStyle);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center px-4 py-12 overflow-hidden bg-aurora">
      {/* Background Animated Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-pink-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl w-full mx-auto text-center space-y-8">
        {/* Eyebrow Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-purple-500/30 backdrop-blur-md shadow-xl"
        >
          <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
          <span className="text-xs font-semibold tracking-wide bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            AI-POWERED CINEMATIC PRE-PRODUCTION ENGINE
          </span>
          <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/40">
            NETFLIX & PIXAR QUALITY
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
        >
          🎬 Turn One Prompt into an <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            Entire Movie Production
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
        >
          Create scripts, shot lists, storyboards, voice-overs, cinematic prompts, posters, and production plans—all powered by AI.
        </motion.p>

        {/* Interactive Prompt Generator Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-panel p-5 sm:p-7 rounded-3xl border border-purple-500/30 shadow-2xl shadow-purple-950/40 text-left relative group overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2">
                <Film className="w-4 h-4 text-purple-400" />
                Your Movie Prompt
              </label>

              <button
                type="button"
                onClick={handleEnhance}
                disabled={isEnhancing}
                className="flex items-center gap-1.5 text-xs text-purple-300 hover:text-white bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/30 px-3 py-1 rounded-lg transition-all"
              >
                <Wand2 className={`w-3.5 h-3.5 text-purple-400 ${isEnhancing ? 'animate-spin' : ''}`} />
                <span>{isEnhancing ? 'Enhancing...' : 'Polish Prompt with AI'}</span>
              </button>
            </div>

            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                placeholder="Describe your film concept, plot idea, or story vision..."
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/30 rounded-2xl p-4 text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none transition-all resize-none font-medium leading-relaxed"
              />
            </div>

            {/* Selectors for Genre, Mood, Style */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Genre</label>
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                >
                  <option value="Sci-Fi / Space Thriller">Sci-Fi / Space Thriller</option>
                  <option value="Cyberpunk Noir">Cyberpunk Noir</option>
                  <option value="Psychological Horror">Psychological Horror</option>
                  <option value="Post-Apocalyptic Survival">Post-Apocalyptic Survival</option>
                  <option value="Action Heist">Action Heist</option>
                  <option value="Epic Fantasy">Epic Fantasy</option>
                  <option value="Indie Drama">Indie Drama</option>
                  <option value="Time Loop Mystery">Time Loop Mystery</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Atmospheric Mood</label>
                <select
                  value={selectedMood}
                  onChange={(e) => setSelectedMood(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                >
                  <option value="Cinematic & Mysterious">Cinematic & Mysterious</option>
                  <option value="High Voltage Action">High Voltage Action</option>
                  <option value="Melancholic & Poetic">Melancholic & Poetic</option>
                  <option value="Claustrophobic Dread">Claustrophobic Dread</option>
                  <option value="Epic & Sublime">Epic & Sublime</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Production Style</label>
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                >
                  <option value="Hollywood Blockbuster">Hollywood Blockbuster</option>
                  <option value="A24 Festival Cinema">A24 Festival Cinema</option>
                  <option value="Immersive IMAX 3D">Immersive IMAX 3D</option>
                  <option value="Neo-Classic 35mm Film">Neo-Classic 35mm Film</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Generates 15 Complete Pre-Production Modules</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onExploreSamples}
                  className="px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-xs flex items-center justify-center gap-2 transition-all w-full sm:w-auto"
                >
                  <Play className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
                  <span>Explore Sample Movie</span>
                </button>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 transition-all active:scale-95 w-full sm:w-auto"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Generating Movie Package...</span>
                    </>
                  ) : (
                    <>
                      <Clapperboard className="w-4 h-4" />
                      <span>Generate Movie</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Quick Concept Presets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>OR TRY A POPULAR HOLLYWOOD CONCEPT</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {PRESET_TEMPLATES.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => {
                  setPrompt(tpl.prompt);
                  setSelectedGenre(tpl.genre);
                }}
                className="px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-purple-500/50 text-xs text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
              >
                <span>{tpl.title}</span>
                <span className="text-[10px] text-purple-400 font-mono">({tpl.genre.split('/')[0]})</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Feature Grid Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left"
        >
          <div className="glass-panel p-4 rounded-2xl border border-blue-500/20">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 mb-2">
              <Film className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-white mb-1">Full Screenplay</h3>
            <p className="text-[11px] text-slate-400">Scene headings, dialogue, and action formatted to Hollywood standards.</p>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-purple-500/20">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 mb-2">
              <Camera className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-white mb-1">Shot List & Angles</h3>
            <p className="text-[11px] text-slate-400">Complete lens specs, camera motion, frame size, and DP lighting setups.</p>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-pink-500/20">
            <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 mb-2">
              <Tv className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-white mb-1">AI Video & Storyboards</h3>
            <p className="text-[11px] text-slate-400">Prompts tailored for Midjourney, Veo, Runway Gen-3, Sora, and Luma.</p>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-emerald-500/20">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
              <Music className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-white mb-1">Music & Voiceover</h3>
            <p className="text-[11px] text-slate-400">Interactive Web Audio synth previews, orchestration, and narration.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
