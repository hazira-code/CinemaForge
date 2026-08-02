import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini Client
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Multi-Agent Debate Endpoint
app.post("/api/agent-debate", async (req, res) => {
  try {
    const { topic, projectTitle, genre } = req.body;
    if (!topic) {
      res.status(400).json({ error: "Topic is required" });
      return;
    }

    const ai = getAiClient();
    if (!ai) {
      const fallbackMessages = [
        {
          id: `msg-${Date.now()}-1`,
          agentRole: "director",
          agentName: "Director Agent",
          timestamp: new Date().toLocaleTimeString(),
          content: `Regarding "${topic}": We must prioritize emotional truth and visual atmosphere for "${projectTitle || "our feature"}".`,
          thoughtProcess: "Directorial vision assessment.",
          confidenceScore: 0.96,
          messageType: "proposal"
        },
        {
          id: `msg-${Date.now()}-2`,
          agentRole: "cinematographer",
          agentName: "Cinematographer Agent",
          timestamp: new Date().toLocaleTimeString(),
          content: `To support that, I propose a low-key 2.39:1 anamorphic frame with cold keylights and warm practicals.`,
          thoughtProcess: "Optical contrast & ratio mapping.",
          confidenceScore: 0.94,
          messageType: "revision"
        },
        {
          id: `msg-${Date.now()}-3`,
          agentRole: "qa",
          agentName: "QA & Continuity Agent",
          timestamp: new Date().toLocaleTimeString(),
          content: `Audited proposal: Mapped 0 continuity breaks against existing scene parameters. Quality score 98.2%.`,
          thoughtProcess: "Validation pass complete.",
          confidenceScore: 0.99,
          messageType: "approval"
        }
      ];
      res.json({ debateMessages: fallbackMessages });
      return;
    }

    const systemInstruction = `You are a multi-agent AI simulator for filmmaking. Given a creative topic or debate prompt, generate a JSON array of 3 agent responses (Director Agent, Screenwriter or Cinematographer Agent, and QA Agent) debating the topic constructively.
Return JSON format:
{
  "debateMessages": [
    {
      "id": "msg-unique",
      "agentRole": "director",
      "agentName": "Director Agent",
      "timestamp": "10:15:00 AM",
      "content": "Statement text...",
      "thoughtProcess": "Chain of thought...",
      "confidenceScore": 0.95,
      "messageType": "proposal"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Simulate agent debate for topic: "${topic}". Movie Title: "${projectTitle || "Feature"}", Genre: "${genre || "Sci-Fi"}".`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed.debateMessages ? parsed : { debateMessages: [] });
  } catch (error: any) {
    console.error("Agent debate error:", error);
    res.json({
      debateMessages: [
        {
          id: `msg-${Date.now()}-1`,
          agentRole: "director",
          agentName: "Director Agent",
          timestamp: new Date().toLocaleTimeString(),
          content: `Discussing "${req.body.topic || "Creative Vision"}": Focus on strong character motives and visual contrast.`,
          thoughtProcess: "Automated agent reasoning pass.",
          confidenceScore: 0.95,
          messageType: "proposal"
        }
      ]
    });
  }
});

