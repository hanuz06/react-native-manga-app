import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import {
  Provider as PaperProvider,
  DefaultTheme,
  configureFonts,
} from "react-native-paper";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider as ReduxProvider } from "react-redux";
import ReduxThunk from "redux-thunk";

import mangaReducer from "./store/reducers/mangaReducer";

import { AppLoading } from "expo";
import * as Font from "expo-font";
import { fontConfig } from "./constants/fontConfig";

import { NavigationContainer } from "@react-navigation/native";
import { MangaBooksNavigator } from "./navigation/MangaAppNavigation";

// import { Provider as StoreProvider } from "react-redux";

import MangaListScreen from "./screens/manga/MangaListScreen";

// import { BASE_URL } from "react-native-dotenv";
// import { DrawerContent } from "./navigation/MangaAppNavigation";

const rootReducer = combineReducers({
  manga: mangaReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
    montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
    "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    // "montserrat-light": require("./assets/fonts/Montserrat-Light.ttf"),
    // "montserrat-medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    // "montserrat-thin": require("./assets/fonts/Montserrat-Thin.ttf"),
  });
};

const theme = {
  ...DefaultTheme,
  // dark: 'true',
  // mode: 'adaptive',
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    accent: "yellow",
  },
  fonts: configureFonts(fontConfig),
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <SafeAreaProvider>
      <ReduxProvider store={store}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <MangaBooksNavigator />
            {/* <DrawerContent /> */}
          </NavigationContainer>
        </PaperProvider>
      </ReduxProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
