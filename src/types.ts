export interface CharacterItem {
  name: string;
  role: string;
  archetype: string;
  personality: string;
  backstory: string;
  motivation: string;
}

export interface ScreenplayDialogue {
  character: string;
  parenthetical?: string;
  line: string;
}

export interface ScreenplayScene {
  sceneNumber: number;
  heading: string;
  action: string;
  dialogueLines: ScreenplayDialogue[];
  transition?: string;
}

export interface ShotListItem {
  sceneNumber: number;
  shotNumber: string;
  shotType: string;
  lens: string;
  frameSize: string;
  movement: string;
  purpose: string;
  duration: string;
  priority: 'High' | 'Medium' | 'Low' | string;
}

export interface LightingSetup {
  key: string;
  fill: string;
  backlight: string;
  practicals: string;
}

export interface CinematographyData {
  cameraAngle: string;
  cameraLens: string;
  depthOfField: string;
  movementStyle: string;
  lighting: LightingSetup;
  colorTemperature: string;
  compositionRules: string;
  mood: string;
}

export interface StoryboardFrame {
  sceneNumber: number;
  frameNumber: number;
  title: string;
  imagePrompt: string;
  negativePrompt: string;
  style: string;
  camera: string;
  lighting: string;
  composition: string;
  environment: string;
  characters: string;
  expression: string;
  emotion: string;
  weather: string;
  timeOfDay: string;
  renderingStyle: string;
  generatedImageUrl?: string;
}

export interface VideoPrompt {
  targetPlatform: string;
  subject: string;
  action: string;
  cameraMovement: string;
  lighting: string;
  environment: string;
  style: string;
  mood: string;
  lens: string;
  frameRate: string;
  aspectRatio: string;
  duration: string;
  motion: string;
  physics: string;
}

export interface CharacterVoice {
  character: string;
  voiceStyle: string;
  emotion: string;
  speed: string;
  pauseTiming: string;
}

export interface VoiceoverData {
  narration: string;
  characterVoices: CharacterVoice[];
  backgroundAmbience: string;
}

export interface MusicPlan {
  genre: string;
  mood: string;
  tempo: string;
  key: string;
  instrumentation: string[];
  referenceStyle: string;
  musicPrompt: string;
}

export interface SoundEffectItem {
  category: string;
  sound: string;
  timing: string;
  notes: string;
}

export interface ColorGradingData {
  lutStyle: string;
  palette: string[];
  contrast: string;
  exposure: string;
  saturation: string;
  highlights: string;
  shadows: string;
  filmReferences: string[];
}

export interface EditingTimelineItem {
  timecode: string;
  shotType: string;
  cutType: string;
  speed: string;
  audioCue: string;
}

export interface ProductionPlanData {
  crew: string[];
  equipment: string[];
  props: string[];
  locations: string[];
  budgetEstimate: string;
  schedule: string;
  riskAnalysis: string;
}

export interface PosterPromptsData {
  moviePoster: string;
  netflixThumbnail: string;
  youtubeThumbnail: string;
  instagramPoster: string;
  generatedPosterUrl?: string;
}

export interface MarketingPackageData {
  tagline: string;
  trailerScript: string;
  youtubeDescription: string;
  seoKeywords: string[];
  instagramCaption: string;
  twitterThread: string;
  pressRelease: string;
}

export interface DirectorCommentaryData {
  cameraChoices: string;
  lightingStrategy: string;
  pacingInsights: string;
  proAdvice: string;
}

export interface AIAnalysisData {
  genreConfidence: string;
  emotionScore: string;
  pacingIndex: string;
  continuityNotes: string;
  dialogueSuggestions: string;
}

