# react-native-manga-app

This is a manga reader app that allows users to see a general list of manga books, a list by categories, book details, search books, chapter content.

!["React Native manga app in action"](/assets/gif/react-manga.gif)

## Downloading the project

Fork and clone this repo. It is recommended to install Android Studio Emulator as instructed 👉 in [expo-android-studio-emulator](https://docs.expo.io/workflow/android-studio-emulator/) or iOS Simulator as instructed 👉 in [expo-iOS-emulator](https://docs.expo.io/workflow/ios-simulator/). The following instruction is for Android Studio. 

## Install Expo CLI

```sh
npm install -g expo-cli
```

## Running the project

Open a virtual device in Android Studio.

```sh
cd react-native-visits-app
expo start
```

In the opened new window (usually on localhost:19002), click on the "Run on $(your device)" section to run app on the smartphone simulator or web.

## Dependencies

- redux ^4.0.5
- react-redux ^7.2.0
- redux-thunk ^2.3.0
- react-native
- react-navigation ^4.3.8
- expo ~37.0.3
- moment ^2.26.0
- axios ^0.19.2
- Firebase database/storage