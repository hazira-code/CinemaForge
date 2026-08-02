import { MovieProject } from '../types';

export interface ProjectTemplate {
  id: string;
  title: string;
  genre: string;
  description: string;
  prompt: string;
  iconName: string;
  badgeColor: string;
}

export const PRESET_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'space-orbit',
    title: 'The Lonely Astronaut',
    genre: 'Sci-Fi / Space Thriller',
    description: 'A solo deep space investigator discovers a floating abandoned megastructure.',
    prompt: 'A lonely astronaut discovers an abandoned city floating in space.',
    iconName: 'Rocket',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  },
  {
    id: 'cyberpunk-ghost',
    title: 'Neon Ghost Protocol',
    genre: 'Cyberpunk Noir',
    description: 'A detective investigates an autonomous ghost haunting a quantum network.',
    prompt: 'A cybernetic detective in a rain-slicked mega-city discovers a sentient ghost inside a high-security quantum AI network.',
    iconName: 'Cpu',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  },
  {
    id: 'post-apoc-garden',
    title: 'The Silent Greenhouse',
    genre: 'Post-Apocalyptic Survival',
    description: 'In a frozen wasteland, two botanists guard humanity’s last biological bloom.',
    prompt: 'In a nuclear winter landscape, two survivalist botanists defend a subterranean greenhouse that holds the last blooming tree on Earth.',
    iconName: 'Leaf',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
  {
    id: 'time-loop-heist',
    title: 'Chronos 11:59',
    genre: 'Sci-Fi / Time Loop Heist',
    description: 'A team of thieves has 60 seconds to rob a vault before time resets.',
    prompt: 'A high-stakes casino heist team is trapped in an infinitely looping 60-second window inside an anti-gravity vault.',
    iconName: 'Clock',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  },
  {
    id: 'deep-sea-horror',
    title: 'Abyssal Meridian',
    genre: 'Psychological Horror / Sci-Fi',
    description: 'A deep-sea trench research station makes contact with something beneath the Mariana seabed.',
    prompt: 'At 11,000 meters beneath the ocean surface, a submarine crew hears rhythmic tapping on their pressure hull from the outside void.',
    iconName: 'Anchor',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  }
];

