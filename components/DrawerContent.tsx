import React, { Fragment } from "react";
import { View, StyleSheet } from "react-native";
import {
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { Drawer, Divider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { IBookState } from "../../types";
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
            <Fragment key={index}>
              <DrawerItem
                icon={({ color, size }) => (
                  <MaterialCommunityIcons
                    name="book-open-page-variant"
                    color={color}
                    size={24}
                  />
                )}
                label={category}
                labelStyle={{
                  fontSize: 18,
                }}
                onPress={async () => {
                  props.navigation.closeDrawer();
                  props.navigation.navigate("MangaByCategory", {
                    category,
                  });
                }}
              />
              <Divider />
            </Fragment>
          ))}
        </Drawer.Section>
        <Divider />
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  drawerSection: {
    marginTop: 15,
    fontWeight: "bold",
  },
});
