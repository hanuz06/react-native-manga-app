import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { useTheme } from "react-native-paper";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import BookInfoContainer from "../../components/BookInfoContainer";
import BookChapters from "../../components/BookChapters";
import color from "color";
import { useSelector } from "react-redux";
import { IBookState, IBookDetails } from "../../types";

const initialLayout = { width: Dimensions.get("window").width };

const MangaDetailsScreen: React.FC = (props: any): JSX.Element => {
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState<{ key: string; title: string }[]>([
    { key: "bookInfo", title: "Manga Details" },
    { key: "bookChapters", title: "Chapters" },
  ]);

  const theme = useTheme();

  const bookDetails = useSelector<IBookState, IBookDetails>(
    (state: any) => state.manga.bookDetails
  );

  const getChapterContent = (chapterId: string) => {
    props.navigation.navigate("ChapterContent", {
      chapterId,
    });
  };

  useEffect(() => {
    if (index === 1) {
      props.navigation.setOptions({
        title: "chapters",
      });
    } else {
      props.navigation.setOptions({
        title: null,
      });
    }
  }, [index]);

  const info = () => <BookInfoContainer {...bookDetails} />;
  const chapters = () => (
    <BookChapters
      chapters={bookDetails.chapters}
      getChapterContent={getChapterContent}
      navigation={props.navigation}
    />
  );

  const renderScene = SceneMap({
    bookInfo: info,
    bookChapters: chapters,
  });

  const renderTabBar = (props: any): JSX.Element => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: theme.colors.primary }}
      style={{
        backgroundColor: theme.colors.surface,
        shadowColor: theme.colors.text,
        elevation: 5,
      }}
      labelStyle={{ color: theme.colors.primary }}
      pressColmageor={color(theme.colors.surface).darken(0.2)}
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
