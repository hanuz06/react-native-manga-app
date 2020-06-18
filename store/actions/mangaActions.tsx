import {
  SET_MANGA_LIST,
  SET_BOOKS_BY_CATEGORY,
  SET_BOOK,
  IBook,
  SET_CHAPTER_CONTENT,
  CLEAR_CHAPTER_CONTENT,
  REVERSE_CHAPTERS,
  SET_SEARCH_WORD,
} from "../../types";
import axios from "axios";
import arraySort from "array-sort";
const Entities = require("html-entities").AllHtmlEntities;
const capitalize = require("capitalize");
import Book from "../../models/Book";
import { BASE_URL } from "react-native-dotenv";

export const fetchMangaList = () => {
  return async (dispatch: any, getState: any) => {
    const res = await axios.get(
      `https://react-native-manga-reader-app.firebaseio.com/mangaList.json`
    );

    if (!res.data) {
      throw Error("Sorry, no books found");
    }

    // Get all categories
    const categoriesArray: string[] = res.data.flatMap((book: IBook) => [
      ...book.categories,
    ]);

    // Create and sort a set of unique names of categories
    const setUniqueCategories = new Set(categoriesArray);
    const uniqueCategoriesArray = Array.from(setUniqueCategories).sort();

    const sortedMangas = arraySort(res.data, ["last_chapter_date"], {
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

    const fetchedAllBookInfo = await axios(
      `${BASE_URL}/mangaBookInfo.json`
    );

    let fetchedBook: any = {};

    fetchedAllBookInfo.data.map((book: any) => {
      if (book.bookId == bookId) {
        fetchedBook = book;
      }
    });

    const foundBook = new Book(
      bookId,
      capitalize.words(fetchedBook.author),
      fetchedBook.categories,
      fetchedBook.chapters.reverse(),
      entities.decode(fetchedBook.description),
      fetchedBook.image,
      fetchedBook.last_chapter_date,
      fetchedBook.released,
      fetchedBook.title,
      fetchedBook.url
    );

    dispatch({
      type: SET_BOOK,
      bookDetails: foundBook,
    });
  };
};

export const fetchChapterContent = (chapterId: string) => {
  return async (dispatch: any, getState: any) => {
    const getChapter = await axios(
      `${BASE_URL}/chapters/${chapterId}.json`
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
