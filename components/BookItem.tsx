import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Card, Subheading, Text } from "react-native-paper";
import { IBookItems } from "../types";
const { width } = Dimensions.get("screen");

const BookItem: React.FC<IBookItems> = ({
  bookId,
  title,
  last_chapter_date,
  image,
  fetchBookDetails,
}): JSX.Element => {
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
            uri: image,
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

export default memo(BookItem);

const styles = StyleSheet.create({
  main: {
    width: width / 2 - 1,
    paddingBottom: 2,
    margin: StyleSheet.hairlineWidth,
    backgroundColor: "black",
    maxWidth: 450,
  },
});
