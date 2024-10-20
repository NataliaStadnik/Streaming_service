import { CommonMethods } from "../../utilits/CommonMethods"
import { Track } from "../../utilits/utilits";
import { AllPlayLists, AsideAllLists } from '../../model/AsideAllLists'

export class ModalForAdd extends CommonMethods {
  domELEM: Element
  totalPlayLists: AllPlayLists[]
  id: number;
  count: number;
  name: string;
  choiceList: Element;
  target: Track;
  totalTemplate: Element;
  closeBtn: Element;
  state: number;

  constructor(target: Track, state: number) {
    super()
    this.target = target;
    this.state = state;
    this.totalPlayLists = AsideAllLists.allPlayLists;
  }

  createModal(): Element {
    const div = this.makeElem('div', ['playlists-modal__playlist_content'])
    this.totalPlayLists.forEach((elem) => {
      this.id = elem.id;
      this.count = elem.songs.length;
      this.name = elem.name
      const template = this.getTemplate();
      div.append(template);
      this.clickToAdd(this.id)
    })
    return div;
  }


  clickToClose(): void {
    this.closeBtn.addEventListener('click', () => {
      this.workWithUnderWrap(0)
      this.totalTemplate.remove()
    })
  }


  clickToAdd(id: number): void {
    this.choiceList.addEventListener('click', async() => {
      const targetID = this.target.id;
      await AsideAllLists.updateSongInList(id, targetID, this.state)
      this.workWithUnderWrap(0);
      this.totalTemplate.remove()
    })
  }


  getTemplate(): Element {
    const text = this.count === 0 ? `Нет треков` : `${this.count} треков`
    const div1 = this.makeElem('div', ['playlists-modal__playlist'])
    this.choiceList = this.makeElem('div', ['playlists-modal__playlist__title'], this.name)
    const div3 = this.makeElem('div', ['playlists-modal__playlist__info'], `${text}`)

    const img = document.createElement('img')
    img.classList.add('playlists-modal__playlist__image')
    img.src = `assets/img/playlists%20(${this.id}).jpg`;
    img.alt = `Album`;

    div1.append(img, this.choiceList, div3)
    this.domELEM = div1;
    return this.domELEM;
  }


  getTotalTemplate(): Element {
    const div: Element = this.createModal()
    const div1 = this.makeElem('div', ['playlists-modal']);
    const div2 = this.makeElem('div', ['playlists-modal__title'], 'Добавить в плейлист');
    const div3 = this.makeElem('div', ['playlists-modal__footer']);
    this.closeBtn = this.makeElem('button', ['playlists-modal__close-btn'], `Отменить`);

    div3.append(this.closeBtn);
    div1.append(div2, div, div3);
    this.totalTemplate = div1;
    this.clickToClose()
    return this.totalTemplate;
  }
}
