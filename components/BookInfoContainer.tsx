import React, { memo } from "react";
import color from "color";
import { useTheme } from "react-native-paper";
import useFetchImage from "../utils/hooks/useFetchImage";
import * as Linking from "expo-linking";
import BookInfo from "./BookInfo";

const BookInfoContainer = (props: any): JSX.Element => {
  const theme = useTheme();

  const imageUrl: string | undefined = useFetchImage(props.image);

  const contentColor = color(theme.colors.text).alpha(0.8).rgb().string();
  const imageBorderColor = color(theme.colors.text).alpha(0.15).rgb().string();

  const handlePress = () => Linking.openURL(props.url);

  return (
    <BookInfo
      {...props}
      image={imageUrl}
      handlePress={handlePress}
      contentColor={contentColor}
      imageBorderColor={imageBorderColor}
    />
  );
};

export default memo(BookInfoContainer);
