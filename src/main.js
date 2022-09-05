import FilmsPresenter from './presenter/films-presenter.js';
import Model from './model/model.js';

const filmsPresenter = new FilmsPresenter();

const model = new Model();

filmsPresenter.init(model);
