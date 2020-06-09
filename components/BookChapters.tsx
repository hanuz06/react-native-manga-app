import React, { useEffect, memo } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
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
import { useIsFocused } from "@react-navigation/native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { IBookDetails } from "../types";

type BookChapters = Pick<IBookDetails, "chapters">;

const BookChapters = (props: any): JSX.Element => {
  const isFocused = useIsFocused();

  // useEffect(() => {
  //   props.navigation.setOptions({
  //     title: "chapters",
  //   });
  // }, []);

  // useEffect(() => {
  //   isFocused &&
  //     props.navigation.setOptions({
  //       title: "chapters",
  //     });
  // }, [isFocused]);

  return (
    <Surface style={styles.container}>
      <FlatList
        data={props.chapters}
        keyExtractor={(item: any): string => item[3]}
        renderItem={(itemData: any): JSX.Element => (
          <TouchableOpacity
            onPress={() => props.getChapterContent(itemData.item[3])}
            activeOpacity={0.5}
          >
            <Card style={styles.main}>
              <View style={styles.row}>
                <MaterialCommunityIcons
                  name="book-open-page-variant"
                  color="black"
                  size={28}
                />
                <Card.Content style={{ width: "75%" }}>
                  <Title>Chapter: {itemData.item[0]}</Title>
                  <Text>Title: {itemData.item[2]}</Text>
                </Card.Content>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </Surface>
  );
};

export default memo(BookChapters);

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
