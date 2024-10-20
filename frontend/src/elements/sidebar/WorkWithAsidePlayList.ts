import { AllPlayLists, AsideAllLists } from "../../model/AsideAllLists";
import { CommonMethods } from "../../utilits/CommonMethods";
import { Setting, Settings } from "../../utilits/Settings";

export class WorkWithAsidePlayList extends CommonMethods {
  domELEM: Element
  private elem: AllPlayLists;
  playListBTN: HTMLElement;
  private id: number;

  constructor(elem: AllPlayLists) {
    super()
    this.elem = elem;
    this.id = elem.id;
    this.playListBTN = this.makeElem('button', ['aside__btn'], this.elem.name)
  }


  getTemplate(): Element {
    const li = this.makeElem('li', ['aside__item'])
    li.append(this.playListBTN)
    this.domELEM = li;
    return this.domELEM;
  }


  click(): void {
    this.playListBTN.addEventListener('click', async () => {
      const param: Setting = {
        state: this.id.toString(),
        className:  this.playListBTN,
        onAlbum: 1,
        onTrack: 1,
        title:  this.elem.name
      }
      new Settings().set(param);
      await AsideAllLists.getNewOneList(this.id);
    })
  }
}


