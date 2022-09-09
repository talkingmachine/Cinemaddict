import {createElement} from '../render.js';

const createNewFilmsSectionTemplate = () => '<section class="films"></section>';

export default class FilmsSectionView {
  #element = null;

  get template() {
    return createNewFilmsSectionTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
