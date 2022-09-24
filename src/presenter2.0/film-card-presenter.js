import {render, replace, remove} from '../framework/render.js';


export default class FilmCardPresenter {
  #filmCardElement = null;
  #filmsListContainer = null;
  #topRatedList = null;
  #mostCommentedList = null;
  #updateCard = null;

  #popupInfoElement = null;

  #filmData = null;
  #renderType = null;
  #switchSelector = null;

  constructor(filmListContainer, topRatedList, mostCommentedList, updateCard) {
    this.#filmsListContainer = filmListContainer;
    this.#topRatedList = topRatedList;
    this.#mostCommentedList = mostCommentedList;
    this.#updateCard = updateCard;
  }

  init = (filmData, filmCardElement, popupInfoElement, renderType) => {
    this.#switchSelector = {
      'mainList': this.#filmsListContainer.element,
      'topRated': this.#topRatedList.element.querySelector('div'),
      'mostCommented': this.#mostCommentedList.element.querySelector('div')
    };
    const prevFilmCardElement = this.#filmCardElement;

    this.#filmCardElement = filmCardElement;
    this.#popupInfoElement = popupInfoElement;
    this.#filmData = filmData;

    this.#renderType = renderType ? renderType : this.#renderType;

    this.#filmCardElement.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#filmCardElement.setFavoriteClickHandler(this.#handleToFavorites);
    this.#filmCardElement.setAlreadyWatchedClickHandler(this.#handleToAlreadyWatched);

    if (prevFilmCardElement === null) {
      this.#renderFilmCardElement(this.#filmCardElement, this.#renderType);
    } else {
      if (this.#switchSelector[this.#renderType].contains(prevFilmCardElement.element)) {
        replace(this.#filmCardElement, prevFilmCardElement);
      }
    }
    this.#addShowRemovePopupHandlers();
    remove(prevFilmCardElement);
  };

  destroy = () => {
    remove(this.#filmCardElement);
  };

  #addShowRemovePopupHandlers = () => {
    this.#filmCardElement.setClickHandler(() => {
      this.#appendPopup();
      this.#popupInfoElement.setClickHandler(() => {
        this.#removePopup();
      });
    });
  };

  #handleWatchlistClick = () => {
    this.#updateCard({
      ...this.#filmData,
      'filmInfo': {...this.#filmData.filmInfo, 'title': 'watchList!'},
      'user_details': {...this.#filmData.user_details, 'watchlist': !this.#filmData.user_details.watchlist}
    });
  }; ///TO UTILS///

  #handleToFavorites = () => {
    this.#updateCard({
      ...this.#filmData,
      'filmInfo': {...this.#filmData.filmInfo, 'title': 'Favorite!!!'},
      'user_details': {...this.#filmData.user_details, 'favorite': !this.#filmData.user_details.favorite}
    });
  }; ///TO UTILS///

  #handleToAlreadyWatched = () => {
    this.#updateCard({
      ...this.#filmData,
      'filmInfo': {...this.#filmData.filmInfo, 'title': 'already watched('},
      'user_details': {...this.#filmData.user_details, 'alreadyWatched': !this.#filmData.user_details.alreadyWatched}
    });
  }; ///TO UTILS///

  #renderFilmCardElement = (filmCardElement, renderType) => {
    render(filmCardElement, this.#switchSelector[renderType]);
  };

  #appendPopup = () => {
    if (document.body.lastElementChild.className === 'film-details'){//-------------TOFIX я не понимаю как
      document.body.removeChild(document.body.lastElementChild);//-------------TOFIX
    }
    document.body.appendChild(this.#popupInfoElement.element);//-------------TOFIX
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onEscKeyPressed);
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
