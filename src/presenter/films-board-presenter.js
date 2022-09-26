import {remove, render} from '../framework/render.js';
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
import {filmsCounter, FILMS_PER_PAGE, emptyListOptions, sortOptions} from '../data.js';
import {updateItem} from '../utils/update-item.js';
import FilmPresenter from './film-presenter.js';
import {sortByDate, sortByRating} from '../utils/sort.js';


export default class FilmsBoardPresenter {
  #filmsModel = null;
  #commentsModel = null; //Model

  #renderedFilmsCounter = null;
  #filmsMinimumValue = null;
  #commentList = null;
  #sourcedFilmList = null;
  #currentSortType = null;
  #renderedFilmsList = new Map();
  #filmList = null; // Additional vars


  #siteMainComponent = document.querySelector('.main');
  #siteHeaderComponent = document.querySelector('header');
  #siteFooterComponent = document.querySelector('footer');
  #mostCommentedListComponent = null;
  #filmsListContainerComponent = null;
  #topRatedListComponent = null;
  #sortComponent = null;
  #footerComponent = null;
  #userRankComponent = null;
  #filmListTitleComponent = null;
  #filmCardsListComponent = null;
  #filmSectionComponent = null;
  #showMoreButtonComponent = null;
  #filtersComponent = null; // Components

  init = (filmsModel, commentsModel) => {
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;

    this.#filmList = [...this.#filmsModel.films];
    this.#sourcedFilmList = [...this.#filmsModel.films];
    this.#filmsMinimumValue = Math.min(this.#filmList.length, filmsCounter.mainList);
    this.#commentList = this.#commentsModel.comments;

    this.#currentSortType = sortOptions.DEFAULT;
    this.#renderedFilmsCounter = 0;

    this.#createFrameElements();

    if (this.#filmList.length === 0) { // empty list or normal list ?
      this.#renderEmptyFrameElements();
      return;
    }

    this.#renderNormalFrameElements();//            отрисовать основные элементы
    this.#renderMoreFilmCards();//                  создать карточки основного листа
    this.#createTopRatedListFilms();//              создать карточки топ рейтед
    this.#createMostCommentedListFilms();//         создать каточки мост комментед

    this.#createShowMoreButton(); // создать кнопку показать еще
  };

  #sortFilms = (sortType) => {
    switch (sortType) {
      case sortOptions.DATE:
        this.#filmList.sort(sortByDate);
        break;
      case sortOptions.RATING:
        this.#filmList.sort(sortByRating);
        break;
      default:
        this.#filmList = [...this.#sourcedFilmList];
    }

