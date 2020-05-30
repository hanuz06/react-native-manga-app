module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo",
      // "react-native",
      // "react-native-dotenv",
      "module:metro-react-native-babel-preset",
      "module:react-native-dotenv",
    ],
  };
};
