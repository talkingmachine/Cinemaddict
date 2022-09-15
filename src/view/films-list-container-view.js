import AbstractView from '../framework/view/abstract-view.js';

const createNewFilmsListContainerTemplate = () => '<div class="films-list__container"></div>';

export default class FilmsListContainerView extends AbstractView{
  get template() {
    return createNewFilmsListContainerTemplate();
  }
}
