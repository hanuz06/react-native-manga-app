import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { Surface, Title, Divider, useTheme } from "react-native-paper";
import color from "color";

import moment from "moment";

import Constants from "expo-constants";

import { IBookDetails } from "../types";

import { IMAGE_URL } from "react-native-dotenv";

// type Props = {
//   id: number;
//   name: string;
//   handle: string;
//   date: string;
//   content: string;
//   image: string;
//   avatar: string;
//   comments: number;
//   retweets: number;
//   hearts: number;
// };

const BookInfo = ({
  id,
  author,
  image,
  description,
  released,
  last_chapter_date,
  chapters,
  url,
  categories,
  title,
}: IBookDetails) => {
  const theme = useTheme();

  const contentColor = color(theme.colors.text).alpha(0.8).rgb().string();
  const imageBorderColor = color(theme.colors.text).alpha(0.15).rgb().string();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView>
        <Surface style={styles.container}>
          <View style={styles.topRow}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: `${IMAGE_URL}/${image}` }}
                style={[
                  styles.image,
                  {
                    borderColor: imageBorderColor,
                  },
                ]}
              />
            </View>
            <View style={styles.bookInfoContainer}>
              <Title style={styles.title}>{title}</Title>
              <Divider />
              <View style={styles.authorReleaseChapterContainer}>
                <Title style={styles.authorReleaseChapterStyle}>Author:</Title>
                <Text style={[styles.content, { color: contentColor }]}>
                  {author}
                </Text>
              </View>
              <Divider />
              <View style={styles.authorReleaseChapterContainer}>
                <Title style={styles.authorReleaseChapterStyle}>
                  Release date:
                </Title>
                <Text style={[styles.content, { color: contentColor }]}>
                  {released}
                </Text>
              </View>
              <View style={styles.authorReleaseChapterContainer}>
                <Title style={styles.authorReleaseChapterStyle}>
                  Total chapters:
                </Title>
                <Text style={[styles.content, { color: contentColor }]}>
                  {chapters.length}
                </Text>
              </View>
            </View>
          </View>
          <Divider />
          <View style={styles.bottomRow}>
            <Title style={styles.title}>Description</Title>
            <Text style={[styles.content, { color: contentColor }]}>
              {description}
            </Text>
            <Title style={styles.title}>Last updated:</Title>
            <Text style={[styles.content, { color: contentColor }]}>
              {moment(last_chapter_date).format("DD MMM YYYY")}
            </Text>
            <Title style={styles.title}>Categories:</Title>
            <Text style={[styles.content, { color: contentColor }]}>
              {categories && categories.join(", ")}
            </Text>
            <Title style={styles.title}>Link:</Title>
            <Text style={[styles.content, { color: contentColor }]}>{url}</Text>
          </View>
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookInfo;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    maxWidth: 450,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  imageContainer: {
    width: "35%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    borderWidth: StyleSheet.hairlineWidth,
    width: "100%",
    height: 200,
  },
  bookInfoContainer: {
    width: "65%",
    padding: 15,
    alignItems: "flex-start",
  },
  authorReleaseChapterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  authorReleaseChapterStyle: {
    fontWeight: "bold",
    marginRight: 5,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  bottomRow: {
    marginVertical: 15,
  },
  title: {
    marginVertical: 5,
    fontWeight: "bold",
    fontSize: 24,
  },
  
  content: {
    fontSize: 18,
    lineHeight: 26,
  },
});
