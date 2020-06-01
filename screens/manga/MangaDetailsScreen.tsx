import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useTheme } from "react-native-paper";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import BookInfo from "../../components/BookInfo";
import BookChapters from "../../components/BookChapters";
import color from "color";

import { useSelector, useDispatch } from "react-redux";

import * as mangaActions from "../../store/actions/mangaActions";

import { IBook, IBookState, IBookDetails } from "../../types";

const initialLayout = { width: Dimensions.get("window").width };

const MangaDetailsScreen: React.FC = (props: any): JSX.Element => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "bookInfo", title: "Manga Details" },
    { key: "bookChapters", title: "Chapters" },
  ]);

  const theme = useTheme();

  const bookDetails = useSelector<IBookState, IBookDetails>(
    (state: any) => state.manga.bookDetails
  );

  const info = () => <BookInfo />;
  const chapters = () => <BookChapters chapters={bookDetails.chapters}/>;

  const renderScene = SceneMap({
    bookInfo: info,
    bookChapters: chapters,
  });

  // const rippleColor = theme.dark
  //   ? color(theme.colors.surface).lighten(0.5)
  //   : color(theme.colors.surface).darken(0.2);

  const renderTabBar = (props: any): JSX.Element => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: theme.colors.primary }}
      style={{
        backgroundColor: theme.colors.surface,
        shadowColor: theme.colors.text,
      }}
      labelStyle={{ color: theme.colors.primary }}
      pressColor={color(theme.colors.surface).darken(0.2)}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
    />
  );
};

export default MangaDetailsScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
