import FilmsPresenter from './presenter/films-presenter.js';
import CommentsModel from './model/comments-model.js';
import FilmsModel from './model/films-model.js';

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const filmsPresenter = new FilmsPresenter();
filmsPresenter.init(filmsModel, commentsModel);

