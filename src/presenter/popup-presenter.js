import {remove, replace, render} from '../framework/render.js';
import PopupInfoView from '../view/popup-info-view.js';


export default class PopupPresenter {
  #filmData = null;
  #commentList = null; // Model

  #documentBodyElement = document.body;
  #documentElement = document;// Additional vars

  #handleToFavorites = null;
  #handleToAlreadyWatched = null;
  #handleWatchlistClick = null; // Functions

  #popupComponent = null;// Components

  constructor(handleWatchlistClick, handleToAlreadyWatched, handleToFavorites) {
    this.#handleWatchlistClick = handleWatchlistClick;
    this.#handleToAlreadyWatched = handleToAlreadyWatched;
    this.#handleToFavorites = handleToFavorites;
  }

  init = (filmData, commentsList) => {
    this.#commentList = commentsList;
    this.#filmData = filmData;
    console.log('popup updated');
    const newPopupElement = this.#createPopupElement();
    if (this.#popupComponent !== null) {
      if (this.#documentBodyElement.contains(this.#popupComponent.element)) { // если он объявлен и уже в разметке
        replace(newPopupElement, this.#popupComponent);
      }
    }

    this.#popupComponent = newPopupElement;
  };

  destroy = () => {
    remove(this.#popupComponent);
  };

  #createPopupElement = () => {
    const newPopupElement = new PopupInfoView(this.#commentList, this.#filmData); ///WTF
    newPopupElement.setAlreadyWatchedClickHandler(this.#handleToAlreadyWatched);
    newPopupElement.setFavoriteClickHandler(this.#handleToFavorites);
    newPopupElement.setWatchlistClickHandler(this.#handleWatchlistClick);
    newPopupElement.setClickHandler(() => {
      this.#removePopup();
    });
    return newPopupElement;
  };

  #removePreviousPopup = () => {
    if (this.#documentBodyElement.lastElementChild.className === 'film-details'){
      this.#documentBodyElement.removeChild(document.body.lastElementChild);
    }
  };

  renderPopup = () => {
    this.#removePreviousPopup();
    render(this.#popupComponent, this.#documentBodyElement, 'beforeend');
    this.#documentBodyElement.classList.add('hide-overflow');
    this.#documentElement.addEventListener('keydown', this.#onEscKeyPressed);
  };

  #removePopup = () => {
    remove(this.#popupComponent);
    this.#documentBodyElement.classList.remove('hide-overflow');
    this.#documentElement.removeEventListener('keydown', this.#onEscKeyPressed);
  };

  #onEscKeyPressed = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removePopup();
    }
  };
}