export const SAMPLE_PROJECTS: MovieProject[] = [
  {
    id: 'sample-project-1',
    title: 'THE FLOATING RUIN',
    genre: 'Sci-Fi / Space Thriller',
    tagline: 'Some discoveries were never meant to be awakened.',
    logline: 'When a lone astronaut detects an impossible signal from a silent megastructure drifting in deep space, she must enter the void to uncover humanity’s lost origins before the station collapses.',
    hook: 'A vast floating city suspended in zero gravity, hiding secrets older than Earth.',
    synopsis: `Deep in the unmapped sectors of the Orion arm, DR. ELENA VANCE pilots a solo reconnaissance vessel through cosmic dust. When her scanners detect a rhythmic harmonic pulse, she stumbles upon an impossible sight: a colossal alien megastructure suspended in eternal darkness.\n\nBoarding the abandoned complex, Elena navigates zero-gravity corridors lined with glowing luminescent alloys and ancient holographic star charts. As atmospheric systems begin to fail and temporal anomalies warp time inside the station, she discovers her brother's long-lost flight recorder.\n\nWith power depleting and a spatial tear threatening to implode the sector, Elena faces a choice: escape to safety, or activate the station's primary core to broadcast its revolutionary quantum blueprints back to Earth.`,
    threeActStructure: {
      act1: "Act I - The Anomaly Signal: Dr. Elena Vance receives an unauthorized harmonic frequency while on a routine orbital sweep, tracing it to a massive floating alien city.",
      act2: "Act II - Into the Silent Void: Elena enters the structure, experiencing zero-g spatial distortions and discovering her brother's vanished expedition records.",
      act3: "Act III - The Quantum Transmission: Facing core overload, Elena stays behind inside the control vault to transmit the station's energy secrets across the cosmos."
    },
    characters: [
      {
        name: "Dr. Elena Vance",
        role: "Protagonist",
        archetype: "Obsessive Scientist",
        personality: "Analytical, guarded, intensely resilient under pressure.",
        backstory: "Former Chief Astrophysics Officer at Deep Space Recon whose twin brother disappeared on a classified deep-space mission five years prior.",
        motivation: "To discover the truth behind her brother's disappearance and unlock humanity's cosmic legacy."
      },
      {
        name: "Commander Marcus Kane",
        role: "Antagonist / Deuteragonist",
        archetype: "Duty-Bound Military Officer",
        personality: "Pragmatic, rigid, fiercely protective of squad safety.",
        backstory: "Veteran commander of deep void pacification units.",
        motivation: "To contain the alien technology and prevent unauthorized public panic."
      }
    ],
    plotTwist: "The floating city is not of alien origin, but an Earth research station from 4,000 years in the future, trapped in a closed temporal loop.",
    ending: "Elena initiates the quantum pulse, sacrificing her vessel's return fuel to send the knowledge home, watching Earth's blue horizon light up as the signal reaches mission control.",
    themes: ["Cosmic Isolation", "The Price of Knowledge", "Temporal Fate and Legacy"],
    screenplay: [
      {
        sceneNumber: 1,
        heading: "INT. RECONNAISSANCE VESSEL 'ECHO' - COCKPIT - NIGHT",
        action: "Pulsing red emergency LEDs cast harsh shadows across the cramped flight deck. Dust motes float in zero gravity. DR. ELENA VANCE (30s) leans over a flickering holographic waveform console.",
        dialogueLines: [
          {
            character: "ELENA",
            parenthetical: "(whispering into comms)",
            line: "Look at the harmonic resonance, Marcus... That isn't cosmic noise."
          },
          {
            character: "KANE (V.O.)",
            parenthetical: "(over static crackle)",
            line: "We are two million kilometers outside mission protocol, Vance. Turn the ship around."
          },
          {
            character: "ELENA",
            parenthetical: "(reaching for manual thruster stick)",
            line: "Not when we're standing on the threshold of history."
          }
        ],
        transition: "SMASH CUT TO:"
      },
      {
        sceneNumber: 2,
        heading: "EXT. FLOATING MEGAPLEX - DEEP SPACE - CONTINUOUS",
        action: "A majestic, colossal geometric structure drifts in silent majesty against a vibrant violet nebula. Sunlight reflects off obsidian alloy spires.",
        dialogueLines: [
          {
            character: "ELENA (V.O.)",
            parenthetical: "(gasping softly)",
            line: "My god... It's bigger than an orbital ring."
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
        purpose: "Establish Elena's intense focus and emotional stakes",
        duration: "6s",
        priority: "High"
      },
      {
        sceneNumber: 2,
        shotNumber: "2A",
        shotType: "Extreme Wide Shot",
        lens: "18mm Ultra-Wide",
        frameSize: "2.39:1 Wide",
        movement: "Slow Orbital Drone Track",
        purpose: "Reveal vast breathtaking scale of the floating megastructure",
        duration: "10s",
        priority: "High"
      }
    ],
    cinematography: {
      cameraAngle: "Low-angle heroic perspectives mixed with claustrophobic eye-level closeups",
      cameraLens: "ARRI Master Anamorphic Primes (28mm, 40mm, 75mm, 100mm)",
      depthOfField: "Shallow Depth of Field (f/1.8)",
      movementStyle: "Steadicam floating motion inside ship, majestic slow motion outside",
      lighting: {
        key: "Cold Cyan Key Light (5600K)",
        fill: "Deep Indigo Ambient Fill (15% intensity)",
        backlight: "Sharp Amber Rim Light (3200K)",
        practicals: "Flickering HUD screens and interior LED switchboards"
      },
      colorTemperature: "4000K Cool Balanced",
      compositionRules: "Negative space framing, strong linear perspective towards central anomaly",
      mood: "Atmospheric, awe-inspiring, tense, futuristic"
    },
    storyboardPrompts: [
      {
        sceneNumber: 1,
        frameNumber: 1,
        title: "The Signal Reveal",
        imagePrompt: "Close-up cinematic shot of female astronaut Elena Vance looking at glowing cyan holographic screen inside dark futuristic spaceship cockpit, anamorphic lens flare, photorealistic 8k, Kodak 35mm film grain, volumetric lighting",
        negativePrompt: "cartoon, low quality, anime, bright sunny day, flat lighting",
        style: "Neo-Noir Sci-Fi Realism",
        camera: "50mm Anamorphic, Eye-Level",
        lighting: "Cyan key light from HUD, deep shadows behind",
        composition: "Character framed on left third, glowing hologram on right",
        environment: "Enclosed dark cockpit with glowing switch panels",
        characters: "Dr. Elena Vance in flight suit",
        expression: "Focused, amazed, intense determination",
        emotion: "Awe and anxiety",
        weather: "Zero-gravity cabin space",
        timeOfDay: "Space Night",
        renderingStyle: "Photorealistic 35mm Film Print"
      },
      {
        sceneNumber: 2,
        frameNumber: 1,
        title: "The Floating Ruin",
        imagePrompt: "Wide cinematic shot of colossal black geometric space city floating in deep space next to a glowing purple nebula, tiny human exploration shuttle approaching, Octane render 8k, photorealistic Unreal Engine 5",
        negativePrompt: "blurry, low polygon, bright white background, overexposed",
        style: "High-Concept Hollywood Blockbuster",
        camera: "18mm Ultra-Wide Angle",
        lighting: "Nebula rim glow with blue thruster highlights",
        composition: "Alien spire dominating left frame, shuttle at bottom right",
        environment: "Deep space void with gas nebula dust",
        characters: "Reconnaissance Vessel 'Echo'",
        expression: "N/A",
        emotion: "Sublime cosmic scale and dread",
        weather: "Stardust particles",
        timeOfDay: "Eternal Void",
        renderingStyle: "Cinema 4D + Octane Render"
      }
    ],
    videoPrompts: [
      {
        targetPlatform: "Google Veo / Runway Gen-3",
        subject: "Reconnaissance shuttle approaching colossal floating black alien megastructure",
        action: "Shuttle thrusters emit soft blue plasma trails as it glides along the massive obsidian spires",
        cameraMovement: "Slow orbital push-in tracking the shuttle path",
        lighting: "Distantly lit by violet nebula glow and pulsing blue thrusters",
        environment: "Zero-gravity deep space void with floating dust particles",
        style: "Hollywood Blockbuster Sci-Fi",
        mood: "Majestic, haunting, epic",
        lens: "24mm Anamorphic",
        frameRate: "24 fps cinematic",
        aspectRatio: "16:9",
        duration: "8 seconds",
        motion: "Fluid zero-g momentum",
        physics: "Engine exhaust particles dispersing in vacuum"
      }
    ],
    voiceover: {
      narration: "We spent centuries searching the void for answers... never considering what would happen when the void answered back.",
      characterVoices: [
        {
          character: "Narrator",
          voiceStyle: "Deep, resonant, measured baritone",
          emotion: "Solemn, dramatic",
          speed: "0.85x",
          pauseTiming: "2.0s after 'answers'"
        }
      ],
      backgroundAmbience: "Low sub-bass rumble, solar wind hiss, soft breathing inside helmet"
    },
    music: {
      genre: "Cinematic Orchestral Electronic Hybrid",
      mood: "Mysterious, Expansive, Emotional",
      tempo: "74 BPM",
      key: "D Minor",
      instrumentation: ["Analog Synth Pads", "Solo Cello", "Low Brass Pulses", "Ethereal Choir"],
      referenceStyle: "Hans Zimmer (Interstellar) x Ludwig Göransson (Oppenheimer)",
      musicPrompt: "Deep atmospheric sci-fi orchestral theme, building sub-bass pulse, ethereal vocal choir, emotional cello crescendo, 74 BPM D minor"
    },
    soundEffects: [
      { category: "Ambience", sound: "Cockpit air circulation hum", timing: "0:00 - 0:10", notes: "Continuous background layer" },
      { category: "Foley", sound: "Holographic screen touch clicks", timing: "0:04", notes: "Glass resonance" },
      { category: "Transition", sound: "Sub-bass impact drop", timing: "0:12", notes: "Cinematic trailer riser" }
    ],
    colorGrading: {
      lutStyle: "Obsidian & Deep Cyan Sci-Fi",
      palette: ["#0B0F19", "#06B6D4", "#3B82F6", "#8B5CF6", "#F97316"],
      contrast: "+25% High Dynamic Range",
      exposure: "-0.3 EV Moody",
      saturation: "-10% Desaturated Base with Neon Pops",
      highlights: "Teal/Cyan Tint (+10)",
      shadows: "Deep Violet / Indigo Offset (+15)",
      filmReferences: ["Interstellar", "Blade Runner 2049", "Alien (1979)"]
    },
    editingTimeline: [
      { timecode: "00:00 - 00:06", shotType: "Establishing Wide", cutType: "Fade in from Black", speed: "100%", audioCue: "Ambient Drone Riser" },
      { timecode: "00:06 - 00:12", shotType: "Close-up", cutType: "Cut on Action", speed: "100%", audioCue: "Hologram Beep FX" },
      { timecode: "00:12 - 00:20", shotType: "Extreme Wide", cutType: "Smash Cut to Anomaly", speed: "75% Slow Motion", audioCue: "Bass Drop & Choir Swell" }
    ],
    productionPlan: {
      crew: ["Director", "Director of Photography", "Gaffer", "Production Designer", "VFX Supervisor", "Sound Recordist"],
      equipment: ["ARRI Alexa LF 4K", "Cooke Anamorphic Lenses", "DJI Ronin 2 Gimbal", "Aputure 1200d Daylight LEDs", "Sennheiser MKH 416 Mic"],
      props: ["Custom EVA flight suit with internal helmet LEDs", "Retro-futuristic wrist scanner", "Holographic data drive"],
      locations: ["Stage 4 Green Screen Volume", "Decommissioned subterranean power facility"],
      budgetEstimate: "$1,800,000 - $3,200,000",
      schedule: "Pre-Production: 6 Weeks | Principal Photography: 16 Days | VFX & Edit: 12 Weeks",
      riskAnalysis: "Complex helmet glass reflections require anti-reflective polarizers; zero-g wire harnesses require stunt safety coordination."
    },
    posterPrompts: {
      moviePoster: "Vertical 2:3 official theatrical movie poster, lone female astronaut standing at edge of giant glowing alien monolith in deep space, high contrast key art, title THE FLOATING RUIN",
      netflixThumbnail: "Horizontal 16:9 Netflix banner shot, close-up astronaut helmet reflection of glowing purple nebula, high contrast typography",
      youtubeThumbnail: "High engagement 16:9 thumbnail, glowing alien anomaly in deep space, bold text title",
      instagramPoster: "Square 1:1 promo poster with key character quote and stylized logo"
    },
    marketingPackage: {
      tagline: "The silent void is about to speak.",
      trailerScript: "TEASER TRAILER:\n[DARKNESS]\n(NARRATOR V.O.): In the deep void, silence is a warning.\n[SFX: BASS DROP]\n[FAST CUTS: Cockpit emergency lights, massive alien monolith, astronaut visor reflection]\n[TITLE CARD: COMING SOON]",
      youtubeDescription: "Watch the official concept trailer for 'The Floating Ruin'. Pre-production package generated with Prompt Cinema AI.",
      seoKeywords: ["Sci-Fi Movie", "Space Thriller", "Cinematic AI", "Film Concept", "Hollywood Production"],
      instagramCaption: "When deep space calls, will you answer? 🌌🚀 #PromptCinema #SciFi #Filmmaking #ConceptArt",
      twitterThread: "1/4 Announcing the production concept for our upcoming sci-fi feature 'The Floating Ruin'. Thread on worldbuilding & cinematography 🧵👇",
      pressRelease: "LOS ANGELES, CA — Production has officially been greenlit for 'The Floating Ruin'..."
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
    },
    createdAt: new Date().toISOString(),
    promptUsed: "A lonely astronaut discovers an abandoned city floating in space.",
    isFavorite: true
  }
];

export const SAMPLE_ASTRONAUT_PROJECT: MovieProject = SAMPLE_PROJECTS[0];
