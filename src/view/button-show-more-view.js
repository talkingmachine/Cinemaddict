import {createElement} from '../render.js';
import AbstractView from '../framework/view/abstract-view.js';

const createNewButtonShowMoreTemplate = () => '<button class="films-list__show-more">Show more</button>';

export default class ButtonShowMoreView {
  #element = null;

  get template() {
    return createNewButtonShowMoreTemplate();
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
