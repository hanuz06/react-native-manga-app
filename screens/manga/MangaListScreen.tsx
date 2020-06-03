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
  Alert,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { useSelector, useDispatch } from "react-redux";

import * as mangaActions from "../../store/actions/mangaActions";
import { IBook, IBookState } from "../../types";
import BookItem from "../../components/BookItem";

import moment from "moment";

const MangaListScreen: React.FC = (props: any): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const [bookList, setBookList] = useState<IBook[]>([]);

  const allMangaBooks = useSelector<IBookState, IBook[]>(
    (state: any) => state.manga.allMangaBooks
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setBookList(allMangaBooks);
  }, [allMangaBooks]);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = useCallback(async () => {
    // console.log("LOADBOOKS TRIGERRED....");
    setError(null);
    setIsRefreshing(true);
    setIsLoading(true);
    try {
      await dispatch(mangaActions.fetchMangaList());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  const fetchBookDetails = async (bookId: string) => {
    await dispatch(mangaActions.fetchBookDetails(bookId));
    props.navigation.navigate("MangaDetails", {
      bookId,
    });
  };

  if (error) {
    Alert.alert("Oops, page not found!", "Please try again later", [
      { text: "Okay", onPress: () => setError(null) },
    ]);
  }

  if (isLoading) {
    return (
      <View style={styles.main}>
        <ActivityIndicator size="large" color="tomato" />
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadBooks}
      refreshing={isRefreshing}
      contentContainerStyle={{ backgroundColor: "#C0C0C0" }}
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

export default MangaListScreen;

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
});
