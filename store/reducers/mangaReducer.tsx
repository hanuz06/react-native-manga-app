import {
  SET_MANGA_LIST,
  SET_BOOKS_BY_CATEGORY,
  SET_BOOK,
  IBookState,
  BookActionsType,
  IBookDetails,
} from "../../types";

const initialState: IBookState = {
  allMangaBooks: [],
  categories: [],
  booksByCategory: [],
  bookDetails: {
    id: "",
    author: "",
    categories: [],
    chapters: [],
    description: "",
    image: "",
    last_chapter_date: 0,
    released: 0,
    title: "",
    url: "",
  },
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
        booksByCategory: action.booksByCategory,
      };
    case SET_BOOK:
      return {
        ...state,
        bookDetails: action.bookDetails,
      };
    default:
      return state;
  }
};
