import "react-native";
import React from "react";
import BookInfo from "../components/BookInfo";

import renderer from "react-test-renderer";

const Props: any = {
  id: "",
  author: "",
  categories: [],
  chapters: [],
  description: "",
  image: "",
  last_chapter_date: 0,
  released: 0,
  title: "",
  url: "",
  contentColor: "black",
  imageBorderColor: "grey",
  handlePress: () => {},
};

describe("<BookInfo />", () => {
  it("match to snapshot", () => {
    const BookInfoPage = renderer.create(<BookInfo {...Props} />).toJSON();
    expect(BookInfoPage).toMatchSnapshot();
  });
});
