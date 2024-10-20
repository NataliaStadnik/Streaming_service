import { Settings } from "../../utilits/Settings";
import { Track } from "../../utilits/utilits";
import { TrackPresent } from './TrackPresent'

export class TracksListPresenter  {
  state: number;
  list: Track[];

  constructor(list: Track[], state?: number) {
    this.list = list;
    this.state = state;
    this.renderList()
  }

  renderList(lst: Track[] = this.list): void {
    new Settings().clearList();
    for (let i = 0; i < lst.length; i++) {
      new TrackPresent(lst[i], i, this.state)
    }
  }
}

