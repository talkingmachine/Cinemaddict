import {humanizeArrayAppearance, humanizeDate, humanizeDateComments, humanizeRuntime} from '../utils/humanize.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {finalize} from "@babel/core/lib/config/helpers/deep-array";

const constructGenreList = (genres) => {
  const markup = genres.map((genre) => `<span className="film-details__genre">${genre}</span> `);
  return markup.join('');
};

const constructCommentList = (commentIds, comments) => {
  const filmsCommentsArray = comments.filter((comment) => commentIds.includes(Number(comment.id)));
  const markup = filmsCommentsArray.map((comment) => `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
            </span>
            <div>
              <p class="film-details__comment-text">${comment.comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment.author}</span>
                <span class="film-details__comment-day">${humanizeDateComments(comment.date)}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`);
  return markup.join('');
};

const createNewEmojiTemplate = (emojiType) => {
  console.log(emojiType);
  if (emojiType) {
    return `<img src='./images/emoji/${emojiType}.png' width="55" height="55" alt="emoji">`;
  } else {
    return '';
  }
};

const createNewPopupInfoTemplate = (film, comments, newCommentForm) => {
  const {
    ageRating,
    title,
    alternativeTitle,
    totalRating,
    director,
    writers,
    actors,
    release,
    runtime,
    genre,
    description
  } = film.filmInfo;
  const commentsCounter = film.comments.length;

  return `<section class="film-details">
  <div class="film-details__inner">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/the-great-flamarion.jpg" alt="">

          <p class="film-details__age">${ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${humanizeArrayAppearance(writers)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${humanizeArrayAppearance(actors)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${humanizeDate(release.date)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${humanizeRuntime(runtime)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${release.release_country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                 ${constructGenreList(genre)}</td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button film-details__control-button--active film-details__control-button--watched" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCounter}</span></h3>

        <ul class="film-details__comments-list">
          ${constructCommentList(film.comments, comments)}
        </ul>

        <form class="film-details__new-comment" action="" method="get">
          <div class="film-details__add-emoji-label">
            ${createNewEmojiTemplate(newCommentForm.emoji)}
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${newCommentForm.text}</textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </form>
      </section>
    </div>
  </div>
</section>`;
};


export default class PopupInfoView extends AbstractStatefulView {
  #emojiLabel = null;
  #emojiImage = null;

  constructor(film, comments) {
    super();
    const newCommentForm = {
      'emoji': null,
      'text': ''
    };

    this._state = PopupInfoView.parseDataToState(film, comments, newCommentForm);
    this.#setInnerHandlers();

    this.element.querySelector('.film-details__emoji-list').addEventListener('click', this.#emojiListHandler);
    this.#emojiLabel = this.element.querySelector('.film-details__add-emoji-label');
  }

  get template() {
    return createNewPopupInfoTemplate(this._state.film, this._state.comments, this._state.newCommentForm);
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#clickHandler);
    this.element.querySelector('.film-details__emoji-list').addEventListener('click', this.#emojiListHandler);
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchlistClickHandler);
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#alreadyWatchedClickHandler);

    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#textInputHandler);
  };

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#clickHandler);
  };

  // setCommentSubmitHandler = (callback) => {
  //   this._callback.commentSubmit = callback;
  //   //this.element.addEventListener() - отправка комментария
  // };

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
  };

  setAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
  };

  // reset = (task) => {
  //   this.updateElement(
  //     PopupInfoView.parseDataToState(task),
  //   );
  // };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  // #commentSubmitHandler = (evt) => {
  //   evt.preventDefault();
  //   this._callback.commentSubmit(PopupInfoView.parseStateToData(this._state));
  // };

  #emojiListHandler = (evt) => {
    if (!evt.target.id) {
      return;
    }

    if (!this.#emojiImage) {
      this.#emojiImage = document.createElement('img');
      this.#emojiLabel.appendChild(this.#emojiImage);
      this.#emojiImage.width = 55;
      this.#emojiImage.height = 55;
    }

    let pickedEmoji = undefined;

    switch (evt.target.id) {
      case 'emoji-smile':
        pickedEmoji = 'smile';
        break;
      case 'emoji-sleeping':
        pickedEmoji = 'sleeping';
        break;
      case 'emoji-puke':
        pickedEmoji = 'puke';
        break;
      case 'emoji-angry':
        pickedEmoji = 'angry';
        break;
    }
    this.updateElement({
      newCommentForm: {...this._state.newCommentForm, emoji: pickedEmoji}
    });
  };

  #textInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      newCommentForm: {...this._state.newCommentForm, text: evt.target.value}
    });
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

  static parseDataToState = (film, comments, newCommentForm) => ({
    'film': film,
    'comments': comments,
    'newCommentForm': newCommentForm
  });

  // static parseStateToData = (state) => {
  //   const data = {...state, newCommentForm: {...state.newCommentForm, comments}};
  //
  //   return data;
  // };
}
