import React, { memo } from "react";
import { useTheme } from "react-native-paper";
import color from "color";
import useFetchImage from "../utils/hooks/useFetchImage";
import ChapterContentDisplay from "./ChapterContentDisplay";

const ChapterContentDisplayContainer: React.FC<{
  image: string;
}> = ({ image }): JSX.Element => {
  const theme = useTheme();

  const imageUrl: string | undefined = useFetchImage(image);
  const imageBorderColor = color(theme.colors.text).alpha(0.15).rgb().string();

  return (
    <ChapterContentDisplay
      image={imageUrl}
      imageBorderColor={imageBorderColor}
    />
  );
};
export default memo(ChapterContentDisplayContainer);
