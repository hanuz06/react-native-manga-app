export const SET_MANGA_LIST = "FETCH_MANGA_LIST";

export interface IBook {
  _id: string;
  alias: string;
  categories: [string];
  hits: number;
  image?: string | null;
  status: number;
  title: string;
  last_chapter_date?: number;
}

export interface IBookState {
  allMangaBooks: IBook[];
}

interface ISetBooks {
  type: typeof SET_MANGA_LIST;
  books: IBook[];
}

export type BookActionsType = ISetBooks;{}