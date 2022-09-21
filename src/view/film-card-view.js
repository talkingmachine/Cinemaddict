import {humanizeArrayAppearance, humanizeDate, humanizeRuntime} from '../utils/utils.js';
import AbstractView from '../framework/view/abstract-view.js';

const createNewFilmCardTemplate = (film) => {
  const {title, totalRating, release, runtime, genre, description} = film.filmInfo;
  const commentsCounter = film.comments.length;

  return `<article class="film-card">
          <a class="film-card__link">
            <h3 class="film-card__title">${title}</h3>
            <p class="film-card__rating">${totalRating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${humanizeDate(release.date)}</span>
              <span class="film-card__duration">${humanizeRuntime(runtime)}</span>
              <span class="film-card__genre">${humanizeArrayAppearance(genre)}</span>
            </p>
            <img src="./images/posters/the-man-with-the-golden-arm.jpg" alt="" class="film-card__poster">
            <p class="film-card__description">${description}</p>
            <span class="film-card__comments">${commentsCounter} comments</span>
          </a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class FilmCardView extends AbstractView{
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createNewFilmCardTemplate(this.#film);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#clickHandler);
  };

  setWatchlistClickHandler = (callback) => {
    const watchlistButton = this.element.querySelector('.film-card__controls-item--add-to-watchlist');

    this._callback.watchlistClick = callback;
    watchlistButton.addEventListener('click', this.#watchlistClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    const favoriteButton = this.element.querySelector('.film-card__controls-item--favorite');

    this._callback.favoriteClick = callback;
    favoriteButton.addEventListener('click', this.#favoriteClickHandler);
  };

  setAlreadyWatchedClickHandler = (callback) => {
    const alreadyWatchedButton = this.element.querySelector('.film-card__controls-item--mark-as-watched');

    this._callback.alreadyWatchedClick = callback;
    alreadyWatchedButton.addEventListener('click', this.#alreadyWatchedClickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };

  #alreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  };
}
