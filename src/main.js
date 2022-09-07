import FilmsPresenter from './presenter/films-presenter.js';
import Model from './model/model.js';

const model = new Model();
const filmsPresenter = new FilmsPresenter();
filmsPresenter.init(model);

