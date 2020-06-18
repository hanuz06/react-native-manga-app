import React, { useEffect, useCallback, useState } from "react";
import {
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  View,
  Alert,
} from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { IBook, IBookState } from "../../types";
import BookItem from "../../components/BookItemContainer";
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
  const searchWord: string = useSelector<IBookState, string>(
    (state: any) => state.manga.searchWord
  );

  const dispatch = useDispatch();
  const theme = useTheme();

  const category: string = props.route.params.category;

  useEffect(() => {
    const filtered = booksByCategory.filter((book) =>
      book.title.toLowerCase().includes(searchWord.toLowerCase())
    );
    filtered.length !== 0
      ? setBookList(filtered)
      : setBookList(booksByCategory);

    !searchWord && filtered.length === 0 && setError(null);

    searchWord && filtered.length === 0 && setError("Oops, no books found");
  }, [searchWord]);

  useEffect(() => {
    setIsRefreshing(false);
    setIsLoading(false);
    setBookList(booksByCategory);
  }, [booksByCategory]);

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: category,
    });
    loadBooks();
  }, []);

  const loadBooks = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    setIsLoading(true);

    try {
      await dispatch(mangaActions.setBooksByCategory(category));
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, setIsLoading, setError]);

  const fetchBookDetails = async (bookId: string) => {
    await dispatch(mangaActions.fetchBookDetails(bookId));
    props.navigation.navigate("MangaDetails", {
      bookId,
    });
  };

  if (isLoading) {
    return (
      <View style={styles.main}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    Alert.alert("Oops, page not found!", "Please try again later", [
      { text: "Okay", onPress: () => setError(null) },
    ]);
  }

  return (
    <FlatList
      onRefresh={loadBooks}
      refreshing={isRefreshing}
      data={bookList}
      numColumns={2}
      keyExtractor={(item: IBook): string => item.id}
      renderItem={(itemData: ListRenderItemInfo<IBook>): JSX.Element => (
        <BookItem
          bookId={itemData.item.id}
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
