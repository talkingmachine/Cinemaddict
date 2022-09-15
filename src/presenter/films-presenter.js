import {render} from '../render.js';
import UserRankView from '../view/user-rank-view.js';
import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view';
import FilmCardView from '../view/film-card-view';
import FilmsSectionView from '../view/films-section-view';
import FilmCardsListView from '../view/film-cards-list-view';
import ButtonShowMoreView from '../view/button-show-more-view';
import TopRatedListView from '../view/top-rated-list-view';
import MostCommentedListView from '../view/most-commented-list-view';
import FooterStatisticsView from '../view/footer-statistics-view';
import PopupInfoView from '../view/popup-info-view';
import ListEmptyView from '../view/list-empty-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import {filmsCounter, FILMS_PER_PAGE, emptyListOptions} from '../data.js';


export default class FilmsPresenter {
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

  init = (filmsModel, commentsModel) => {
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filmList = [...this.#filmsModel.films];
    this.#commentList = this.#commentsModel.comments;
    this.#renderedFilms = Math.min(this.#filmList.length, FILMS_PER_PAGE);

    const siteMainElement = document.querySelector('.main');
    const siteHeaderElement = document.querySelector('header');
    const siteFooterElement = document.querySelector('footer');

    this.#filmsElement = new FilmsSectionView();
    this.#filmsListElement = new FilmCardsListView();

    render(new FiltersView(), siteMainElement, 'afterbegin');
    render(new UserRankView(), siteHeaderElement);
    render(this.#filmsElement, siteMainElement);
    render(this.#filmsListElement, this.#filmsElement.element);

    if (!this.#filmList.length) {
      render(new ListEmptyView(emptyListOptions.allMovies), this.#filmsListElement.element);
    } else {
      this.#topRatedListElement = new TopRatedListView();
      this.#mostCommentedListElement = new MostCommentedListView();
      this.#filmsListContainerElement = new FilmsListContainerView();

      render(new SortView(), this.#filmsElement.element, 'beforebegin');
      render(this.#filmsListContainerElement, this.#filmsListElement.element);
      render(this.#topRatedListElement, this.#filmsElement.element);
      render(this.#mostCommentedListElement, this.#filmsElement.element);

      for (let i = 0; i < Math.min(this.#filmList.length, FILMS_PER_PAGE); i++) {
        this.#renderMainFilmsList(this.#filmList[i], 'mainList');
      }
      for (let i = Math.min(this.#filmList.length, filmsCounter.topRated); i > 0; i--) {
        this.#renderMainFilmsList(this.#filmList[i], 'topRated');
      }
      for (let i = 0; i < Math.min(this.#filmList.length, filmsCounter.mostCommented); i++) {
        this.#renderMainFilmsList(this.#filmList[i], 'mostCommented');
      }

      if (this.#filmList.length > FILMS_PER_PAGE) {
        this.#renderShowMoreButton();
      }
    }

    render(new FooterStatisticsView(), siteFooterElement.querySelector('.footer__statistics'));
  };

  #renderShowMoreButton = () => {
    const showMoreButton = new ButtonShowMoreView();
    const showFilmsPage = () => {
      const filmsPage = this.#filmList.slice(this.#renderedFilms, this.#renderedFilms + FILMS_PER_PAGE);
      this.#renderedFilms += FILMS_PER_PAGE;
      if (this.#renderedFilms >= this.#filmList.length) {
        this.#filmsListElement.element.removeChild(showMoreButton.element);
      }
      for (let i = 0; i < filmsPage.length; i++) {
        this.#renderMainFilmsList(filmsPage[i], 'mainList');
      }

    };

    render(showMoreButton, this.#filmsListElement.element);
    showMoreButton.element.addEventListener('click', showFilmsPage);
  };

  #renderMainFilmsList = (filmData, renderType) => {
    const popup = new PopupInfoView(filmData, this.#commentList);
    const film = new FilmCardView(filmData);

    const removePopup = () => {
      document.body.removeChild(popup.element);
      document.body.classList.remove('hide-overflow');
    };
    const appendPopup = () => {
      document.body.appendChild(popup.element);
      document.body.classList.add('hide-overflow');
    };

    const onEscKeyPressed = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        removePopup();
        document.removeEventListener('keydown', onEscKeyPressed);
      }
    };

    film.element.addEventListener('click', () => {
      appendPopup();
      document.addEventListener('keydown', onEscKeyPressed);

      popup.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
        removePopup();
        document.removeEventListener('keydown', onEscKeyPressed);
      });
    });

    switch(renderType) {
      case 'mainList':
        render(film, this.#filmsListContainerElement.element);
        break;
      case 'topRated':
        render(film, this.#topRatedListElement.element.querySelector('div'));
        break;
      case 'mostCommented':
        render(film, this.#mostCommentedListElement.element.querySelector('div'));
        break;
    }
  };
}


