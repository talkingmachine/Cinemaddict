
import CommentsModel from './model/comments-model.js';
import FilmsModel from './model/films-model.js';
import FilmsBoardPresenter from './presenter2.0/films-board-presenter.js';

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const filmsPresenter = new FilmsBoardPresenter();


filmsPresenter.init(filmsModel, commentsModel);

