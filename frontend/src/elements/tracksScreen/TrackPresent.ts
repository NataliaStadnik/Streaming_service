import { WorkWithTracks } from './WorkWithTracks';
import { renderDinamicDOM, Track } from '../../utilits/utilits';

export class TrackPresent {
  private inst: WorkWithTracks;
  dotsBTN: Element;
  likeBTN: Element;
  index: number;
  object: Track;
  state: number;

  constructor(object: Track, index: number, state?: number) {
    this.index = index;
    this.object = object;
    this.state = state;
    this.render();
  }

  render(): void {
    this.inst = new WorkWithTracks(this.object, this.state, this.index);
    renderDinamicDOM("tracks__list", this.inst.getElement());
  }
}

