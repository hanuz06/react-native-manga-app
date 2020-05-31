import React, {
  useEffect,
  useCallback,
  useState,
  useLayoutEffect,
} from "react";
import { StyleSheet, FlatList, ListRenderItemInfo } from "react-native";

import { useSelector, useDispatch } from "react-redux";

import * as booksActions from "../../store/actions/mangaActions";
import { IBook, IBookState } from "../../types";
import BookItem from "../../components/BookItem";

import moment from "moment";

const MangaByCategoryScreen: React.FC = (props: any): JSX.Element => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const [bookList, setBookList] = useState<IBook[]>([]);

  const booksByCategory = useSelector<IBookState, IBook[]>(
    (state: any) => state.manga.booksByCategory
  );
  // console.log("props IN MANGA BY CATEGORIES ", props);
  const dispatch = useDispatch();

  interface ICategory {
    category?: undefined | string;
  }

  const category: string = props.route.params.category;

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: category,
    });
  }, [category]);

  useEffect(() => {
    setBookList(booksByCategory);
  }, [booksByCategory,category]);

  useEffect(() => {
    dispatch(booksActions.fetchMangaList());
  }, []);

  const loadBooks = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(booksActions.fetchBooksByCategory());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setError]);

  // console.log("PROPS NAVIGATION ", props);
  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener("focus", loadBooks);

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [loadBooks]);

  return (
    <FlatList
      onRefresh={loadBooks}
      refreshing={isRefreshing}
      data={bookList}
      numColumns={2}
      keyExtractor={(item: IBook): string => item._id}
      renderItem={(itemData: ListRenderItemInfo<IBook>): JSX.Element => (
        <BookItem
          title={itemData.item.title}
          image={itemData.item.image}
          last_chapter_date={
            itemData.item.last_chapter_date
              ? moment
                  .unix(itemData.item.last_chapter_date)
                  .format("DD MMM YYYY ")
              : "Sorry no data"
          }
        />
      )}
    />
  );
};

export default MangaByCategoryScreen;

// const styles = StyleSheet.create({
//   main: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   bottom: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
// });
