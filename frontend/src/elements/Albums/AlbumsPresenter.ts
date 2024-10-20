import { AllPlayLists } from "../../model/AsideAllLists";
import { renderDinamicDOM } from "../../utilits/utilits";
import { WorkWithAibums } from './WorkWithAlbums'
import { FavouriteTracks } from "../../model/FavouriteTracks";
import { Settings } from "../../utilits/Settings";

export class AlbumsPresenter {
  commonList: AllPlayLists[]
  isFavour: boolean;

  constructor(commonList: AllPlayLists[], isFavour?: boolean) {
    this.commonList = commonList;
    this.isFavour = isFavour;
    this.renderAlbums()
  }

  renderAlbums(): void {
    new Settings().onSectionAlbums(0);
    if (this.isFavour) {
      const favouriteList = new FavouriteTracks().getList()
      const template = new WorkWithAibums(1, favouriteList, 'Любимые песни');
      this.createAlbum(template)
    }

    this.commonList.forEach((elem) => {
      const template = new WorkWithAibums(elem.id, elem.songs, elem.name);
      this.createAlbum(template)
    })
  }

  createAlbum(templ: WorkWithAibums): void {
    renderDinamicDOM("playlist__list", templ.getElement());
      templ.clickAlbum();
  }
}
