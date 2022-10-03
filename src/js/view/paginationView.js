import View from './view';
import icons from 'url:../../img/icons.svg ';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerPage(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const currentBtn = e.target.closest('.btn--inline');

      if (!currentBtn) return;

      const goto = +currentBtn.dataset.goto;

      handler(goto);
    });
  }

  _generateMarkup() {
    const currentpage = this._data.page;
    const noPage = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );

    if (currentpage === 1 && 1 < noPage) {
      return `
      <button class="btn--inline pagination__btn--next" data-goto=${
        currentpage + 1
      }>
           <span>Page ${currentpage + 1}</span>
             <svg class="search__icon">
               <use href="${icons}#icon-arrow-right"></use>
            </svg>
      </button>
          `;
    }

    if (noPage > 1 && currentpage === noPage) {
      return `
      <button class="btn--inline pagination__btn--prev " data-goto=${
        currentpage - 1
      }>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentpage - 1}</span>
          </button>
     `;
    }

    if (currentpage < noPage) {
      return `
      <button class="btn--inline pagination__btn--prev" data-goto=${
        currentpage - 1
      }>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentpage - 1}</span>
        </button>
      <button class="btn--inline pagination__btn--next" data-goto=${
        currentpage + 1
      }>
            <span>Page ${currentpage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
         </button>

      `;
    }
    return '';
  }
}
export default new PaginationView();
