import React from "react";
import { TouchableOpacity } from "react-native";
import { Appbar, Avatar, useTheme } from "react-native-paper";

const Header: React.FC = ({ scene, previous, navigation }: any) => {
  const theme = useTheme();
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
          onPress={navigation.pop}
          color={theme.colors.primary}
        />
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Avatar.Icon size={50} icon="menu" />
        </TouchableOpacity>
      )}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default Header;
