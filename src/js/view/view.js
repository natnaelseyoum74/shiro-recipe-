import icons from 'url:../../img/icons.svg ';

export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    // console.log(data);
    this._data = data;
    const html = this._generateMarkup();

    if (!render) return html;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError;

    this._data = data;
    const newHtml = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newHtml);
    const newElement = Array.from(newDom.querySelectorAll('*'));
    const currElement = Array.from(this._parentEl.querySelectorAll('*'));

    newElement.forEach((el, i) => {
      const currentEl = currElement[i];
      if (
        !el.isEqualNode(currentEl) &&
        el.firstChild?.nodeValue.trim() !== ''
      ) {
        currentEl.textContent = el.textContent;
      }
      if (!el.isEqualNode(currentEl)) {
        Array.from(el.attributes).forEach(attr =>
          currentEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  renerSpinner() {
    const html = `
    <div class="spinner">
      <svg>
      <use href="${icons}#icon-loader"></use>
      </svg>
     </div>
     `;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  renderError(message = this._errMessage) {
    const html = `
    <div class="error">
      <div>
        <svg>
         <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
     <p>${message}</p>
    </div>`;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  renderMessage(message = this._message) {
    const html = `
    <div class="recipe">
      <div class="message">
       <div>
         <svg>
           <use href="${icons}#icon-smile"></use>
         </svg>
       </div>
      <p>${message}</p>
   </div>
  `;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }
}
