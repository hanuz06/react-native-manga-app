import React from "react";
import { Platform, SafeAreaView, View, Easing } from "react-native";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import MangaListScreen from "../screens/manga/MangaListScreen";
import MangaDetailsScreen from "../screens/manga/MangaDetailsScreen";
import FavoriteMangasScreen from "../screens/manga/FavoriteMangasScreen";

import Header from "../components/Header";

// const theme = useTheme();

const openCloseConfig: any = {
  animation: "timing",
  config: {
    duration: 300,
    easing: Easing.linear,
  },
};

// const defaultNavOptions: any = {
//   headerStyle: {
//     backgroundColor: Platform.OS === "android" ? theme.colors.primary : "",
//   },
//   headerTitleStyle: {
//     fontFamily: "roboto-bold",
//   },
//   headerBackTitleStyle: {
//     fontFamily: "roboto-regular",
//   },
//   headerTintColor: Platform.OS === "android" ? "white" : theme.colors.primary,
//   gestureEnabled: true,
//   gestureDirection: "horizontal",
//   ...TransitionPresets.SlideFromRightIOS,
//   // CardStyleInterpolators: CardStyleInterpolators.forHorizontalIOS,
//   transitionSpec: {
//     open: openCloseConfig,
//     close: openCloseConfig,
//   },
// };

// STACK NAVIGATION
const MangaStackNavigator = createStackNavigator();

export const MangaBooksNavigator: React.FC = (): JSX.Element => {
  return (
    <MangaStackNavigator.Navigator
      initialRouteName="Manga"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
    >
      <MangaStackNavigator.Screen
        name="Manga"
        component={MangaListScreen}
        options={{ headerTitle: "Manga books" }}
      />
      <MangaStackNavigator.Screen
        name="MangaDetails"
        component={MangaDetailsScreen}
        options={{ headerTitle: "Manga book details" }}
      />
    </MangaStackNavigator.Navigator>
  );
};
