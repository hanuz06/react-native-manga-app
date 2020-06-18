import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";

// This import loads the firebase namespace.
import firebase from "firebase/app";

// These imports load individual services into the firebase namespace.
import "firebase/storage";
import "firebase/database";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider as ReduxProvider } from "react-redux";
import ReduxThunk from "redux-thunk";
import mangaReducer from "./store/reducers/mangaReducer";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "./navigation/MangaAppNavigation";
import { KEY } from "react-native-dotenv";

const rootReducer = combineReducers({
  manga: mangaReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    surface: "#FFFFF0",
    primary: "#d32f2f",
    accent: "white",
  },
};

var firebaseConfig = {
  apiKey: { KEY },
  authDomain: "react-native-manga-reader-app.firebaseapp.com",
  databaseURL: "https://react-native-manga-reader-app.firebaseio.com",
  projectId: "react-native-manga-reader-app",
  storageBucket: "react-native-manga-reader-app.appspot.com",
  messagingSenderId: "863581223721",
  appId: "1:863581223721:web:1104e2847f181021abd538",
  measurementId: "G-9JCXKZ66LR",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function App() {
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);

  return (
    <SafeAreaProvider>
      <ReduxProvider store={store}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <RootNavigator />
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
