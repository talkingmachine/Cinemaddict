import {generateFilmData} from '../fish/film-data.js';
import {generateCommentData} from '../fish/comment-data.js';

export default class Model {
  films = Array.from({length: 5}, generateFilmData);
  comments = Array.from({length: 4}, generateCommentData);

  getFilms = () => this.films;
  getComments = () => this.comments;
}
