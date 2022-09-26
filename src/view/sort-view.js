import AbstractView from '../framework/view/abstract-view.js';
import {sortOptions} from '../data.js';

const createNewSortTemplate = () => `<ul class="sort">
    <li><a href="#" class="sort__button" data-sort-options="${sortOptions.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-options="${sortOptions.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button sort__button--active" data-sort-options="${sortOptions.RATING}">Sort by rating</a></li>
  </ul>`;

export default class SortView extends AbstractView{
  get template() {
    return createNewSortTemplate();
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortOptions);
  };
}
