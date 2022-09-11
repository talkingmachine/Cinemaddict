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

  init = (filmsModel, commentsModel) => {
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filmList = [...this.#filmsModel.films];
    this.#commentList = this.#commentsModel.comments;
    this.#renderedFilms = Math.min(this.#filmList.length, FILMS_PER_PAGE);

    const siteMainElement = document.querySelector('.main');
    const siteHeaderElement = document.querySelector('header');
    const siteFooterElement = document.querySelector('footer');


    render(new FiltersView(), siteMainElement);
    render(new FilmsSectionView(), siteMainElement);
    render(new FilmCardsListView(), siteMainElement.querySelector('.films'));

    if (!this.#filmList.length) {
      render(new ListEmptyView(emptyListOptions.allMovies), siteMainElement.querySelector('.films-list'));
    } else {
      render(new SortView(), siteMainElement);
      render(new UserRankView(), siteHeaderElement);
      render(new FilmsListContainerView(), siteMainElement.querySelector('.films-list'));
      for (let i = 0; i < Math.min(this.#filmList.length, FILMS_PER_PAGE); i++) {
        this.#renderMainFilmsList(this.#filmList[i], 'mainList');
      }
      if (this.#filmList.length > FILMS_PER_PAGE) {
        this.#renderShowMoreButton();
      }
      render(new TopRatedListView(), siteMainElement.querySelector('.films'));
      for (let i = 0; i < Math.min(this.#filmList.length, filmsCounter.topRated); i++) {
        this.#renderMainFilmsList(this.#filmList[i], 'topRated');
      }
      render(new MostCommentedListView(), siteMainElement.querySelector('.films'));
      for (let i = 0; i < Math.min(this.#filmList.length, filmsCounter.mostCommented); i++) {
        this.#renderMainFilmsList(this.#filmList[i], 'mostCommented');
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
        document.querySelector('.films-list').removeChild(showMoreButton.element);
      }
      for (let i = 0; i < filmsPage.length; i++) {
        this.#renderMainFilmsList(filmsPage[i], 'mainList');
      }

    };

    render(showMoreButton, document.querySelector('.films-list'));
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
        render(film, document.querySelector('.films-list__container:last-of-type'));
        break;
      case 'topRated':
        render(film, document.querySelector('.films section:last-child div'));
        break;
      case 'mostCommented':
        render(film, document.querySelector('.films section:last-child div'));
        break;
    }
  };
}