export interface MovieProject {
  id: string;
  title: string;
  genre: string;
  tagline: string;
  logline: string;
  hook: string;
  synopsis: string;
  threeActStructure: {
    act1: string;
    act2: string;
    act3: string;
  };
  characters: CharacterItem[];
  plotTwist: string;
  ending: string;
  themes: string[];
  screenplay: ScreenplayScene[];
  shotList: ShotListItem[];
  cinematography: CinematographyData;
  storyboardPrompts: StoryboardFrame[];
  videoPrompts: VideoPrompt[];
  voiceover: VoiceoverData;
  music: MusicPlan;
  soundEffects: SoundEffectItem[];
  colorGrading: ColorGradingData;
  editingTimeline: EditingTimelineItem[];
  productionPlan: ProductionPlanData;
  posterPrompts: PosterPromptsData;
  marketingPackage: MarketingPackageData;
  directorCommentary: DirectorCommentaryData;
  aiAnalysis: AIAnalysisData;
  createdAt: string;
  promptUsed: string;
  isFavorite?: boolean;
}

export type AgentRole =
  | 'director'
  | 'screenwriter'
  | 'cinematographer'
  | 'storyboard'
  | 'character'
  | 'music'
  | 'voice'
  | 'video'
  | 'production'
  | 'qa';

export interface AgentProfile {
  id: AgentRole;
  name: string;
  avatar: string;
  iconName: string;
  specialty: string;
  description: string;
  systemPrompt: string;
  color: string;
  memoryItemsCount: number;
}

export interface AgentMessage {
  id: string;
  agentRole: AgentRole;
  agentName: string;
  timestamp: string;
  content: string;
  thoughtProcess?: string;
  confidenceScore: number;
  messageType: 'proposal' | 'critique' | 'revision' | 'approval' | 'system';
}

export interface VectorMemoryEntry {
  id: string;
  type: 'long_term' | 'short_term' | 'character' | 'scene' | 'preference' | 'lore';
  title: string;
  snippet: string;
  vectorId: string;
  similarityScore: number;
  tags: string[];
  createdAt: string;
}

export interface RPATaskItem {
  id: string;
  title: string;
  category: 'folder_structure' | 'file_export' | 'version_control' | 'schedule_matrix' | 'notifications' | 'qa_check' | 'backup';
  status: 'idle' | 'running' | 'completed' | 'failed';
  progress: number;
  lastExecuted: string;
  logs: string[];
  outputSummary?: string;
  autoRunEnabled: boolean;
}

export interface ProjectVersionSnapshot {
  version: string;
  timestamp: string;
  author: string;
  changelog: string;
  snapshotData: Partial<MovieProject>;
}

export type AgentStatusType = 'Thinking' | 'Working' | 'Waiting' | 'Completed';

export interface AgentSwarmItem {
  id: AgentRole;
  name: string;
  avatar: string;
  status: AgentStatusType;
  currentTask: string;
  memorySize: string;
  confidence: number;
  executionTime: string;
  progress: number;
  color: string;
  specialty: string;
}

export interface TaskQueueItem {
  id: string;
  taskName: string;
  agentRole: AgentRole;
  agentName: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'queued' | 'running' | 'completed' | 'failed';
  startedAt: string;
  finishedAt: string;
  logs: string[];
}

export interface MultiAgentDebateState {
  topic: string;
  focusPriority: 'Creativity' | 'Accuracy' | 'Budget' | 'Story Quality';
  arguments: { agent: string; point: string; role: AgentRole }[];
  counterarguments: { agent: string; point: string; role: AgentRole }[];
  consensus: string;
  decision: string;
}

export interface WorkflowNodeItem {
  id: string;
  label: string;
  agentRole?: AgentRole;
  status: 'idle' | 'processing' | 'completed';
  progress: number;
  outputSnippet: string;
  iconName: string;
}

export interface RPAAutomationItem {
  id: string;
  name: string;
  status: 'Completed' | 'Running' | 'Idle' | 'Failed';
  progress: number;
  duration: string;
  lastRun: string;
  category: string;
}

export interface MemoryCategoryItem {
  id: string;
  category: 'scene' | 'character' | 'preferences' | 'project' | 'long_term';
  key: string;
  value: string;
  relevanceScore: number;
  vectorHash: string;
  updatedAt: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

export type TabType =
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
  | 'export';


