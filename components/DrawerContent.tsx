import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Divider,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { IBook, IBookState } from "../../types";
import { useSelector, useDispatch } from "react-redux";
import * as mangaActions from "../store/actions/mangaActions";

const DrawerContent = (props: any): JSX.Element => {
  const categories = useSelector<IBookState, string[]>(
    (state: any) => state.manga.categories
  );

  const dispatch = useDispatch();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <DrawerItemList {...props} />
        <Divider />
        <Drawer.Section title="Categories" style={styles.drawerSection}>
          {categories.map((category: string, index: number) => (
            <DrawerItem
              key={index}
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="book-open-page-variant"
                  color={color}
                  size={24}
                />
              )}
              label={category}
              onPress={() => {
                dispatch(mangaActions.setBooksByCategory(category));
                props.navigation.navigate("MangaByCategory", {
                  category,
                });
                // console.log("ALL ROUTES ", props.navigation);
              }}
            />
          ))}
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
    fontWeight: "bold",
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
