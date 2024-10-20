import { AllPlayLists, AsideAllLists } from '../../model/AsideAllLists';
import { Tracks } from '../../model/Tracks';
import { OneListPresenter } from './OneListPresenter'
import { FavouriteTracks } from '../../model/FavouriteTracks'
import { AlbumsPresenter } from '../Albums/AlbumsPresenter'
import { Setting, Settings } from '../../utilits/Settings';


export class AsidePlayListPresenter {
  lists: AllPlayLists[];
  oneList: string[];

  constructor(lists: AllPlayLists[]) {
    this.lists = lists;
    this.renderPlayLists()
    this.isClickAllTracks()
    this.isClickFavourite()
    this.isClickAlbums()
  }


  renderPlayLists(): void {
    this.lists.forEach((elem) => {
      new OneListPresenter(elem);
    })
  }

  isClickAllTracks(): void {
    const buttonAllTracks = document.getElementById('all-tracks');
    buttonAllTracks.addEventListener('click', async () => {
      const param: Setting = {
        state: '0',
        className:  buttonAllTracks,
        onAlbum: 1,
        onTrack: 1,
        title:  'Треки'
      }
      new Settings().set(param);
      await Tracks.getNewList(0);
    })
  }


  isClickFavourite(): void {
    const buttonFavourite = document.getElementById('favourite');
    buttonFavourite.addEventListener('click', async() => {
      const param: Setting = {
        state: '1',
        className:  buttonFavourite,
        onAlbum: 1,
        onTrack: 1,
        title:  'Любимые песни'
      }
      new Settings().set(param);
      await FavouriteTracks.getNewList(1)
    })
  }

  isClickAlbums(): void {
    const buttonAlbums = document.getElementById('play-lists');
    buttonAlbums.addEventListener('click', async () => {
      const param: Setting = {
        state: 'albums',
        className:  buttonAlbums,
        onAlbum: 0,
        onTrack: 0,
        title: ''
      }
      const lst = new AsideAllLists();
      await lst.getNewLists()
      new Settings().set(param);
      new AlbumsPresenter(lst.getLists(), true)
    })
  }
}
