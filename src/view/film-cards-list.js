import {createElement} from '../render.js';

const createNewFilmCardsListTemplate = () => `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container"></div>
</section>`;

export default class NewFilmCardsListView {
  getTemplate() {
    return createNewFilmCardsListTemplate();
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
