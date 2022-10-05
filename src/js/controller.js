//https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886
import * as model from './model.js';
import searchView from './view/searchView.js';
import PaginationView from './view/paginationView.js';
import recipeView from './view/recipeView.js';
import resultsView from './view/resultsView.js';
import bookmarkview from './view/bookmarkview.js';
import { MODAL_CLOSE_SEC } from './config.js';
import addRecipeView from './view/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { Async } from 'regenerator-runtime';

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renerSpinner();

    resultsView.update(model.getResultsPage());

    bookmarkview.update(model.state.bookmark);

    await model.loadRecipe(id);
    //servingView.render(model.state.recipe);

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResult = async function () {
  try {
    resultsView.renerSpinner();

    const query = searchView.getQuery();
    if (!query) throw new Error('');

    await model.loadSearch(query);

    resultsView.render(model.getResultsPage());

    PaginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError();
    console.error(err);
  }
};

const controlPagination = function (goto) {
  resultsView.render(model.getResultsPage(goto));
  PaginationView.render(model.state.search);
};

const controlServing = function (newserving) {
  model.servingsResults(newserving);

  recipeView.render(model.state.recipe);
};
const controlAddBookmark = function () {
  if (!model.state.recipe.bookmark) model.addBookmark(model.state.recipe);
  else if (model.state.recipe.bookmark)
    model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  bookmarkview.render(model.state.bookmark);
};

const controlBookmark = function () {
  bookmarkview.render(model.state.bookmark);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renerSpinner();

    await model.uploadRecipe(newRecipe);

    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    bookmarkview.render(model.state.bookmark);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(function () {
      addRecipeView.tooggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

console.log('WELCOME');

const init = function () {
  bookmarkview.addHandlerRender(controlBookmark);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerServing(controlServing);
  recipeView.addHandleAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  PaginationView.addHandlerPage(controlPagination);
  addRecipeView.addHandlerupload(controlAddRecipe);
};

init();
