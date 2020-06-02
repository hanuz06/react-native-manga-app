import {
  SET_MANGA_LIST,
  SET_BOOKS_BY_CATEGORY,
  SET_BOOK,
  IBook,
  IBookDetails,
} from "../../types";
import { BASE_URL } from "react-native-dotenv";
import axios, { AxiosResponse } from "axios";
import arraySort from "array-sort";

const Entities = require("html-entities").AllHtmlEntities;

import Book from "../../models/Book";

export const fetchMangaList = () => {
  return async (dispatch: any, getState: any) => {
    const newAxios = axios.create({});

    interface IKeys {
      i: string;
      a: string;
      c: [string];
      h: number;
      im?: string | null;
      s: number;
      t: string;
      ld: number | undefined;
    }

    // replace object keys with better names
    newAxios.interceptors.response.use(
      (res) => {
        return res.data.manga.map(
          ({
            a: alias,
            c: categories,
            h: hits,
            i: _id,
            im: image,
            s: status,
            t: title,
            ld: last_chapter_date,
          }: IKeys) => ({
            _id,
            alias,
            categories,
            hits,
            image,
            status,
            title,
            last_chapter_date,
          })
        );
      },
      (err) => {
        console.log("Error in axios ", err.message);
        throw err;
      }
    );

    const allMangaBooks = await newAxios.get<any, IBook[]>(
      `${BASE_URL}/list/0`
    );

    if (allMangaBooks.length === 0) {
      throw new Error("Oops, no books found. Please try later.");
    }

    const mangasWithImages = allMangaBooks.filter(
      (manga) => manga.image !== null && manga.last_chapter_date
    );

    // get all categories
    const categoriesArray: string[][] = mangasWithImages.map((book: IBook) => [
      ...book.categories,
    ]);

    // Create and sort a set of unique names of categories
    const setUniqueCategories = new Set(categoriesArray.flat());
    const uniqueCategoriesArray = Array.from(setUniqueCategories).sort();

    const sortedMangas = arraySort(mangasWithImages, ["last_chapter_date"], {
      reverse: true,
    });

    dispatch({
      type: SET_MANGA_LIST,
      books: sortedMangas,
      categories: uniqueCategoriesArray,
    });
  };
};

export const setBooksByCategory = (category: string) => {
  return async (dispatch: any, getState: any) => {
    const allMangas: IBook[] = await getState().manga.allMangaBooks;

    const booksByCategories: IBook[] = allMangas.filter((book: IBook) =>
      book.categories.includes(category)
    );

    dispatch({
      type: SET_BOOKS_BY_CATEGORY,
      booksByCategory: booksByCategories,
    });
  };
};

export const fetchBookDetails = (bookId: string) => {
  return async (dispatch: any, getState: any) => {
    const entities = new Entities();

    const fetchedBook = await axios.get<any, any>(
      `${BASE_URL}/manga/${bookId}`
    );

    const foundBook = new Book(
      bookId,
      fetchedBook.data.author,
      fetchedBook.data.categories,
      fetchedBook.data.chapters,
      entities.decode(fetchedBook.data.description),
      fetchedBook.data.image,
      fetchedBook.data.last_chapter_date,
      fetchedBook.data.released,
      fetchedBook.data.title,
      fetchedBook.data.url
    );

    dispatch({
      type: SET_BOOK,
      bookDetails: foundBook,
    });
  };
};
