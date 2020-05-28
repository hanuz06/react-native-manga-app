import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AppLoading } from "expo";
import * as Font from "expo-font";

import MangaListScreen from "./screens/manga/MangaListScreen";

const fetchFonts = () => {
  return Font.loadAsync({
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
    montserrat: require("./assets/fonts/Montserrat-regular"),
    "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
  });
};

export default function App(): JSX.Element {
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

  return <MangaListScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
