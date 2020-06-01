import React from "react";
import {
  StyleSheet,
  FlatList,
  View,
  ListRenderItemInfo,
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

const { width, height } = Dimensions.get("screen");

const BookItem = ({
  bookId,
  title,
  last_chapter_date,
  image,
  fetchBookDetails,
}: IBookItems) => {
  const LeftContent = (props: any) => (
    <Avatar.Image
      {...props}
      size={28}
      source={{
        uri: `https://cdn.mangaeden.com/mangasimg/${image}`,
      }}
    />
  );

  return (
    <TouchableRipple
      onPress={() => fetchBookDetails(bookId)}
      rippleColor="rgba(0, 0, 0, .32)"
    >
      <Card style={styles.main}>
        <Card.Title title={title} titleStyle={{ fontSize: 20 }} />
        <Card.Cover
          source={{
            uri: `https://cdn.mangaeden.com/mangasimg/${image}`,
          }}
        />
        <Card.Content>
          <Subheading>Last chapter date:</Subheading>
          <Text>{last_chapter_date}</Text>
        </Card.Content>
        {/* <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions> */}
      </Card>
    </TouchableRipple>
  );
};

export default BookItem;

const styles = StyleSheet.create({
  main: {
    width: width / 2 - 1,
    paddingBottom: 2,
    margin: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255,182,193,1)",
    maxWidth: 450,
  },
  content: {
    // marginBottom: 5,
  },
});
