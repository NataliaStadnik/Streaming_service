import { Track } from "../../utilits/utilits";
import { CommonMethods } from '../../utilits/CommonMethods'
import { FavouriteTracks } from "../../model/FavouriteTracks";
import { ModalAddorDelete } from '../modals/ModalAddorDelete'
import { Player } from '../player/Player'
import { MyAudio } from '../player/Audio'
import { resetRange } from "../player/AudioPresenter";


export class WorkWithTracks extends CommonMethods {
  domELEM: Element;
  private duration: string;
  private whenToAdd: number;
  private id: number;
  private likes: string[];
  state: number;
  obj: Track;
  index: number;

  constructor(obj: Track, state: number, index:number) {
    super();
    this.id = obj.id
    this.likes = obj.likes;
    this.index = index + 1;
    this.obj = obj;
    this.state = state;
    this.start();
  }

  dotsWrap: Element;
  dotsBTN: Element;
  likeBTN: Element;
  linkPlay: HTMLAnchorElement;


  start() {
    this.duration = CommonMethods.getDuration(this.obj.duration);
    this.whenToAdd = this.getDate(this.obj.createdAt);
    this.getTemplate();
    this.dropClick();
    this.likeClick();
    this.playTrackClick();
  }


  getTemplate(): Element {
    const li = this.makeElem('li', ['tracks__item', 'flex'])
    const div1 = this.makeElem('div', ['tracks__item__number'], this.index.toString())
    const div2 = this.makeElem('div', ['tracks__item__name'])
    const div3 = this.makeElem('div', ['track__content'])
    const h3 = this.makeElem('h3', ['track__name'])
    const span1 = this.makeElem('span', ['track__author'], this.obj.artist.name)
    const div4 = this.makeElem('div', ['tracks__item__albom'], this.obj.album.name)
    const div5 = this.makeElem('div', ['tracks__item__data', 'flex'])
    const span2 = this.makeElem('span', ['data__text'], `${this.whenToAdd} дней назад`)
    const time = this.makeElem('time', ['tracks__item__time'], this.duration)
    this.dotsWrap = this.makeElem('div', ['tracks__item__drop'])

    const img = document.createElement('img')
    img.classList.add('track__img')
    img.src = this.obj.image;
    img.alt = this.obj.name;

    this.linkPlay = document.createElement('a')
    this.linkPlay.classList.add('track__name__link')
    this.linkPlay.textContent = this.obj.name;

    this.likeBTN = this.makeElem('button', ['track__like-btn']);
    if (this.likes.length > 0) {
      this.likeBTN.classList.add('like-btn--active')
    }

    this.likeBTN.insertAdjacentHTML('afterbegin', `<svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.5022 8.2786e-06C14.6291 -0.00149138 13.7677 0.200775 12.9865 0.590718C12.2052 0.980661 11.5258 1.54752 11.0022 2.24621C10.293 1.30266 9.30512 0.606001 8.17823 0.254823C7.05134 -0.0963541 5.84256 -0.0842713 4.72291 0.289363C3.60327 0.662997 2.62948 1.37926 1.93932 2.3368C1.24916 3.29434 0.877596 4.44467 0.877197 5.62501C0.877197 12.3621 10.2373 17.6813 10.6357 17.9044C10.7477 17.9671 10.8739 18 11.0022 18C11.1305 18 11.2567 17.9671 11.3687 17.9044C13.0902 16.8961 14.7059 15.7173 16.1914 14.3856C19.4665 11.438 21.1272 8.49047 21.1272 5.62501C21.1255 4.13368 20.5323 2.70393 19.4778 1.6494C18.4233 0.594873 16.9935 0.00169855 15.5022 8.2786e-06V8.2786e-06Z" fill="#FC6D3E"></path>
                    </svg>`)
    this.dotsBTN = this.makeElem('button', ['track__btn-dropdown']);
    this.dotsBTN.insertAdjacentHTML('afterbegin', `<svg width="23" height="4" viewBox="0 0 23 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="2" cy="2" r="2" fill="#C4C4C4"></circle>
                      <circle cx="11.5" cy="2" r="2" fill="#C4C4C4"></circle>
                      <circle cx="21" cy="2" r="2" fill="#C4C4C4"></circle>
                    </svg>`)

    h3.append(this.linkPlay)
    div3.append(h3, span1)
    div2.append(img, div3)
    div5.append(span2, this.likeBTN)
    this.dotsWrap.append(this.dotsBTN)
    li.append(div1, div2, div4, div5, time, this.dotsWrap)
    this.domELEM = li;
    return this.domELEM;
  }


  likeClick(): void {
    this.likeBTN.addEventListener('click', async () => {
      if (this.likes.length === 0) {
        FavouriteTracks.changeLikeStatus(this.id, 'like', this.state)
      } else {
        FavouriteTracks.changeLikeStatus(this.id, 'unlike', this.state)
      }
    })
  }


  dropClick(): void {
    this.dotsBTN.addEventListener('click', () => {
      const popup = document.getElementsByClassName("track__dropdown");
      const wrap = document.getElementsByClassName('under-wrap');

      if (popup.length) {
        popup[0].remove()
      }
      if (this.dotsBTN.childElementCount === 1) {
        new ModalAddorDelete(this.state, this.obj, this.dotsWrap).getTemplate();
        if (wrap.length !== 0) {
          this.workWithUnderWrap(0, popup[0])
        }
        this.workWithUnderWrap(1, popup[0])
      }
    })
  }


  playTrackClick(): void {
    this.linkPlay.addEventListener('click', async () => {
      await resetRange();
      const ctx = new AudioContext()
      await new MyAudio(this.obj.path, ctx).init();
      new Player(this.obj, this.duration);
    })
  }
}
