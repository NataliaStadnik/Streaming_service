import { changeVolume } from './AudioPresenter';
import { CommonMethods } from '../../utilits/CommonMethods'
import { Track } from '../../utilits/utilits'

export class Player extends CommonMethods {
  domELEM: Element;
  object: Track;
  duration: string;
  playButton = document.getElementById("button-play");

  constructor(obj: Track, duration: string) {
    super();
    this.object = obj;
    this.duration = duration;
    this.addTemplate();
    this.setThumb();
  }

  addTemplate(): void {
    this.clearPlayer()
    const wrap = document.getElementsByClassName('player');
    wrap[0].prepend(this.getTemplate());
    const endTime = document.getElementsByClassName('player__time-end');
    endTime[0].textContent = this.duration;
  }

  clearPlayer():void {
    const datas = document.getElementsByClassName('player__track-name');
    if (datas.length === 1) {
      datas[0].remove();
    }
  }

  getTemplate(): Element {
    const div = this.makeElem('div', ['player__track-name', 'flex']);
    const div1 = this.makeElem('div', ['player__track-name__content']);
    const div2 = this.makeElem('div', ['flex', 'player__name__header']);
    const h3 = this.makeElem('h3', ['player__track__h3'], this.object.name);
    const btn = document.createElement('button')
    const p = this.makeElem('p', ['player__track__author'], this.object.artist.name);

    const img = document.createElement('img')
    img.classList.add('player__track__img')
    img.src = this.object.image;
    img.alt = `${this.object.name} - ${this.object.artist.name}`;

    btn.insertAdjacentHTML('afterbegin', `<svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.5022 8.2786e-06C14.6291 -0.00149138 13.7677 0.200775 12.9865 0.590718C12.2052 0.980661 11.5258 1.54752 11.0022 2.24621C10.293 1.30266 9.30512 0.606001 8.17823 0.254823C7.05134 -0.0963541 5.84256 -0.0842713 4.72291 0.289363C3.60327 0.662997 2.62948 1.37926 1.93932 2.3368C1.24916 3.29434 0.877596 4.44467 0.877197 5.62501C0.877197 12.3621 10.2373 17.6813 10.6357 17.9044C10.7477 17.9671 10.8739 18 11.0022 18C11.1305 18 11.2567 17.9671 11.3687 17.9044C13.0902 16.8961 14.7059 15.7173 16.1914 14.3856C19.4665 11.438 21.1272 8.49047 21.1272 5.62501C21.1255 4.13368 20.5323 2.70393 19.4778 1.6494C18.4233 0.594873 16.9935 0.00169855 15.5022 8.2786e-06V8.2786e-06Z" fill="#FC6D3E"></path>
                </svg>`);

    if (this.object.likes.length > 0) {
      btn.classList.add('player__track__like');
    } else {
      btn.classList.add('player__track__unlike');
    }
    div2.append(h3, btn);
    div1.append(div2, p);
    div.append(img, div1);
    this.domELEM = div;
    return this.domELEM;
  }


  setThumb(): void {
    const sliderVolume: HTMLInputElement = document.getElementsByClassName('slider')[1] as HTMLInputElement;
    const thumb = document.getElementsByClassName('thumb')[0] as HTMLHtmlElement;
    thumb.onmousedown = function(event) {
      event.preventDefault();
      const shiftX = event.clientX - thumb.getBoundingClientRect().left;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

      function onMouseMove(event: { clientX: number; }) {

        let newLeft = event.clientX - shiftX - sliderVolume.getBoundingClientRect().left;
        if (newLeft < 0) {
          newLeft = 0;
        }
        const rightEdge = sliderVolume.offsetWidth;
        changeVolume(rightEdge, newLeft)

        if (newLeft > rightEdge) {
          newLeft = rightEdge;
        }
        thumb.style.left = newLeft + 'px';
      }

      function onMouseUp() {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
      }
    };

    thumb.ondragstart = function() {
      return false;
    };
  }
}
