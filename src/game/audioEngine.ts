// Web Audio API procedural sound synthesizer for The Culture Quest

class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public playClick() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }

  public playSelect() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  public playWheelSpin() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    for (let i = 0; i < 4; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const startTime = this.ctx.currentTime + i * 0.07;
      osc.frequency.setValueAtTime(300 + i * 80, startTime);

      gain.gain.setValueAtTime(0.08, startTime);
      gain.gain.linearRampToValueAtTime(0.01, startTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.05);
    }
  }

  public playCorrect(triggerConfetti: boolean = true) {
    if (triggerConfetti) {
      import('../utils/confetti').then(({ fireCorrectConfetti }) => {
        fireCorrectConfetti();
      }).catch(() => {});
    }

    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    // Sparkling 5-note celebratory major chord arpeggio
    const chord = [
      { freq: 523.25, offset: 0.00, dur: 0.40, vol: 0.20 }, // C5
      { freq: 659.25, offset: 0.07, dur: 0.45, vol: 0.22 }, // E5
      { freq: 783.99, offset: 0.14, dur: 0.50, vol: 0.24 }, // G5
      { freq: 1046.50, offset: 0.21, dur: 0.60, vol: 0.26 }, // C6
      { freq: 1318.51, offset: 0.28, dur: 0.70, vol: 0.22 }, // E6 sparkle
    ];

    chord.forEach(({ freq, offset, dur, vol }) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      const time = this.ctx.currentTime + offset;
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(vol, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(time);
      osc.stop(time + dur);
    });
  }

  public playIncorrect() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    // Classic game "uh-oh / buzz" sound: 2 descending low buzz tones
    const buzzTones = [
      { freq: 220, start: 0.00, dur: 0.16 }, // A3
      { freq: 164.81, start: 0.18, dur: 0.28 }, // E3 lower
    ];

    buzzTones.forEach(({ freq, start, dur }) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';

      const time = this.ctx.currentTime + start;
      osc.frequency.setValueAtTime(freq, time);
      osc.frequency.linearRampToValueAtTime(freq * 0.92, time + dur);

      gain.gain.setValueAtTime(0.18, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

      // Low pass filter to make the buzz round, punchy and warm
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(850, time);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(time);
      osc.stop(time + dur);
    });
  }

  public playStealOpportunity() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const notes = [440, 554.37, 659.25];
    notes.forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      const time = this.ctx.currentTime + i * 0.09;
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.08, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(time);
      osc.stop(time + 0.22);
    });
  }

  public playTokenFly() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(350, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.4);

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.4);
  }

  public playTreeGrow() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const chord = [261.63, 329.63, 392.00, 523.25, 659.25]; // C major chord arpeggio + bloom
    chord.forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const time = this.ctx.currentTime + i * 0.07;
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.14, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(time);
      osc.stop(time + 0.6);
    });
  }

  public playLivingCultureCelebration() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    // Victory fanfare
    const fanfare = [
      { f: 523.25, d: 0.15 },
      { f: 523.25, d: 0.15 },
      { f: 523.25, d: 0.15 },
      { f: 659.25, d: 0.35 },
      { f: 783.99, d: 0.25 },
      { f: 1046.50, d: 0.60 }
    ];

    let t = this.ctx.currentTime;
    fanfare.forEach(note => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, t);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + note.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + note.d);
      t += note.d * 0.85;
    });
  }
}

export const soundFx = new SoundSynthesizer();
