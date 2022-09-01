import {createElement} from '../render.js';

const createNewFilmsSectionTemplate = () => '<section class="films"></section>';

export default class FilmsSectionView {
  getTemplate() {
    return createNewFilmsSectionTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
