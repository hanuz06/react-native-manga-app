import React, { useState, useEffect, Fragment } from "react";
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
  ActivityIndicator,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { IBook, IBookState } from "../../types";
import { useSelector, useDispatch } from "react-redux";
import * as mangaActions from "../store/actions/mangaActions";

const DrawerContent = (props: any): JSX.Element => {
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const categories = useSelector<IBookState, string[]>(
    (state: any) => state.manga.categories
  );
  // console.log("CATEGORIES IN DRAWER CONTENT ", categories);
  const dispatch = useDispatch();

  // if (isLoading) {
  //   return (
  //     <View style={styles.centered}>
  //       <ActivityIndicator size="large" color="rgb(0,0,0)" />
  //     </View>
  //   );
  // }

  // useEffect(() => {
  //   isLoading && (
  //     <View style={styles.centered}>
  //       <ActivityIndicator size="large" color="rgb(0,0,0)" />
  //     </View>
  //   );
  // }, [isLoading]);

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
                onPress={async () => {
                  // setIsLoading(true);
                  // console.log("dispatch started...");
                  await dispatch(mangaActions.setBooksByCategory(category));
                  // console.log("dispatch finished...");
                  // setIsLoading(false);
                  props.navigation.navigate("MangaByCategory", {
                    category,
                  });
                  // console.log("ALL ROUTES ", props.navigation);
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
