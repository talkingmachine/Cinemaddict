import {generateFilmData} from '../fish/film-data.js';
import {generateFilmCommentData} from '../fish/comment-data.js';
import {FILMS_CARDS_TO_GENERATE} from '../data.js';

export default class Model {
  #films = Array.from({length: FILMS_CARDS_TO_GENERATE}, generateFilmData);
  #comments = generateFilmCommentData();

  get films () {
    return this.#films;
  }

  get comments () {
    return this.#comments;
  }
}
