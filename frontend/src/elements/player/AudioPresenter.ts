import { CommonMethods } from '../../utilits/CommonMethods';
import { Audios } from './Audio';

const sliderProgress: HTMLInputElement = document.getElementsByClassName('slider')[0] as HTMLInputElement;
const sliderVolume: HTMLInputElement = document.getElementsByClassName('slider')[1] as HTMLInputElement;
const thumb = document.getElementsByClassName('thumb')[0] as HTMLHtmlElement;
const startTime = document.getElementsByClassName('player__time-start');
const endTime = document.getElementsByClassName('player__time-end');
const svgPlay = document.getElementsByClassName('play');
const svgStop = document.getElementsByClassName('stop');
const playButton = document.getElementById("button-play");

let buffer: AudioBuffer;
let source: AudioBufferSourceNode;
let audioCtx: AudioContext;
let RAF: number;
let gainNode: GainNode;


export async function AudioStart(settings: Audios, actx: AudioContext): Promise<void> {
  source = settings.source;
  buffer = settings.buffer;
  gainNode = settings.gain;
  audioCtx = actx;
  playButton.addEventListener("click", play)
}


export function changeVolume(total: number, value: number): void {
  const percent = (value / total) * 100;
  gainNode.gain.value = Math.floor((value / total * 10));
  sliderVolume.style.background = `linear-gradient(to right, #FC6D3E ${percent}%, #E8E8E8 ${percent}%)`;
}


function setRange(): void {
  const time1 = CommonMethods.getTime(audioCtx.currentTime);
  const time2 = CommonMethods.getTime(buffer.duration - audioCtx.currentTime);
  if(time2 === '0:00') {
    endTime[0].textContent = time2;
    return cancelAnimationFrame(RAF);;
  }
  startTime[0].textContent = time1;
  endTime[0].textContent = time2;

  sliderProgress.max = buffer.duration.toString();
  sliderProgress.value = audioCtx.currentTime.toString();
  const procent = audioCtx.currentTime / buffer.duration * 100;
  sliderProgress.style.background = `linear-gradient(to right, #FC6D3E ${procent}%, #E8E8E8 ${procent}%)`;
  RAF = requestAnimationFrame(setRange);
}


export async function resetRange(): Promise<void> {
  cancelAnimationFrame(RAF);
  sliderProgress.value = '0:0';
  sliderProgress.style.background = `#E8E8E8`;
  sliderVolume.style.background = `#E8E8E8`;
  thumb.style.left = 0 + 'px';
  svgPlay[0].classList?.remove('play--none');
  svgStop[0].classList?.add('stop--none');
  endTime[0].textContent = '0:0'
  startTime[0].textContent = '0:0';
  thumb.classList.remove('thumb--none');
  playButton.removeEventListener("click", play);
  playButton.dataset.click = '0'
  if (audioCtx) {
    source.disconnect();
    await audioCtx.close();
    gainNode = null;
  }
}


export function play(): void {
  let call = parseInt(playButton.dataset.click);
   if (!call) {
      source.start(0);
    }
    playButton.dataset.click = (++call).toString()

    if (call % 2 !== 0) {
      RAF = requestAnimationFrame(setRange);
      audioCtx.resume();
    } else {
      audioCtx.suspend()
      cancelAnimationFrame(RAF);
    }
    svgPlay[0].classList.toggle('play--none');
    svgStop[0].classList.toggle('stop--none');
    source.onended = () => {
      resetRange();
    }
}
