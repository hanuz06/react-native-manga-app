import {
  SET_MANGA_LIST,
  SET_BOOKS_BY_CATEGORY,
  IBookState,
  BookActionsType,
} from "../../types";

const initialState: IBookState = {
  allMangaBooks: [],
  categories: [],
  booksByCategory: [],
};

export default (state = initialState, action: BookActionsType) => {
  switch (action.type) {
    case SET_MANGA_LIST:
      return {
        ...state,
        allMangaBooks: action.books,
        categories: action.categories,
      };
    case SET_BOOKS_BY_CATEGORY:
      return {
        ...state,
        allMangaBooks: action.booksByCategory,
      };
    default:
      return state;
  }
};
