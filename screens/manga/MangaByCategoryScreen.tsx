import React, {
  useEffect,
  useCallback,
  useState,
  useLayoutEffect,
} from "react";
import {
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  View,
  Text,
  ActivityIndicator,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";

import { IBook, IBookState } from "../../types";
import BookItem from "../../components/BookItem";

import * as mangaActions from "../../store/actions/mangaActions";

import moment from "moment";

const MangaByCategoryScreen: React.FC = (props: any): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const [bookList, setBookList] = useState<any>();

  const booksByCategory = useSelector<IBookState, IBook[]>(
    (state: any) => state.manga.booksByCategory
  );
  
  const dispatch = useDispatch();

  const category: string = props.route.params.category;

  // useEffect(() => {
  //   setIsLoading(true);
  //   dispatch(mangaActions.setBooksByCategory(category));
  //   // setIsLoading(false);
  // }, [category]);

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: category,
    });
  }, [category]);

  useEffect(() => {
    setBookList(booksByCategory);
  }, [booksByCategory, category]);

  // useEffect(() => {
  //   dispatch(booksActions.fetchMangaList());
  // }, []);

  // const loadBooks = useCallback(async () => {
  //   setError(null);
  //   setIsRefreshing(true);
  //   try {
  //     await dispatch(booksActions.fetchBooksByCategory());
  //   } catch (err) {
  //     setError(err.message);
  //   }
  //   setIsRefreshing(false);
  // }, [dispatch, setError]);

  
  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener("focus", loadBooks);

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [loadBooks]);

  const fetchBookDetails = async (bookId: string) => {
    await dispatch(mangaActions.fetchBookDetails(bookId));
    props.navigation.navigate("MangaDetails", {
      bookId,
    });
  };

  if (isLoading) {
    return (
      <View style={styles.main}>
        <ActivityIndicator size="large" color="tomato" />
      </View>
    );
  }

  return (
    <FlatList
      // onRefresh={loadBooks}
      // refreshing={isRefreshing}
      data={bookList}
      numColumns={2}
      keyExtractor={(item: IBook): string => item._id}
      renderItem={(itemData: ListRenderItemInfo<IBook>): JSX.Element => (
        <BookItem
          bookId={itemData.item._id}
          title={itemData.item.title}
          image={itemData.item.image}
          fetchBookDetails={fetchBookDetails}
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

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
