import React from "react";
import { StyleSheet, Text, View } from "react-native";

const LoginScreen: React.FC = (): JSX.Element => {
  return (
    <View style={styles.main}>
      <Text>LOGIN SCREEN</Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
