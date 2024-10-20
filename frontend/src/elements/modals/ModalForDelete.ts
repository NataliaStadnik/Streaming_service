import { AsideAllLists } from '../../model/AsideAllLists';
import { CommonMethods } from '../../utilits/CommonMethods'
import { Track } from '../../utilits/utilits';
import { resetRange } from '../player/AudioPresenter';

export class ModalForDelete extends CommonMethods {
  domELEM: Element;
  closeBTN: Element;
  deleteBTN:Element
  idList: number;
  obj: Track;

  constructor(state: number, obj: Track) {
    super();
    this.idList = state;
    this.obj = obj;
  }


  getTemplate(): Element {
    const div1 = this.makeElem('div', ['btn-wrap']);
    this.deleteBTN = this.makeElem('button', ['delete-btn'], 'Да');
    this.closeBTN = this.makeElem('button', ['delete-btn', 'delete-btn__grey'], 'Отмена');
    div1.append(this.deleteBTN, this.closeBTN)
    const p = this.makeElem('p', ['delete-title'], 'Удалить из плейлиста');
    const div = this.makeElem('div', ['ask-delete']);
    div.append(p, div1);
    this.domELEM = div;
    return this.domELEM;
  }


  closePopUp(): void {
    this.closeBTN.addEventListener('click', () => {
      this.removeElement();
      this.workWithUnderWrap(0);
    })
  }

  deleteTrack():void {
    this.deleteBTN.addEventListener('click', async() => {
      await AsideAllLists.deleteSong(this.idList, this.obj.id);
      this.removeElement();
      this.workWithUnderWrap(0);
      await resetRange();
      document.getElementsByClassName('player__track-name')[0]?.remove();
    })
  }
}
