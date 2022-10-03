import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, KEY } from './config.js';
import { AJAX } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultPerPage: RES_PER_PAGE,
  },
  bookmark: [],
};

export const creatRecipeObj = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
    state.recipe = creatRecipeObj(data);
    if (state.bookmark.some(x => id === x.id)) state.recipe.bookmark = true;
    else state.recipe.bookmark = false;
  } catch (err) {
    throw err;
  }
};

export const loadSearch = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};
export const getResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage;
  return state.search.results.slice(start, end);
};

export const servingsResults = function (serve) {
  state.recipe.ingredients.forEach(element => {
    element.quantity = (element.quantity * serve) / state.recipe.servings;
  });

  state.recipe.servings = serve;
};

const persistBookmark = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmark));
};

export const addBookmark = function (recipe) {
  state.bookmark.push(recipe);

  if (recipe.id === state.recipe.id) state.recipe.bookmark = true;
  persistBookmark();
};

export const deleteBookmark = function (id) {
  const index = state.bookmark.findIndex(el => (el.id = id));
  state.bookmark.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmark = false;
  persistBookmark();
};

const init = function () {
  const stroage = localStorage.getItem('bookmarks');

  if (stroage) state.bookmark = JSON.parse(stroage);
};
init();

const clearBookmark = function () {
  localStorage.clear('bookmarks');
};

//clearBookmark();

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(
        (entry, i) => entry[0].startsWith('ingredient') && entry[1] !== ''
      )
      .map((ings, i, arr) => {
        const ingsArr = ings[1].split(',').map(x => x.trim());

        if (ingsArr.length !== 3)
          throw new Error(
            'Wrong ingreidient format! Please use correct format'
          );
        const [quantity = null, unit, description] = ingsArr;

        return {
          quantity: quantity ? +quantity : null,
          unit,
          description,
        };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = creatRecipeObj(data);

    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }

  //console.log(ingredients);
};
