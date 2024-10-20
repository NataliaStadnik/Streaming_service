import { instance } from "../config";
import { TracksListPresenter } from "../elements/tracksScreen/TracksListPresenter";
import { Track } from "../utilits/utilits";

export class Tracks {
  static TracksList: Track[];

  constructor() {}

  getList(): Track[] {
    return Tracks.TracksList;
  }

  async updateList(): Promise<void>  {
    await instance
      .get(`/songs`)
      .then(function (data) {
        Tracks.TracksList = data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  static async getNewList(state: number): Promise<void> {
    await new Tracks().updateList();
    new TracksListPresenter(Tracks.TracksList, state);
  }

  static async getOneTrack(id: number): Promise<Track> {
    let datas: Track;
    await instance
      .get(`/songs/${id}`)
      .then(function (data) {
       datas = data.data;
      })
      return  datas;
  }
}
