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
  Text,
  Dimensions,
  ImageBackground,
  YellowBox,
} from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";

import { useSelector, useDispatch } from "react-redux";

import * as mangaActions from "../../store/actions/mangaActions";
import { IBook, IBookState } from "../../types";
import BookItem from "../../components/BookItem";

import moment from "moment";

const MangaListScreen: React.FC = (props: any): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [bookList, setBookList] = useState<IBook[]>([]);

  const allMangaBooks = useSelector<IBookState, IBook[]>(
    (state: any) => state.manga.allMangaBooks
  );
  const searchWord: string = useSelector<IBookState, string>(
    (state: any) => state.manga.searchWord
  );

  const dispatch = useDispatch();
  const theme = useTheme();

  const { width, height } = Dimensions.get("screen");

  useEffect(() => {
    const filtered = allMangaBooks.filter((book: IBook) =>
      book.title.toLowerCase().includes(searchWord.toLowerCase())
    );
    filtered.length !== 0 ? setBookList(filtered) : setBookList(allMangaBooks);

    !searchWord && filtered.length === 0 && setError(null);

    searchWord && filtered.length === 0 && setError("Oops, no books found");
  }, [searchWord]);

  useEffect(() => {
    setBookList(allMangaBooks);
  }, [allMangaBooks, setBookList]);

  useEffect(() => {
    bookList.length === 0 && loadBooks();
  }, []);

  const loadBooks = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    setIsLoading(true);
    try {
      await dispatch(mangaActions.fetchMangaList());
      YellowBox.ignoreWarnings(["Setting a timer"]);
      // console.log("LOADBOOKS SUCCESS IN mangalist ");
    } catch (err) {
      // console.log("OOPS ERROR ", err.message);
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

  if (error && error !== "Request failed with status code 503") {
    Alert.alert(error, "", [{ text: "Okay", onPress: () => setError(null) }]);
  }

  if (isLoading) {
    return (
      <View style={styles.main}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!isLoading && bookList.length === 0) {
    return (
      <View style={styles.main}>
        <ImageBackground
          source={require("../../assets/manga-front.jpeg")}
          style={styles.backgroundImage}
        >
          <View style={styles.textContainer}>
            <Text style={{ ...styles.text, color: theme.colors.primary }}>
              SORRY, NO BOOKS FOUND
            </Text>
            <Text style={{ ...styles.text, color: theme.colors.primary }}>
              IT MIGHT BE A NETWORK PROBLEM.
            </Text>
            <Text style={{ ...styles.text, color: theme.colors.primary }}>
              PLEASE, TRY AGAIN LATER.
            </Text>
          </View>
        </ImageBackground>
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
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
  textContainer: {
    width: "80%",
    height: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});
