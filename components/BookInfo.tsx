import React, { memo } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Surface, Title, Divider, Text } from "react-native-paper";
import moment from "moment";
import { IBookInfo } from "../types";

const BookInfo = ({
  author,
  image,
  description,
  released,
  last_chapter_date,
  chapters,
  url,
  categories,
  title,
  handlePress,
  contentColor,
  imageBorderColor,
}: IBookInfo): JSX.Element => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView>
        <Surface style={styles.container}>
          <View style={styles.topRow}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: image }}
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
              {last_chapter_date
                ? moment.unix(last_chapter_date).format("DD MMM YYYY ")
                : "Sorry no data"}
            </Text>
            <Title style={styles.title}>Categories:</Title>
            <Text style={[styles.content, { color: contentColor }]}>
              {categories && categories.join(", ")}
            </Text>
            <Title style={{ ...styles.title }}>Link</Title>
            <Text
              style={[
                styles.content,
                {
                  color: "blue",
                  textDecorationLine: "underline",
                },
              ]}
              onPress={handlePress}
            >
              {url}
            </Text>
          </View>
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(BookInfo);

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    maxWidth: 450,
  },
  topRow: {
    fontFamily: "dancingFont",
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
    fontSize: 20,
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
    fontSize: 22,
  },
  content: {
    fontSize: 18,
    lineHeight: 26,
  },
});
