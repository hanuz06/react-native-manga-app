export const SET_MANGA_LIST = "SET_MANGA_LIST";
export const SET_BOOKS_BY_CATEGORY = "SET_BOOKS_BY_CATEGORY";
export const SET_BOOK = "SET_BOOK";
export const SET_SEARCH_WORD = "SET_SEARCH_WORD";
export const SET_CHAPTER_CONTENT = "SET_CHAPTER_CONTENT";
export const CLEAR_CHAPTER_CONTENT = "CLEAR_CHAPTER_CONTENT";
export const REVERSE_CHAPTERS = "REVERSE_CHAPTERS";

export interface IBookInfo extends IBookDetails {
  contentColor: string;
  imageBorderColor: string;
  handlePress: () => {};
}

export interface IKeys {
  i: string;
  a: string;
  c: [string];
  h: number;
  im?: string | null;
  s: number;
  t: string;
  ld: number | undefined;
}

export interface IBookItems {
  bookId: string;
  title: string;
  last_chapter_date: string;
  image: string;
  fetchBookDetails: (bookId: string) => {};
}

export interface IBook {
  id: string;
  alias: string;
  categories: string[];
  hits: number;
  image: string;
  status: number;
  title: string;
  last_chapter_date?: number;
}

export interface IBookDetails {
  id: string;
  author: string;
  categories: string[];
  chapters: [];
  description: string;
  image: string;
  last_chapter_date: number;
  released: number;
  title: string;
  url: string;
}

export interface IBookState {
  allMangaBooks: IBook[];
  searchWord: string;
  categories: string[];
  booksByCategory: IBook[];
  bookDetails: IBookDetails;
  chapterContent: string[];
}

interface ISetBooks {
  type: typeof SET_MANGA_LIST;
  books: IBook[];
  categories: string[];
}

interface ISetBooksByCategory {
  type: typeof SET_BOOKS_BY_CATEGORY;
  booksByCategory: IBook[];
}

interface ISetBook {
  type: typeof SET_BOOK;
  bookDetails: IBookDetails;
}

interface ISetChapterContent {
  type: typeof SET_CHAPTER_CONTENT;
  chapterContent: string[];
}

interface IClearChapterContent {
  type: typeof CLEAR_CHAPTER_CONTENT;
}

interface IReverseChapters {
  type: typeof REVERSE_CHAPTERS;
  bookDetails: IBookDetails;
}

interface ISetSearchWord {
  type: typeof SET_SEARCH_WORD;
  searchWord: string;
}

export type BookActionsType =
  | ISetBooks
  | ISetBooksByCategory
  | ISetBook
  | ISetChapterContent
  | IClearChapterContent
  | IReverseChapters
  | ISetSearchWord;
