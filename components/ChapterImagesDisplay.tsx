import React, { RefObject } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  Value,
  block,
  cond,
  eq,
  set,
  useCode,
} from "react-native-reanimated";
import {
  PinchGestureHandler,
  ScrollView,
  State,
} from "react-native-gesture-handler";
import {
  onGestureEvent,
  pinchActive,
  pinchBegan,
  timing,
  transformOrigin,
  translate,
  vec,
} from "react-native-redash";
// import PostHeader from "./PostHeader";
// import PostFooter from "./PostFooter";

const { width } = Dimensions.get("window");
const SIZE = width;
const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
  },
});

interface Post {
  user: string;
  picture: {
    uri: string;
  };
  caption: string;
  timestamp: number;
  likes: number;
  avatar: string;
}

interface PostProps {
  post: Post;
  state: Animated.Value<State>;
  pinchRef: RefObject<PinchGestureHandler>;
  pinchRefs: RefObject<PinchGestureHandler>[];
  scrollView: RefObject<ScrollView>;
}

const ChapterImagesDisplay = () => {
  return (
    <View>
      <Text></Text>
    </View>
  )
}

export default ChapterImagesDisplay

const styles = StyleSheet.create({})
