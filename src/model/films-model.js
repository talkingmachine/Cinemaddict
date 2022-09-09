import {generateFilmData} from '../fish/film-data.js';
import {FILMS_CARDS_TO_GENERATE} from '../data.js';

export default class FilmsModel {
  #films = Array.from({length: FILMS_CARDS_TO_GENERATE}, generateFilmData);

  get films () {
    return this.#films;
  }
}
