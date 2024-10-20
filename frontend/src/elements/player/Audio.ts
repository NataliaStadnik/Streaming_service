import { AudioStart, play } from "./AudioPresenter";

export interface Audios {
    source: AudioBufferSourceNode;
    buffer: AudioBuffer;
    gain: GainNode;
}

export class MyAudio {
  path: string;
  playButton = document.getElementById("button-play");
  audioCtx: AudioContext;
  gainNode: GainNode;

  constructor(path: string, context: AudioContext) {
    this.path = path
    this.audioCtx = context;
    this.gainNode = this.audioCtx.createGain();
  }

  async init(): Promise<void> {
    this.playButton.removeEventListener("click", play, false)
    const settings = await this.loadAudio();
    await AudioStart(settings, this.audioCtx);
  }

  async loadAudio(): Promise<Audios> {
    try {
      const response = await fetch(`http://localhost:3000${this.path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    })
      const buffer = await this.audioCtx.decodeAudioData(await response.arrayBuffer());
      const source = this.audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(this.audioCtx.destination);
      source.connect(this.gainNode).connect(this.audioCtx.destination);
      return {source: source, buffer: buffer, gain: this.gainNode}
    } catch (err) {
      console.error(`Unable to fetch the audio file. Error: ${err.message}`);
    }
  }
}
