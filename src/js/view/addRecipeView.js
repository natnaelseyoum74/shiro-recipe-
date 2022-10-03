import View from './view';
import icons from 'url:../../img/icons.svg ';

class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _message = 'Recipe successfully uploaded :)';

  _windowEl = document.querySelector('.add-recipe-window');
  _overlayEl = document.querySelector('.overlay');
  _btnopen = document.querySelector('.nav__btn--add-recipe');
  _btnclose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerCloseWindow();
  }

  tooggleWindow() {
    this._overlayEl.classList.toggle('hidden');
    this._windowEl.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnopen.addEventListener('click', this.tooggleWindow.bind(this));
  }

  _addHandlerCloseWindow() {
    this._btnclose.addEventListener('click', this.tooggleWindow.bind(this));

    this._overlayEl.addEventListener('click', this.tooggleWindow.bind(this));
  }
  addHandlerupload(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {}
}
export default new AddRecipeView();
