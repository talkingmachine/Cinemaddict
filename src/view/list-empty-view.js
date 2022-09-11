import {createElement} from '../render.js';

const createListEmptyTemplate = (sectionComment) => `<h2 class="films-list__title">${sectionComment}</h2>`;

export default class ListEmptyView {
  #sectionComment = null;
  #element = null;

  constructor(sectionComment) {
    this.#sectionComment = sectionComment;
  }

  get template() {
    return createListEmptyTemplate(this.#sectionComment);
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
