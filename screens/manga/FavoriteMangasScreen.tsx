import React from "react";
import { StyleSheet, Text, View } from "react-native";

const FavoriteMangasScreen: React.FC = () => {
  return (
    <View style={styles.main}>
      <Text>FAVORITE MANGA BOOKS</Text>
    </View>
  );
};

export default FavoriteMangasScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
