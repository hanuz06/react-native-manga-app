import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  ListRenderItemInfo,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  Appbar,
  Avatar,
  Button,
  Card,
  Title,
  Headline,
  Subheading,
  Text,
  Paragraph,
  TouchableRipple,
} from "react-native-paper";

import { IBookItems } from "../types";
import { IMAGE_URL } from "react-native-dotenv";

import * as firebase from "firebase/app";
import "firebase/storage";

const { width, height } = Dimensions.get("screen");

const BookItem = ({
  bookId,
  title,
  last_chapter_date,
  image,
  fetchBookDetails,
}: IBookItems) => {
  const [mangaImage, setMangaImage] = useState<string>();

  const getImageUrl = useCallback(
    async (image) => {
      const imageRef: any = firebase.storage().ref(`images/${image}`);
      const foundImage = await imageRef.getDownloadURL();
      setMangaImage(foundImage);
    },
    [image]
  );

  useEffect(() => {
    getImageUrl(image);
  }, [image, getImageUrl]);

  return (
    <TouchableOpacity
      onPress={() => fetchBookDetails(bookId)}
      activeOpacity={0.6}
    >
      <Card style={styles.main}>
        <Card.Title
          title={title}
          titleStyle={{ fontSize: 20, color: "white" }}
        />
        <Card.Cover
          source={{
            uri: mangaImage,
          }}
        />
        <Card.Content>
          <Subheading style={{ color: "white" }}>Last chapter date:</Subheading>
          <Text style={{ color: "white" }}>{last_chapter_date}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default BookItem;

const styles = StyleSheet.create({
  main: {
    width: width / 2 - 1,
    paddingBottom: 2,
    margin: StyleSheet.hairlineWidth,
    // backgroundColor: "rgba(255,182,193,1)",
    backgroundColor: "black",
    maxWidth: 450,
  },
  content: {
    // marginBottom: 5,
  },
});
