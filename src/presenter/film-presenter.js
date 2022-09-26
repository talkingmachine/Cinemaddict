import {remove, render, replace} from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import PopupPresenter from './popup-presenter.js';


export default class FilmPresenter {
  #filmData = null;
  #commentsList = null;
  #renderType = null; // Model

  #updateFilmData = null;
  #isPopupRendered = null;
  #switchSelector = null; // Additional vars

  #filmComponent = null;
  #newPopupPresenter = null;
  #topRatedList = null;
  #mostCommentedList = null;
  #filmsListContainer = null; // Elements

  constructor(commentList, filmListContainer, topRatedList, mostCommentedList, updateFilmData) {
    this.#commentsList = commentList;
    this.#filmsListContainer = filmListContainer;
    this.#topRatedList = topRatedList;
    this.#mostCommentedList = mostCommentedList;
    this.#updateFilmData = updateFilmData;
  }

  init = (filmData, renderType = null) => {
    this.#switchSelector = {
      'mainList': this.#filmsListContainer.element,
      'topRated': this.#topRatedList.element.querySelector('div'),
      'mostCommented': this.#mostCommentedList.element.querySelector('div')
    };
    this.#filmData = filmData;
    this.#renderType = renderType ? renderType : this.#renderType;

    const newFilmElement = this.#createFilmElement(); //                создадим новый образ фильма
    if (this.#filmComponent !== null) { //                                проверим а был ли он уже объявлен
      if (this.#switchSelector[this.#renderType].contains(this.#filmComponent.element)) { // если он объявлен и уже в разметке
        replace(newFilmElement, this.#filmComponent); //                  заменим старый образ на только что созданный
        this.#updatePopup();
      }
    } else { //                                                         если нет
      this.#createPopupPresenter();
      this.#renderFilmElement(newFilmElement); //                       отрисуем новый образ
    }

    this.#filmComponent = newFilmElement; //                              запомним новый образ в переменную класса
  };

  destroy = () => {
    remove(this.#filmComponent);
    this.#newPopupPresenter.destroy();
  };

  #createFilmElement = () => {
    const newFilmElement = new FilmCardView(this.#filmData);
    newFilmElement.setWatchlistClickHandler(this.#handleWatchlistClick);
    newFilmElement.setFavoriteClickHandler(this.#handleToFavorites);
    newFilmElement.setAlreadyWatchedClickHandler(this.#handleToAlreadyWatched);
    newFilmElement.setClickHandler(() => {
      this.#updatePopup();
      this.#newPopupPresenter.renderPopup();
    });

    return newFilmElement;
  };

  #renderFilmElement = (film) => {
    render(film, this.#switchSelector[this.#renderType]);
  };

  #createPopupPresenter = () => { // создание и запоминание попапа
    this.#newPopupPresenter = new PopupPresenter(
      this.#handleWatchlistClick,
      this.#handleToAlreadyWatched,
      this.#handleToFavorites
    );
  };

  #updatePopup = () => { // отрисовка или обновление попапа
    this.#newPopupPresenter.init(this.#commentsList, this.#filmData);
  };

  #handleWatchlistClick = () => {
    this.#updateFilmData({
      ...this.#filmData,
      'filmInfo': {...this.#filmData.filmInfo, 'title': 'watchList!'},
      'user_details': {...this.#filmData.user_details, 'watchlist': !this.#filmData.user_details.watchlist}
    });
  };

  #handleToFavorites = () => {
    this.#updateFilmData({
      ...this.#filmData,
      'filmInfo': {...this.#filmData.filmInfo, 'title': 'Favorite!!!'},
      'user_details': {...this.#filmData.user_details, 'favorite': !this.#filmData.user_details.favorite}
    });
  };

  #handleToAlreadyWatched = () => {
    this.#updateFilmData({
      ...this.#filmData,
      'filmInfo': {...this.#filmData.filmInfo, 'title': 'already watched('},
      'user_details': {...this.#filmData.user_details, 'alreadyWatched': !this.#filmData.user_details.alreadyWatched}
    });
  };

}
