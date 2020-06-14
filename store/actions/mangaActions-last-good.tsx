import {
  SET_MANGA_LIST,
  SET_BOOKS_BY_CATEGORY,
  SET_BOOK,
  IBook,
  IBookDetails,
  SET_CHAPTER_CONTENT,
  CLEAR_CHAPTER_CONTENT,
  REVERSE_CHAPTERS,
  SET_SEARCH_WORD,
  IKeys,
} from "../../types";
import { BASE_URL } from "react-native-dotenv";
import axios from "axios";
import arraySort from "array-sort";

const Entities = require("html-entities").AllHtmlEntities;
const capitalize = require("capitalize");

import Book from "../../models/Book";

export const fetchMangaList = () => {
  return async (dispatch: any, getState: any) => {
    const newAxios = axios.create({});

    // replace object keys with better names
    newAxios.interceptors.response.use(
      (res) => {
        console.log("RES IN ACTION ", res.data.manga);
        return res.data.manga.map(
          ({
            a: alias,
            c: categories,
            h: hits,
            i: id,
            im: image,
            s: status,
            t: title,
            ld: last_chapter_date,
          }: IKeys) => ({
            id,
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
        // console.log("ERROR IN ACTION ", err);
        // return Promise.reject(error);
        throw err;
      }
    );

    const allMangaBooks = await newAxios.get<any, IBook[]>(
      // `${BASE_URL}/list/0`
      "https://www.mangaeden.com/api/list/0"
    );

    // const res = await fetch("https://www.mangaeden.com/api/list/0");

    // if (!res.ok) {
    //   console.log("ERROR IN ACTION");
    // }

    // const resData = await res.json();

    // console.log("RESDATA IN ACTION ", resData);

    const mangasWithImages = allMangaBooks.filter(
      (manga) => manga.image !== null && manga.last_chapter_date
    );

    // get all categories
    const categoriesArray: string[] = mangasWithImages.flatMap((book: IBook) => [
      ...book.categories,
    ]);

    // create and sort a set of unique names of categories
    const setUniqueCategories = new Set(categoriesArray);
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
      capitalize.words(fetchedBook.data.author),
      fetchedBook.data.categories,
      fetchedBook.data.chapters.reverse(),
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

export const fetchChapterContent = (chapterId: string) => {
  return async (dispatch: any, getState: any) => {
    const getChapter = await axios.get<any, any>(
      `${BASE_URL}/chapter/${chapterId}`
    );

    if (getChapter.data.images.length === 0) {
      throw new Error("Sorry, no chapter content is available");
    }

    dispatch({
      type: SET_CHAPTER_CONTENT,
      chapterContent: getChapter.data.images.reverse(),
    });
  };
};

export const clearChapterContent = () => {
  return async (dispatch: any, getState: any) => {
    dispatch({
      type: CLEAR_CHAPTER_CONTENT,
    });
  };
};

export const reverseChapters = () => {
  return async (dispatch: any, getState: any) => {
    const book = await getState().manga.bookDetails;

    const newBook = {
      ...book,
      chapters: book.chapters.reverse(),
    };

    dispatch({
      type: REVERSE_CHAPTERS,
      bookDetails: newBook,
    });
  };
};

export const setSearchWord = (word: any) => {
  return async (dispatch: any, getState: any) => {
    dispatch({
      type: SET_SEARCH_WORD,
      searchWord: word,
    });
  };
};
