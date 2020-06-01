export const SET_MANGA_LIST = "SET_MANGA_LIST";
export const SET_BOOKS_BY_CATEGORY = "SET_BOOKS_BY_CATEGORY";
export const SET_BOOK = "SET_BOOK";

export interface IBookItems {
  bookId: string;
  title: string;
  last_chapter_date: string;
  image: string;
  fetchBookDetails: (bookId:string) => {};
}

export interface IBook {
  _id: string;
  alias: string;
  categories: [string];
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
  categories: string[];
  booksByCategory: IBook[];
  bookDetails: IBookDetails;
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

export type BookActionsType = ISetBooks | ISetBooksByCategory | ISetBook;
