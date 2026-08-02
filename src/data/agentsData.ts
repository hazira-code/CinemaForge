import { AgentProfile, VectorMemoryEntry, RPATaskItem } from '../types';

export const SYSTEM_AGENTS: AgentProfile[] = [
  {
    id: 'director',
    name: 'Director Agent',
    avatar: '🎬',
    iconName: 'Clapperboard',
    specialty: 'Vision, Creative Direction & Narrative Framing',
    description: 'Understands overall user vision, establishes cinematic tone, directs story arc and aesthetic choices.',
    systemPrompt: 'You are the Lead Director Agent. You make high-level creative decisions, unify artistic direction, and resolve conflicts between departments.',
    color: 'from-amber-500 to-orange-600',
    memoryItemsCount: 42
  },
  {
    id: 'screenwriter',
    name: 'Screenwriter Agent',
    avatar: '✍️',
    iconName: 'FileText',
    specialty: 'Screenplay, Dialogue & Story Consistency',
    description: 'Generates industry-standard screenplay pages, polishes dialogue subtext, eliminates plot holes.',
    systemPrompt: 'You are the Screenwriter Agent. Craft realistic, emotionally resonant screenplay scenes with proper sluglines and parentheticals.',
    color: 'from-blue-500 to-cyan-600',
    memoryItemsCount: 68
  },
  {
    id: 'cinematographer',
    name: 'Cinematographer Agent',
    avatar: '🎥',
    iconName: 'Camera',
    specialty: 'Camera Angles, Lenses & Lighting Design',
    description: 'Plans focal lengths, camera movements, lighting key/fill ratios, depth-of-field, and visual composition.',
    systemPrompt: 'You are the DP Agent. Define precise camera optics, lighting temperatures, and movement styles for every shot.',
    color: 'from-purple-500 to-indigo-600',
    memoryItemsCount: 51
  },
  {
    id: 'storyboard',
    name: 'Storyboard Agent',
    avatar: '🎨',
    iconName: 'Image',
    specialty: 'AI Image Prompts & Visual Framing',
    description: 'Engineers photorealistic image prompts, character positioning, framing geometry, and environment consistency.',
    systemPrompt: 'You are the Storyboard Agent. Convert screenplay beats into high-fidelity image synthesis prompts for Midjourney/Flux/Gemini.',
    color: 'from-pink-500 to-rose-600',
    memoryItemsCount: 39
  },
  {
    id: 'character',
    name: 'Character Agent',
    avatar: '🎭',
    iconName: 'UserCheck',
    specialty: 'Character Personality & Costume Continuity',
    description: 'Tracks character psychological archetypes, costume choices, emotional arcs, and facial expressions.',
    systemPrompt: 'You are the Character Agent. Ensure character behavior remains authentic and visually distinct across all scenes.',
    color: 'from-emerald-500 to-teal-600',
    memoryItemsCount: 34
  },
  {
    id: 'music',
    name: 'Music Director Agent',
    avatar: '🎼',
    iconName: 'Music',
    specialty: 'Soundtrack, Score & Musical Cues',
    description: 'Designs genre-appropriate orchestral score prompts, BPM tempos, instrument choices, and emotional swells.',
    systemPrompt: 'You are the Music Director Agent. Compose thematic music prompts and score breakdown for sound synthesis.',
    color: 'from-violet-500 to-purple-700',
    memoryItemsCount: 29
  },
  {
    id: 'voice',
    name: 'Voice Director Agent',
    avatar: '🎙',
    iconName: 'Mic',
    specialty: 'Narration, Pacing & Voice-over Scripts',
    description: 'Crafts narration scripts, character vocal delivery directions, accents, and emotional cadence.',
    systemPrompt: 'You are the Voice Director Agent. Direct vocal cadence, pause timing, and acoustic reverberation.',
    color: 'from-sky-500 to-blue-700',
    memoryItemsCount: 25
  },
  {
    id: 'video',
    name: 'Video Prompt Agent',
    avatar: '🎞',
    iconName: 'Video',
    specialty: 'Generative AI Motion Prompts (Veo / Sora / Runway)',
    description: 'Optimizes high-motion video prompts for AI video generators like Google Veo, Runway Gen-3, Sora, and Luma.',
    systemPrompt: 'You are the AI Video Motion Agent. Write camera movement vectors and zero-g physics descriptions for video models.',
    color: 'from-fuchsia-500 to-pink-700',
    memoryItemsCount: 47
  },
  {
    id: 'production',
    name: 'Production Manager Agent',
    avatar: '📋',
    iconName: 'Briefcase',
    specialty: 'Budgeting, Scheduling & Logistics',
    description: 'Estimates line-item budgets, designs shooting schedules, crew requirements, and location permits.',
    systemPrompt: 'You are the Line Producer Agent. Ensure production viability, budget limits, shooting feasibility, and crew planning.',
    color: 'from-amber-600 to-yellow-600',
    memoryItemsCount: 38
  },
  {
    id: 'qa',
    name: 'QA & Continuity Agent',
    avatar: '🧐',
    iconName: 'ShieldCheck',
    specialty: 'Plot Hole Detection & Quality Assurance',
    description: 'Audits script continuity, logical plot twists, lighting agreement, and validates overall production quality.',
    systemPrompt: 'You are the QA Agent. Audit the complete pre-production package for contradictions, formatting errors, or continuity breaks.',
    color: 'from-green-500 to-emerald-700',
    memoryItemsCount: 61
  }
];

