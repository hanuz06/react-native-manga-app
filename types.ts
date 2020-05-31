export const SET_MANGA_LIST = "SET_MANGA_LIST";
export const SET_BOOKS_BY_CATEGORY = "SET_BOOKS_BY_CATEGORY";

export interface IBookItems {
  title: string;
  last_chapter_date: string;
  image: string;
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

export interface IBookState {
  allMangaBooks: IBook[];
  categories: string[];
  booksByCategory: IBook[];
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

export type BookActionsType = ISetBooks | ISetBooksByCategory;
