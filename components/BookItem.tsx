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
import { IMAGE_URL } from "react-native-dotenv";

const { width, height } = Dimensions.get("screen");

const BookItem = ({
  bookId,
  title,
  last_chapter_date,
  image,
  fetchBookDetails,
}: IBookItems) => {
  // const LeftContent = (props: any) => (
  //   <Avatar.Image
  //     {...props}
  //     size={28}
  //     source={{
  //       uri: `${IMAGE_URL}/${image}`,
  //     }}
  //   />
  // );  

  return (
    <TouchableRipple
      onPress={() => fetchBookDetails(bookId)}
      rippleColor="rgba(0, 0, 0, .32)"
    >
      <Card style={styles.main}>
        <Card.Title
          title={title}
          titleStyle={{ fontSize: 20, color: "white" }}
        />
        <Card.Cover
          source={{
            uri: `${IMAGE_URL}/${image}`,
          }}
        />
        <Card.Content>
          <Subheading style={{ color: "white" }}>Last chapter date:</Subheading>
          <Text style={{ color: "white" }}>{last_chapter_date}</Text>
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
    // backgroundColor: "rgba(255,182,193,1)",
    backgroundColor: "black",
    maxWidth: 450,
  },
  content: {
    // marginBottom: 5,
  },
});
