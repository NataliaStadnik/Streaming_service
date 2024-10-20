import { instance } from '../config';
import  { TracksListPresenter } from '../elements/tracksScreen/TracksListPresenter';
import { Album, Artist, Track } from '../utilits/utilits';
import { AsideAllLists } from './AsideAllLists';
import { Tracks } from './Tracks';


type FavoureTracks = {
  albumLikes: Array < Album > ,
  artistLikes: Array < Artist > ,
  songLikes: Array < Track >
}

export class FavouriteTracks {
  static favouriteList: FavoureTracks;

  constructor() {}

  getList(): Track[] {
    return FavouriteTracks.favouriteList.songLikes;
  }

  async updateNewList(): Promise<void> {
    await instance
      .get(`/users/likes`)
      .then(function (data) {
        FavouriteTracks.favouriteList = data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  static async getNewList(state: number): Promise<void> {
    await new FavouriteTracks().updateNewList();
    if (state === 1) {
      new TracksListPresenter(FavouriteTracks.favouriteList.songLikes, state)
    } else if (state === 0) {
      Tracks.getNewList(0);
    } else {
      AsideAllLists.getNewOneList(state);
    }
  }


  static async changeLikeStatus(idTrack: number, action: string, state: number): Promise<void> {
    instance
      .post(`/songs/${idTrack}/${action}`)
      .then(function () {
        FavouriteTracks.getNewList(state)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
