import {render, replace, remove} from '../framework/render.js';
import PopupInfoView from '../view/popup-info-view.js';
import FilmCardView from '../view/film-card-view.js';


export default class FilmsPopupsPresenter {
  #commentList = null;

  #popupInfoElement = null;
  #filmCardElement = null;
  #filmsListContainer = null;
  #topRatedList = null;
  #mostCommentedList = null;
  #updateCard = null;

  #filmData = null;
  #renderType = null;
  #switchSelector = null;

  constructor(commentList, filmListContainer, topRatedList, mostCommentedList, updateCard) {
    this.#commentList = commentList;
    this.#filmsListContainer = filmListContainer;
    this.#topRatedList = topRatedList;
    this.#mostCommentedList = mostCommentedList;
    this.#updateCard = updateCard;
  }

  init = (filmData, renderType) => {
    this.#switchSelector = {
      'mainList': this.#filmsListContainer.element,
      'topRated': this.#topRatedList.element.querySelector('div'),
      'mostCommented': this.#mostCommentedList.element.querySelector('div')
    };

    const prevPopupInfoElement = this.#popupInfoElement; ///POPUP///
    const prevFilmCardElement = this.#filmCardElement;

    this.#filmData = filmData;
    if (!this.#renderType) {
      this.#renderType = renderType;
    }

    this.#popupInfoElement = new PopupInfoView(this.#filmData, this.#commentList); ///POPUP///
    this.#filmCardElement = new FilmCardView(this.#filmData);

    this.#filmCardElement.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#filmCardElement.setFavoriteClickHandler(this.#handleToFavorites);
    this.#filmCardElement.setAlreadyWatchedClickHandler(this.#handleToAlreadyWatched);

    this.#popupInfoElement.setWatchlistClickHandler(this.#handleWatchlistClick); ///POPUP///
    this.#popupInfoElement.setFavoriteClickHandler(this.#handleToFavorites); ///POPUP///
    this.#popupInfoElement.setAlreadyWatchedClickHandler(this.#handleToAlreadyWatched); ///POPUP///

    if (prevPopupInfoElement === null || prevFilmCardElement === null) {
      this.#renderFilmCardElement(this.#filmCardElement, this.#renderType);
    } else {
      if (this.#switchSelector[this.#renderType].contains(prevFilmCardElement.element)) {
        replace(this.#filmCardElement, prevFilmCardElement);
      }
      if (document.contains(prevPopupInfoElement.element)) {
        replace(this.#popupInfoElement, prevPopupInfoElement);
      }
    }

    this.#filmCardElement.setClickHandler(() => {
      this.#appendPopup();
      this.#popupInfoElement.setClickHandler(() => {
        this.#removePopup();
      });
    });

    //console.log(this.#filmData);
    remove(prevPopupInfoElement);
    remove(prevFilmCardElement);
  };

  destroy = () => {
    remove(this.#popupInfoElement);
    remove(this.#filmCardElement);
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

  #renderFilmCardElement = (filmCardElement, renderType) => {
    //console.log(filmCardElement, renderType);
    render(filmCardElement, this.#switchSelector[renderType]);
  };

  #removePopup = () => {
    document.body.removeChild(this.#popupInfoElement.element);
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onEscKeyPressed);
  };

  #appendPopup = () => {
    document.body.appendChild(this.#popupInfoElement.element);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onEscKeyPressed);
  };

  #onEscKeyPressed = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removePopup();
    }
  };
}