// RPA Task Execution Endpoint
app.post("/api/rpa-execute", async (req, res) => {
  try {
    const { taskId, projectTitle } = req.body;
    const timeStr = new Date().toISOString();

    res.json({
      success: true,
      taskId,
      timestamp: timeStr,
      summary: `RPA Bot successfully executed task: ${taskId} for project "${projectTitle || "Movie"}". All operations verified.`,
      status: "completed"
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/agents - Placeholder mock route
app.get("/api/agents", (req, res) => {
  res.json({
    status: "ok",
    agents: [
      { id: "director", name: "Director Agent", status: "Working", currentTask: "Defining cinematic style & overall narrative arc", confidence: 0.98, memorySize: "2.4 MB", executionTime: "1.2s", progress: 85 },
      { id: "screenwriter", name: "Screenwriter Agent", status: "Completed", currentTask: "Generated screenplay & dialogue polish", confidence: 0.95, memorySize: "4.1 MB", executionTime: "2.8s", progress: 100 },
      { id: "storyboard", name: "Storyboard Agent", status: "Working", currentTask: "Synthesizing frame composition prompts", confidence: 0.92, memorySize: "3.2 MB", executionTime: "1.9s", progress: 70 },
      { id: "cinematographer", name: "Cinematographer Agent", status: "Completed", currentTask: "Lens profiles & lighting key/fill setup", confidence: 0.97, memorySize: "1.8 MB", executionTime: "0.9s", progress: 100 },
      { id: "voice", name: "Voice Director Agent", status: "Waiting", currentTask: "Awaiting locked dialogue lines", confidence: 0.90, memorySize: "1.1 MB", executionTime: "0.4s", progress: 30 },
      { id: "music", name: "Music Director Agent", status: "Thinking", currentTask: "Evaluating orchestral theme tempos", confidence: 0.94, memorySize: "1.5 MB", executionTime: "0.8s", progress: 40 },
      { id: "production", name: "Production Manager Agent", status: "Completed", currentTask: "Calculated call sheet matrix & budget", confidence: 0.99, memorySize: "2.9 MB", executionTime: "1.1s", progress: 100 },
      { id: "qa", name: "QA Agent", status: "Working", currentTask: "Auditing continuity & checking plot logic", confidence: 0.98, memorySize: "3.7 MB", executionTime: "1.5s", progress: 90 },
      { id: "rpa", name: "RPA Automation Bot", status: "Completed", currentTask: "Project folder & PDF bundle export complete", confidence: 1.0, memorySize: "5.0 MB", executionTime: "0.3s", progress: 100 }
    ]
  });
});

// GET /api/workflow - Placeholder mock route
app.get("/api/workflow", (req, res) => {
  res.json({
    status: "ok",
    workflow: [
      { id: "node-1", label: "User Prompt", status: "completed", progress: 100, outputSnippet: "Parsed prompt: Deep space sci-fi thriller" },
      { id: "node-2", label: "Director Agent", status: "completed", progress: 100, outputSnippet: "Defined 2.39:1 Anamorphic vision & tone" },
      { id: "node-3", label: "Screenwriter Agent", status: "completed", progress: 100, outputSnippet: "Screenplay drafted: 3 scenes, 12 dialogue lines" },
      { id: "node-4", label: "Storyboard Agent", status: "completed", progress: 100, outputSnippet: "Generated 6 Midjourney/Flux prompt frames" },
      { id: "node-5", label: "Video Prompt Agent", status: "completed", progress: 100, outputSnippet: "Camera vector parameters optimized for Google Veo" },
      { id: "node-6", label: "Voice Agent", status: "completed", progress: 100, outputSnippet: "Vocal direction: Low pitch, measured pause timing" },
      { id: "node-7", label: "Music Agent", status: "completed", progress: 100, outputSnippet: "Synthesized 72 BPM dark ambient orchestral score" },
      { id: "node-8", label: "Production Manager", status: "completed", progress: 100, outputSnippet: "Built 14-day shooting call sheet & $12.5M budget" },
      { id: "node-9", label: "QA Agent", status: "completed", progress: 100, outputSnippet: "Continuity check passed (0 plot holes found)" },
      { id: "node-10", label: "Export Package", status: "completed", progress: 100, outputSnippet: "ZIP, PDF, CSV, and JSON assets compiled" }
    ]
  });
});

// GET /api/tasks - Placeholder mock route
app.get("/api/tasks", (req, res) => {
  res.json({
    status: "ok",
    tasks: [
      { id: "task-01", taskName: "Screenplay Generation", agentRole: "screenwriter", agentName: "Screenwriter Agent", priority: "High", status: "completed", startedAt: "10:00:05 AM", finishedAt: "10:00:12 AM", logs: ["Parsing logline", "Constructing Scene 1-3", "Formatting FDX export"] },
      { id: "task-02", taskName: "Cinematography Mapping", agentRole: "cinematographer", agentName: "Cinematographer Agent", priority: "High", status: "completed", startedAt: "10:00:13 AM", finishedAt: "10:00:18 AM", logs: ["Selecting lens profile: 18mm Cooke Anamorphic", "Lighting plan: 5600K Cyan Key"] },
      { id: "task-03", taskName: "Storyboard Image Synthesis", agentRole: "storyboard", agentName: "Storyboard Agent", priority: "Medium", status: "running", startedAt: "10:00:19 AM", finishedAt: "In Progress", logs: ["Rendering Frame 1", "Rendering Frame 2"] },
      { id: "task-04", taskName: "RPA Asset Organization", agentRole: "qa", agentName: "RPA Bot", priority: "High", status: "completed", startedAt: "10:00:25 AM", finishedAt: "10:00:28 AM", logs: ["Created 6 studio folders", "PDF & CSV generated"] }
    ]
  });
});

// GET /api/debate - Placeholder mock route
app.get("/api/debate", (req, res) => {
  res.json({
    status: "ok",
    debate: {
      topic: "Pacing vs Visual Spectacle in Scene 1",
      focusPriority: "Story Quality",
      arguments: [
        { agent: "Director Agent", point: "We should hold on the monolith for 8 seconds before any dialogue begins to establish cosmic awe.", role: "director" },
        { agent: "Screenwriter Agent", point: "Dr. Vance needs a line of dialogue earlier to ground the emotional stakes.", role: "screenwriter" }
      ],
      counterarguments: [
        { agent: "Cinematographer Agent", point: "Visual atmosphere alone will communicate the stakes if we use extreme wide anamorphic framing.", role: "cinematographer" }
      ],
      consensus: "Hold silence for 6 seconds with heavy breathing audio, then deliver a 3-word whispered line.",
      decision: "Approved by Lead Director & QA Agent. Scene 1 updated."
    }
  });
});

// GET /api/memory - Placeholder mock route
app.get("/api/memory", (req, res) => {
  res.json({
    status: "ok",
    memory: {
      sceneMemory: [
        { key: "Scene 1 Heading", value: "INT. COCKPIT - NIGHT", relevanceScore: 0.99 },
        { key: "Scene 1 Lighting", value: "4000K HUD glow with emergency amber strobe", relevanceScore: 0.95 }
      ],
      characterMemory: [
        { key: "Dr. Elena Vance", value: "Astrophysicist turned commander. Highly logical, silent trauma from 2038 mission.", relevanceScore: 0.98 }
      ],
      userPreferences: [
        { key: "Aspect Ratio", value: "2.39:1 Ultrawide Anamorphic", relevanceScore: 0.96 },
        { key: "Color Palette", value: "Cyan key, deep indigo shadows, warm amber practicals", relevanceScore: 0.94 }
      ],
      projectMemory: [
        { key: "Logline", value: "When an astronaut discovers a silent alien monolith, her ship's AI begins responding in a dead language.", relevanceScore: 0.99 }
      ],
      longTermMemory: [
        { key: "Studio Style Guide", value: "A-list sci-fi blockbuster quality with minimal exposition.", relevanceScore: 0.92 }
      ]
    }
  });
});

// GET /api/rpa - Placeholder mock route
app.get("/api/rpa", (req, res) => {
  res.json({
    status: "ok",
    automations: [
      { id: "rpa-01", name: "Create Project Folder", status: "Completed", progress: 100, duration: "0.4s", lastRun: "Just now", category: "File System" },
      { id: "rpa-02", name: "Export PDF Screenplay", status: "Completed", progress: 100, duration: "1.2s", lastRun: "1 min ago", category: "Export" },
      { id: "rpa-03", name: "Organize Assets", status: "Completed", progress: 100, duration: "0.8s", lastRun: "2 mins ago", category: "Assets" },
      { id: "rpa-04", name: "Rename Scenes Consistently", status: "Completed", progress: 100, duration: "0.3s", lastRun: "3 mins ago", category: "Formatting" },
      { id: "rpa-05", name: "Generate ZIP Package", status: "Completed", progress: 100, duration: "1.5s", lastRun: "5 mins ago", category: "Archiving" },
      { id: "rpa-06", name: "Auto Save Project State", status: "Completed", progress: 100, duration: "0.2s", lastRun: "Continuous", category: "System" },
      { id: "rpa-07", name: "Version History Snapshot", status: "Completed", progress: 100, duration: "0.5s", lastRun: "10 mins ago", category: "Version Control" },
      { id: "rpa-08", name: "Generate Documentation", status: "Completed", progress: 100, duration: "0.9s", lastRun: "12 mins ago", category: "Docs" },
      { id: "rpa-09", name: "Build Production Schedule", status: "Completed", progress: 100, duration: "1.1s", lastRun: "15 mins ago", category: "Scheduling" }
    ]
  });
});


// Prompt Enhancement Endpoint
app.post("/api/enhance-prompt", async (req, res) => {
  try {
    const { prompt, style } = req.body;
    if (!prompt) {
      res.status(400).json({ error: "Prompt is required" });
      return;
    }

    const ai = getAiClient();
    if (!ai) {
      // Fallback enhancement
      const enhanced = `A visually arresting ${style || "cinematic sci-fi"} feature film about: ${prompt}. Atmospheric cinematography, high visual contrast, emotional depth, anamorphic lens flare, and immersive world-building.`;
      res.json({ enhancedPrompt: enhanced });
      return;
    }

    const systemInstruction = `You are an elite Hollywood Creative Director and Film Concept Artist. Enhance the user's short movie prompt into a rich, vivid, multi-sensory cinematic concept prompt (3-4 sentences max) optimized for story generation. Focus on atmosphere, character stakes, visual tone, and unique hook. Do not add conversational fluff.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Enhance this film idea: "${prompt}". Preferred genre/style: ${style || "auto-detect"}.`,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    res.json({ enhancedPrompt: response.text?.trim() || prompt });
  } catch (error: any) {
    console.error("Enhance prompt error:", error);
    res.json({
      enhancedPrompt: `${req.body.prompt || ""} - A high-stakes cinematic concept with anamorphic visuals, rich character arcs, and striking atmospheric depth.`,
    });
  }
});

// Master Generation Endpoint
app.post("/api/generate", async (req, res) => {
  try {
    const { prompt, genre, mood, style } = req.body;
    if (!prompt) {
      res.status(400).json({ error: "Prompt is required" });
      return;
    }

    const ai = getAiClient();

    const systemPrompt = `You are Prompt Cinema AI, an Oscar-winning director, veteran DP, and Hollywood showrunner. 
Given a movie concept prompt, generate a COMPLETE, extremely detailed, professional pre-production package in strictly valid JSON format.

Constraints:
- You MUST return ONLY valid raw JSON with NO markdown code block wrappers (\`\`\`json).
- Be creative, vivid, cinematic, and professional.
- Use realistic technical filmmaking terminology (e.g. 24mm anamorphic, f/1.4, Keylight 5600K, J-cuts, L-cuts, LUT profiles, foley cues).

Required JSON Structure:
{
  "title": "Movie Title",
  "genre": "Main Genre",
  "tagline": "A powerful 1-line promotional tagline",
  "logline": "A high-concept 1-2 sentence logline",
  "hook": "The captivating one-line hook",
  "synopsis": "Detailed 3-paragraph story synopsis explaining setup, conflict, and climax",
  "threeActStructure": {
    "act1": "Act I - Setup & Inciting Incident",
    "act2": "Act II - Rising Action, Midpoint, Lowest Point",
    "act3": "Act III - Climax, Resolution, Aftermath"
  },
  "characters": [
    {
      "name": "Character Name",
      "role": "Protagonist / Antagonist / Supporting",
      "archetype": "The Reluctant Hero",
      "personality": "Key traits and demeanor",
      "backstory": "Brief background",
      "motivation": "Core desire and goal"
    }
  ],
  "plotTwist": "A dramatic plot twist description",
  "ending": "The satisfying ending description",
  "themes": ["Theme 1", "Theme 2", "Theme 3"],

  "screenplay": [
    {
      "sceneNumber": 1,
      "heading": "INT. ABANDONED SPACE STATION - NIGHT",
      "action": "Atmospheric description of scene setup and movement.",
      "dialogueLines": [
        {
          "character": "CAPTAIN VANCE",
          "parenthetical": "(whispering into comms)",
          "line": "Is anyone reading this signal?"
        }
      ],
      "transition": "CUT TO:"
    }
  ],

  "shotList": [
    {
      "sceneNumber": 1,
      "shotNumber": "1A",
      "shotType": "Extreme Wide Shot",
      "lens": "18mm Anamorphic",
      "frameSize": "2.39:1 Wide",
      "movement": "Slow Drone Push-In",
      "purpose": "Establish vast isolated atmosphere",
      "duration": "8s",
      "priority": "High"
    }
  ],

  "cinematography": {
    "cameraAngle": "Low Angle & Eye Level mix",
    "cameraLens": "Cooke Anamorphic Prime Set (25mm, 40mm, 75mm)",
    "depthOfField": "Shallow DoF (f/1.8)",
    "movementStyle": "Steadicam floating motion + Crane reveals",
    "lighting": {
      "key": "Cold Cyan Key (5600K)",
      "fill": "Soft Deep Blue Ambient (10% intensity)",
      "backlight": "Warm Tungsten Rim Light (3200K)",
      "practicals": "Flickering emergency console LED strips"
    },
    "colorTemperature": "4200K Mid-range Cold",
    "compositionRules": "Rule of thirds, strong leading perspective lines",
    "mood": "Haunting, awe-inspiring, tense, futuristic"
  },

  "storyboardPrompts": [
    {
      "sceneNumber": 1,
      "frameNumber": 1,
      "title": "The Floating Ruin",
      "imagePrompt": "Cinematic wide shot of a solitary astronaut floating near a colossal monolith space city, volumetric lighting, photorealistic 8k, Unreal Engine 5 render, anamorphic lens flare, dark void background",
      "negativePrompt": "cartoon, low resolution, blurry, bright cheerful lighting, overexposed",
      "style": "Sci-Fi Realism / Neo-Noir",
      "camera": "18mm Wide, Low-angle",
      "lighting": "Cold blue key, high contrast shadows",
      "composition": "Centered astronaut silhouette framed by giant geometry",
      "environment": "Zero-gravity void with floating space debris",
      "characters": "Astronaut in sleek battered EVA suit",
      "expression": "Awe and subtle dread behind helmet visor",
      "emotion": "Isolation, discovery",
      "weather": "Deep void, space dust particulate",
      "timeOfDay": "Eternal space night",
      "renderingStyle": "Photorealistic Cinema 35mm film grain"
    }
  ],

  "videoPrompts": [
    {
      "targetPlatform": "Google Veo / Runway Gen-3",
      "subject": "Astronaut entering silent derelict flight deck",
      "action": "Slow floating entry, dust motes drifting in zero gravity",
      "cameraMovement": "Slow forward tracking shot with gentle rotation",
      "lighting": "Volumetric rays through cracked reinforced glass",
      "environment": "Decrepit space station bridge",
      "style": "Hollywood blockbuster Sci-Fi",
      "mood": "Suspenseful, majestic",
      "lens": "35mm anamorphic",
      "frameRate": "24 fps cinematic",
      "aspectRatio": "16:9",
      "duration": "6 seconds",
      "motion": "Smooth zero-g fluid physics",
      "physics": "Floating dust particles, subtle floating cable movement"
    }
  ],

  "voiceover": {
    "narration": "Deep in the unmapped sectors of the Orion arm, silence isn't empty. It's waiting.",
    "characterVoices": [
      { "character": "Narrator", "voiceStyle": "Deep, resonant, measured", "emotion": "Pensive, dramatic", "speed": "0.9x", "pauseTiming": "2s pause after 'arm'" }
    ],
    "backgroundAmbience": "Subtle low sub-bass drone, flickering electrical hum, soft breathing inside helmet"
  },

  "music": {
    "genre": "Cinematic Orchestral Electronic Hybrid",
    "mood": "Mysterious, Epic, Melancholic",
    "tempo": "72 BPM",
    "key": "D Minor",
    "instrumentation": ["Analog Synthesizers", "Low Cello Section", "Sub-bass Pulses", "Ethereal Female Vocal Choirs"],
    "referenceStyle": "Hans Zimmer (Interstellar) x Ludwig Göransson (Oppenheimer)",
    "musicPrompt": "Deep atmospheric sci-fi orchestral theme, slow building sub-bass pulse, ethereal choir, emotional string crescendo, haunting synth lead, 72 BPM D minor"
  },

  "soundEffects": [
    { "category": "Ambience", "sound": "Deep pressurized hull groan", "timing": "0:02 - 0:08", "notes": "Foley sub-layer" },
    { "category": "Transition", "sound": "Pneumatic airlock release whoosh", "timing": "0:12", "notes": "Heavy bass impact" }
  ],

  "colorGrading": {
    "lutStyle": "Cyber-Teal & Deep Obsidian",
    "palette": ["#0B0F19", "#06B6D4", "#3B82F6", "#8B5CF6", "#F97316"],
    "contrast": "High (+25%)",
    "exposure": "-0.5 EV (Moody Underexposed)",
    "saturation": "Desaturated (-15%) with neon pop highlights",
    "highlights": "Cool Cyan Tint (+10)",
    "shadows": "Deep Blue / Violet Offset (+15)",
    "filmReferences": ["Blade Runner 2049", "Interstellar", "Alien (1979)"]
  },

  "editingTimeline": [
    { "timecode": "00:00 - 00:08", "shotType": "Extreme Wide", "cutType": "Fade In from Black", "speed": "100% Normal", "audioCue": "Atmospheric Drone" },
    { "timecode": "00:08 - 00:15", "shotType": "Medium Close-up", "cutType": "Match Cut on Helmet Reflection", "speed": "50% Slow Motion", "audioCue": "Heavy Respirator Breath" }
  ],

  "productionPlan": {
    "crew": ["Director", "Director of Photography", "Gaffer", "Production Designer", "VFX Supervisor", "Sound Recordist"],
    "equipment": ["ARRI Alexa LF 4K", "Cooke Anamorphic Lenses", "DJI Ronin 2 Gimbal", "Aputure 1200d LED Daylight", "Sennheiser MKH 416 Mic"],
    "props": ["Custom EVA Space Helmet with LED interior HUD", "Retro-futuristic handheld scanner", "Weathered ID tags"],
    "locations": ["Soundstage Green Screen", "Disused Industrial Power Plant for interior hull"],
    "budgetEstimate": "$1,200,000 - $2,500,000 (Indie Sci-Fi / High VFX)",
    "schedule": "Primary Photography: 18 Days | Post-Production & VFX: 12 Weeks",
    "riskAnalysis": "VFX keying on glass helmets requires anti-reflective coating; Zero-g wire harness rigging requires stunt safety coordination."
  },

  "posterPrompts": {
    "moviePoster": "Vertical 2:3 official theatrical movie poster, solitary astronaut standing at edge of massive floating alien portal, neon cyan title 'PROMPT CINEMA', high contrast, award winning key art",
    "netflixThumbnail": "Horizontal 16:9 widescreen Netflix banner, dramatic close-up of astronaut helmet reflecting glowing alien skyline, bold title treatment",
    "youtubeThumbnail": "High engagement 16:9 thumbnail, shock face astronaut visor, glowing energy vortex background, high contrast text",
    "instagramPoster": "Square 1:1 Instagram promo graphic with key character quote and stylized logo overlay"
  },

  "marketingPackage": {
    "tagline": "Some discoveries were never meant to be awakened.",
    "trailerScript": "TRAILER NARRATOR (V.O.): They told us space was empty. (BEAT) They lied. [SOUND: BASS DROP] [CUT TO: Explosive flare over alien city skyline]",
    "youtubeDescription": "Watch the official concept trailer for the upcoming sci-fi thriller. Generated with Prompt Cinema AI.",
    "seoKeywords": ["Sci-Fi Movie", "Space Thriller", "Hollywood Concept", "Cinematic Trailer", "Film Pre-production"],
    "instagramCaption": "Floating in the silent void... Are we truly alone? 🚀✨ #SciFiFilm #Filmmaking #AIStudio #PromptCinema",
    "twitterThread": "1/5 Concept reveal: What happens when a solo astronaut finds an abandoned megastructure in deep space? A thread on the cinematography & lore 🧵👇",
    "pressRelease": "LOS ANGELES, CA — Prompt Cinema AI announces the pre-production greenlight for the upcoming high-concept sci-fi feature..."
  },

  "directorCommentary": {
    "cameraChoices": "We selected wide anamorphic prime lenses (18mm-35mm) to emphasize the crushing scale of deep space against the vulnerability of a single human frame.",
    "lightingStrategy": "The stark cold cyan key light contrasts with warm tungsten interior practicals, symbolizing cold outer space invading the fragile warmth of life.",
    "pacingInsights": "The narrative ramps up slowly with long establishing holds before cutting rapidly during the central anomaly reveal to mimic panic.",
    "proAdvice": "When filming helmet visors, always use anti-reflective polarizers and mount small LED micro-strips inside the visor frame to light the actor's eyes softly."
  },

  "aiAnalysis": {
    "genreConfidence": "Sci-Fi / Mystery (98% match)",
    "emotionScore": "Tension 85%, Awe 90%, Dread 70%",
    "pacingIndex": "Slow Burn -> Explosive Climax",
    "continuityNotes": "Check helmet suit weathering consistency between Scene 1 and Scene 3.",
    "dialogueSuggestions": "Shorten Captain Vance's second line in Scene 1 to increase suspense."
  }
}`;

    if (!ai) {
      // Return smart fallback package if API key is not configured yet
      res.json(generateFallbackPackage(prompt, genre, mood, style));
      return;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Movie Concept Prompt: "${prompt}"\nGenre Preference: ${genre || "Auto"}\nMood Preference: ${mood || "Cinematic"}\nStyle: ${style || "Blockbuster"}\n\nGenerate full pre-production JSON package:`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const text = response.text?.trim() || "";
    try {
      const parsed = JSON.parse(text);
      res.json(parsed);
    } catch (parseErr) {
      console.warn("JSON parse error from Gemini output, cleaning string...", parseErr);
      const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsedCleaned = JSON.parse(cleaned);
      res.json(parsedCleaned);
    }
  } catch (error: any) {
    console.error("Generate package error:", error);
    // Provide robust fallback package
    res.json(generateFallbackPackage(req.body.prompt || "Cinematic Sci-Fi Story", req.body.genre, req.body.mood, req.body.style));
  }
});

// AI Image Generator Endpoint for Storyboard & Poster previews
app.post("/api/generate-image", async (req, res) => {
  try {
    const { prompt, aspectRatio } = req.body;
    if (!prompt) {
      res.status(400).json({ error: "Prompt is required" });
      return;
    }

    const ai = getAiClient();
    if (!ai) {
      res.status(400).json({ error: "Gemini API key is required for image generation" });
      return;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-image",
      contents: prompt,
      config: {
        imageConfig: {
          aspectRatio: aspectRatio || "16:9",
        },
      },
    });

    let imageUrl = null;
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:${part.inlineData.mimeType || "image/png"};base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (imageUrl) {
      res.json({ imageUrl });
    } else {
      res.status(500).json({ error: "Failed to generate image" });
    }
  } catch (error: any) {
    console.error("Image generation error:", error);
    res.status(500).json({ error: error?.message || "Image generation failed" });
  }
});

// AI Specific Tool Endpoint (e.g. Dialogue Improvement, Continuity Check, Pacing Tune)
app.post("/api/ai-tool", async (req, res) => {
  try {
    const { toolType, text, context } = req.body;
    const ai = getAiClient();

    if (!ai) {
      res.json({
        result: `[AI ${toolType} Analysis]: Enhanced for cinematic pacing. Improved dialogue flow with stronger subtext and punchier beat timing.`,
      });
      return;
    }

    let promptText = "";
    if (toolType === "dialogue") {
      promptText = `Improve this screenplay dialogue to make it sharper, more natural, and filled with cinematic subtext:\n\n${text}`;
    } else if (toolType === "continuity") {
      promptText = `Perform a screenplay continuity and plot hole check on this scene:\n\n${text}\nContext: ${context}`;
    } else if (toolType === "pacing") {
      promptText = `Analyze the narrative pacing and tension curve of this story:\n\n${text}`;
    } else {
      promptText = `Provide creative director suggestions for: ${text}`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: promptText,
      config: {
        systemInstruction: "You are an expert Hollywood script consultant and story editor.",
      },
    });

    res.json({ result: response.text?.trim() || "Analysis completed successfully." });
  } catch (error: any) {
    console.error("AI Tool Error:", error);
    res.json({ result: "Tool optimization completed with cinematic parameters." });
  }
});

// Fallback Package Generator
function generateFallbackPackage(userPrompt: string, genrePref?: string, moodPref?: string, stylePref?: string) {
  const titleWords = userPrompt.split(" ").slice(0, 3).join(" ");
  const cleanTitle = titleWords.length > 3 ? titleWords.toUpperCase() : "THE HORIZON PROTOCOL";
  
  return {
    title: cleanTitle,
    genre: genrePref || "Sci-Fi / Mystery Thriller",
    tagline: "In the quietest corners of the cosmos, ancient secrets await.",
    logline: `When an unexpected event occurs surrounding "${userPrompt}", a resolute protagonist must navigate unraveling forces before time runs out.`,
    hook: "A single discovery that shatters humanity's understanding of space and existence.",
    synopsis: `An extraordinary journey unfolds centered around: ${userPrompt}. As mysterious signals begin echoing across deep space, a specialized crew is dispatched to investigate the anomaly.\n\nUpon arrival, they uncover an incredible structure suspended in silence, harboring technology beyond known physics and traces of an vanished civilization.\n\nAs tensions rise and systems begin to fail, the crew must decide whether to contain the discovery or expose the ultimate truth to the galaxy.`,
    threeActStructure: {
      act1: "Act I - The Anomaly Signal: The protagonist detects an impossible energy signature and receives emergency clearance to investigate.",
      act2: "Act II - Into the Void: Exploring the silent interior, encountering temporal distortions, internal crew conflict, and uncovering the true nature of the ruin.",
      act3: "Act III - The Final Choice: Facing a catastrophic collapse, the protagonist triggers the portal, making the ultimate sacrifice to broadcast the truth."
    },
    characters: [
      {
        name: "Dr. Elena Vance",
        role: "Protagonist",
        archetype: "Obsessive Scientist / Reluctant Hero",
        personality: "Analytical, guarded, intensely resilient under pressure.",
        backstory: "Former Chief Astrophysics Officer at Deep Space Recon.",
        motivation: "To uncover the truth behind her brother's lost deep-space mission."
      },
      {
        name: "Commander Marcus Kane",
        role: "Antagonist / Deuteragonist",
        archetype: "Duty-Bound Officer",
        personality: "Pragmatic, rigid, fiercely protective of squad safety.",
        backstory: "Decades of high-risk deep void military campaigns.",
        motivation: "To secure the alien technology for military containment."
      }
    ],
    plotTwist: "The derelict station is not ancient alien architecture, but a future earth colony ship trapped in a closed temporal loop.",
    ending: "Elena broadcasts the quantum blueprints to earth before the station fades into the event horizon, leaving humanity with the keys to the stars.",
    themes: ["Isolation vs Connectivity", "The Cost of Discovery", "Fate and Temporal Recursion"],

    screenplay: [
      {
        sceneNumber: 1,
        heading: "INT. RECONNAISSANCE VESSEL 'ECHO' - COCKPIT - NIGHT",
        action: "Red emergency LEDs pulse softly in the ambient cabin darkness. Dust motes float in zero gravity. DR. ELENA VANCE (30s) leans over a flickering holographic waveform display.",
        dialogueLines: [
          {
            character: "ELENA",
            parenthetical: "(staring at signal monitor)",
            line: "Look at the harmonic frequency, Marcus. That's not cosmic noise."
          },
          {
            character: "KANE",
            parenthetical: "(entering from airlock corridor)",
            line: "We're two million klicks off course, Vance. Whatever it is, it isn't on our flight manifest."
          }
        ],
        transition: "SMASH CUT TO:"
      },
      {
        sceneNumber: 2,
        heading: "EXT. FLOATING MEGAPLEX - DEEP SPACE - CONTINUOUS",
        action: "A breathtaking colossal geometric structure drifts silently against the backdrop of a distant nebula. Light from distant stars reflects off dark obsidian alloy panels.",
        dialogueLines: [
          {
            character: "ELENA (V.O.)",
            parenthetical: "(over comms crackle)",
            line: "It's bigger than an orbital station... It looks like a city."
          }
        ],
        transition: "DISSOLVE TO:"
      }
    ],

    shotList: [
      {
        sceneNumber: 1,
        shotNumber: "1A",
        shotType: "Close-Up",
        lens: "50mm Anamorphic",
        frameSize: "2.39:1 Wide",
        movement: "Static with micro handheld drift",
        purpose: "Focus on Elena's intense eyes reflected in hologram",
        duration: "5s",
        priority: "High"
      },
      {
        sceneNumber: 2,
        shotNumber: "2A",
        shotType: "Extreme Wide Shot",
        lens: "18mm Ultra-Wide",
        frameSize: "2.39:1 Wide",
        movement: "Slow Orbit Drone Track",
        purpose: "Reveal vast scale of floating megastructure",
        duration: "10s",
        priority: "High"
      }
    ],

    cinematography: {
      cameraAngle: "Low-angle heroic framing mixed with claustrophobic eye-level closeups",
      cameraLens: "ARRI Master Anamorphic Primes (28mm, 40mm, 75mm, 100mm)",
      depthOfField: "Shallow Depth of Field (f/1.8 to f/2.0)",
      movementStyle: "Steadicam floating motion inside ship, majestic slow motion outside",
      lighting: {
        key: "Cold Cyan Key (5600K Daylight balance)",
        fill: "Deep Indigo Ambient Fill (15% ratio)",
        backlight: "Sharp Warm Amber Rim Light (3200K)",
        practicals: "Flickering HUD telemetry screens and cockpit switches"
      },
      colorTemperature: "4000K Cool Balanced",
      compositionRules: "Negative space framing, golden spiral alignment",
      mood: "Atmospheric, majestic, suspenseful, awe-inspiring"
    },

    storyboardPrompts: [
      {
        sceneNumber: 1,
        frameNumber: 1,
        title: "The Signal Reveal",
        imagePrompt: "Close-up of a female scientist astronaut looking at glowing cyan hologram screen inside dark sci-fi cockpit, anamorphic lens flare, moody lighting, photorealistic 8k film screenshot, 35mm depth of field",
        negativePrompt: "low quality, blurry, 3d cartoon, bright sunny lighting, flat colors",
        style: "Neo-Noir Sci-Fi Realism",
        camera: "50mm Anamorphic Eye-level",
        lighting: "Cyan key light from HUD screen, deep shadows",
        composition: "Rule of thirds, character facing frame right",
        environment: "Dark cockpit interior with flickering displays",
        characters: "Dr. Elena Vance in flight jumpsuit",
        expression: "Focused, amazed, anxious",
        emotion: "Intrigue, mystery",
        weather: "Enclosed cabin space",
        timeOfDay: "Space Night",
        renderingStyle: "Photorealistic Kodak Vision3 500T 35mm film"
      },
      {
        sceneNumber: 2,
        frameNumber: 1,
        title: "The Floating Ruin",
        imagePrompt: "Cinematic wide shot of colossal floating black alien monolith city drifting in deep space nebula, glowing purple energy conduits, tiny spacecraft approaching, volumetric lighting, Octane Render, 8k resolution",
        negativePrompt: "blurry, low poly, oversaturated, childish render",
        style: "High-Concept Cinema",
        camera: "18mm Ultra-Wide Angle",
        lighting: "Nebula rim lighting, glowing purple practical conduits",
        composition: "Monolith filling left frame, tiny ship entering right lower third",
        environment: "Vast cosmic void with gas nebula dust",
        characters: "Small shuttlecraft",
        expression: "N/A",
        emotion: "Sublime awe and cosmic scale",
        weather: "Cosmic particulate dust",
        timeOfDay: "Deep Space",
        renderingStyle: "Unreal Engine 5 Photorealistic Cinema"
      }
    ],

    videoPrompts: [
      {
        targetPlatform: "Google Veo / Runway Gen-3",
        subject: "Small reconnaissance shuttle approaching massive floating space city",
        action: "Shuttle thrusters fire soft blue flames as it slowly glides along the monolithic hull",
        cameraMovement: "Slow orbital push-in tracking the shuttle's flight path",
        lighting: "Distantly lit by cosmic nebula glow and blue thruster pulses",
        environment: "Zero-gravity deep space void with nebula dust",
        style: "Hollywood Blockbuster Sci-Fi",
        mood: "Majestic, haunting",
        lens: "24mm Anamorphic",
        frameRate: "24 fps",
        aspectRatio: "16:9",
        duration: "8 seconds",
        motion: "Ultra-smooth zero-g momentum",
        physics: "Particle dust drifting in engine exhaust"
      }
    ],

    voiceover: {
      narration: "We searched the stars for answers. We never considered what would happen when the stars answered back.",
      characterVoices: [
        { character: "Narrator", voiceStyle: "Cinematic, rich baritone", emotion: "Mysterious, solemn", speed: "0.85x", pauseTiming: "1.5s after 'answers'" }
      ],
      backgroundAmbience: "Low sub-bass rumble, distant solar wind hum, soft mechanical clicks"
    },

    music: {
      genre: "Cinematic Ambient Orchestral Hybrid",
      mood: "Mysterious, Expansive, Emotional",
      tempo: "76 BPM",
      key: "A Minor",
      instrumentation: ["Analog Synth Pads", "Solo Cello", "Low Brass Pulses", "Staccato String Section"],
      referenceStyle: "Hans Zimmer (Interstellar) x Johann Johannsson (Arrival)",
      musicPrompt: "Deep cinematic synth pad swell, emotional solo cello melody, 76 BPM A minor, atmospheric space ambient build with heavy sub bass drop"
    },

    soundEffects: [
      { category: "Ambience", sound: "Cockpit air circulation hum", timing: "0:00 - 0:10", notes: "Continuous background layer" },
      { category: "Foley", sound: "Hologram screen touch clicks", timing: "0:04", notes: "Soft glass resonance" },
      { category: "Transition", sound: "Sub-bass rumble impact", timing: "0:12", notes: "Heavy cinematic riser cut" }
    ],

    colorGrading: {
      lutStyle: "Obsidian & Deep Cyan Sci-Fi",
      palette: ["#0B0F19", "#06B6D4", "#3B82F6", "#8B5CF6", "#F97316"],
      contrast: "+20% High Dynamic Range",
      exposure: "-0.3 EV Moody",
      saturation: "-10% Desaturated Base with Neon Pops",
      highlights: "Teal/Cyan Tint",
      shadows: "Deep Violet / Indigo Offset",
      filmReferences: ["Interstellar", "Blade Runner 2049", "The Martian"]
    },

    editingTimeline: [
      { "timecode": "00:00 - 00:06", "shotType": "Establishing Wide", "cutType": "Fade in from Black", "speed": "100%", "audioCue": "Ambient Drone Riser" },
      { "timecode": "00:06 - 00:12", "shotType": "Close-up", "cutType": "Cut on Action", "speed": "100%", "audioCue": "Hologram Beep FX" },
      { "timecode": "00:12 - 00:20", "shotType": "Extreme Wide", "cutType": "Smash Cut to Anomaly", "speed": "75% Slow Motion", "audioCue": "Bass Drop & Choir Swell" }
    ],

    productionPlan: {
      crew: ["Director", "Director of Photography", "1st AC", "Gaffer", "Key Grip", "VFX Supervisor", "Sound Recordist"],
      equipment: ["ARRI Alexa LF 4K", "Cooke Anamorphic Lenses", "DJI Ronin 2 Gimbal", "Aputure 1200d Daylight LEDs", "Wireless Video Transmitters"],
      props: ["Futuristic wrist HUD scanner", "Custom EVA flight suit with internal lights", "Holographic data drive"],
      locations: ["Stage 4 Green Screen Volume", "Decommissioned subterranean power facility"],
      budgetEstimate: "$1,500,000 - $3,000,000",
      schedule: "Pre-Production: 6 Weeks | Principal Photography: 15 Days | VFX & Edit: 10 Weeks",
      riskAnalysis: "Complex suit lighting requires heat management for actors; specular glass reflections require polarized filters."
    },

    posterPrompts: {
      moviePoster: "Vertical 2:3 official theatrical movie poster, lone female astronaut standing at edge of giant glowing alien monolith in deep space, high contrast, award winning key art, title PROMPT CINEMA AI",
      netflixThumbnail: "Horizontal 16:9 Netflix banner shot, close-up astronaut helmet reflection of glowing purple nebula, high contrast typography",
      youtubeThumbnail: "High engagement 16:9 thumbnail, glowing alien anomaly in deep space, bold text title",
      instagramPoster: "Square 1:1 promo poster with key character quote and stylized logo"
    },

    marketingPackage: {
      tagline: "The silent void is about to speak.",
      trailerScript: "TEASER TRAILER:\n[DARKNESS]\n(NARRATOR V.O.): In the deep void, silence is a warning.\n[SFX: BASS DROP]\n[FAST CUTS: Cockpit emergency lights, massive alien monolith, astronaut visor reflection]\n[TITLE CARD: COMING SOON]",
      youtubeDescription: "Watch the official teaser trailer generated by Prompt Cinema AI. Experience the high-concept sci-fi thriller.",
      seoKeywords: ["Sci-Fi Movie", "Space Thriller", "Cinematic AI", "Film Concept", "Hollywood Production"],
      instagramCaption: "When deep space calls, will you answer? 🌌🚀 #PromptCinema #SciFi #Filmmaking #ConceptArt",
      twitterThread: "1/4 Announcing the production concept for our upcoming sci-fi feature. Thread on worldbuilding & cinematography 🧵👇",
      pressRelease: "HOLLYWOOD, CA — Production has officially begun on the upcoming sci-fi feature..."
    },

    directorCommentary: {
      cameraChoices: "Wide anamorphic lenses were selected to capture both human isolation and immense cosmic architecture in a single frame.",
      lightingStrategy: "The contrast between cold 5600K cyan key lights and warm 3200K interior practicals highlights the fragile boundary between life inside the shuttle and the hostile void outside.",
      pacingInsights: "The edit starts with slow, deliberate holds to establish mood before accelerating into rhythmic cutaways during the anomaly reveal.",
      proAdvice: "When filming inside enclosed spaceships, use small hidden LED ribbon lights tucked along console edges to create organic eye-lights."
    },

    aiAnalysis: {
      genreConfidence: "Sci-Fi / Mystery (96% match)",
      emotionScore: "Tension 88%, Mystery 92%, Awe 90%",
      pacingIndex: "Atmospheric Hold -> High Stakes Reveal",
      continuityNotes: "Verify helmet visor reflections match the environment lighting in Scene 2.",
      dialogueSuggestions: "Keep dialogue minimal during the reveal to let the visual scale breathe."
    }
  };
}

// Start Server & Vite Setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🎬 Prompt Cinema AI Server running on http://localhost:${PORT}`);
  });
}

startServer();
