import { AsideAllLists } from '../../model/AsideAllLists';
import { CommonMethods } from '../../utilits/CommonMethods'
import { Track } from '../../utilits/utilits';
import { ModalForAdd } from './ModalForAdd';
import { ModalForDelete } from './ModalForDelete';

export class ModalAddorDelete extends CommonMethods {
  domELEM: Element;
  deleteBTN: Element;
  addBTN: Element;
  state: number;
  obj: Track;
  wrap: Element;

  constructor(state: number, obj: Track, wrap: Element) {
    super();
    this.state = state;
    this.obj = obj;
    this.wrap = wrap;
    this.start();
  }

  start(): void {
    this.wrap.append(this.getTemplate());
    this.addClick()
    this.deleteClick()
  }

  getTemplate(): Element {
    this.deleteBTN = this.makeElem('button', ['track__delete-btn'], 'Удалить из плейлиста');
    if (this.state === 0) {
      this.deleteBTN.setAttribute('disabled', 'true')
    }
    this.addBTN = this.makeElem('button', ['track__add-btn'], 'Добавить в плейлист');
    const div = this.makeElem('div', ['track__dropdown']);
    div.append(this.addBTN, this.deleteBTN);
    this.domELEM = div;
    return this.domELEM;
  }


  addClick(): void {
    this.addBTN.addEventListener('click', async() => {
      this.wrap.lastChild.remove()
      this.workWithUnderWrap(0)
      await new AsideAllLists().getNewLists();
      const modal = new ModalForAdd(this.obj, this.state)
      document.body.prepend(modal.getTotalTemplate());
      this.workWithUnderWrap(1)
    })
  }


  deleteClick(): void {
    this.deleteBTN.addEventListener('click', () => {
      this.wrap.lastChild.remove()
      const deletePopUp = new ModalForDelete(this.state, this.obj);
      this.wrap.append(deletePopUp.getTemplate())
      deletePopUp.closePopUp();
      deletePopUp.deleteTrack()
    })
  }
}
