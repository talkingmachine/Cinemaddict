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
import PopupInfoView from '../view/popup-info-view'; // HIDING POPUP
import {filmsCounter} from '../data.js';

export default class FilmsPresenter {
  #commentsModel = null;
  #filmsModel = null;
  #filmList = null;
  #commentList = null;

  init = (filmsModel, commentsModel) => {
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filmList = [...this.#filmsModel.films];
    this.#commentList = this.#commentsModel.comments;

    const siteMainElement = document.querySelector('.main');
    const siteHeaderElement = document.querySelector('header');
    const siteFooterElement = document.querySelector('footer');

    render(new UserRankView(), siteHeaderElement);
    render(new FiltersView(), siteMainElement);
    render(new SortView(), siteMainElement);
    render(new FilmsSectionView(), siteMainElement);
    render(new FilmCardsListView(), siteMainElement.querySelector('.films'));
    for (let i = 0; i < filmsCounter.mainList; i++) {
      this.#renderFilm(this.#filmList[i]);
    }
    render(new ButtonShowMoreView(), siteMainElement.querySelector('.films-list'));
    render(new TopRatedListView(), siteMainElement.querySelector('.films'));
    for (let i = 0; i < filmsCounter.topRated; i++) {
      this.#renderFilm(this.#filmList[i]);
    }
    render(new MostCommentedListView(), siteMainElement.querySelector('.films'));
    for (let i = 0; i < filmsCounter.mostCommented; i++) {
      this.#renderFilm(this.#filmList[i]);
    }
    render(new FooterStatisticsView(), siteFooterElement.querySelector('.footer__statistics'));
  };

  #renderFilm = (filmData) => {
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

    //render(film, document.querySelector('.films section:last-child div'));
    render(film, document.querySelector('.films-list__container:last-of-type'));
  };

}


