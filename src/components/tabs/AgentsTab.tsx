import React, { useState, useEffect } from 'react';
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
  Clock,
  Send,
  Zap,
  ShieldCheck,
  ChevronRight,
  Cpu,
  RotateCcw,
  ListTodo,
  Layers,
  Terminal,
  Activity,
  Gauge,
  Sliders,
  Check
} from 'lucide-react';
import {
  MovieProject,
  AgentRole,
  AgentMessage,
  AgentSwarmItem,
  TaskQueueItem,
  MultiAgentDebateState,
  WorkflowNodeItem,
  RPAAutomationItem,
  MemoryCategoryItem
} from '../../types';

interface AgentsTabProps {
  project: MovieProject;
}

export const AgentsTab: React.FC<AgentsTabProps> = ({ project }) => {
  const [activeSubTab, setActiveSubTab] = useState<
    'dashboard' | 'chat' | 'debate' | 'workflow' | 'rpa' | 'queue' | 'memory'
  >('dashboard');

  // 1. AGENT DASHBOARD STATE (All 9 agents)
  const [agents, setAgents] = useState<AgentSwarmItem[]>([
    {
      id: 'director',
      name: 'Director Agent',
      avatar: '🎬',
      status: 'Working',
      currentTask: 'Defining overall narrative tone & visual atmosphere',
      memorySize: '2.4 MB',
      confidence: 0.98,
      executionTime: '1.2s',
      progress: 85,
      color: 'from-amber-500 to-orange-600',
      specialty: 'Creative Vision & Pace'
    },
    {
      id: 'screenwriter',
      name: 'Screenwriter Agent',
      avatar: '✍️',
      status: 'Completed',
      currentTask: 'Screenplay drafting & dialogue formatting',
      memorySize: '4.1 MB',
      confidence: 0.95,
      executionTime: '2.8s',
      progress: 100,
      color: 'from-purple-500 to-pink-600',
      specialty: 'Dialogue & Character Arcs'
    },
    {
      id: 'storyboard',
      name: 'Storyboard Agent',
      avatar: '🎨',
      status: 'Working',
      currentTask: 'Generating Midjourney & Flux prompt vectors',
      memorySize: '3.2 MB',
      confidence: 0.92,
      executionTime: '1.9s',
      progress: 70,
      color: 'from-cyan-500 to-blue-600',
      specialty: 'Visual Frame Composition'
    },
    {
      id: 'cinematographer',
      name: 'Cinematographer Agent',
      avatar: '🎥',
      status: 'Completed',
      currentTask: 'Mapping 18mm Cooke Anamorphic lighting setup',
      memorySize: '1.8 MB',
      confidence: 0.97,
      executionTime: '0.9s',
      progress: 100,
      color: 'from-blue-500 to-indigo-600',
      specialty: 'Lighting, Lens & Aspect Ratios'
    },
    {
      id: 'voice',
      name: 'Voice Agent',
      avatar: '🎙️',
      status: 'Waiting',
      currentTask: 'Awaiting dialogue line lock for narration synthesis',
      memorySize: '1.1 MB',
      confidence: 0.90,
      executionTime: '0.4s',
      progress: 30,
      color: 'from-emerald-500 to-teal-600',
      specialty: 'Vocal Emotion & Accent Tuning'
    },
    {
      id: 'music',
      name: 'Music Agent',
      avatar: '🎵',
      status: 'Thinking',
      currentTask: 'Evaluating orchestrations at 72 BPM tempo',
      memorySize: '1.5 MB',
      confidence: 0.94,
      executionTime: '0.8s',
      progress: 45,
      color: 'from-pink-500 to-rose-600',
      specialty: 'Score & Theme Composition'
    },
    {
      id: 'production',
      name: 'Production Manager Agent',
      avatar: '📋',
      status: 'Completed',
      currentTask: 'Built 14-day shooting call sheet & $12.5M budget',
      memorySize: '2.9 MB',
      confidence: 0.99,
      executionTime: '1.1s',
      progress: 100,
      color: 'from-orange-500 to-amber-600',
      specialty: 'Budgeting & Scheduling'
    },
    {
      id: 'qa',
      name: 'QA Agent',
      avatar: '🧐',
      status: 'Working',
      currentTask: 'Auditing continuity & cross-checking scene 1-3 logic',
      memorySize: '3.7 MB',
      confidence: 0.98,
      executionTime: '1.5s',
      progress: 90,
      color: 'from-emerald-400 to-cyan-500',
      specialty: 'Continuity & Error Auditing'
    },
    {
      id: 'rpa',
      name: 'RPA Automation Bot',
      avatar: '🤖',
      status: 'Completed',
      currentTask: 'Directory tree, PDF exports & ZIP packaging complete',
      memorySize: '5.0 MB',
      confidence: 1.0,
      executionTime: '0.3s',
      progress: 100,
      color: 'from-cyan-400 to-emerald-500',
      specialty: 'Robotic Background Tasks'
    }
  ]);

  // 2. AGENT CHAT PANEL STATE
  const [chatMessages, setChatMessages] = useState<AgentMessage[]>([
    {
      id: 'msg-1',
      agentRole: 'director',
      agentName: 'Director Agent',
      timestamp: '10:14:02 AM',
      content: 'Generate a suspense opening with high visual tension.',
      thoughtProcess: 'Setting high-stakes intro parameters for Scene 1.',
      confidenceScore: 0.98,
      messageType: 'proposal'
    },
    {
      id: 'msg-2',
      agentRole: 'screenwriter',
      agentName: 'Screenwriter Agent',
      timestamp: '10:14:08 AM',
      content: 'Story draft completed. Scene 1 INT. COCKPIT drafted with 3 minimal lines of dialogue.',
      thoughtProcess: 'Optimized parentheticals for emotional impact.',
      confidenceScore: 0.96,
      messageType: 'approval'
    },
    {
      id: 'msg-3',
      agentRole: 'storyboard',
      agentName: 'Storyboard Agent',
      timestamp: '10:14:15 AM',
      content: 'Creating storyboard prompts with 2.39:1 anamorphic ratio.',
      thoughtProcess: 'Composing keyframe lighting vector prompts.',
      confidenceScore: 0.94,
      messageType: 'proposal'
    },
    {
      id: 'msg-4',
      agentRole: 'qa',
      agentName: 'QA Agent',
      timestamp: '10:14:22 AM',
      content: 'Detected pacing issue in Scene 3. Recommend shortening silence gap by 2 seconds.',
      thoughtProcess: 'Audited script length vs shot duration.',
      confidenceScore: 0.99,
      messageType: 'critique'
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSendChatMessage = () => {
    if (!chatInput.trim()) return;
    const timeStr = new Date().toLocaleTimeString();
    const userMsg: AgentMessage = {
      id: `user-${Date.now()}`,
      agentRole: 'director',
      agentName: 'User / Producer',
      timestamp: timeStr,
      content: chatInput,
      thoughtProcess: 'User direct prompt input',
      confidenceScore: 1.0,
      messageType: 'proposal'
    };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');

    // Simulate Agent Swarm Response
    setTimeout(() => {
      const respMsg: AgentMessage = {
        id: `agent-resp-${Date.now()}`,
        agentRole: 'screenwriter',
        agentName: 'Screenwriter Agent',
        timestamp: new Date().toLocaleTimeString(),
        content: `Acknowledged request: "${chatInput}". Swarm agents are updating scene parameters and shot list matrix.`,
        thoughtProcess: 'Decomposing prompt into sub-tasks for Storyboard & QA Agents.',
        confidenceScore: 0.97,
        messageType: 'revision'
      };
      setChatMessages((prev) => [...prev, respMsg]);
    }, 600);
  };

  // 3. MULTI-AGENT DEBATE STATE
  const [debateFocus, setDebateFocus] = useState<'Creativity' | 'Accuracy' | 'Budget' | 'Story Quality'>('Story Quality');
  const [debateTopicInput, setDebateTopicInput] = useState('How should we approach the climax scene color temperature?');
  const [debateData, setDebateData] = useState<MultiAgentDebateState>({
    topic: 'Should Scene 1 emphasize quiet dread or high-action alarm sequences?',
    focusPriority: 'Story Quality',
    arguments: [
      { agent: 'Director Agent', point: 'Quiet dread builds lasting cosmic awe and establishes Dr. Vance as an introspective scientist.', role: 'director' },
      { agent: 'Screenwriter Agent', point: 'A quiet opening makes the sudden hull breach in Act 2 3x more shocking.', role: 'screenwriter' }
    ],
    counterarguments: [
      { agent: 'Cinematographer Agent', point: 'If we choose quiet dread, extreme low-key lighting with 5600K cyan rim lights is mandatory to prevent flat imagery.', role: 'cinematographer' }
    ],
    consensus: 'Combine quiet dread for the first 90 seconds, then spike tension with a sudden amber telemetry warning.',
    decision: 'Approved by Director & QA Agent. Scene 1 parameters saved to memory.'
  });
  const [isDebating, setIsDebating] = useState(false);

  const handleRunDebate = () => {
    setIsDebating(true);
    setTimeout(() => {
      setDebateData({
        topic: debateTopicInput,
        focusPriority: debateFocus,
        arguments: [
          { agent: 'Director Agent', point: `To maximize ${debateFocus}, we should preserve strict atmospheric control and slow zoom moves.`, role: 'director' },
          { agent: 'Cinematographer Agent', point: `From a camera perspective, framing Dr. Vance with a 50mm macro lens gives intimate character focus.`, role: 'cinematographer' }
        ],
        counterarguments: [
          { agent: 'Production Manager Agent', point: `Holding slow shots requires 2 additional VFX passes. Ensure we stay within our $12.5M budget.`, role: 'production' }
        ],
        consensus: `Adjust lighting to 4000K warm practicals inside the HUD while holding the 50mm shot for 6 seconds.`,
        decision: `Debate resolved with 98.6% agent consensus for priority: ${debateFocus}.`
      });
      setIsDebating(false);
    }, 800);
  };

  // 4. ANIMATED WORKFLOW GRAPH STATE
  const [workflowNodes, setWorkflowNodes] = useState<WorkflowNodeItem[]>([
    { id: 'w1', label: 'User Prompt', agentRole: 'director', status: 'completed', progress: 100, outputSnippet: 'Deep space sci-fi thriller prompt parsed', iconName: 'Sparkles' },
    { id: 'w2', label: 'Director', agentRole: 'director', status: 'completed', progress: 100, outputSnippet: 'Defined 2.39:1 Anamorphic tone', iconName: 'Bot' },
    { id: 'w3', label: 'Screenwriter', agentRole: 'screenwriter', status: 'completed', progress: 100, outputSnippet: 'Screenplay draft: 3 scenes', iconName: 'Brain' },
    { id: 'w4', label: 'Storyboard', agentRole: 'storyboard', status: 'processing', progress: 75, outputSnippet: 'Synthesizing Midjourney/Flux frames', iconName: 'Workflow' },
    { id: 'w5', label: 'Video Prompt', agentRole: 'cinematographer', status: 'processing', progress: 60, outputSnippet: 'Veo/Sora camera movement vectors', iconName: 'Zap' },
    { id: 'w6', label: 'Voice', agentRole: 'voice', status: 'idle', progress: 20, outputSnippet: 'Narration voice styles queued', iconName: 'Cpu' },
    { id: 'w7', label: 'Music', agentRole: 'music', status: 'idle', progress: 10, outputSnippet: '72 BPM orchestrations ready', iconName: 'Activity' },
    { id: 'w8', label: 'Production', agentRole: 'production', status: 'completed', progress: 100, outputSnippet: '14-day schedule & $12.5M budget', iconName: 'Gauge' },
    { id: 'w9', label: 'QA Audit', agentRole: 'qa', status: 'completed', progress: 100, outputSnippet: 'Continuity audit passed (0 errors)', iconName: 'ShieldCheck' },
    { id: 'w10', label: 'Export', agentRole: 'rpa', status: 'completed', progress: 100, outputSnippet: 'PDF, CSV, ZIP packages compiled', iconName: 'CheckCircle2' }
  ]);
  const [isProcessingWorkflow, setIsProcessingWorkflow] = useState(false);

  const handleRunWorkflow = () => {
    setIsProcessingWorkflow(true);
    setWorkflowNodes((prev) =>
      prev.map((n) => ({ ...n, status: 'processing', progress: Math.floor(Math.random() * 40) + 40 }))
    );
    setTimeout(() => {
      setWorkflowNodes((prev) =>
        prev.map((n) => ({ ...n, status: 'completed', progress: 100 }))
      );
      setIsProcessingWorkflow(false);
    }, 1500);
  };

  // 5. RPA AUTOMATION TASKS STATE
  const [rpaTasks, setRpaTasks] = useState<RPAAutomationItem[]>([
    { id: 'r1', name: 'Create Project Folder', status: 'Completed', progress: 100, duration: '0.4s', lastRun: 'Just now', category: 'File System' },
    { id: 'r2', name: 'Export PDF Screenplay', status: 'Completed', progress: 100, duration: '1.2s', lastRun: '1 min ago', category: 'Export' },
    { id: 'r3', name: 'Organize Assets', status: 'Completed', progress: 100, duration: '0.8s', lastRun: '2 mins ago', category: 'Assets' },
    { id: 'r4', name: 'Rename Scenes Consistently', status: 'Completed', progress: 100, duration: '0.3s', lastRun: '3 mins ago', category: 'Formatting' },
    { id: 'r5', name: 'Generate ZIP Package', status: 'Completed', progress: 100, duration: '1.5s', lastRun: '5 mins ago', category: 'Archiving' },
    { id: 'r6', name: 'Auto Save Project State', status: 'Completed', progress: 100, duration: '0.2s', lastRun: 'Continuous', category: 'System' },
    { id: 'r7', name: 'Version History Snapshot', status: 'Completed', progress: 100, duration: '0.5s', lastRun: '10 mins ago', category: 'Version Control' },
    { id: 'r8', name: 'Generate Documentation', status: 'Completed', progress: 100, duration: '0.9s', lastRun: '12 mins ago', category: 'Docs' },
    { id: 'r9', name: 'Build Production Schedule', status: 'Completed', progress: 100, duration: '1.1s', lastRun: '15 mins ago', category: 'Scheduling' }
  ]);

  const handleRetryRPA = (id: string) => {
    setRpaTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'Running', progress: 50 } : t))
    );
    setTimeout(() => {
      setRpaTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: 'Completed', progress: 100, lastRun: 'Just now' } : t))
      );
    }, 600);
  };

  // 6. TASK QUEUE STATE
  const [taskQueue, setTaskQueue] = useState<TaskQueueItem[]>([
    {
      id: 'tq-1',
      taskName: 'Screenplay Generation & Scene Beats',
      agentRole: 'screenwriter',
      agentName: 'Screenwriter Agent',
      priority: 'High',
      status: 'completed',
      startedAt: '10:00:05 AM',
      finishedAt: '10:00:12 AM',
      logs: ['Parsed logline', 'Built 3-act beats', 'Formatted FDX & PDF']
    },
    {
      id: 'tq-2',
      taskName: 'Cinematography Lens & Lighting Profile',
      agentRole: 'cinematographer',
      agentName: 'Cinematographer Agent',
      priority: 'High',
      status: 'completed',
      startedAt: '10:00:13 AM',
      finishedAt: '10:00:18 AM',
      logs: ['Cooke 18mm Anamorphic selected', '5600K Cyan Key setup verified']
    },
    {
      id: 'tq-3',
      taskName: 'Midjourney/Flux Storyboard Prompts',
      agentRole: 'storyboard',
      agentName: 'Storyboard Agent',
      priority: 'Medium',
      status: 'running',
      startedAt: '10:00:19 AM',
      finishedAt: 'In Progress',
      logs: ['Frame 1 prompt rendered', 'Frame 2 prompt rendering...']
    },
    {
      id: 'tq-4',
      taskName: 'Robotic Directory & PDF Export',
      agentRole: 'qa',
      agentName: 'RPA Bot #01',
      priority: 'High',
      status: 'completed',
      startedAt: '10:00:25 AM',
      finishedAt: '10:00:28 AM',
      logs: ['Created 6 studio folders', 'Exported script PDF & CSV']
    }
  ]);

  // 7. MEMORY VIEWER STATE
  const [activeMemoryTab, setActiveMemoryTab] = useState<'scene' | 'character' | 'preferences' | 'project' | 'long_term'>('scene');
  const [memoryItems] = useState<MemoryCategoryItem[]>([
    { id: 'm1', category: 'scene', key: 'Scene 1 Heading', value: 'INT. COCKPIT - NIGHT', relevanceScore: 0.99, vectorHash: 'vec_7f8a12', updatedAt: 'Just now' },
    { id: 'm2', category: 'scene', key: 'Lighting Key', value: '4000K HUD glow with emergency amber strobe', relevanceScore: 0.95, vectorHash: 'vec_3b91c8', updatedAt: '2 mins ago' },
    { id: 'm3', category: 'character', key: 'Dr. Elena Vance', value: 'Astrophysicist turned commander. Highly logical, silent trauma from 2038 mission.', relevanceScore: 0.98, vectorHash: 'vec_9d42f1', updatedAt: '5 mins ago' },
    { id: 'm4', category: 'character', key: 'Ship AI (AURA)', value: 'Calm synthetic tone, begins responding in ancient Sumerian.', relevanceScore: 0.96, vectorHash: 'vec_1e89a3', updatedAt: '5 mins ago' },
    { id: 'm5', category: 'preferences', key: 'Aspect Ratio', value: '2.39:1 Ultrawide Anamorphic', relevanceScore: 0.96, vectorHash: 'vec_5c23d0', updatedAt: '10 mins ago' },
    { id: 'm6', category: 'preferences', key: 'Color Palette', value: 'Cyan key, deep indigo shadows, warm amber practicals', relevanceScore: 0.94, vectorHash: 'vec_8f11b4', updatedAt: '10 mins ago' },
    { id: 'm7', category: 'project', key: 'Logline', value: project.logline || 'When an astronaut discovers a silent alien monolith, her ship AI responds in a dead language.', relevanceScore: 0.99, vectorHash: 'vec_0a77e9', updatedAt: '15 mins ago' },
    { id: 'm8', category: 'project', key: 'Budget Cap', value: '$12,500,000 USD (A-List Indie Sci-Fi)', relevanceScore: 0.97, vectorHash: 'vec_6b34e2', updatedAt: '15 mins ago' },
    { id: 'm9', category: 'long_term', key: 'Studio Style Guide', value: 'A-list sci-fi blockbuster quality with minimal dialogue and immersive soundscapes.', relevanceScore: 0.92, vectorHash: 'vec_4d88f6', updatedAt: '1 hour ago' }
  ]);

  const filteredMemories = memoryItems.filter((m) => m.category === activeMemoryTab);

  return (
    <div className="space-y-6">
      {/* Top Enterprise Header */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-950/50 via-slate-900/90 to-blue-950/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -z-10" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-purple-400" />
                ENTERPRISE AGENTIC AI & RPA ARCHITECTURE
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                SWARM ACTIVE
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              🤖 AI Agent Swarm & RPA Orchestration
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl mt-1">
              Autonomous multi-agent system collaborating on story, screenplay, cinematography, voice, music, production planning, continuity QA, and robotic background automation.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
            <div className="text-center px-3 border-r border-slate-800">
              <p className="text-[10px] font-mono text-slate-400">ACTIVE AGENTS</p>
              <p className="text-lg font-bold text-purple-400 font-mono">9 Agents</p>
            </div>
            <div className="text-center px-3 border-r border-slate-800">
              <p className="text-[10px] font-mono text-slate-400">CONFIDENCE</p>
              <p className="text-lg font-bold text-emerald-400 font-mono">98.4%</p>
            </div>
            <div className="text-center px-3">
              <p className="text-[10px] font-mono text-slate-400">RPA TASKS</p>
              <p className="text-lg font-bold text-cyan-400 font-mono">9 Bots</p>
            </div>
          </div>
        </div>

        {/* 7 Sub-Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-purple-500/20">
          {[
            { id: 'dashboard', label: 'Agent Dashboard', icon: Gauge },
            { id: 'chat', label: 'Agent Chat', icon: MessageSquare },
            { id: 'debate', label: 'Multi-Agent Debate', icon: Bot },
            { id: 'workflow', label: 'Animated Workflow', icon: Workflow },
            { id: 'rpa', label: 'RPA Automations', icon: Cpu },
            { id: 'queue', label: 'Task Queue', icon: ListTodo },
            { id: 'memory', label: 'Memory Viewer', icon: Database }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. AGENT DASHBOARD SUB-TAB */}
      {activeSubTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Gauge className="w-4 h-4 text-purple-400" />
              Autonomous Agent Swarm Dashboard
            </h3>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              Real-time Agent Telemetry
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <motion.div
                key={agent.id}
                whileHover={{ y: -2 }}
                className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 transition-all space-y-3 relative overflow-hidden group shadow-lg"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${agent.color}`} />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{agent.avatar}</span>
                    <div>
                      <h4 className="text-sm font-bold text-white">{agent.name}</h4>
                      <p className="text-[10px] text-purple-300 font-mono">{agent.specialty}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${
                      agent.status === 'Completed'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : agent.status === 'Working'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 animate-pulse'
                        : agent.status === 'Thinking'
                        ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}
                  >
                    {agent.status}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-xs">
                  <p className="text-[10px] text-slate-500 font-mono uppercase mb-0.5">CURRENT TASK</p>
                  <p className="text-slate-200 line-clamp-2">{agent.currentTask}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center pt-1 border-t border-slate-800/80 text-[10px] font-mono">
                  <div className="bg-slate-950/50 p-1.5 rounded-xl border border-slate-800">
                    <p className="text-slate-500">MEMORY</p>
                    <p className="text-purple-300 font-bold">{agent.memorySize}</p>
                  </div>
                  <div className="bg-slate-950/50 p-1.5 rounded-xl border border-slate-800">
                    <p className="text-slate-500">CONFIDENCE</p>
                    <p className="text-emerald-400 font-bold">{(agent.confidence * 100).toFixed(0)}%</p>
                  </div>
                  <div className="bg-slate-950/50 p-1.5 rounded-xl border border-slate-800">
                    <p className="text-slate-500">EXEC TIME</p>
                    <p className="text-blue-400 font-bold">{agent.executionTime}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span>Task Progress</span>
                    <span>{agent.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${agent.color} transition-all duration-500`}
                      style={{ width: `${agent.progress}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* 2. AGENT CHAT SUB-TAB */}
      {activeSubTab === 'chat' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/80 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-purple-400" />
                  Agent Swarm Conversation Panel
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time agent communication thread showing inter-agent prompt directives, critiques, and task completions.
                </p>
              </div>
              <span className="text-[10px] font-mono text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                Multi-Turn Agent Feed
              </span>
            </div>

            {/* Chat Thread */}
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🤖</span>
                      <h5 className="text-xs font-bold text-white">{msg.agentName}</h5>
                      <span className="text-[10px] font-mono text-purple-300 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                        {msg.messageType.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">{msg.timestamp}</span>
                  </div>

                  <p className="text-xs text-slate-200">{msg.content}</p>

                  {msg.thoughtProcess && (
                    <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px] font-mono text-purple-300">
                      <span className="text-[9px] text-purple-400 uppercase tracking-wider block font-bold">
                        🧠 Thought Process
                      </span>
                      {msg.thoughtProcess}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                placeholder="Instruct the agent swarm (e.g., 'Director → Generate a suspense opening')..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleSendChatMessage}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/20 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Prompt</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. MULTI-AGENT DEBATE SUB-TAB */}
      {activeSubTab === 'debate' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/80 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Bot className="w-4 h-4 text-purple-400" />
                  Multi-Agent Creative Debate Arena
                </h3>
                <p className="text-xs text-slate-400">
                  Choose a priority focus and trigger an autonomous debate between agents to arrive at optimal creative consensus.
                </p>
              </div>

              {/* Priority Selectors */}
              <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
                {(['Creativity', 'Accuracy', 'Budget', 'Story Quality'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setDebateFocus(p)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      debateFocus === p
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={debateTopicInput}
                onChange={(e) => setDebateTopicInput(e.target.value)}
                placeholder="Enter creative debate topic..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleRunDebate}
                disabled={isDebating}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/25 transition-all disabled:opacity-50"
              >
                {isDebating ? 'Debating...' : 'Trigger Debate'}
              </button>
            </div>

            {/* Debate Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Arguments */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  Primary Arguments
                </h4>
                <div className="space-y-2">
                  {debateData.arguments.map((arg, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs">
                      <span className="font-bold text-white block mb-0.5">{arg.agent}:</span>
                      <p className="text-slate-300">{arg.point}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Counterarguments */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                  Counterarguments & Constraints
                </h4>
                <div className="space-y-2">
                  {debateData.counterarguments.map((carg, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs">
                      <span className="font-bold text-white block mb-0.5">{carg.agent}:</span>
                      <p className="text-slate-300">{carg.point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Consensus & Final Decision */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-purple-950/40 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-bold">
                  🤝 SWARM CONSENSUS REACHED
                </span>
                <span className="text-[10px] font-mono text-slate-400">Target Focus: {debateData.focusPriority}</span>
              </div>
              <p className="text-xs font-bold text-white">{debateData.consensus}</p>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-300">
                <span className="text-slate-400 text-[10px] block">FINAL DECISION:</span>
                {debateData.decision}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. WORKFLOW GRAPH SUB-TAB */}
      {activeSubTab === 'workflow' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/80 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-purple-400" />
                  Animated End-to-End Production Workflow
                </h3>
                <p className="text-xs text-slate-400">
                  Sequential agent pipeline with real-time progress animation: User Prompt → Director → Screenwriter → Storyboard → Video Prompt → Voice → Music → Production → QA → Export.
                </p>
              </div>

              <button
                onClick={handleRunWorkflow}
                disabled={isProcessingWorkflow}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-purple-600/20 transition-all disabled:opacity-50"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{isProcessingWorkflow ? 'Processing Pipeline...' : 'Run Workflow'}</span>
              </button>
            </div>

            {/* Workflow Node Chain */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {workflowNodes.map((node, index) => (
                <div
                  key={node.id}
                  className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-purple-400">STEP 0{index + 1}</span>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded-full uppercase border ${
                        node.status === 'completed'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-blue-500/10 text-blue-400 border-blue-500/20 animate-pulse'
                      }`}
                    >
                      {node.status}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white">{node.label}</h4>
                  <p className="text-[10px] text-slate-400 line-clamp-2">{node.outputSnippet}</p>

                  <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden mt-2">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-300"
                      style={{ width: `${node.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. RPA AUTOMATIONS SUB-TAB */}
      {activeSubTab === 'rpa' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/80 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  Robotic Process Automation (RPA) Dashboard
                </h3>
                <p className="text-xs text-slate-400">
                  Background bots managing folder creation, PDF screenplay exports, asset organization, ZIP backups, and schedule generation.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {rpaTasks.map((task) => (
                <div key={task.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                      {task.category}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">{task.duration}</span>
                  </div>

                  <h5 className="text-xs font-bold text-white">{task.name}</h5>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>Status: {task.status}</span>
                    <span>Last run: {task.lastRun}</span>
                  </div>

                  <button
                    onClick={() => handleRetryRPA(task.id)}
                    className="w-full py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Retry Automation</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. TASK QUEUE SUB-TAB */}
      {activeSubTab === 'queue' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/80 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ListTodo className="w-4 h-4 text-purple-400" />
                  Agent & RPA Task Execution Queue
                </h3>
                <p className="text-xs text-slate-400">
                  Live queue monitoring agent task priorities, start times, completion status, and execution logs.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-3">Task</th>
                    <th className="pb-3">Agent</th>
                    <th className="pb-3">Priority</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Started</th>
                    <th className="pb-3">Finished</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {taskQueue.map((t) => (
                    <tr key={t.id}>
                      <td className="py-3 font-bold text-white">{t.taskName}</td>
                      <td className="py-3 text-purple-300">{t.agentName}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          {t.priority}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {t.status}
                        </span>
                      </td>
                      <td className="py-3 text-slate-400">{t.startedAt}</td>
                      <td className="py-3 text-slate-400">{t.finishedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 7. MEMORY VIEWER SUB-TAB */}
      {activeSubTab === 'memory' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/80 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-purple-400" />
                  Vector Store & Persistent Memory Viewer
                </h3>
                <p className="text-xs text-slate-400">
                  Inspect persistent agent memory embeddings categorized by Scene, Character, User Preferences, Project, and Long-Term Lore.
                </p>
              </div>

              {/* Memory Category Tabs */}
              <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
                {[
                  { id: 'scene', label: 'Scene Memory' },
                  { id: 'character', label: 'Character Memory' },
                  { id: 'preferences', label: 'User Preferences' },
                  { id: 'project', label: 'Project Memory' },
                  { id: 'long_term', label: 'Long-Term Memory' }
                ].map((mTab) => (
                  <button
                    key={mTab.id}
                    onClick={() => setActiveMemoryTab(mTab.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      activeMemoryTab === mTab.id
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {mTab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Memory Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMemories.map((mem) => (
                <div
                  key={mem.id}
                  className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-purple-300 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                      {mem.key}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">
                      Cos Sim: {(mem.relevanceScore * 100).toFixed(0)}%
                    </span>
                  </div>

                  <p className="text-xs text-slate-200">{mem.value}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-500">
                    <span>Vector: {mem.vectorHash}</span>
                    <span>Updated: {mem.updatedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

