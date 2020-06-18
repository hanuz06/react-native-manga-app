import React, { memo } from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import { ReactNativeZoomableView } from "@dudigital/react-native-zoomable-view";
const { width } = Dimensions.get("window");

interface IChapterContentDisplay {
  imageBorderColor: string;
  image: string;
}

const ChapterContentDisplay: React.FC<IChapterContentDisplay> = ({
  imageBorderColor,
  image,
}): JSX.Element => {
  return (
    <View style={styles.imageContainer}>
      <ReactNativeZoomableView
        maxZoom={2}
        minZoom={1}
        zoomStep={0.5}
        initialZoom={1}
      >
        <Image
          source={{ uri: image }}
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

export default memo(ChapterContentDisplay);

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
