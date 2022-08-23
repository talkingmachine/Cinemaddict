import {render} from './render.js';
import NewUserRankView from './view/user-rank.js';
import NewFiltersView from './view/filters.js';
import NewSortView from './view/sort';
import NewFilmCardView from './view/film-card';
import NewFilmsSectionView from './view/films-section';
import NewFilmCardsListView from './view/film-cards-list';
import NewButtonShowMoreView from './view/button-show-more';
import NewTopRatedListView from './view/top-rated-list';
import NewMostCommentedListView from './view/most-commented-list';
import NewFooterStatisticsView from './view/footer-statistics';
import NewPopupInfoView from './view/popup-info';

export default class Presenter {
  init = () => {
    const siteMainElement = document.querySelector('.main');
    const siteHeaderElement = document.querySelector('header');
    const siteFooterElement = document.querySelector('footer');

    render(new NewUserRankView(), siteHeaderElement);
    render(new NewFiltersView(), siteMainElement);
    render(new NewSortView(), siteMainElement);
    render(new NewFilmsSectionView(), siteMainElement);
    render(new NewFilmCardsListView(), siteMainElement.querySelector('.films'));
    for (let i = 0; i < 5; i++) {
      render(new NewFilmCardView(), siteMainElement.querySelector('.films-list__container:last-of-type'));
    }
    render(new NewButtonShowMoreView(), siteMainElement.querySelector('.films-list'));
    render(new NewTopRatedListView(), siteMainElement.querySelector('.films'));
    for (let i = 0; i < 2; i++) {
      render(new NewFilmCardView(), siteMainElement.querySelector('.films section:last-child div'));
    }
    render(new NewMostCommentedListView(), siteMainElement.querySelector('.films'));
    for (let i = 0; i < 2; i++) {
      render(new NewFilmCardView(), siteMainElement.querySelector('.films section:last-child div'));
    }
    render(new NewFooterStatisticsView(), siteFooterElement.querySelector('.footer__statistics'));
    render(new NewPopupInfoView(), document.querySelector('body'));
  };
}


