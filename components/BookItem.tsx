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
} from "react-native-paper";

const BookItem = ({ title, last_chapter_date, image }: any) => {
  const { width, height } = Dimensions.get("screen");

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
    <Card style={styles.main}>
      <Card.Title title={title} subtitle="Card Subtitle " left={LeftContent} />
      <Card.Content style={styles.content}>
        <Subheading>Last chapter date:</Subheading>
        <Paragraph>{last_chapter_date}</Paragraph>
      </Card.Content>
      <Card.Cover
        source={{
          uri: `https://cdn.mangaeden.com/mangasimg/${image}`,
        }}
      />
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  );
};

export default BookItem;

const styles = StyleSheet.create({
  main: {
    width: Dimensions.get("screen").width / 2 - 1,
    paddingVertical: 10,
    margin: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255,182,193,0.3)",
  },
  content: {
    marginBottom: 5,
  },
});
