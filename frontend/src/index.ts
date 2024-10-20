import './css/style.css'
import { Tracks } from './model/Tracks';
import { AsideAllLists } from './model/AsideAllLists';
import { TracksListPresenter } from './elements/tracksScreen/TracksListPresenter';
import { AsidePlayListPresenter } from './elements/sidebar/AsidePlayListPresenter';
import { FavouriteTracks } from './model/FavouriteTracks';
import { SearchInput } from './elements/search/SearchInput'

const tracks = new Tracks();
const playLists = new AsideAllLists();
const favourite = new FavouriteTracks();

Promise
  .all([
    tracks.updateList(),
    playLists.getNewLists(),
    favourite.updateNewList(),
  ])
  .then(function () {
    new TracksListPresenter(tracks.getList(), 0);
    new AsidePlayListPresenter(playLists.getLists());
    new SearchInput();
  })
