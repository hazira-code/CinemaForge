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
