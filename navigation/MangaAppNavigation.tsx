import React from "react";
import {
  Platform,
  SafeAreaView,
  View,
  Easing,
  TouchableOpacity,
} from "react-native";
import {
  DrawerItem,
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerComponentProps,
  DrawerNavigationProp,
  DrawerContentOptions,
} from "@react-navigation/drawer";
import {
  createStackNavigator,
  TransitionPresets,
  StackNavigationProp,
} from "@react-navigation/stack";

import {
  useTheme,
  Avatar,
  Appbar,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import color from "color";

import MangaListScreen from "../screens/manga/MangaListScreen";
import MangaDetailsScreen from "../screens/manga/MangaDetailsScreen";
import FavoriteMangasScreen from "../screens/manga/FavoriteMangasScreen";
import MangaByCategoryScreen from "../screens/manga/MangaByCategoryScreen";

import Header from "../components/Header";
import DrawerContent from "../components/DrawerContent";

import { useDispatch } from "react-redux";
import * as mangaActions from "../store/actions/mangaActions";

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

//DRAWER NAVIGATION
const DrawerNavigation = createDrawerNavigator();

export const RootNavigator = () => {
  const theme = useTheme();

  return (
    <DrawerNavigation.Navigator
      drawerContent={(
        props: DrawerContentComponentProps<DrawerContentOptions>
      ): JSX.Element => <DrawerContent {...props} />}
      drawerContentOptions={{
        activeTintColor: theme.colors.surface,
        activeBackgroundColor: (theme.colors.primary),
        labelStyle: {
          fontWeight: "bold",
          fontSize: 18,
        },
      }}
      drawerStyle={{
        width: 250,
      }}
      drawerType='back'
    >
      <DrawerNavigation.Screen
        name="Home"
        component={MangaBooksNavigator}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={24}
            />
          ),
          drawerLabel: "Home",
        }}
      />
    </DrawerNavigation.Navigator>
  );
};

// STACK NAVIGATION
type MangaStackParamList = {
  MangaList: undefined;
  MangaDetails: { bookId: string };
  MangaByCategory: { category: string };
};

const MangaStackNavigation = createStackNavigator<MangaStackParamList>();

export const MangaBooksNavigator: React.FC = (): JSX.Element => {
  const theme = useTheme();

  return (
    <MangaStackNavigation.Navigator
      initialRouteName="MangaList"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }: any) => {
          // const dispatch = useDispatch();

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
                  onPress={navigation.goBack}
                  color={theme.colors.accent}
                  size={30}
                />
              ) : (
                <TouchableOpacity onPress={navigation.openDrawer}>
                  <Avatar.Icon
                    size={50}
                    icon="menu"
                    color={theme.colors.accent}
                  />
                </TouchableOpacity>
              )}
              <Appbar.Content
                title={title}
                color={theme.colors.accent}
                titleStyle={{ fontWeight: "bold" }}
              />
            </Appbar.Header>
          );
        },
      }}
    >
      <MangaStackNavigation.Screen
        name="MangaList"
        component={MangaListScreen}
        options={{ headerTitle: "Manga books" }}
      />
      <MangaStackNavigation.Screen
        name="MangaDetails"
        component={MangaDetailsScreen}
        options={{ headerTitle: "Manga book details" }}
        initialParams={{ bookId: "" }}
      />
      <MangaStackNavigation.Screen
        name="MangaByCategory"
        component={MangaByCategoryScreen}
        options={{ headerTitle: "Manga by category" }}
        initialParams={{ category: "" }}
      />
    </MangaStackNavigation.Navigator>
  );
};
