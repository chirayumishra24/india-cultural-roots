// Web Speech API text-to-speech for Grade 6 accessibility & pronunciation

class SpeechEngine {
  private isSupported: boolean = false;
  private isSpeaking: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.isSupported = true;
    }
  }

  public speak(text: string, onEnd?: () => void) {
    if (!this.isSupported) return;
    window.speechSynthesis.cancel(); // Stop any active speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.92; // Clear, measured classroom pace
    utterance.pitch = 1.0;

    // Try finding an English (Indian) or standard English voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      v => v.lang === 'en-IN' || v.lang.startsWith('en')
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    this.isSpeaking = true;
    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };
    utterance.onerror = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  }

  public stop() {
    if (this.isSupported) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
    }
  }

  public getSpeaking(): boolean {
    return this.isSpeaking;
  }
}

export const speechEngine = new SpeechEngine();
