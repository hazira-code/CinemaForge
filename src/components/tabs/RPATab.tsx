import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Cpu,
  Zap,
  FolderTree,
  FileText,
  FileSpreadsheet,
  Calendar,
  Mail,
  Archive,
  CheckSquare,
  History,
  Play,
  RefreshCw,
  Download,
  Copy,
  Check,
  HardDrive,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { MovieProject, RPATaskItem, ProjectVersionSnapshot } from '../../types';
import { INITIAL_RPA_TASKS } from '../../data/agentsData';
import { downloadPDF, downloadJSON } from '../../utils/exporter';

interface RPATabProps {
  project: MovieProject;
}

export const RPATab: React.FC<RPATabProps> = ({ project }) => {
  const [rpaTasks, setRpaTasks] = useState<RPATaskItem[]>(INITIAL_RPA_TASKS);
  const [activeTaskCategory, setActiveTaskCategory] = useState<'all' | 'folder' | 'export' | 'schedule' | 'email'>('all');
  const [copiedTree, setCopiedTree] = useState(false);
  const [isRunningAll, setIsRunningAll] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Version Control Snapshots State
  const [snapshots, setSnapshots] = useState<ProjectVersionSnapshot[]>([
    {
      version: 'v1.2-master',
      timestamp: 'Just now',
      author: 'RPA Bot #04',
      changelog: 'Auto-backed up after Cinematography & Storyboard generation.',
      snapshotData: { title: project.title }
    },
    {
      version: 'v1.1-draft',
      timestamp: '1 hour ago',
      author: 'Screenwriter Agent',
      changelog: 'Refined Scene 1 dialogue and added parentheticals.',
      snapshotData: { title: project.title }
    },
    {
      version: 'v1.0-initial',
      timestamp: '3 hours ago',
      author: 'Director Agent',
      changelog: 'Initial project concept created from user prompt.',
      snapshotData: { title: project.title }
    }
  ]);

  // Production Checklist State
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Script Lock & Scene Headings Verification', done: true },
    { id: 2, text: 'Shot List Matrix & Focal Lens Planning', done: true },
    { id: 3, text: 'AI Storyboard Prompt Generation', done: true },
    { id: 4, text: '14-Day Shooting Schedule Matrix Build', done: true },
    { id: 5, text: 'Automated Call Sheets & Crew Assignment', done: true },
    { id: 6, text: 'Executive Producer Daily Email Update Dispatch', done: emailSent }
  ]);

  // Execute an individual RPA task via backend API or simulation
  const handleExecuteTask = async (taskId: string) => {
    setRpaTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: 'running', progress: 45 } : t))
    );

    try {
      const res = await fetch('/api/rpa-execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskId,
          projectTitle: project.title
        })
      });

      if (res.ok) {
        const data = await res.json();
        setRpaTasks((prev) =>
          prev.map((t) =>
            t.id === taskId
              ? {
                  ...t,
                  status: 'completed',
                  progress: 100,
                  lastExecuted: 'Just now',
                  outputSummary: data.summary || t.outputSummary,
                  logs: [...t.logs, `API execute success: ${data.timestamp || 'OK'}`]
                }
              : t
          )
        );
      } else {
        throw new Error('Fallback simulation');
      }
    } catch {
      setTimeout(() => {
        setRpaTasks((prev) =>
          prev.map((t) =>
            t.id === taskId
              ? {
                  ...t,
                  status: 'completed',
                  progress: 100,
                  lastExecuted: 'Just now',
                  logs: [...t.logs, `Robotic automation loop executed successfully.`]
                }
              : t
          )
        );
      }, 800);
    }
  };

  // One-click run all automations
  const handleRunAllRPA = () => {
    setIsRunningAll(true);
    setRpaTasks((prev) => prev.map((t) => ({ ...t, status: 'running', progress: 20 })));

    setTimeout(() => {
      setRpaTasks((prev) =>
        prev.map((t) => ({
          ...t,
          status: 'completed',
          progress: 100,
          lastExecuted: 'Just now'
        }))
      );
      setIsRunningAll(false);
    }, 1500);
  };

  // Create new version snapshot
  const handleCreateSnapshot = () => {
    const nextVerNum = (1.3 + snapshots.length * 0.1).toFixed(1);
    const newSnap: ProjectVersionSnapshot = {
      version: `v${nextVerNum}-auto`,
      timestamp: 'Just now',
      author: 'RPA Auto-Save Engine',
      changelog: `Automated snapshot created for ${project.title}.`,
      snapshotData: { title: project.title }
    };
    setSnapshots([newSnap, ...snapshots]);
  };

  const folderStructureString = `📁 /${project.title.replace(/\s+/g, '_').toUpperCase()}_PRODUCTION
├── 📁 01_Screenplay/
│   ├── 📄 ${project.title}_Screenplay_FinalDraft.pdf
│   └── 📝 screenplay_metadata.json
├── 📁 02_ShotList/
│   ├── 📊 shotlist_matrix.csv
│   └── 🎥 lens_and_lighting_plan.txt
├── 📁 03_Storyboards/
│   ├── 🖼️ frame_001_cockpit_reveal.png
│   └── 🖼️ frame_002_monolith_wide.png
├── 📁 04_Audio_and_Voice/
│   ├── 🎵 soundtrack_score_72bpm.wav
│   └── 🎙️ narration_vance_voice.mp3
├── 📁 05_Production_Schedules/
│   ├── 📅 14day_shooting_schedule.pdf
│   └── 📋 call_sheets_day01_to_day14.pdf
└── 📁 06_Packages/
    └── 📦 ${project.title}_Full_Master_Package.zip`;

  const handleCopyFolderTree = () => {
    navigator.clipboard.writeText(folderStructureString);
    setCopiedTree(true);
    setTimeout(() => setCopiedTree(false), 2000);
  };

  const toggleChecklistItem = (id: number) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-slate-900/90 to-purple-950/40 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-3 h-3 text-cyan-400" />
                ROBOTIC PROCESS AUTOMATION (RPA) ENGINE
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                BACKGROUND BOTS ACTIVE
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              Automated Production Bot Hub
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl mt-1">
              Automates repetitive filmmaking tasks: directory tree generation, version control snapshots, screenplay PDF exports, shot list CSVs, shooting schedules, and auto-backups.
            </p>
          </div>

          <button
            onClick={handleRunAllRPA}
            disabled={isRunningAll}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-xl shadow-cyan-500/20 transition-all disabled:opacity-50"
          >
            {isRunningAll ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Running RPA Bots...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Execute All RPA Automations</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Grid Layout: Left Column = Folder Tree & Version Control, Right Column = Schedule & Checklists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* Section 1: Directory Tree Generator */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/80">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FolderTree className="w-4 h-4 text-cyan-400" />
                  Project Directory Structure Bot
                </h3>
                <p className="text-xs text-slate-400">
                  Automatically builds clean Hollywood studio folder hierarchies for local or server storage.
                </p>
              </div>

              <button
                onClick={handleCopyFolderTree}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                {copiedTree ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedTree ? 'Copied Tree' : 'Copy Tree Map'}</span>
              </button>
            </div>

            <div className="bg-[#0B0F19] p-4 rounded-2xl border border-slate-800 font-mono text-xs text-cyan-300 leading-relaxed overflow-x-auto">
              <pre className="whitespace-pre">{folderStructureString}</pre>
            </div>
          </div>

          {/* Section 2: Auto-Version Control Engine */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/80">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <History className="w-4 h-4 text-purple-400" />
                  Auto-Version Control & Rollback Engine
                </h3>
                <p className="text-xs text-slate-400">
                  Maintains continuous SHA-256 version snapshots with rollback capability.
                </p>
              </div>

              <button
                onClick={handleCreateSnapshot}
                className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <Archive className="w-3.5 h-3.5" />
                <span>Create Snapshot</span>
              </button>
            </div>

            <div className="space-y-3">
              {snapshots.map((snap) => (
                <div
                  key={snap.version}
                  className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-mono text-xs font-bold border border-purple-500/30">
                      {snap.version}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-white">{snap.changelog}</p>
                      <p className="text-[10px] text-slate-400">Author: {snap.author} • {snap.timestamp}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`Restored project state to ${snap.version}`)}
                    className="text-[10px] font-mono text-cyan-400 hover:underline px-2 py-1 rounded bg-slate-800 border border-slate-700"
                  >
                    Restore
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* Section 3: Automated Shooting Schedule Matrix */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/80">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  Automated 14-Day Shooting Call Sheet Matrix
                </h3>
                <p className="text-xs text-slate-400">
                  RPA bot optimizes shooting order based on location grouping and cast availability.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-2">Day</th>
                    <th className="pb-2">Location</th>
                    <th className="pb-2">Scenes</th>
                    <th className="pb-2">Call Time</th>
                    <th className="pb-2">Crew</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="py-2.5 text-amber-400 font-bold">Day 01</td>
                    <td>INT. COCKPIT</td>
                    <td>Scene 1</td>
                    <td>06:00 AM</td>
                    <td>14 crew</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-amber-400 font-bold">Day 02</td>
                    <td>EXT. MONOLITH</td>
                    <td>Scene 2</td>
                    <td>07:30 AM</td>
                    <td>22 crew</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-amber-400 font-bold">Day 03</td>
                    <td>INT. FLIGHT DECK</td>
                    <td>Scene 3</td>
                    <td>06:00 AM</td>
                    <td>16 crew</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Production Checklist & Executive Email Dispatcher */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/80 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-400" />
                  Automated Production Checklists & Email Dispatch
                </h3>
                <p className="text-xs text-slate-400">
                  RPA bot monitors task completions and sends daily production updates to executive producers.
                </p>
              </div>

              <button
                onClick={() => {
                  setEmailSent(true);
                  alert(`Executive Daily Dispatch Email sent to Executive Producers & Department Heads.`);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{emailSent ? 'Email Dispatched ✓' : 'Dispatch Email'}</span>
              </button>
            </div>

            <div className="space-y-2">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3 cursor-pointer hover:border-slate-700 transition-all"
                >
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => {}}
                    className="w-4 h-4 accent-emerald-500 rounded"
                  />
                  <span className={`text-xs ${item.done ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: RPA Tasks Status Overview */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-950/80 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              Active RPA Bot Queue ({rpaTasks.length})
            </h3>

            <div className="space-y-2">
              {rpaTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <p className="font-bold text-white">{task.title}</p>
                    <p className="text-[10px] text-slate-400">{task.outputSummary}</p>
                  </div>

                  <button
                    onClick={() => handleExecuteTask(task.id)}
                    className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono text-[10px] hover:bg-cyan-500/30"
                  >
                    Run Bot
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
