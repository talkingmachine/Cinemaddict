import {render, replace, remove} from '../framework/render.js';
import PopupInfoView from '../view/popup-info-view.js';


export default class PopupPresenter {
  #filmData = null;
  #commentList = null; // Model

  #DOCUMENT_BODY_ELEMENT = document.body;// Additional vars
  #DOCUMENT_ELEMENT = document;// Additional vars

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
      if (this.#DOCUMENT_BODY_ELEMENT.contains(this.#popupElement.element)) { // если он объявлен и уже в разметке
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
    if (this.#DOCUMENT_BODY_ELEMENT.lastElementChild.className === 'film-details'){
      this.#DOCUMENT_BODY_ELEMENT.removeChild(document.body.lastElementChild);
    }
  };

  renderPopup = () => {
    this.#removePreviousPopup();
    this.#DOCUMENT_BODY_ELEMENT.appendChild(this.#popupElement.element);
    this.#DOCUMENT_BODY_ELEMENT.classList.add('hide-overflow');
    this.#DOCUMENT_ELEMENT.addEventListener('keydown', this.#onEscKeyPressed);
  };

  #removePopup = () => {
    this.#DOCUMENT_BODY_ELEMENT.removeChild(this.#popupElement.element);
    this.#DOCUMENT_BODY_ELEMENT.classList.remove('hide-overflow');
    this.#DOCUMENT_ELEMENT.removeEventListener('keydown', this.#onEscKeyPressed);
  };

  #onEscKeyPressed = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removePopup();
    }
  };
}
