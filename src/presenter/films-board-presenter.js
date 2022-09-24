import {render} from '../framework/render.js';
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
import FilmPresenter from './film-presenter.js';


export default class FilmsBoardPresenter {
  #filmsModel = null;
  #commentsModel = null; //Model

  #renderedFilms = null;
  #filmsMinimumValue = null;
  #commentList = null;
  #renderedFilmsList = new Map();
  #filmList = null; // Additional vars


  #SITE_MAIN_ELEMENT = document.querySelector('.main');
  #SITE_HEADER_ELEMENT = document.querySelector('header');
  #SITE_FOOTER_ELEMENT = document.querySelector('footer');
  #mostCommentedListElement = null;
  #filmsListContainerElement = null;
  #topRatedListElement = null;
  #sortElement = null;
  #footerElement = null;
  #userRankElement = null;
  #filmListTitle = null;
  #filmCardsListElement = null;
  #filmSectionElement = null;
  #showMoreButton = null;
  #filtersElement = null; // Elements

  init = (filmsModel, commentsModel) => {
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;

    this.#filmList = [...this.#filmsModel.films];
    this.#filmsMinimumValue = Math.min(this.#filmList.length, filmsCounter.mainList);
    this.#commentList = this.#commentsModel.comments;
    this.#renderedFilms = this.#filmsMinimumValue;

    this.#createFrameElements();

    if (this.#filmList.length === 0) { // empty list or normal list ?
      this.#renderEmptyFrameElements();
      return;
    }

    this.#renderNormalFrameElements();// отрисовать основные элементы
    this.#createMainListFilms();// создать карточки основного листа
    this.#createTopRatedListFilms();// создать карточки топ рейтед
    this.#createMostCommentedListFilms();// создать каточки мост комментед

    this.#createShowMoreButton(); // создать кнопку показать еще
  };

  #createFrameElements = () => {
    this.#filtersElement = new FiltersView();
    this.#filmSectionElement = new FilmsSectionView();
    this.#filmCardsListElement = new FilmCardsListView();
    this.#filmListTitle = new ListEmptyView(emptyListOptions.allMovies);
    this.#footerElement = new FooterStatisticsView();

    this.#userRankElement = new UserRankView();
    this.#sortElement = new SortView();
    this.#topRatedListElement = new TopRatedListView();
    this.#mostCommentedListElement = new MostCommentedListView();
    this.#filmsListContainerElement = new FilmsListContainerView();
    this.#showMoreButton = new ButtonShowMoreView();
  };

  #renderEmptyFrameElements = () => {
    render(this.#filtersElement, this.#SITE_MAIN_ELEMENT, 'afterbegin');
    render(this.#filmSectionElement, this.#SITE_MAIN_ELEMENT);
    render(this.#filmCardsListElement, this.#filmSectionElement.element);
    render(this.#filmListTitle, this.#filmCardsListElement.element);

    this.#renderFooterElement();
  };

  #renderNormalFrameElements = () => {
    render(this.#userRankElement, this.#SITE_HEADER_ELEMENT);
    render(this.#filtersElement, this.#SITE_MAIN_ELEMENT, 'afterbegin');
    render(this.#filmSectionElement, this.#SITE_MAIN_ELEMENT);
    render(this.#filmCardsListElement, this.#filmSectionElement.element);
    render(this.#filmsListContainerElement, this.#filmCardsListElement.element);
    render(this.#topRatedListElement, this.#filmSectionElement.element);
    render(this.#mostCommentedListElement, this.#filmSectionElement.element);
    render(this.#sortElement, this.#filmSectionElement.element, 'beforebegin');

    this.#renderFooterElement();
  };

  #createMainListFilms = () => {
    for (let i = 0; i < this.#filmsMinimumValue; i++) {
      this.#createFilm(this.#filmList[i], 'mainList');
    }
  };

  #createTopRatedListFilms = () => {
    for (let i = 0; i < filmsCounter.topRated; i++) {
      this.#createFilm(this.#filmList[i], 'topRated');
    }
  };

  #createMostCommentedListFilms = () => {
    for (let i = 0; i < filmsCounter.mostCommented; i++) {
      this.#createFilm(this.#filmList[i], 'mostCommented');
    }
  };

  #updateFilmData = (newData) => {
    this.#filmList = updateItem(this.#filmList, newData);
    this.#renderedFilmsList.get(newData.id).init(newData);
  };

  #createFilm = (filmData, renderType) => {
    const film = new FilmPresenter(
      this.#commentList,
      this.#filmsListContainerElement,
      this.#topRatedListElement,
      this.#mostCommentedListElement,
      this.#updateFilmData
    );
    film.init(filmData, renderType);
    this.#renderedFilmsList.set(filmData.id, film); //
  };

  #createShowMoreButton = () => {
    if (this.#filmList.length > FILMS_PER_PAGE) {
      render(this.#showMoreButton, this.#filmCardsListElement.element);
      this.#showMoreButton.setClickHandler(this.#renderMoreFilmCards);
    }
  };

  #renderMoreFilmCards = () => {
    const filmsPage = this.#filmList.slice(this.#renderedFilms, this.#renderedFilms + FILMS_PER_PAGE); //определяем какие фильмы отрисовать
    this.#renderedFilms += FILMS_PER_PAGE; // записываем новое число фильмов на странице
    if (this.#renderedFilms >= this.#filmList.length) { // если на странице все фильмы
      this.#filmCardsListElement.element.removeChild(this.#showMoreButton.element); // убираем кнопку "показать больше"
    }
    for (let i = 0; i < filmsPage.length; i++) {
      this.#createFilm(filmsPage[i], 'mainList');
    }
  };

  #renderFooterElement = () => {
    render(this.#footerElement, this.#SITE_FOOTER_ELEMENT.querySelector('.footer__statistics')); ///////////////////FIX////////////////////////
  };

}


