import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Divider,
  TouchableRipple,
} from "react-native-paper";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const BookChapters = (props: any) => {
  return (
    <FlatList
      data={props.chapters}
      keyExtractor={(item: any): string => item[3]}
      renderItem={(itemData: any): JSX.Element => (
        <TouchableRipple
          onPress={() => console.log("Pressed")}
          rippleColor="rgba(0, 0, 0, .52)"
        >
          <Card style={styles.main}>
            <View style={styles.row}>
              <MaterialCommunityIcons
                name="book-open-page-variant"
                color="grey"
                size={24}
              />
              <Card.Content style={{ width: 220 }}>
                <Title>Chapter: {itemData.item[0]}</Title>
                <Text>Title: {itemData.item[2]}</Text>
              </Card.Content>
            </View>
          </Card>
        </TouchableRipple>
      )}
    />
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
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 280,
  },
});
