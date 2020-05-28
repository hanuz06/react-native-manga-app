import React from "react";
import { StyleSheet, Text, View } from "react-native";

const MangaListScreen: React.FC = (): JSX.Element => {
  return (
    <View style={styles.main}>
      <Text>MANGA LIST SCREEN</Text>
    </View>
  );
};

export default MangaListScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
