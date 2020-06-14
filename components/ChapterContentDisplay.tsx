import React, { useCallback, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Alert,
  ListRenderItemInfo,
  Dimensions,
} from "react-native";

import { ReactNativeZoomableView } from "@dudigital/react-native-zoomable-view";

import { useTheme, ActivityIndicator } from "react-native-paper";

import color from "color";

import { IBookState } from "../../types";

import { IMAGE_URL } from "react-native-dotenv";

import useFetchImage from "../utils/hooks/useFetchImage";

const { width } = Dimensions.get("window");

const ChapterContentDisplay: React.FC = ({ image }: any): JSX.Element => {
  const theme = useTheme();

  const imageUrl: string | undefined = useFetchImage(image);
  const imageBorderColor = color(theme.colors.text).alpha(0.15).rgb().string();

  return (
    <View style={styles.imageContainer}>
      <ReactNativeZoomableView
        maxZoom={2}
        minZoom={1}
        zoomStep={0.5}
        initialZoom={1}
      >
        <Image
          // source={{ uri: `${IMAGE_URL}/${itemData.item[1]}` }}
          source={{ uri: imageUrl }}
          style={[
            styles.image,
            {
              borderColor: imageBorderColor,
            },
          ]}
        />
      </ReactNativeZoomableView>
    </View>
  );
};
export default ChapterContentDisplay;

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
