import {generateFilmCommentData} from '../fish/comment-data.js';

export default class CommentsModel {
  #comments = generateFilmCommentData();

  get comments () {
    return this.#comments;
  }
}
