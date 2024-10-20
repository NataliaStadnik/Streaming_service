import { FavouriteTracks } from "../../model/FavouriteTracks";
import { CommonMethods } from "../../utilits/CommonMethods";
import { Setting, Settings } from "../../utilits/Settings";
import { Track } from "../../utilits/utilits";

export class WorkWithAibums extends CommonMethods {
  domELEM: Element;
  private songs: Track[];
  id: number;
  albumLink: HTMLElement;
  name: string;

  constructor(id: number, songs: Track[], name: string) {
    super()
    this.songs = songs;
    this.id = id;
    this.name = name
  }

  getTemplate(): Element {
    const counts = this.songs.length === 0 ? `Нет треков` : `${this.songs.length} треков`
    const li = this.makeElem('li', ['playlist__item']);
    const div1 = this.makeElem('div', ['playlist__content'])
    const h3 = this.makeElem('h3', ['playlist__h3'])
    const span1 = this.makeElem('span', ['playlist__count'], `${counts}`)

    const a = document.createElement('a')
    a.classList.add('playlist__h3__link')
    a.href = '/';
    a.textContent = this.name;
    this.albumLink = a;

    const picture = document.createElement('picture')
    const source1 = document.createElement('source')
    const source2 = document.createElement('source')
    source1.srcset = `assets/img/playlists__360%20(${this.id}).jpg`
    source1.media = '(max-width: 576px)'
    source2.srcset = `assets/img/playlists__1440%20(${this.id}).jpg`
    source2.media = '(max-width: 1440px)'

    const img = document.createElement('img')
    img.classList.add('playlist__img')
    img.src = `assets/img/playlists%20(${this.id}).jpg`;
    img.textContent = this.name

    picture.append(source1, source2, img)
    h3.append(a)
    div1.append(h3, span1)
    li.append(picture, div1)
    this.domELEM = li

    return this.domELEM;
  }

  clickAlbum() {
    this.albumLink.addEventListener('click', (e) => {
      e.preventDefault();
      const allBTN = document.getElementsByClassName('aside__btn');
      const btn: Element = allBTN[this.id + 1];
      const param: Setting = {
        state: this.id.toString(),
        className:  btn,
        onAlbum: 1,
        onTrack: 1,
        title:  this.name
      }
      new Settings().set(param);
      FavouriteTracks.getNewList(this.id);
    })
  }
}

