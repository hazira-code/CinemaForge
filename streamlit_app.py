import os
import json
import time
import streamlit as st
import pandas as pd

# Page Configuration
st.set_page_config(
    page_title="Prompt Cinema AI — Streamlit Studio",
    page_icon="🎬",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom Dark Theme Styling
st.markdown("""
<style>
    /* Dark Theme Base */
    .stApp {
        background-color: #0B0F19;
        color: #E2E8F0;
    }
    
    /* Headers & Text */
    h1, h2, h3, h4 {
        color: #FFFFFF !important;
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }
    
    /* Card Panel */
    .cinema-card {
        background: rgba(15, 23, 42, 0.75);
        border: 1px solid rgba(51, 65, 85, 0.8);
        border-radius: 16px;
        padding: 20px;
        margin-bottom: 16px;
        backdrop-filter: blur(12px);
    }
    
    .cinema-accent-card {
        background: linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9));
        border: 1px solid rgba(139, 92, 246, 0.3);
        border-radius: 16px;
        padding: 20px;
        margin-bottom: 20px;
    }
    
    /* Badges & Chips */
    .badge-purple {
        background-color: rgba(139, 92, 246, 0.2);
        color: #C084FC;
        border: 1px solid rgba(139, 92, 246, 0.4);
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        display: inline-block;
    }
    
    .badge-blue {
        background-color: rgba(59, 130, 246, 0.2);
        color: #60A5FA;
        border: 1px solid rgba(59, 130, 246, 0.4);
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        display: inline-block;
    }

    .badge-emerald {
        background-color: rgba(16, 185, 129, 0.2);
        color: #34D399;
        border: 1px solid rgba(16, 185, 129, 0.4);
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        display: inline-block;
    }
    
    /* Screenplay Box */
    .screenplay-box {
        background-color: #05070D;
        color: #D1D5DB;
        font-family: 'Courier New', Courier, monospace;
        padding: 24px;
        border-radius: 12px;
        border: 1px solid #1E293B;
        line-height: 1.6;
        white-space: pre-wrap;
    }
</style>
""", unsafe_allow_html=True)

# Sample Pre-loaded Movie Templates
SAMPLE_PROJECTS = {
    "The Echoes of Titan (Sci-Fi Thriller)": {
        "title": "The Echoes of Titan",
        "genre": "Sci-Fi Thriller",
        "logline": "When a solitary communications officer on Saturn's moon intercepts a transmission in her deceased mother's voice, she must decipher if it is an alien contact or an audio illusion born from deep space madness.",
        "tagline": "In the acoustic silence of Saturn, the dead speak in frequencies.",
        "hook": "An impossible voice originating from inside a frozen subterranean ocean.",
        "synopsis": "In 2142, Station Titan Seven monitors deep-drill acoustics beneath Titan's icy crust. Commander Dr. Elena Vance detects a rhythmic sub-bass distress signal. Upon decoding, the vocal profile matches her mother—a planetary scientist who perished on Earth twenty years prior. As mechanical anomalies destabilize the station, Elena descends into the drill shaft to verify the source, risking her life to face a conscious, memory-mimicking acoustic entity.",
        "act1": "Dr. Vance detects impossible frequency pulses while investigating drill core telemetry.",
        "act2": "Audio forensics confirm zero digital tampering. Unexplained acoustic vibrations cause hull fracturing as power cuts.",
        "act3": "Elena suit-up for a solo ice walk into the central shaft to establish first acoustic contact.",
        "themes": ["Grief & Isolation", "Acoustic Intelligence", "Perception vs Memory", "Deep Space Longevity"],
        "plotTwist": "The subterranean entity does not have a physical body—it is a liquid methane acoustic neural network that preserves every sound made near Saturn.",
        "ending": "Elena establishes a two-way harmonic bridge, broadcasting human orchestral music into the ice before sending the station's archive back to Earth.",
        "characters": [
            {"name": "Dr. Elena Vance", "role": "Protagonist", "archetype": "Grieving Scientist", "personality": "Analytical, introverted, intensely observant.", "backstory": "Lost her mother in an Arctic drilling event in 2122.", "motivation": "Uncover physical truth behind deep space phenomena."},
            {"name": "A.R.I.A.", "role": "Station AI", "archetype": "Rational Custodian", "personality": "Measured, protocol-driven, calm under catastrophic stress.", "backstory": "Version 9 station intelligence trained on NASA flight logs.", "motivation": "Maintain structural integrity and prevent crew casualty."}
        ],
        "screenplay": [
            {
                "sceneNumber": 1,
                "heading": "INT. STATION TITAN - MAIN CONTROL DECK - NIGHT",
                "action": "Amber emergency strobes sweep across frozen control consoles. Outside the pressure viewport, Saturn's rings slice through golden methane fog.",
                "dialogue": [
                    {"character": "DR. ELENA VANCE", "parenthetical": "(adjusting headphone dials)", "line": "A.R.I.A., isolate hydrophone channel four. Filter out the cryo-pump resonance."},
                    {"character": "A.R.I.A. (V.O.)", "parenthetical": "(synthesized calm)", "line": "Filtering complete. Warning: Sub-frequency amplitude exceeds safe telemetry thresholds."},
                    {"character": "DR. ELENA VANCE", "parenthetical": "(whispering)", "line": "That's not seismic noise... that's a human vocal formant."}
                ]
            },
            {
                "sceneNumber": 2,
                "heading": "INT. LOWER DRILL SHAFT - CONTINUOUS",
                "action": "Elena descends the vertical ladder. Frost clings to her suit visor. The acoustic hum grows into a reverberating chord.",
                "dialogue": [
                    {"character": "DR. ELENA VANCE", "parenthetical": "(breathing heavily into suit mic)", "line": "If anyone is monitoring on Earth command... I am entering the core room now."}
                ]
            }
        ],
        "shotList": [
            {"sceneNumber": 1, "shotNumber": 1, "shotType": "Extreme Wide Shot", "lens": "18mm Anamorphic", "movement": "Slow Track In", "purpose": "Establish vastness of Titan control room against Saturn background", "duration": "8s"},
            {"sceneNumber": 1, "shotNumber": 2, "shotType": "Extreme Close-Up", "lens": "85mm Macro", "movement": "Static", "purpose": "Detail on Elena's eye reflecting waveform telemetry", "duration": "4s"},
            {"sceneNumber": 2, "shotNumber": 1, "shotType": "Low Angle Medium Shot", "lens": "35mm Prime", "movement": "Handheld Tracking", "purpose": "Convey danger and claustrophobia in drill shaft", "duration": "6s"}
        ],
        "cinematography": {
            "aspectRatio": "2.39:1 Anamorphic",
            "cameraAngle": "Low-angle perspective emphasizing looming industrial geometry.",
            "lens": "Cooke Anamorphic /i Full Frame Plus",
            "lighting": {"key": "5600K Cyan Key", "fill": "Deep Teal Ambient", "backlight": "Amber Emergency Strobe", "practicals": "Monochromic LED UI panels"},
            "colorTemp": "3800K Cool Balanced",
            "mood": "Cold, atmospheric, awe-inspiring, claustrophobic"
        },
        "budget": {"total": "$14,500,000", "vfx": "$4,200,000", "cast": "$3,000,000", "production": "$5,100,000", "audio": "$2,200,000"}
    },
    "Neo-Tokyo 2099 (Cyberpunk Noir)": {
        "title": "Neo-Tokyo 2099",
        "genre": "Cyberpunk Noir",
        "logline": "A memory-wiping detective in rain-slicked Neo-Tokyo investigates the murder of an android politician, only to discover the prime suspect is his own deleted memory bank.",
        "tagline": "You can delete your past, but the rain remembers everything.",
        "hook": "A murder committed by a ghost avatar existing only inside synthetic synapses.",
        "synopsis": "In a rain-drenched megalopolis neon grid, Detective Ren Kaito specializes in neural memory sanitization. When Councilor Sato is assassinated in a locked holo-suite, Kaito is summoned. The biometric logs show a assailant with Kaito's unique ocular encryption key.",
        "act1": "Ren arrives at the neon crime scene; holo-forensics reveal encrypted digital footprints matching his past.",
        "act2": "Ren hunts down a rogue cyber-fixer through flooded subterranean night markets.",
        "act3": "Ren hacks his own archived memory vault to confront his forgotten twin identity.",
        "themes": ["Identity & Consciousness", "Corporate Oligarchy", "Synthetic Humanity"],
        "plotTwist": "Ren himself was manufactured as a synthetic detective clone programmed to solve crimes committed by his creators.",
        "ending": "Ren releases his neural archive to the city's public holographic billboards.",
        "characters": [
            {"name": "Ren Kaito", "role": "Protagonist", "archetype": "Flawed Detective", "personality": "Cynical, razor-sharp, quiet.", "backstory": "Sold 80% of his natural brain memories to pay medical debt.", "motivation": "Uncover his real origin story."}
        ],
        "screenplay": [
            {
                "sceneNumber": 1,
                "heading": "EXT. NEO-TOKYO NIGHT MARKET - RAIN",
                "action": "Neon kanji signs glow through heavy downpour. Flying hover-cabs cut through holographic dragon projections.",
                "dialogue": [
                    {"character": "REN KAITO", "parenthetical": "(lighting a synthetic cig)", "line": "In this city, memories sell for more than credits. And mine just doubled in price."}
                ]
            }
        ],
        "shotList": [
            {"sceneNumber": 1, "shotNumber": 1, "shotType": "High Angle Wide", "lens": "24mm Cine", "movement": "Drone Crane Down", "purpose": "Establish towering neon skyline and rain reflections", "duration": "7s"}
        ],
        "cinematography": {
            "aspectRatio": "2.39:1 Widescreen",
            "cameraAngle": "High contrast dutch angles and neon backlighting.",
            "lens": "Arri Master Prime",
            "lighting": {"key": "Magenta Neon Light", "fill": "Cyan puddle reflection", "backlight": "Sodium Vapor street lamp", "practicals": "Hologram billboards"},
            "colorTemp": "5200K Neon Contrast",
            "mood": "Slick, moody, electrifying, secretive"
        },
        "budget": {"total": "$22,000,000", "vfx": "$8,500,000", "cast": "$5,000,000", "production": "$6,000,000", "audio": "$2,500,000"}
    }
}

# Sidebar Controls
st.sidebar.image("https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&q=80", use_container_width=True)
st.sidebar.title("🎬 Prompt Cinema AI")
st.sidebar.caption("Streamlit Filmmaking Studio & Pre-Production Engine")

st.sidebar.divider()

# Selection or New Generation
project_choice = st.sidebar.selectbox(
    "Select Movie Project Preset",
    options=list(SAMPLE_PROJECTS.keys()) + ["+ Create New Custom Project"]
)

if project_choice == "+ Create New Custom Project":
    st.sidebar.subheader("New Project Generator")
    custom_title = st.sidebar.text_input("Movie Title", "Apex Protocol")
    custom_genre = st.sidebar.selectbox("Genre", ["Sci-Fi", "Action", "Thriller", "Horror", "Drama", "Cyberpunk", "Fantasy", "Mystery"])
    custom_prompt = st.sidebar.text_area("Concept Prompt", "A team of deep sea divers discover an underwater alien portal in the Mariana Trench.")
    
    if st.sidebar.button("✨ Generate Project Package", type="primary", use_container_width=True):
        with st.spinner("Generating Screenplay, Shot List & Production Package..."):
            time.sleep(1.2)
            new_proj = {
                "title": custom_title,
                "genre": custom_genre,
                "logline": f"An epic {custom_genre.lower()} story: {custom_prompt}",
                "tagline": "The ultimate frontier lies beyond what we can see.",
                "hook": "A discovery that challenges everything humans know about existence.",
                "synopsis": f"In this high-stakes narrative, key characters explore: {custom_prompt}",
                "act1": "Initial discovery and high-tension setup.",
                "act2": "Escalation of conflicts and unforeseen complications.",
                "act3": "Climactic showdown and transformative resolution.",
                "themes": ["Human Ambition", "Survival", "The Unknown"],
                "plotTwist": "The obstacle faced was a reflection of their own technology.",
                "ending": "A silent victory that changes the course of history.",
                "characters": [
                    {"name": "Lead Officer", "role": "Protagonist", "archetype": "Commander", "personality": "Decisive and brave.", "backstory": "Veteran of deep missions.", "motivation": "Protect the crew."}
                ],
                "screenplay": [
                    {
                        "sceneNumber": 1,
                        "heading": "EXT. DEEP SECTOR - DAY",
                        "action": "Sirens wail as pressure gauges fluctuate dangerously.",
                        "dialogue": [
                            {"character": "LEAD OFFICER", "parenthetical": "(on comms)", "line": "Hold steady! We are breaking through the barrier now!"}
                        ]
                    }
                ],
                "shotList": [
                    {"sceneNumber": 1, "shotNumber": 1, "shotType": "Wide Shot", "lens": "24mm", "movement": "Push In", "purpose": "Set scene scope", "duration": "5s"}
                ],
                "cinematography": {
                    "aspectRatio": "2.39:1",
                    "cameraAngle": "Dynamic tracking",
                    "lens": "35mm Prime",
                    "lighting": {"key": "High Contrast Spot", "fill": "Soft Blue Ambient", "backlight": "Warm Halo", "practicals": "Control Panel LEDs"},
                    "colorTemp": "4500K",
                    "mood": "Intense, cinematic, immersive"
                },
                "budget": {"total": "$18,000,000", "vfx": "$6,000,000", "cast": "$4,000,000", "production": "$6,000,000", "audio": "$2,000,000"}
            }
            SAMPLE_PROJECTS[custom_title] = new_proj
            st.session_state["active_project"] = new_proj
            st.sidebar.success("Generated Successfully!")
            st.rerun()

# Set current active project
if "active_project" not in st.session_state or project_choice in SAMPLE_PROJECTS:
    if project_choice in SAMPLE_PROJECTS:
        st.session_state["active_project"] = SAMPLE_PROJECTS[project_choice]

proj = st.session_state["active_project"]

# Main Studio Display
st.markdown(f"""
<div class="cinema-accent-card">
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
        <div>
            <span class="badge-purple">{proj.get('genre', 'Film')}</span>
            <span class="badge-blue">Hollywood Pre-Production Studio</span>
            <span class="badge-emerald">15 AI Modules Active</span>
            <h1 style="margin-top: 10px; margin-bottom: 5px; font-size: 2.2rem;">{proj.get('title', 'Movie Project')}</h1>
            <p style="color: #94A3B8; font-style: italic; font-size: 1.05rem;">"{proj.get('tagline', '')}"</p>
        </div>
    </div>
</div>
""", unsafe_allow_html=True)

# Tabs
tab1, tab2, tab3, tab4, tab5, tab6, tab7, tab8 = st.tabs([
    "📖 Story & Plot",
    "📜 Screenplay",
    "🎥 Shot List",
    "📷 Cinematography",
    "🖼️ Storyboards & Prompts",
    "🎙️ Voice & Audio Score",
    "💼 Production & Budget",
    "📥 Export Package"
])

# TAB 1: STORY & PLOT
with tab1:
    st.subheader("Story Architecture & Narrative Arc")
    
    col1, col2 = st.columns([2, 1])
    with col1:
        st.markdown(f"""
        <div class="cinema-card">
            <h4 style="color: #60A5FA;">Logline</h4>
            <p style="font-size: 1.1rem; line-height: 1.6;">{proj.get('logline', '')}</p>
        </div>
        
        <div class="cinema-card">
            <h4 style="color: #C084FC;">Logline Hook</h4>
            <p style="font-size: 1rem;">{proj.get('hook', '')}</p>
        </div>
        
        <div class="cinema-card">
            <h4>Full Synopsis</h4>
            <p style="line-height: 1.7; color: #CBD5E1;">{proj.get('synopsis', '')}</p>
        </div>
        """, unsafe_allow_html=True)
        
    with col2:
        st.markdown("<div class="cinema-card">", unsafe_allow_html=True)
        st.markdown("#### Key Themes")
        for t in proj.get("themes", []):
            st.markdown(f"- **{t}**")
        st.divider()
        st.markdown("#### Plot Twist")
        st.caption(proj.get("plotTwist", "N/A"))
        st.divider()
        st.markdown("#### Resolution / Ending")
        st.caption(proj.get("ending", "N/A"))
        st.markdown("</div>", unsafe_allow_html=True)

    st.subheader("Three-Act Structural Breakdown")
    act_col1, act_col2, act_col3 = st.columns(3)
    with act_col1:
        st.markdown(f"""
        <div class="cinema-card">
            <h4 style="color: #38BDF8;">Act I: Setup & Catalyst</h4>
            <p style="font-size: 0.95rem;">{proj.get('act1', '')}</p>
        </div>
        """, unsafe_allow_html=True)
    with act_col2:
        st.markdown(f"""
        <div class="cinema-card">
            <h4 style="color: #F43F5E;">Act II: Confrontation</h4>
            <p style="font-size: 0.95rem;">{proj.get('act2', '')}</p>
        </div>
        """, unsafe_allow_html=True)
    with act_col3:
        st.markdown(f"""
        <div class="cinema-card">
            <h4 style="color: #34D399;">Act III: Resolution</h4>
            <p style="font-size: 0.95rem;">{proj.get('act3', '')}</p>
        </div>
        """, unsafe_allow_html=True)

# TAB 2: SCREENPLAY
with tab2:
    st.subheader("Formatted Screenplay")
    st.caption("Industry-standard Final Draft Courier layout formatting")
    
    screenplay_data = proj.get("screenplay", [])
    for sc in screenplay_data:
        st.markdown(f"### Scene {sc.get('sceneNumber', 1)}: {sc.get('heading', '')}")
        
        script_text = f"{sc.get('heading', '')}\n\n{sc.get('action', '')}\n\n"
        for d in sc.get("dialogue", []):
            char = d.get("character", "").upper()
            paren = f"\n({d.get('parenthetical', '')})" if d.get("parenthetical") else ""
            line = d.get("line", "")
            script_text += f"{' '*20}{char}{paren}\n{' '*12}\"{line}\"\n\n"
            
        st.markdown(f'<div class="screenplay-box">{script_text}</div>', unsafe_allow_html=True)
        st.divider()

# TAB 3: SHOT LIST
with tab3:
    st.subheader("Camera Shot List Matrix")
    shots = proj.get("shotList", [])
    if shots:
        df_shots = pd.DataFrame(shots)
        st.dataframe(
            df_shots,
            use_container_width=True,
            column_config={
                "sceneNumber": "Scene #",
                "shotNumber": "Shot #",
                "shotType": "Shot Type",
                "lens": "Lens",
                "movement": "Camera Movement",
                "purpose": "Cinematic Purpose",
                "duration": "Est. Duration"
            }
        )
    else:
        st.info("No shots generated yet.")

# TAB 4: CINEMATOGRAPHY
with tab4:
    st.subheader("Visual Style & Lighting Blueprints")
    cine = proj.get("cinematography", {})
    
    col1, col2 = st.columns(2)
    with col1:
        st.markdown(f"""
        <div class="cinema-card">
            <h4 style="color: #A855F7;">Optics & Camera Specs</h4>
            <ul>
                <li><b>Aspect Ratio:</b> {cine.get('aspectRatio', '2.39:1 Anamorphic')}</li>
                <li><b>Lens Package:</b> {cine.get('lens', '35mm Cine Prime')}</li>
                <li><b>Camera Motion:</b> {cine.get('cameraAngle', 'Dynamic')}</li>
                <li><b>Color Temp:</b> {cine.get('colorTemp', '4000K')}</li>
                <li><b>Visual Mood:</b> {cine.get('mood', 'Cinematic')}</li>
            </ul>
        </div>
        """, unsafe_allow_html=True)
        
    with col2:
        lighting = cine.get("lighting", {})
        st.markdown(f"""
        <div class="cinema-card">
            <h4 style="color: #F59E0B;">Lighting Rig Specifications</h4>
            <ul>
                <li><b>Key Light:</b> {lighting.get('key', '5600K Key')}</li>
                <li><b>Fill Light:</b> {lighting.get('fill', 'Teal Ambient')}</li>
                <li><b>Backlight:</b> {lighting.get('backlight', 'Amber Rim')}</li>
                <li><b>Practicals:</b> {lighting.get('practicals', 'Panel Lights')}</li>
            </ul>
        </div>
        """, unsafe_allow_html=True)

# TAB 5: STORYBOARDS & PROMPTS
with tab5:
    st.subheader("AI Storyboard & Video Generation Prompts")
    st.caption("Prompts optimized for Midjourney v6, Flux Pro, Runway Gen-3, and Google Veo")
    
    col1, col2 = st.columns(2)
    with col1:
        st.markdown("#### Midjourney / Flux Storyboard Prompt")
        mj_prompt = f"Cinematic film still from '{proj.get('title')}', {proj.get('genre')}, 35mm anamorphic lens, {cine.get('mood', 'atmospheric')}, 8k resolution, highly detailed, dramatic lighting --ar 16:9 --style raw --v 6.0"
        st.code(mj_prompt, language="text")
        
    with col2:
        st.markdown("#### Runway Gen-3 / Google Veo Camera Motion Prompt")
        veo_prompt = f"Smooth slow push in camera movement, {proj.get('genre')} cinematic lighting, high-contrast, photorealistic motion --motion 4 --fps 24"
        st.code(veo_prompt, language="text")

# TAB 6: VOICE & AUDIO SCORE
with tab6:
    st.subheader("Soundtrack & Vocal Direction")
    st.markdown("""
    <div class="cinema-card">
        <h4 style="color: #EC4899;">Orchestral Score Direction</h4>
        <p><b>Tempo:</b> 72 BPM | <b>Key:</b> D Minor Harmonic</p>
        <p><b>Instrumentation:</b> Analog sub-bass synthesizers blended with wet solo cello, eerie acoustic reverberation, and brass risers.</p>
    </div>
    """, unsafe_allow_html=True)

# TAB 7: PRODUCTION & BUDGET
with tab7:
    st.subheader("Production Logistics & Estimated Budget")
    b = proj.get("budget", {})
    
    st.metric("Estimated Total Budget", b.get("total", "$15,000,000"))
    
    mcol1, mcol2, mcol3, mcol4 = st.columns(4)
    mcol1.metric("VFX / CGI", b.get("vfx", "$4,000,000"))
    mcol2.metric("Cast & Talent", b.get("cast", "$3,000,000"))
    mcol3.metric("Physical Production", b.get("production", "$5,000,000"))
    mcol4.metric("Audio & Scoring", b.get("audio", "$2,000,000"))

# TAB 8: EXPORT
with tab8:
    st.subheader("Export Pre-Production Package")
    st.caption("Download your project data in standard industry formats")
    
    col_exp1, col_exp2 = st.columns(2)
    
    json_str = json.dumps(proj, indent=2)
    with col_exp1:
        st.download_button(
            label="💾 Download Master JSON Package",
            data=json_str,
            file_name=f"{proj.get('title', 'movie').lower().replace(' ', '_')}_cinema_package.json",
            mime="application/json",
            use_container_width=True
        )
        
    markdown_str = f"# {proj.get('title')}\n\n**Genre:** {proj.get('genre')}\n\n## Logline\n{proj.get('logline')}\n\n## Synopsis\n{proj.get('synopsis')}"
    with col_exp2:
        st.download_button(
            label="📄 Download Production Bible (Markdown)",
            data=markdown_str,
            file_name=f"{proj.get('title', 'movie').lower().replace(' ', '_')}_bible.md",
            mime="text/markdown",
            use_container_width=True
        )

st.sidebar.divider()
st.sidebar.info("Prompt Cinema AI — Streamlit Version 1.0 ready for local or Cloud run.")
