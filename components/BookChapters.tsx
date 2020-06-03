import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Divider,
  Surface,
  TouchableRipple,
} from "react-native-paper";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { IBookDetails } from "../types";

type BookChapters = Pick<IBookDetails, "chapters">;

const BookChapters = (
  props:any 
): JSX.Element => {
  return (
    <Surface style={styles.container}>
      <FlatList
        data={props.chapters.reverse()}
        keyExtractor={(item: any): string => item[3]}
        renderItem={(itemData: any): JSX.Element => (
          <TouchableRipple
            onPress={() => props.getChapterContent(itemData.item[3])}
            rippleColor="rgba(0, 0, 0, .52)"
          >
            <Card style={styles.main}>
              <View style={styles.row}>
                <MaterialCommunityIcons
                  name="book-open-page-variant"
                  color="grey"
                  size={28}
                />
                <Card.Content style={{ width: "75%" }}>
                  <Title>Chapter: {itemData.item[0]}</Title>
                  <Text>Title: {itemData.item[2]}</Text>
                </Card.Content>
              </View>
            </Card>
          </TouchableRipple>
        )}
      />
    </Surface>
  );
};

export default BookChapters;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomColor: "silver",
    borderBottomWidth: 1,
    maxWidth: 450,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "75%",
  },
  container: {
    flex: 1,
  },
});
