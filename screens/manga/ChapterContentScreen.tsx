import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Alert,
  ListRenderItemInfo,
  Dimensions,
} from "react-native";

import { useTheme, ActivityIndicator } from "react-native-paper";

import { ReactNativeZoomableView } from "@dudigital/react-native-zoomable-view";

import { useSelector, useDispatch } from "react-redux";

import color from "color";

import * as mangaActions from "../../store/actions/mangaActions";
import { IBookState } from "../../types";

import { IMAGE_URL } from "react-native-dotenv";

import * as firebase from "firebase";
import ChapterContentDisplay from "../../components/ChapterContentDisplay";

const { width } = Dimensions.get("window");

const ChapterContentScreen: React.FC = (props: any): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const [chapterList, setChapterList] = useState<string[]>([]);

  const theme = useTheme();
  // console.log("PROPS IN CHAPTER CONTENT SCREEN ", props);
  const chapterContent = useSelector<IBookState, string[]>(
    (state: any) => state.manga.chapterContent
  );
  const chapterId = props.route.params.chapterId;
  const dispatch = useDispatch();

  useEffect(() => {
    setIsRefreshing(false);
    setIsLoading(false);
    setChapterList(chapterContent);
  }, [chapterContent]);

  useEffect(() => {
    loadChapter();
  }, [chapterId]);

  const imageBorderColor = color(theme.colors.text).alpha(0.15).rgb().string();

  const loadChapter = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    setIsLoading(true);

    try {
      await dispatch(mangaActions.fetchChapterContent(chapterId));
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, setIsLoading, setError]);

  if (isLoading) {
    return (
      <View style={styles.main}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    Alert.alert("Oops, chapter not found!", "Please try again later", [
      { text: "Okay", onPress: () => setError(null) },
    ]);
  }
  // console.log("CHAPTER LIST ", chapterList);
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <FlatList
        onRefresh={loadChapter}
        refreshing={isRefreshing}
        data={chapterList}
        keyExtractor={(item: any) => item[0].toString()}
        renderItem={(itemData: ListRenderItemInfo<string>): any => {
          return <ChapterContentDisplay image={itemData.item[1]} />;

          // return (
          //   <View style={styles.imageContainer}>
          //     <ReactNativeZoomableView
          //       maxZoom={2}
          //       minZoom={1}
          //       zoomStep={0.5}
          //       initialZoom={1}
          //     >
          //       <Image
          //         // source={{ uri: `${IMAGE_URL}/${itemData.item[1]}` }}
          //         source={{ uri: image }}
          //         style={[
          //           styles.image,
          //           {
          //             borderColor: imageBorderColor,
          //           },
          //         ]}
          //       />
          //     </ReactNativeZoomableView>
          //   </View>
          // );
        }}
      />
    </View>
  );
};

export default ChapterContentScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    maxWidth: 450,
    justifyContent: "center",
    alignItems: "center",
    margin: 3,
  },

  image: {
    borderWidth: StyleSheet.hairlineWidth,
    width: width,
    height: 740,
    resizeMode: "contain",
  },
});
