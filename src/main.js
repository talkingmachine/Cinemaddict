import Presenter from './presenter/presenter.js';
import Model from './model/model.js';

const filmsPresenter = new Presenter();

const model = new Model();

filmsPresenter.init(model);
