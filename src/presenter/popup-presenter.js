import {replace, remove} from '../framework/render.js';


export default class PopupPresenter {
  #commentList = null;

  #popupInfoElement = null;
  #filmCardElement = null;
  #updateCard = null;

  #filmData = null;

  constructor(commentList, updateCard) {
    this.#commentList = commentList;
    this.#updateCard = updateCard;
  }

  init = (filmData, filmCardElement, popupInfoElement) => {
    const prevPopupInfoElement = this.#popupInfoElement;
    this.#filmCardElement = filmCardElement;
    this.#popupInfoElement = popupInfoElement;
    this.#filmData = filmData;

    this.#popupInfoElement.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#popupInfoElement.setFavoriteClickHandler(this.#handleToFavorites);
    this.#popupInfoElement.setAlreadyWatchedClickHandler(this.#handleToAlreadyWatched);

    if (prevPopupInfoElement !== null) {
      if (document.contains(prevPopupInfoElement.element)) {
        replace(this.#popupInfoElement, prevPopupInfoElement);
      }
    }

    this.#popupInfoElement.setClickHandler(() => {
      this.#removePopup();
    });
    remove(prevPopupInfoElement);
  };

  destroy = () => {
    remove(this.#popupInfoElement);
  };

  #handleWatchlistClick = () => {
    this.#updateCard({
      ...this.#filmData,
      'filmInfo': {...this.#filmData.filmInfo, 'title': 'watchList!'},
      'user_details': {...this.#filmData.user_details, 'watchlist': !this.#filmData.user_details.watchlist}
    });
  };

  #handleToFavorites = () => {
    this.#updateCard({
      ...this.#filmData,
      'filmInfo': {...this.#filmData.filmInfo, 'title': 'Favorite!!!'},
      'user_details': {...this.#filmData.user_details, 'favorite': !this.#filmData.user_details.favorite}
    });
  };

  #handleToAlreadyWatched = () => {
    this.#updateCard({
      ...this.#filmData,
      'filmInfo': {...this.#filmData.filmInfo, 'title': 'already watched('},
      'user_details': {...this.#filmData.user_details, 'alreadyWatched': !this.#filmData.user_details.alreadyWatched}
    });
  };

  #removePopup = () => {
    document.body.removeChild(this.#popupInfoElement.element);
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onEscKeyPressed);
  };

  #onEscKeyPressed = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removePopup();
    }
  }; ///POPUP///
}
