import AbstractView from '../framework/view/abstract-view.js';

const createNewButtonShowMoreTemplate = () => '<button class="films-list__show-more">Show more</button>';

export default class ButtonShowMoreView extends AbstractView {
  get template() {
    return createNewButtonShowMoreTemplate();
  }

  setClickHandler = (callback, classSelector) => {
    this._callback.click = callback;
    if (classSelector) {
      this.element.querySelector(`.${classSelector}`).addEventListener('click', this.#clickHandler);
    } else {
      this.element.addEventListener('click', this.#clickHandler);
    }
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