export const INITIAL_VECTOR_MEMORIES: VectorMemoryEntry[] = [
  {
    id: 'vec-001',
    type: 'character',
    title: 'Character Backstory - Captain Elena Vance',
    snippet: 'Dr. Elena Vance served 12 years as astrophysicist on the Ares Station before taking command of the deep space anomaly scout unit. She fears losing her crew like the 2038 disaster.',
    vectorId: 'emb_98f42a1',
    similarityScore: 0.94,
    tags: ['character', 'backstory', 'vance', 'sci-fi'],
    createdAt: '2026-08-01T14:20:00Z'
  },
  {
    id: 'vec-002',
    type: 'lore',
    title: 'World Lore - The Obsidian Monolith',
    snippet: 'Constructed from non-baryonic dark matter alloy, the Monolith emits a 14.2 GHz cyan pulse every 88 seconds, interfering with sub-light propulsion.',
    vectorId: 'emb_12c98b4',
    similarityScore: 0.91,
    tags: ['lore', 'monolith', 'anomaly', 'sci-fi'],
    createdAt: '2026-08-01T14:22:00Z'
  },
  {
    id: 'vec-003',
    type: 'scene',
    title: 'Scene 1 Continuity - Cockpit Emergency Lighting',
    snippet: 'Primary power fails at 00:03. Cockpit transitions to 4000K cyan HUD glow and emergency amber strobe every 2.5 seconds.',
    vectorId: 'emb_77e11f0',
    similarityScore: 0.88,
    tags: ['scene1', 'lighting', 'continuity'],
    createdAt: '2026-08-01T14:25:00Z'
  },
  {
    id: 'vec-004',
    type: 'preference',
    title: 'User Preference - Anamorphic Visual Aesthetic',
    snippet: 'User prefers 2.39:1 ultrawide anamorphic ratio with cool cyan keylights, deep indigo shadows, and organic Kodak film grain.',
    vectorId: 'emb_33a009c',
    similarityScore: 0.96,
    tags: ['user', 'preferences', 'cinematography'],
    createdAt: '2026-08-01T14:30:00Z'
  }
];

export const INITIAL_RPA_TASKS: RPATaskItem[] = [
  {
    id: 'rpa-folder-struct',
    title: 'Generate Production Directory Structure',
    category: 'folder_structure',
    status: 'completed',
    progress: 100,
    lastExecuted: 'Just now',
    logs: [
      'Started RPA bot: folder_builder_v2',
      'Created /screenplay/final_draft.fdx',
      'Created /storyboards/scene_01_frame_01.png',
      'Created /audio/score_cues.wav',
      'Created /production/call_sheets_day1.pdf',
      'Folder tree verification complete.'
    ],
    outputSummary: 'Successfully organized 6 folders and 18 production subdirectories.',
    autoRunEnabled: true
  },
  {
    id: 'rpa-version-control',
    title: 'Auto-Version Snapshot Engine',
    category: 'version_control',
    status: 'completed',
    progress: 100,
    lastExecuted: '2 mins ago',
    logs: [
      'Calculated SHA-256 hash of current script state',
      'Created snapshot tag v1.2-master',
      'Saved local rollback point to IndexedDB / Server memory'
    ],
    outputSummary: 'Snapshot v1.2 saved. 0 merge conflicts detected.',
    autoRunEnabled: true
  },
  {
    id: 'rpa-schedule-matrix',
    title: 'Generate Shooting Schedule & Call Sheets',
    category: 'schedule_matrix',
    status: 'completed',
    progress: 100,
    lastExecuted: '5 mins ago',
    logs: [
      'Parsed scene locations: INT. COCKPIT, EXT. MONOLITH',
      'Optimized actor availability: Elena Vance (15 shooting days)',
      'Constructed 14-day shooting call sheet matrix with weather backups'
    ],
    outputSummary: 'Created 14-day shooting schedule matrix.',
    autoRunEnabled: true
  },
  {
    id: 'rpa-file-exporter',
    title: 'Export Production Kit (PDF, CSV, JSON)',
    category: 'file_export',
    status: 'completed',
    progress: 100,
    lastExecuted: '10 mins ago',
    logs: [
      'Compiled screenplay to PDF with standard Hollywood layout',
      'Exported shot list to CSV table format',
      'Generated raw JSON metadata bundle for game engine import'
    ],
    outputSummary: 'Screenplay PDF and Shot List CSV ready for export.',
    autoRunEnabled: false
  },
  {
    id: 'rpa-notifications',
    title: 'Automated Daily Production Dispatch Email',
    category: 'notifications',
    status: 'idle',
    progress: 0,
    lastExecuted: 'Never',
    logs: [
      'Dispatcher ready for trigger.',
      'Target recipients: Producer, DP, Line Producer, Department Heads'
    ],
    outputSummary: 'Email template ready to send.',
    autoRunEnabled: false
  },
  {
    id: 'rpa-qa-audit',
    title: 'Autonomous QA Continuity Audit',
    category: 'qa_check',
    status: 'completed',
    progress: 100,
    lastExecuted: '1 min ago',
    logs: [
      'Checking character count in Screenplay vs Character list...',
      'Matching scene sluglines with shot list locations...',
      'Auditing color palette compliance (WCAG AA & OLED darks)...',
      '0 critical flaws found. 2 minor suggestions applied.'
    ],
    outputSummary: 'Passed 12 continuity checks with 98.5% confidence rating.',
    autoRunEnabled: true
  }
];
