import {createElement} from '../render.js';

const createNewFooterStatisticsTemplate = () => '<p>130 291 movies inside</p>';

export default class FooterStatisticsView {
  #element = null;

  get template() {
    return createNewFooterStatisticsTemplate();
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
