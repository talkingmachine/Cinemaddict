import AbstractView from '../framework/view/abstract-view.js';

const createNewFilmsSectionTemplate = () => '<section class="films"></section>';

export default class FilmsSectionView extends AbstractView{
  get template() {
    return createNewFilmsSectionTemplate();
  }
}
