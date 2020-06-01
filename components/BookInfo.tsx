import React from "react";
import { StyleSheet, Text, View } from "react-native";

const BookInfo = () => {
  return (
    <View style={styles.main}>
      <Text>BOOK INFORMATION</Text>
    </View>
  );
};

export default BookInfo;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
