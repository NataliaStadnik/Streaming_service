export type Album = {
  createdAt: string,
  id: number,
  image: string,
  name: string,
}

export type Artist = Album;

export type Track = {
  id: number,
  name: string,
  filename: string,
  path: string,
  image: string,
  duration: number,
  createdAt: string,
  album: Album,
  artist: Artist,
  likes: string[]
}


export function renderDinamicDOM(container: string, elem: Element) {
  const cont = document.getElementsByClassName(container);
  cont[0].append(elem)
}
