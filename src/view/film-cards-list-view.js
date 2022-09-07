import {createElement} from '../render.js';

const createNewFilmCardsListTemplate = () => `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container"></div>
</section>`;

export default class FilmCardsListView {
  #element = null;

  get template() {
    return createNewFilmCardsListTemplate();
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
