import React, { memo } from "react";
import { YellowBox } from "react-native";
import { IBookItems } from "../types";
import useFetchImage from "../utils/hooks/useFetchImage";
import BookItem from "./BookItem";

const BookItemContainer: React.FC<IBookItems> = (props): JSX.Element => {
  const imageUrl: string = useFetchImage(props.image);
  YellowBox.ignoreWarnings(["source.uri"]);

  return <BookItem {...props} image={imageUrl} />;
};

export default memo(BookItemContainer);
