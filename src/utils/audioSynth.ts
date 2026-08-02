// Interactive Web Audio API Synthesizer for Cinematic Music & Ambient Previews

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export interface ActiveSynthHandle {
  stop: () => void;
}

// Play cinematic synth pad drone for music preview
export function playCinematicMusicPreview(tempoBpm: number = 74, key: string = 'D'): ActiveSynthHandle {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.01, now);
  masterGain.gain.exponentialRampToValueAtTime(0.2, now + 1.5);

  // Low Sub Drone
  const subOsc = ctx.createOscillator();
  subOsc.type = 'sawtooth';
  subOsc.frequency.setValueAtTime(key === 'A' ? 55 : 73.42, now); // D2 or A1

  const subFilter = ctx.createBiquadFilter();
  subFilter.type = 'lowpass';
  subFilter.frequency.setValueAtTime(220, now);

  subOsc.connect(subFilter);
  subFilter.connect(masterGain);

  // Harmony Synth Chord
  const freq1 = key === 'A' ? 220 : 146.83; // D3
  const freq2 = key === 'A' ? 261.63 : 174.61; // F3 (Minor)
  const freq3 = key === 'A' ? 329.63 : 220.00; // A3

  const chordOscs: OscillatorNode[] = [];
  [freq1, freq2, freq3].forEach((f) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(f, now);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.08, now);

    osc.connect(oscGain);
    oscGain.connect(masterGain);
    osc.start(now);
    chordOscs.push(osc);
  });

  subOsc.start(now);
  masterGain.connect(ctx.destination);

  return {
    stop: () => {
      const stopNow = ctx.currentTime;
      masterGain.gain.linearRampToValueAtTime(0.001, stopNow + 1.0);
      setTimeout(() => {
        try {
          subOsc.stop();
          chordOscs.forEach((o) => o.stop());
        } catch (e) {
          // ignore
        }
      }, 1050);
    },
  };
}

// Play ambient sci-fi sound effect
export function playFoleySoundPreview(category: string): ActiveSynthHandle {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.15, now);

  if (category.toLowerCase().includes('impact') || category.toLowerCase().includes('transition')) {
    // Sub-bass impact drop
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 1.2);

    masterGain.gain.setValueAtTime(0.4, now);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    osc.connect(masterGain);
    masterGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 1.3);
  } else {
    // Air / Noise sweep
    const bufferSize = ctx.sampleRate * 1.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.exponentialRampToValueAtTime(1800, now + 0.8);

    masterGain.gain.setValueAtTime(0.2, now);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

    noise.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(ctx.destination);
    noise.start(now);
  }

  return {
    stop: () => {
      try {
        masterGain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      } catch (e) {
        // ignore
      }
    },
  };
}

// Speech synthesis preview for Narration / Voiceover
export function speakNarrationText(text: string, onEnd?: () => void): ActiveSynthHandle {
  if (!('speechSynthesis' in window)) {
    alert('Speech synthesis is not supported in this browser environment.');
    return { stop: () => {} };
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.88; // Deep cinematic pacing
  utterance.pitch = 0.9; // Slightly lower pitch for dramatic impact

  const voices = window.speechSynthesis.getVoices();
  const deepVoice = voices.find((v) => v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Daniel') || v.name.includes('Alex'));
  if (deepVoice) {
    utterance.voice = deepVoice;
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);

  return {
    stop: () => {
      window.speechSynthesis.cancel();
    },
  };
}
