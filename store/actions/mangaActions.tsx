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
} from "../../types";
import { BASE_URL, IMAGE_URL } from "react-native-dotenv";
import axios from "axios";
import arraySort from "array-sort";

import * as firebase from "firebase";

const Entities = require("html-entities").AllHtmlEntities;
const capitalize = require("capitalize");

import Book from "../../models/Book";

import { mangaEden } from "../../data/mangaeden";

import fetchImage from "../../helper/fetchImage";

export const fetchMangaList = () => {
  return async (dispatch: any, getState: any) => {
    // const imageRef = firebase
    //   .storage()
    //   .ref(
    //     "images/2eabadcccb8b429c060f314d8ce1992698efa6942edcbe3188f6da1a.jpg"
    //   );

    // const foundImage = await imageRef.getDownloadURL();

    // console.log("FOUND IMAGE IN ACTION ", foundImage);

    // fetch(
    //   `https://www.mangaeden.com/api/list/0`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // )
    //   .then((res: any) => res.json())
    //   .then((response: any) => {
    //     console.log("RESPONSE IN ACTION ", response);
    //   })
    //   .catch((err: any) => {
    //     console.log("ERROR IN ACTION", err);
    //   });

    // console.log("BEFORE GET REPLY");
    const res = await axios.get(
      `https://react-native-manga-reader-app.firebaseio.com/mangaList.json`
    );

    if (!res.data) {
      throw Error("Sorry, no books found");
    }

    // get all categories
    const categoriesArray: string[] = res.data.flatMap((book: IBook) => [
      ...book.categories,
    ]);

    // Create and sort a set of unique names of categories
    const setUniqueCategories = new Set(categoriesArray);
    const uniqueCategoriesArray = Array.from(setUniqueCategories).sort();

    const sortedMangas = arraySort(res.data, ["last_chapter_date"], {
      reverse: true,
    });

    // const getBooks = async () => {
    //   return Promise.all(
    //     sortedMangas.map((book: any) => ({...book, image: fetchImage(book.image)}))
    //   );
    // };

    // Promise.all(
    //   sortedMangas.map((book: any) => ({...book, image: fetchImage(book.image)}))
    // ).then(conbsole.)

    // console.log("SORTED MANGAS IN ACTION ", getBooks());
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
