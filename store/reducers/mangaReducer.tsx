import {
  SET_MANGA_LIST,
  SET_BOOKS_BY_CATEGORY,
  SET_BOOK,
  IBookState,
  BookActionsType,
  IBookDetails,
  SET_CHAPTER_CONTENT,
  CLEAR_CHAPTER_CONTENT,
  REVERSE_CHAPTERS,
  SET_SEARCH_WORD,
} from "../../types";

const initialState: IBookState = {
  allMangaBooks: [],
  searchWord: "",
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
  chapterContent: [],
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
    case REVERSE_CHAPTERS:
    case SET_BOOK:
      return {
        ...state,
        bookDetails: action.bookDetails,
      };
    case SET_CHAPTER_CONTENT:
      return {
        ...state,
        chapterContent: action.chapterContent,
      };
    case CLEAR_CHAPTER_CONTENT:
      return {
        ...state,
        chapterContent: [],
      };
    case SET_SEARCH_WORD:
      return {
        ...state,
        searchWord: action.searchWord,
      };
    default:
      return state;
  }
};