    this.#currentSortType = sortType;
  };

  #removeMainListFilms = () => {
    this.#renderedFilmsList.forEach((film) => film.destroy());
    this.#renderedFilmsList.clear();
    this.#renderedFilmsCounter = 0;
    remove(this.#showMoreButtonComponent);
  };

  #handleSortTypeChange = (sortType) => {
    this.#sortFilms(sortType);
    this.#removeMainListFilms();
    this.#renderMoreFilmCards();
    this.#createShowMoreButton();
  };

  #renderSortElement = () => {
    render(this.#sortComponent, this.#filmSectionComponent.element, 'beforebegin');
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #createFrameElements = () => {
    this.#filtersComponent = new FiltersView();
    this.#filmSectionComponent = new FilmsSectionView();
    this.#filmCardsListComponent = new FilmCardsListView();
    this.#filmListTitleComponent = new ListEmptyView(emptyListOptions.allMovies);
    this.#footerComponent = new FooterStatisticsView();

    this.#userRankComponent = new UserRankView();
    this.#sortComponent = new SortView();
    this.#topRatedListComponent = new TopRatedListView();
    this.#mostCommentedListComponent = new MostCommentedListView();
    this.#filmsListContainerComponent = new FilmsListContainerView();
    this.#showMoreButtonComponent = new ButtonShowMoreView();
  };

  #renderEmptyFrameElements = () => {
    render(this.#filtersComponent, this.#siteMainComponent, 'afterbegin');
    render(this.#filmSectionComponent, this.#siteMainComponent, 'beforeend');
    render(this.#filmCardsListComponent, this.#filmSectionComponent.element, 'beforeend');
    render(this.#filmListTitleComponent, this.#filmCardsListComponent.element, 'beforeend');

    this.#renderFooterElement();
  };

  #renderNormalFrameElements = () => {
    render(this.#userRankComponent, this.#siteHeaderComponent, 'beforeend');
    render(this.#filtersComponent, this.#siteMainComponent, 'afterbegin');
    render(this.#filmSectionComponent, this.#siteMainComponent, 'beforeend');
    render(this.#filmCardsListComponent, this.#filmSectionComponent.element, 'beforeend');
    render(this.#filmsListContainerComponent, this.#filmCardsListComponent.element, 'beforeend');
    render(this.#topRatedListComponent, this.#filmSectionComponent.element, 'beforeend');
    render(this.#mostCommentedListComponent, this.#filmSectionComponent.element, 'beforeend');
    this.#renderSortElement();
    this.#renderFooterElement();
  };

  #createTopRatedListFilms = () => {
    // for (let i = this.#filmList; i < filmsCounter.topRated; i++) {
    //   this.#createFilm(this.#filmList[i], 'topRated');
    // }
    this.#createFilm(this.#filmList[this.#filmList.length - 1], 'topRated');
    this.#createFilm(this.#filmList[this.#filmList.length - 2], 'topRated');
  };

  #createMostCommentedListFilms = () => {
    // for (let i = 0; i < filmsCounter.mostCommented; i++) {
    //   this.#createFilm(this.#filmList[i], 'mostCommented');
    // }
    this.#createFilm(this.#filmList[this.#filmList.length - 3], 'mostCommented');
    this.#createFilm(this.#filmList[this.#filmList.length - 4], 'mostCommented');
  };

  #updateFilmData = (newData) => {
    this.#filmList = updateItem(this.#filmList, newData);
    this.#sourcedFilmList = updateItem(this.#filmList, newData);
    this.#renderedFilmsList.get(newData.id).init(newData);
  };

  #createFilm = (filmData, renderType) => {
    const film = new FilmPresenter(
      this.#commentList,
      this.#filmsListContainerComponent,
      this.#topRatedListComponent,
      this.#mostCommentedListComponent,
      this.#updateFilmData
    );
    film.init(filmData, renderType);
    this.#renderedFilmsList.set(filmData.id, film); //
  };

  #createShowMoreButton = () => {
    if (this.#filmList.length > FILMS_PER_PAGE) {
      render(this.#showMoreButtonComponent, this.#filmCardsListComponent.element, 'beforeend');
      this.#showMoreButtonComponent.setClickHandler(this.#renderMoreFilmCards);
    }
  };

  #renderMoreFilmCards = () => {
    const filmsPage = this.#filmList.slice(this.#renderedFilmsCounter, this.#renderedFilmsCounter + FILMS_PER_PAGE); //определяем какие фильмы отрисовать
    this.#renderedFilmsCounter += FILMS_PER_PAGE; //                                                                    записываем новое число фильмов на странице
    if (this.#renderedFilmsCounter >= this.#filmList.length && this.#filmCardsListComponent.element.lastChild === this.#showMoreButtonComponent.element) { // если на странице все фильмы
      this.#filmCardsListComponent.element.removeChild(this.#showMoreButtonComponent.element); //                        убираем кнопку "показать больше"
    }
    for (let i = 0; i < filmsPage.length; i++) {
      this.#createFilm(filmsPage[i], 'mainList');
    }
  };

  #renderFooterElement = () => {
    render(this.#footerComponent, this.#siteFooterComponent.querySelector('.footer__statistics'),'beforeend'); /////FIX////
  };

}


