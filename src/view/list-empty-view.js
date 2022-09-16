import AbstractView from '../framework/view/abstract-view.js';

const createListEmptyTemplate = (sectionComment) => `<h2 class="films-list__title">${sectionComment}</h2>`;

export default class ListEmptyView extends AbstractView{
  #sectionComment = null;

  constructor(sectionComment) {
    super();
    this.#sectionComment = sectionComment;
  }

  get template() {
    return createListEmptyTemplate(this.#sectionComment);
  }
}
