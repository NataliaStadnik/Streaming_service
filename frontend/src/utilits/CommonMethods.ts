import { differenceInDays } from "../../node_modules/date-fns/differenceInDays";
import { millisecondsToSeconds } from "../../node_modules/date-fns/millisecondsToSeconds";
import { parseISO } from "../../node_modules/date-fns/parseISO";

export abstract class CommonMethods {
  abstract domELEM: Element;
  abstract getTemplate(): Element;

  removeElement(): void {
    this.domELEM.remove();
  }

  getElement(): Element {
    if (!this.domELEM) {
      this.getTemplate();
    }
    return this.domELEM;
  }

  makeElem(el: string, cls: Array < string > , txt ? : string): HTMLElement {
    const i: HTMLElement = document.createElement(el)
    i.classList.add(...cls)

    if (txt) {
      i.textContent = txt;
    }
    return i;
  }

  getDate(obj: string): number {
    return differenceInDays(
      new Date(),
      parseISO(obj)
    )
  }

  static getTime(duration: number): string {
    const minute = Math.floor(duration / 60);
    const second = Math.floor(duration - (minute * 60));
    return `${minute}:${second < 10 ? `0${second}` : second}`;
  }

  static getDuration(obj: number): string {
    const result = millisecondsToSeconds(obj);
    return CommonMethods.getTime(result);
  }

  workWithUnderWrap(state: number, dotsModal ? : Element): void {
    if (state) {
      const wrap = this.makeElem('div', ['under-wrap']);
      if (dotsModal) {
        wrap.classList.add('under-wrap--trascp');
      }
      document.body.style.overflow = 'hidden';
      document.body.prepend(wrap)

      wrap.addEventListener('click', () => {
        if (dotsModal) {
          dotsModal.remove();
        } else {
          wrap.nextSibling.remove()
        }
        wrap.remove()
        document.body.style.overflow = 'auto';
      })

    } else {
      const wrap = document.getElementsByClassName('under-wrap')[0]
      wrap.remove()
      document.body.style.overflow = 'auto';
    }
  }
}
