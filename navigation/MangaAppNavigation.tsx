import React, { useState, useEffect, useRef } from "react";
import {
  Platform,
  SafeAreaView,
  View,
  Easing,
  TouchableOpacity,
  StatusBar,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
} from "react-native";
import {
  DrawerItem,
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerNavigationProp,
  DrawerContentOptions,
} from "@react-navigation/drawer";
import {
  createStackNavigator,
  TransitionPresets,
  StackNavigationProp,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
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
  Searchbar,
  Switch,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import color from "color";

import MangaListScreen from "../screens/manga/MangaListScreen";
import MangaDetailsScreen from "../screens/manga/MangaDetailsScreen";
import FavoriteMangasScreen from "../screens/manga/FavoriteMangasScreen";
import MangaByCategoryScreen from "../screens/manga/MangaByCategoryScreen";
import ChapterContentScreen from "../screens/manga/ChapterContentScreen";

import Header from "../components/Header";
import DrawerContent from "../components/DrawerContent";

import { useDispatch } from "react-redux";
import * as mangaActions from "../store/actions/mangaActions";
import * as Animatable from "react-native-animatable";
import { SimpleAnimation } from "react-native-simple-animations";

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
        activeBackgroundColor: theme.colors.primary,
        labelStyle: {
          fontWeight: "bold",
          fontSize: 18,
        },
      }}
      drawerStyle={{
        width: 250,
      }}
      drawerType="back"
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
  ChapterContent: { chapterId: string };
};

const MangaStackNavigation = createStackNavigator<MangaStackParamList>();

export const MangaBooksNavigator: React.FC = (): JSX.Element => {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <MangaStackNavigation.Navigator
      initialRouteName="MangaList"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }: any) => {
          const [searchWord, setSearchWord] = useState<string>("");
          const [isOn, setIsOn] = useState<boolean>(false);
          const [toggleValue, setToggleValue] = useState(true);
          const { options } = scene.descriptor;
          const { name } = navigation.dangerouslyGetState().routes[
            navigation.dangerouslyGetState().index
          ];
          const title = options.title;
          // const title =
          // options.headerTitle !== undefined
          //   ? options.headerTitle
          //   : options.title !== undefined
          //   ? options.title
          //   : scene.route.name;

          const switchToggle = () => {
            setIsOn(!isOn);
            dispatch(mangaActions.reverseChapters());
          };

          let initialValue = new Animated.Value(50);
          const interpolateSearchBar = initialValue.interpolate({
            inputRange: [50, 160],
            outputRange: toggleValue ? [50, 160] : [160, 50],
          });
          const animatedTransition = Animated.timing(initialValue, {
            toValue: 160,
            duration: 1200,
            easing: Easing.linear,
          });

          const clickAnimate = () => {
            animatedTransition.start();
          };

          return (
            <>
              <StatusBar
                hidden={name === "ChapterContent" ? true : false}
                animated={true}
                backgroundColor={theme.colors.primary}
                translucent={true}
              />
              <TouchableWithoutFeedback
                onPress={() => {
                  Keyboard.dismiss(), setToggleValue(true);
                }}
                accessible={false}
              >
                <Appbar.Header
                  theme={{ colors: { primary: theme.colors.surface } }}
                  style={{ backgroundColor: theme.colors.primary }}
                >
                  {previous ? (
                    <Appbar.BackAction
                      onPress={() => {
                        Keyboard.dismiss(),
                          setSearchWord(""),
                          setToggleValue(true),
                          dispatch(mangaActions.setSearchWord("")),
                          navigation.goBack();
                      }}
                      color={theme.colors.accent}
                      size={30}
                    />
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        Keyboard.dismiss(),
                          setSearchWord(""),
                          setToggleValue(true),
                          dispatch(mangaActions.setSearchWord(""));
                        navigation.openDrawer();
                      }}
                    >
                      <Avatar.Icon
                        size={50}
                        icon="menu"
                        color={theme.colors.accent}
                      />
                    </TouchableOpacity>
                  )}
                  <Appbar.Content
                    title={options.headerTitle}
                    color={theme.colors.accent}
                    titleStyle={{ fontWeight: "bold" }}
                  />

                  {title === "chapters" && (
                    <Switch
                      color="#98FB98"
                      value={isOn}
                      onValueChange={switchToggle}
                    />
                  )}
                  {(name === "MangaList" || name === "MangaByCategory") && (
                    <Animated.View
                      style={{
                        width: interpolateSearchBar,
                      }}
                    >
                      <Searchbar
                        // placeholder="Search..."
                        value={searchWord}
                        onChangeText={(word) => {
                          setSearchWord(word),
                            dispatch(mangaActions.setSearchWord(word));
                        }}
                        onIconPress={() => {
                          setToggleValue(!toggleValue), clickAnimate();
                        }}
                        style={{
                          height: 35,
                          borderRadius: 8,
                          borderColor: "#ADD8E6",
                          borderWidth: 1.5,
                          elevation: 15,
                        }}
                      />
                    </Animated.View>
                  )}
                </Appbar.Header>
              </TouchableWithoutFeedback>
            </>
          );
        },
        gestureEnabled: true,
        gestureDirection: "horizontal",
        ...TransitionPresets.SlideFromRightIOS,
        transitionSpec: {
          open: openCloseConfig,
          close: openCloseConfig,
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
        options={{
          headerTitle: "Manga book details",
          headerStyleInterpolator: HeaderStyleInterpolators.forFade,
        }}
        initialParams={{ bookId: "" }}
      />
      <MangaStackNavigation.Screen
        name="MangaByCategory"
        component={MangaByCategoryScreen}
        options={{
          headerTitle: "Manga by category",
          headerStyleInterpolator: HeaderStyleInterpolators.forFade,
        }}
        initialParams={{ category: "" }}
      />
      <MangaStackNavigation.Screen
        name="ChapterContent"
        component={ChapterContentScreen}
        options={{ headerShown: false }}
        initialParams={{ chapterId: "" }}
      />
    </MangaStackNavigation.Navigator>
  );
};
