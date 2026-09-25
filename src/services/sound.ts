// Highly Premium Synthesized Web Audio UI Sounds
// Zero assets needed, instant execution, zero lag, highly professional.

class SoundService {
  private getAudioContext(): AudioContext | null {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      return AudioCtx ? new AudioCtx() : null;
    } catch {
      return null;
    }
  }

  // Soft digital swoosh / upward sweep on message send
  public playSendSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(840, ctx.currentTime + 0.14);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.14);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.14);
    } catch (e) {
      console.warn('Audio synthesis failed:', e);
    }
  }

  // Double-beep high-tech chime on reply accept / receive
  public playReceiveSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      // First high chime
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.connect(gain1);
      gain1.connect(ctx.destination);

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(580, ctx.currentTime);
      gain1.gain.setValueAtTime(0.05, ctx.currentTime);
      gain1.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.08);

      // Second higher chime delayed by 90ms for dual harmony
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(780, ctx.currentTime + 0.09);
      gain2.gain.setValueAtTime(0.05, ctx.currentTime + 0.09);
      gain2.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.24);

      osc2.start(ctx.currentTime + 0.09);
      osc2.stop(ctx.currentTime + 0.24);
    } catch (e) {
      console.warn('Audio synthesis failed:', e);
    }
  }

  // Play synthesized "Pirates of the Caribbean" theme
  public playPiratesTheme() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      let timeOffset = 0;

      // Define the famous melody notes of He's a Pirate
      const notes = [
        { freq: 440, dur: 0.12 }, // A4
        { freq: 523, dur: 0.12 }, // C5
        
        { freq: 587, dur: 0.24 }, // D5
        { freq: 587, dur: 0.12 }, // D5
        { freq: 587, dur: 0.24 }, // D5
        { freq: 659, dur: 0.12 }, // E5
        { freq: 698, dur: 0.24 }, // F5
        { freq: 698, dur: 0.12 }, // F5
        { freq: 698, dur: 0.24 }, // F5
        { freq: 784, dur: 0.12 }, // G5
        { freq: 659, dur: 0.24 }, // E5
        { freq: 659, dur: 0.12 }, // E5
        { freq: 587, dur: 0.12 }, // D5
        { freq: 523, dur: 0.12 }, // C5
        { freq: 523, dur: 0.12 }, // C5
        { freq: 587, dur: 0.48 }, // D5
        
        // Phase 2
        { freq: 440, dur: 0.12 }, // A4
        { freq: 523, dur: 0.12 }, // C5
        
        { freq: 587, dur: 0.24 }, // D5
        { freq: 587, dur: 0.12 }, // D5
        { freq: 587, dur: 0.24 }, // D5
        { freq: 659, dur: 0.12 }, // E5
        { freq: 698, dur: 0.24 }, // F5
        { freq: 698, dur: 0.12 }, // F5
        { freq: 698, dur: 0.24 }, // F5
        { freq: 784, dur: 0.12 }, // G5
        { freq: 880, dur: 0.24 }, // A5
        { freq: 880, dur: 0.12 }, // A5
        { freq: 784, dur: 0.12 }, // G5
        { freq: 698, dur: 0.12 }, // F5
        { freq: 784, dur: 0.12 }, // G5
        { freq: 587, dur: 0.48 }, // D5
      ];

      notes.forEach((note) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        // Lowpass filter to make the sound warm & piratey, not harsh
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1000, now + timeOffset);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        // Mix triangle (warm woodwind) and sawtooth at low volume for brassy sound
        osc.type = 'triangle'; 
        osc.frequency.setValueAtTime(note.freq, now + timeOffset);

        // Gain envelope
        gain.gain.setValueAtTime(0.08, now + timeOffset);
        // Soft decay
        gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + note.dur - 0.02);

        osc.start(now + timeOffset);
        osc.stop(now + timeOffset + note.dur);

        // Subharmony for depth
        if (note.freq > 600) {
          const subOsc = ctx.createOscillator();
          const subGain = ctx.createGain();
          subOsc.connect(subGain);
          subGain.connect(ctx.destination);
          subOsc.type = 'sine';
          subOsc.frequency.setValueAtTime(note.freq / 2, now + timeOffset);
          subGain.gain.setValueAtTime(0.03, now + timeOffset);
          subGain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + note.dur - 0.02);
          subOsc.start(now + timeOffset);
          subOsc.stop(now + timeOffset + note.dur);
        }

        // Advance scheduling pointer
        timeOffset += note.dur;
      });
    } catch (e) {
      console.warn('Pirates of the Caribbean theme synthesis failed:', e);
    }
  }
}

export const sound = new SoundService();
