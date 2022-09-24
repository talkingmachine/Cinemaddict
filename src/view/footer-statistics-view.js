import AbstractView from '../framework/view/abstract-view.js';

const createNewFooterStatisticsTemplate = () => '<p>130 291 movies inside</p>';

export default class FooterStatisticsView extends AbstractView{
  get template() {
    return createNewFooterStatisticsTemplate();
  }

  render () {

  }
}
