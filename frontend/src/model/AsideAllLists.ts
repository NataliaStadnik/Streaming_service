import { instance } from "../config";
import { TracksListPresenter } from "../elements/tracksScreen/TracksListPresenter";
import { Track } from "../utilits/utilits";
import { FavouriteTracks } from "./FavouriteTracks";
import { Tracks } from "./Tracks";


export type AllPlayLists = {
  id: number,
  name: string,
  createdAt: string,
  user: string,
  songs: Track[]
}

export class AsideAllLists {
  static allPlayLists: AllPlayLists[];
  static oneList: Track[];

  constructor() {}

  async getNewLists(): Promise<void> {
    await instance
      .get(`users/playlists`)
      .then(function (data) {
        AsideAllLists.allPlayLists = data.data
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getLists(): AllPlayLists[] {
    return AsideAllLists.allPlayLists;
  }


  static async getNewOneList(state: number): Promise<void> {
    instance
      .get(`/playlists/${state}`)
      .then(function (data) {
        AsideAllLists.oneList = data.data.songs;
      })
      .then(function () {
        new TracksListPresenter(AsideAllLists.oneList, state);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  static async deleteSong(idList: number, idTrack: number): Promise<void> {
    if (idList === 1) {
      FavouriteTracks.changeLikeStatus(idTrack, 'unlike', idList)
    } else {
      instance
        .post(`/playlists/${idList}/remove/${idTrack}`)
        .then(function () {
          AsideAllLists.getNewOneList(idList);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }


  static async updateSongInList(idList: number, idTrack: number, state: number): Promise<void> {
    let status: boolean = false;
    instance
    .get(`/playlists/${idList}/songs`)
    .then(function (response) {
      response.data.forEach((obj: Track) => {
        if (obj.id === idTrack) {
          status = true;
        }
      })
    })
    .then (function () {
      if (!status) {
        instance
          .post(`/playlists/${idList}/add/${idTrack}`)
          .then(function () {
            if (state === 1) {
              new TracksListPresenter(new FavouriteTracks().getList(), state)
            } else if (state === 0) {
              Tracks.getNewList(0);
            } else {
              AsideAllLists.getNewOneList(state);
            }
          })
      }
  })
   .catch(function (error) {
      console.log(error);
    });
  }
}
