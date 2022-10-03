import view from './view';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg ';

class ResultsView extends view {
  _parentEl = document.querySelector('.results');
  _errMessage = 'no recipes found for your query! Please try again ;)';
  _message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
