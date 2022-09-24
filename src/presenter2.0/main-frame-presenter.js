import {render, remove} from '../framework/render.js';
import UserRankView from '../view/user-rank-view.js';
import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import FilmsSectionView from '../view/films-section-view.js';
import FilmCardsListView from '../view/film-cards-list-view.js';
import ButtonShowMoreView from '../view/button-show-more-view.js';
import TopRatedListView from '../view/top-rated-list-view.js';
import MostCommentedListView from '../view/most-commented-list-view.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import {filmsCounter, FILMS_PER_PAGE, emptyListOptions} from '../data.js';
import {updateItem} from '../utils/update-item.js';
import FilmCardPresenter from './film-card-presenter.js';
import PopupPresenter from './popup-presenter.js';
import PopupInfoView from '../view/popup-info-view.js';
import FilmCardView from '../view/film-card-view.js';


export default class MainFramePresenter {
  #commentsModel = null;
  #filmsModel = null;
  #filmList = null;
  #commentList = null;
  #renderedFilms = null;

  #topRatedListElement = null;
  #mostCommentedListElement = null;
  #filmsElement = null;
  #filmsListElement = null;
  #filmsListContainerElement = null;
  #userRankElement = null;
  #filtersElement = null;
  #showMoreButton = null;

  #filmsPresenterList = new Map();

  init = (filmsModel, commentsModel) => {
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filmList = [...this.#filmsModel.films];
    this.#commentList = this.#commentsModel.comments;
    this.#renderedFilms = 0;

    const siteMainElement = document.querySelector('.main');
    const siteHeaderElement = document.querySelector('header');

    this.#filmsElement = new FilmsSectionView();
    this.#filmsListElement = new FilmCardsListView();
    this.#topRatedListElement = new TopRatedListView();
    this.#mostCommentedListElement = new MostCommentedListView();
    this.#filmsListContainerElement = new FilmsListContainerView();
    this.#showMoreButton = new ButtonShowMoreView();

    this.#userRankElement = new UserRankView();
    this.#filtersElement = new FiltersView();

    render(this.#userRankElement, siteHeaderElement);
    render(this.#filtersElement, siteMainElement, 'afterbegin');
    render(this.#filmsElement, siteMainElement);
    render(this.#filmsListElement, this.#filmsElement.element);
    this.#renderFooterStatistics();

    if (!this.#filmList.length) {
      this.#renderEmptyList();
    } else {
      this.#renderFilmsList();
      this.#renderStartFilmCards();
      this.#renderShowMoreButton();
    }
  };

  #updateCard = (newCard) => {
    this.#filmList = updateItem(this.#filmList, newCard);

    const filmCard = new FilmCardView(newCard);
    const popupInfo = new PopupInfoView(newCard, this.#commentList);

    this.#filmsPresenterList.get(newCard.id)[0].init(newCard, filmCard, popupInfo);
    this.#filmsPresenterList.get(newCard.id)[1].init(newCard, filmCard, popupInfo);
  };

  #renderEmptyList = () => {
    render(new ListEmptyView(emptyListOptions.allMovies), this.#filmsListElement.element);
  };

  #renderFilmsList = () => {
    render(new SortView(), this.#filmsElement.element, 'beforebegin');
    render(this.#filmsListContainerElement, this.#filmsListElement.element);
    render(this.#topRatedListElement, this.#filmsElement.element);
    render(this.#mostCommentedListElement, this.#filmsElement.element);
  };

  #renderStartFilmCards = () => {
    for (let i = Math.min(this.#filmList.length, filmsCounter.topRated); i > 0; i--) {
      this.#renderFilmsPopups(this.#filmList[i], 'topRated');
    }
    for (let i = 0; i < Math.min(this.#filmList.length, filmsCounter.mostCommented); i++) {
      this.#renderFilmsPopups(this.#filmList[i], 'mostCommented');
    }
  }; // fish

  #renderMoreFilmCards = () => {
    const filmsPage = this.#filmList.slice(this.#renderedFilms, this.#renderedFilms + FILMS_PER_PAGE); //определяем какие фильмы отрисовать
    this.#renderedFilms += FILMS_PER_PAGE; // записываем новое число фильмов на странице
    if (this.#renderedFilms >= this.#filmList.length) { // если на странице все фильмы
      this.#filmsListElement.element.removeChild(this.#showMoreButton.element); // убираем кнопку "показать больше"
    }
    for (let i = 0; i < filmsPage.length; i++) { // отрисуем слайс с нужными фильмами
      this.#renderFilmsPopups(filmsPage[i], 'mainList');
    }
  };

  #renderShowMoreButton = () => {
    if (this.#filmList.length > FILMS_PER_PAGE) {
      render(this.#showMoreButton, this.#filmsListElement.element);
      this.#showMoreButton.setClickHandler(this.#renderMoreFilmCards);
    }
    this.#renderMoreFilmCards();
  };

  #renderFilmsPopups = (filmData, renderType = undefined) => {
    const filmCardPresenter = new FilmCardPresenter(
      this.#filmsListContainerElement,
      this.#topRatedListElement,
      this.#mostCommentedListElement,
      this.#updateCard
    );
    const popupPresenter = new PopupPresenter(
      this.#commentList,
      this.#updateCard
    );

    const filmCard = new FilmCardView(filmData);
    const popupInfo = new PopupInfoView(filmData, this.#commentList);

    this.#filmsPresenterList.set(filmData.id, [filmCardPresenter, popupPresenter]); // filmsPopupsPresenter
    filmCardPresenter.init(filmData, filmCard, popupInfo, renderType);
    popupPresenter.init(filmData, filmCard, popupInfo);
  };

  #clearFilmsPopupsList = () => {
    this.#filmsPresenterList.forEach((presenter) => presenter.destroy());
    this.#filmsPresenterList.clear();
    this.#renderedFilms = FILMS_PER_PAGE;
    remove(this.#showMoreButton);
  };

  #renderFooterStatistics = () => {
    const siteFooterElement = document.querySelector('footer');
    render(new FooterStatisticsView(), siteFooterElement.querySelector('.footer__statistics'));
  };
}


