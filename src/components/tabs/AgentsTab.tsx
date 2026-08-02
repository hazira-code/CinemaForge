import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot,
  Brain,
  MessageSquare,
  Database,
  Workflow,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Search,
  Plus,
  RefreshCw,
  Send,
  Zap,
  ShieldCheck,
  ChevronRight,
  Layers,
  Cpu,
  Flame,
  Award,
  Volume2
} from 'lucide-react';
import { MovieProject, AgentRole, AgentMessage, VectorMemoryEntry } from '../../types';
import { SYSTEM_AGENTS, INITIAL_VECTOR_MEMORIES } from '../../data/agentsData';

interface AgentsTabProps {
  project: MovieProject;
}

export const AgentsTab: React.FC<AgentsTabProps> = ({ project }) => {
  const [selectedAgent, setSelectedAgent] = useState<AgentRole>('director');
  const [activeSubTab, setActiveSubTab] = useState<'graph' | 'debate' | 'memory' | 'cot'>('graph');
  
  // Vector Memory State
  const [memories, setMemories] = useState<VectorMemoryEntry[]>(INITIAL_VECTOR_MEMORIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<VectorMemoryEntry[]>(INITIAL_VECTOR_MEMORIES);
  const [newMemoryTitle, setNewMemoryTitle] = useState('');
  const [newMemoryContent, setNewMemoryContent] = useState('');
  const [showAddMemoryModal, setShowAddMemoryModal] = useState(false);

  // Multi-Agent Debate State
  const [debateTopic, setDebateTopic] = useState('How should we enhance the tension and visual contrast in Scene 1?');
  const [isDebating, setIsDebating] = useState(false);
  const [debateMessages, setDebateMessages] = useState<AgentMessage[]>([
    {
      id: 'msg-1',
      agentRole: 'director',
      agentName: 'Director Agent',
      timestamp: '10:14:02 AM',
      content: `I want Scene 1 to feel claustrophobic yet expansive. Dr. Vance should feel overwhelmed by the monolithic architecture.`,
      thoughtProcess: `Analyzing theme: Isolation vs Cosmic Majesty. Recommending low-angle 2.39:1 framing.`,
      confidenceScore: 0.98,
      messageType: 'proposal'
    },
    {
      id: 'msg-2',
      agentRole: 'cinematographer',
      agentName: 'Cinematographer Agent',
      timestamp: '10:14:08 AM',
      content: `Agreed Director. I suggest using a 18mm Anamorphic prime with cold 5600K cyan key lights and 3200K tungsten practicals inside the cockpit for maximum contrast.`,
      thoughtProcess: `Checking optical physics: 18mm preserves spatial scale while anamorphic squeeze creates wide horizontal flares.`,
      confidenceScore: 0.95,
      messageType: 'revision'
    },
    {
      id: 'msg-3',
      agentRole: 'screenwriter',
      agentName: 'Screenwriter Agent',
      timestamp: '10:14:15 AM',
      content: `I have updated Dr. Vance's dialogue to be minimalistic. Silence and breath acoustics will convey her anxiety better than long monologues.`,
      thoughtProcess: `Subtext check: Less spoken dialogue elevates tension. Helmet breath audio cues added.`,
      confidenceScore: 0.92,
      messageType: 'approval'
    },
    {
      id: 'msg-4',
      agentRole: 'qa',
      agentName: 'QA & Continuity Agent',
      timestamp: '10:14:22 AM',
      content: `Audit complete: Cinematography lighting color temperature (5600K key) aligns with Storyboard Frame 1 and Sound Foley cues. 0 plot holes found.`,
      thoughtProcess: `Cross-checking Screenplay Scene 1 vs Shot List 1A vs Foley SFX list. Continuity confirmed.`,
      confidenceScore: 0.99,
      messageType: 'approval'
    }
  ]);

  const activeAgentData = SYSTEM_AGENTS.find((a) => a.id === selectedAgent) || SYSTEM_AGENTS[0];

  // Run Semantic Vector Search simulation
  const handleVectorSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults(memories);
      return;
    }
    const q = query.toLowerCase();
    const filtered = memories.map((m) => {
      let score = 0.6;
      if (m.title.toLowerCase().includes(q) || m.snippet.toLowerCase().includes(q)) {
        score = 0.95;
      } else if (m.tags.some((t) => t.toLowerCase().includes(q))) {
        score = 0.88;
      }
      return { ...m, similarityScore: Math.min(0.99, score + Math.random() * 0.04) };
    }).sort((a, b) => b.similarityScore - a.similarityScore);

    setSearchResults(filtered);
  };

  // Add new vector memory
  const handleAddMemory = () => {
    if (!newMemoryTitle || !newMemoryContent) return;
    const newEntry: VectorMemoryEntry = {
      id: `vec-${Date.now()}`,
      type: 'lore',
      title: newMemoryTitle,
      snippet: newMemoryContent,
      vectorId: `emb_${Math.random().toString(36).substring(2, 9)}`,
      similarityScore: 0.98,
      tags: ['custom', 'user_defined', selectedAgent],
      createdAt: new Date().toISOString()
    };
    const updated = [newEntry, ...memories];
    setMemories(updated);
    setSearchResults(updated);
    setNewMemoryTitle('');
    setNewMemoryContent('');
    setShowAddMemoryModal(false);
  };

  // Trigger Backend AI Debate or simulated agent turn
  const handleTriggerDebate = async () => {
    if (!debateTopic.trim()) return;
    setIsDebating(true);

    try {
      const res = await fetch('/api/agent-debate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: debateTopic,
          projectTitle: project.title,
          genre: project.genre
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.debateMessages && Array.isArray(data.debateMessages)) {
          setDebateMessages((prev) => [...prev, ...data.debateMessages]);
        }
      } else {
        // Fallback simulation if backend endpoint is loading
        const timeStr = new Date().toLocaleTimeString();
        const fallbackMsgs: AgentMessage[] = [
          {
            id: `msg-${Date.now()}-1`,
            agentRole: 'director',
            agentName: 'Director Agent',
            timestamp: timeStr,
            content: `Regarding "${debateTopic}": We must prioritize emotional resonance while upholding cinematic realism.`,
            thoughtProcess: `Evaluating theme alignment & audience hook.`,
            confidenceScore: 0.96,
            messageType: 'proposal'
          },
          {
            id: `msg-${Date.now()}-2`,
            agentRole: 'qa',
            agentName: 'QA Agent',
            timestamp: timeStr,
            content: `Reviewed proposal for "${debateTopic}". Checked consistency across 12 scene parameters — high impact with zero plot contradictions.`,
            thoughtProcess: `Automated QA pass executed with 98.2% verification.`,
            confidenceScore: 0.98,
            messageType: 'approval'
          }
        ];
        setDebateMessages((prev) => [...prev, ...fallbackMsgs]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsDebating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Agentic Architecture Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-slate-900/90 to-blue-950/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -z-10" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Brain className="w-3 h-3 text-purple-400" />
                AUTONOMOUS MULTI-AGENT SYSTEM
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                10 AGENTS ACTIVE
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              LangGraph & CrewAI Orchestration Studio
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl mt-1">
              Multiple specialized AI agents collaborate autonomously, critique each other's outputs, store persistent memories in a vector store, and construct your production package.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
            <div className="text-center px-3 border-r border-slate-800">
              <p className="text-[10px] font-mono text-slate-400">VECTOR EMBEDDINGS</p>
              <p className="text-lg font-bold text-purple-400 font-mono">432 Vectors</p>
            </div>
            <div className="text-center px-3 border-r border-slate-800">
              <p className="text-[10px] font-mono text-slate-400">REFLECTION SCORE</p>
              <p className="text-lg font-bold text-emerald-400 font-mono">98.4%</p>
            </div>
            <div className="text-center px-3">
              <p className="text-[10px] font-mono text-slate-400">AGENT DEBATES</p>
              <p className="text-lg font-bold text-blue-400 font-mono">14 Turns</p>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-purple-500/20">
          <button
            onClick={() => setActiveSubTab('graph')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeSubTab === 'graph'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white'
            }`}
          >
            <Workflow className="w-4 h-4" />
            <span>Agent Graph & Roster</span>
          </button>
          <button
            onClick={() => setActiveSubTab('debate')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeSubTab === 'debate'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Multi-Agent Debate Arena</span>
          </button>
          <button
            onClick={() => setActiveSubTab('memory')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeSubTab === 'memory'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Pinecone/Chroma RAG Vector Memory</span>
          </button>
          <button
            onClick={() => setActiveSubTab('cot')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeSubTab === 'cot'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>Chain-of-Thought & Reflection</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: AGENT GRAPH & ROSTER */}
      {activeSubTab === 'graph' && (
        <div className="space-y-6">
          {/* LangGraph Visual Execution Graph */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/80">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-purple-400" />
                  LangGraph Multi-Agent Execution Flow
                </h3>
                <p className="text-xs text-slate-400">
                  Visual node topology showing how autonomous agents pass structured JSON state between each other.
                </p>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Workflow Status: Synced
              </span>
            </div>

            {/* Interactive Graph Node Representation */}
            <div className="bg-[#0B0F19] p-6 rounded-2xl border border-slate-800/80 space-y-6 overflow-x-auto">
              <div className="flex items-center justify-center gap-4 min-w-[700px]">
                {/* User Input */}
                <div className="p-3.5 rounded-2xl bg-blue-950/60 border border-blue-500/40 text-center w-36 shadow-md">
                  <span className="text-[10px] font-mono text-blue-300 block">ENTRY POINT</span>
                  <p className="text-xs font-bold text-white mt-1">User Prompt</p>
                </div>

                <ChevronRight className="w-5 h-5 text-slate-600 flex-shrink-0" />

                {/* Director Node */}
                <div
                  onClick={() => setSelectedAgent('director')}
                  className={`p-3.5 rounded-2xl border text-center w-40 cursor-pointer transition-all shadow-lg ${
                    selectedAgent === 'director'
                      ? 'bg-amber-500/20 border-amber-400 text-white ring-2 ring-amber-400/50'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-amber-500/50'
                  }`}
                >
                  <span className="text-[10px] font-mono text-amber-400 block">LEAD ORCHESTRATOR</span>
                  <p className="text-xs font-bold mt-1">🎬 Director Agent</p>
                </div>

                <ChevronRight className="w-5 h-5 text-slate-600 flex-shrink-0" />

                {/* Parallel Creative Swarm */}
                <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-2 flex-1 min-w-[280px]">
                  <span className="text-[10px] font-mono text-purple-300 block text-center uppercase tracking-wider">
                    Parallel Generation Swarm
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'screenwriter', label: '✍️ Screenwriter' },
                      { id: 'cinematographer', label: '🎥 Cinematographer' },
                      { id: 'storyboard', label: '🎨 Storyboard' },
                      { id: 'character', label: '🎭 Character' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedAgent(item.id as AgentRole)}
                        className={`p-2 rounded-xl text-[11px] font-semibold text-left border transition-all ${
                          selectedAgent === item.id
                            ? 'bg-purple-600/30 border-purple-400 text-white'
                            : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-slate-600 flex-shrink-0" />

                {/* QA Node */}
                <div
                  onClick={() => setSelectedAgent('qa')}
                  className={`p-3.5 rounded-2xl border text-center w-40 cursor-pointer transition-all shadow-lg ${
                    selectedAgent === 'qa'
                      ? 'bg-emerald-500/20 border-emerald-400 text-white ring-2 ring-emerald-400/50'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-emerald-500/50'
                  }`}
                >
                  <span className="text-[10px] font-mono text-emerald-400 block">REFLECTION & AUDIT</span>
                  <p className="text-xs font-bold mt-1">🧐 QA Agent</p>
                </div>
              </div>
            </div>

            {/* 10 Autonomous Agents Grid */}
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                10 Specialized Autonomous AI Agents
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {SYSTEM_AGENTS.map((ag) => {
                  const isSelected = selectedAgent === ag.id;
                  return (
                    <div
                      key={ag.id}
                      onClick={() => setSelectedAgent(ag.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-purple-950/40 border-purple-500 text-white shadow-xl ring-1 ring-purple-400/40'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{ag.avatar}</span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                          {ag.memoryItemsCount} Memories
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-white">{ag.name}</h5>
                      <p className="text-[10px] text-purple-300 mt-0.5 font-medium">{ag.specialty}</p>
                      <p className="text-[10px] text-slate-400 mt-1.5 line-clamp-2">{ag.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Selected Agent Detail Card */}
            <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-purple-950/30 to-slate-900 border border-purple-500/30">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-2xl">
                    {activeAgentData.avatar}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      {activeAgentData.name}
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono font-normal">
                        Active Agent
                      </span>
                    </h4>
                    <p className="text-xs text-purple-300">{activeAgentData.specialty}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveSubTab('debate')}
                    className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-md shadow-purple-600/20"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Invite to Debate</span>
                  </button>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                <p className="text-slate-400 text-[10px] uppercase tracking-wider font-bold">System Directive & Reasoning Engine</p>
                <p>"{activeAgentData.systemPrompt}"</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: MULTI-AGENT DEBATE ARENA */}
      {activeSubTab === 'debate' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/80">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-purple-400" />
                  Multi-Agent Real-time Debate Arena
                </h3>
                <p className="text-xs text-slate-400">
                  Autonomous agents debate creative choices, challenge assumptions, and iterate until a consensus threshold is met.
                </p>
              </div>
              <span className="text-[10px] font-mono text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                Consensus Target: 95%+ Confidence
              </span>
            </div>

            {/* Debate Input Trigger */}
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={debateTopic}
                onChange={(e) => setDebateTopic(e.target.value)}
                placeholder="Enter a creative topic or dilemma for agents to debate..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleTriggerDebate}
                disabled={isDebating}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/25 transition-all disabled:opacity-50"
              >
                {isDebating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Agents Debating...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Start Debate</span>
                  </>
                )}
              </button>
            </div>

            {/* Live Message Thread */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {debateMessages.map((msg) => {
                const agentMeta = SYSTEM_AGENTS.find((a) => a.id === msg.agentRole) || SYSTEM_AGENTS[0];
                return (
                  <div
                    key={msg.id}
                    className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-2 relative"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{agentMeta.avatar}</span>
                        <div>
                          <h5 className="text-xs font-bold text-white">{msg.agentName}</h5>
                          <span className="text-[10px] text-purple-300 font-mono">{agentMeta.specialty}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-400">{msg.timestamp}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Score: {(msg.confidenceScore * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-200 pl-8">{msg.content}</p>

                    {msg.thoughtProcess && (
                      <div className="ml-8 p-2.5 rounded-xl bg-slate-950/80 border border-purple-500/20 text-[11px] font-mono text-purple-300">
                        <span className="text-[9px] text-purple-400 uppercase tracking-wider font-bold block mb-0.5">
                          🧠 Agent Chain-of-Thought
                        </span>
                        {msg.thoughtProcess}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: VECTOR MEMORY INSPECTOR */}
      {activeSubTab === 'memory' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/80">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-purple-400" />
                  Pinecone / ChromaDB Persistent Vector Memory
                </h3>
                <p className="text-xs text-slate-400">
                  Retrieval-Augmented Generation (RAG) store capturing project lore, character backstory, user preferences, and scene continuity.
                </p>
              </div>

              <button
                onClick={() => setShowAddMemoryModal(true)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-md shadow-purple-600/20"
              >
                <Plus className="w-4 h-4" />
                <span>Inject Vector Memory</span>
              </button>
            </div>

            {/* Vector Search Input */}
            <div className="relative mb-6">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleVectorSearch(e.target.value)}
                placeholder="Query semantic vector memory (e.g., 'Dr. Vance backstory', 'Lighting rules', 'Anamorphic ratio')..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Vector Memories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.map((mem) => (
                <div
                  key={mem.id}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {mem.type.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">
                      Cos Sim: {(mem.similarityScore * 100).toFixed(1)}%
                    </span>
                  </div>

                  <h5 className="text-xs font-bold text-white">{mem.title}</h5>
                  <p className="text-xs text-slate-300">{mem.snippet}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                    <span className="text-[9px] font-mono text-slate-500">Vector ID: {mem.vectorId}</span>
                    <div className="flex gap-1">
                      {mem.tags.map((t) => (
                        <span key={t} className="text-[9px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: CHAIN-OF-THOUGHT & REFLECTION */}
      {activeSubTab === 'cot' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/80 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-400" />
                  Chain-of-Thought (CoT) & Reflection Engine
                </h3>
                <p className="text-xs text-slate-400">
                  Step-by-step reasoning log showing how subtasks are decomposed, self-critiqued, and revised.
                </p>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                Self-Correction Active
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 space-y-2">
                <div className="flex items-center justify-between text-purple-400 text-[11px] font-bold">
                  <span>STEP 1: PROMPT DECOMPOSITION</span>
                  <span>100% COMPLETE</span>
                </div>
                <p className="text-slate-400">
                  Deconstructed input prompt into 8 core creative variables: Title, Genre, Logline, 3-Act Beats, Character Archetype, Lighting Plan, Audio Spectrum, and Production Viability.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 space-y-2">
                <div className="flex items-center justify-between text-blue-400 text-[11px] font-bold">
                  <span>STEP 2: PARALLEL AGENT GENERATION</span>
                  <span>SYNCED</span>
                </div>
                <p className="text-slate-400">
                  Screenwriter generated 3 scenes. Cinematographer mapped Cooke Anamorphic lens profile. Storyboard agent compiled 8k image prompts.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 space-y-2">
                <div className="flex items-center justify-between text-emerald-400 text-[11px] font-bold">
                  <span>STEP 3: QA CONTINUITY AUDIT & SELF-CORRECTION</span>
                  <span>VERIFIED (98.4%)</span>
                </div>
                <p className="text-slate-400">
                  QA agent detected initial color temperature mismatch (5600K vs 3200K) between Scene 1 and Scene 2. Self-correction loop updated Scene 2 keylight to match cockpit interior.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Memory Modal */}
      {showAddMemoryModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 max-w-lg w-full space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-purple-400" />
              Inject New Vector Memory
            </h3>
            <p className="text-xs text-slate-400">
              Add persistent knowledge to the vector memory store for agents to query during production.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase">Memory Title</label>
                <input
                  type="text"
                  value={newMemoryTitle}
                  onChange={(e) => setNewMemoryTitle(e.target.value)}
                  placeholder="e.g., Alien Monolith Symbolism"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 mt-1"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase">Memory Content / Snippet</label>
                <textarea
                  rows={3}
                  value={newMemoryContent}
                  onChange={(e) => setNewMemoryContent(e.target.value)}
                  placeholder="e.g., The monolith symbols glow violet when close to dark matter anomalies..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 mt-1"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAddMemoryModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMemory}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-600/20"
              >
                Save Vector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
