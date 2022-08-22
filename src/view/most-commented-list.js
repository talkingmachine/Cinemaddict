import {createElement} from '../render.js';

const createNewMostCommentedListTemplate = () => `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container"></div>
    </section>`;

export default class NewMostCommentedListView {
  getTemplate() {
    return createNewMostCommentedListTemplate()
  }
  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate())
    }
    return this.element;
  }
  removeElement() {
    this.element = null;
  }
}
