import {generateFilmData} from '../fish/film-data.js';
import {generateFilmCommentData} from '../fish/comment-data.js';

export default class Model {
  films = Array.from({length: 5}, generateFilmData);
  comments = generateFilmCommentData();

  getFilms = () => this.films;
  getComments = () => this.comments;
}
