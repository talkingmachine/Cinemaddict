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
import {FILMS_COUNTER} from '../data.js';

export default class Presenter {
  init = (model) => {
    this.model = model;
    this.filmList = [...this.model.getFilms()];
    this.commentGenerator = this.model.getComments();
    this.commentList = this.commentGenerator();
    //console.log(this.filmList);

    const siteMainElement = document.querySelector('.main');
    const siteHeaderElement = document.querySelector('header');
    const siteFooterElement = document.querySelector('footer');

    render(new UserRankView(), siteHeaderElement);
    render(new FiltersView(), siteMainElement);
    render(new SortView(), siteMainElement);
    render(new FilmsSectionView(), siteMainElement);
    render(new FilmCardsListView(), siteMainElement.querySelector('.films'));
    for (let i = 0; i < FILMS_COUNTER.mainList; i++) {
      render(new FilmCardView(this.filmList[i]), siteMainElement.querySelector('.films-list__container:last-of-type'));
    }
    render(new ButtonShowMoreView(), siteMainElement.querySelector('.films-list'));
    render(new TopRatedListView(), siteMainElement.querySelector('.films'));
    for (let i = 0; i < FILMS_COUNTER.topRated; i++) {
      render(new FilmCardView(this.filmList[i]), siteMainElement.querySelector('.films section:last-child div'));
    }
    render(new MostCommentedListView(), siteMainElement.querySelector('.films'));
    for (let i = 0; i < FILMS_COUNTER.mostCommented; i++) {
      render(new FilmCardView(this.filmList[i]), siteMainElement.querySelector('.films section:last-child div'));
    }
    render(new FooterStatisticsView(), siteFooterElement.querySelector('.footer__statistics'));
    render(new PopupInfoView(this.filmList[1], this.commentList), document.querySelector('body')); // HIDING POPUP
  };
}


