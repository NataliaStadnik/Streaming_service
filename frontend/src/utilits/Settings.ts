export interface Setting {
  state: string,
  className: Element,
  onAlbum: number,
  onTrack: number,
  title: string
}

export class Settings {

  constructor() {}

  set(param: Setting): void {
    document.body.dataset.state = param.state;
    this.clearSearch();
    this.clearList();
    this.changeClassOnClick(param.className);
    this.onSectionAlbums(param.onAlbum);
    this.onSectionTracks(param.onTrack);
    this.setTitile(param.title);
  }


  clearSearch(): void {
    const search = document.getElementsByClassName('header__search__field')[0] as HTMLInputElement;
    search.value = '';
  }

  changeClassOnClick(className: Element): void {
    const btnActive = document.getElementsByClassName('aside__btn-active')
    btnActive[0].classList.toggle('aside__btn-active')
    className.classList.toggle('aside__btn-active')
  }


  onSectionTracks(i: number): void {
    const screenTracks = document.getElementsByClassName('tracks')[0]
    if (i) {
      screenTracks.classList.add('section--active')
    } else {
      screenTracks.classList.remove('section--active')
    }
  }


  onSectionAlbums(i: number): void {
    const screenTracks = document.getElementsByClassName('playlist')[0]
    if (i) {
      screenTracks.classList.add('tabs-content')
    } else {
      screenTracks.classList.remove('tabs-content')
    }
  }


  setTitile(text: string): void {
    const h2 = document.getElementById('change-title');
    if (h2) {
      h2.textContent = text;
    }
  }

  clearList(): void {
    const lst1 = document.getElementsByClassName('tracks__list');
    while (lst1[0].firstChild) {
      lst1[0].removeChild(lst1[0].firstChild)
    }

    const lst2 = document.getElementsByClassName('playlist__list');
    while (lst2[0].firstChild) {
      lst2[0].removeChild(lst2[0].firstChild)
    }
  }
}
