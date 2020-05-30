import React from "react";
import { TouchableOpacity } from "react-native";

import { Appbar, Avatar, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Header = ({ scene, previous, navigation }: any) => {
  const theme = useTheme();
// console.log('SCENEE ', scene)
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <Appbar.Header
      theme={{ colors: { primary: theme.colors.surface } }}
      style={{ backgroundColor: theme.colors.primary }}
    >
      {previous ? (
        <Appbar.BackAction
          // onPress={navigation.pop}
          onPress={() => console.log("front pressed")}
          color={theme.colors.primary}
        />
      ) : (
        <TouchableOpacity
          onPress={() => {
            // navigation.openDrawer();
            console.log("back pressed");
          }}
        >
          <Avatar.Icon size={50} icon="menu" />
        </TouchableOpacity>
      )}
      <Appbar.Content
        title={
          previous ? (
            title
          ) : (
            <MaterialCommunityIcons name="book-open-page-variant" size={40} />
          )
        }
      />
    </Appbar.Header>
  );
};

export default Header;
