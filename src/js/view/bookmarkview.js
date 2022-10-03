import view from './view.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg ';

class Bookmarkview extends view {
  _parentEl = document.querySelector('.bookmarks__list');
  _errMessage = 'No bookmark yet. Find a nice recipe and bookmark it ;)';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new Bookmarkview();
