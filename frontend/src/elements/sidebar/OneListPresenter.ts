import { AllPlayLists } from "../../model/AsideAllLists";
import { renderDinamicDOM } from "../../utilits/utilits";
import { WorkWithAsidePlayList } from "./WorkWithAsidePlayList";

export class OneListPresenter {
  elem: AllPlayLists

  constructor(elem: AllPlayLists) {
    this.elem = elem;
    this.render();
  }

  render(): void {
    const inst = new WorkWithAsidePlayList(this.elem);
    renderDinamicDOM("aside__list", inst.getElement())
    inst.click()
  }
}
