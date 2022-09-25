import {replace} from '../framework/render.js';
import PopupInfoView from '../view/popup-info-view.js';


export default class PopupPresenter {
  #filmData = null;
  #commentList = null; // Model

  #documentBodyElement = document.body;// Additional vars
  #documentElement = document;// Additional vars

  #handleToFavorites = null;
  #handleToAlreadyWatched = null;
  #handleWatchlistClick = null; // Functions

  #popupElement = null;// Elements

  constructor(handleWatchlistClick, handleToAlreadyWatched, handleToFavorites) {
    this.#handleWatchlistClick = handleWatchlistClick;
    this.#handleToAlreadyWatched = handleToAlreadyWatched;
    this.#handleToFavorites = handleToFavorites;
  }

  init = (filmData, commentsList) => {
    this.#commentList = commentsList;
    this.#filmData = filmData;

    const newPopupElement = this.#createPopupElement();
    if (this.#popupElement !== null) {
      if (this.#documentBodyElement.contains(this.#popupElement.element)) { // если он объявлен и уже в разметке
        replace(newPopupElement, this.#popupElement);
      }
    }

    this.#popupElement = newPopupElement;
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
    this.#documentBodyElement.appendChild(this.#popupElement.element);
    this.#documentBodyElement.classList.add('hide-overflow');
    this.#documentElement.addEventListener('keydown', this.#onEscKeyPressed);
  };

  #removePopup = () => {
    this.#documentBodyElement.removeChild(this.#popupElement.element);
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
