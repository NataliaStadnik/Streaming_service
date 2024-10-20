import { Track } from '../../utilits/utilits';
import { Tracks } from '../../model/Tracks'
import { FavouriteTracks } from '../../model/FavouriteTracks';
import { AllPlayLists, AsideAllLists } from '../../model/AsideAllLists';
import { TracksListPresenter } from '../tracksScreen/TracksListPresenter';
import { AlbumsPresenter } from '../Albums/AlbumsPresenter';


export class SearchInput {
  data: Track[];
  state: string;
  albums: AllPlayLists[]
  search = document.getElementsByClassName('header__search__field')[0] as HTMLInputElement;

  constructor() {
    this.searchClick();
  }

  getData(): void {
    if (this.state === '0') {
      this.data = new Tracks().getList()
    } else if (this.state === '1') {
      this.data = new FavouriteTracks().getList()
    } else if (this.state === 'albums') {
      this.albums = new AsideAllLists().getLists()
    } else {
      this.data = AsideAllLists.oneList
    }
  }


  searchClick(): void {
    this.search.addEventListener('click', () => {
      this.state  = document.body.dataset.state;
      this.getData();
      if (this.state === 'albums') {
        this.startSearchAlbums();
      } else {
        this.startSearchTracks();
      }
    })
  }


  startSearchAlbums():void {
    this.search.addEventListener('input', () => {
      const startList: AllPlayLists[] = this.albums;
      const newList: AllPlayLists[] = [];
      const text = this.search.value.toLowerCase();

      startList.forEach((obj) => {
        if (obj.name.toLowerCase().includes(text)) {
          newList.push(obj);
        }
      })

      if ('Любимые песни'.toLowerCase().includes(text)) {
        new AlbumsPresenter(newList, true)
      } else {
        new AlbumsPresenter(newList);
      }
    })
  }

  startSearchTracks(): void {
    this.search.addEventListener('input', () => {
      const startList: Track[] = this.data;
      const newList: Track[] = [];
      const text = this.search.value.toLowerCase();

      startList.forEach((obj) => {
        if (
          obj.album.name.toLowerCase().includes(text) ||
          obj.name.toLowerCase().includes(text) ||
          obj.artist.name.toLowerCase().includes(text)
        ) {
          newList.push(obj);
          }
        })
      new TracksListPresenter(newList, parseInt(this.state));
    })
  }
}
