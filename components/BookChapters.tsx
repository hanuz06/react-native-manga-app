import React, { memo } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Card, Title, Surface } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface IProps {
  chapters: string[];
  getChapterContent: (chapterId: string) => void;
  navigation: any;
}

const BookChapters = (props: IProps): JSX.Element => {
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
