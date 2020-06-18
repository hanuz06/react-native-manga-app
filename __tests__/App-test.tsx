import "react-native";
import React from "react";
import App from "../App";

import renderer from "react-test-renderer";

describe("<App />", () => {
  it("match to snapshot", () => {
    const tree = renderer.create(<App />).toJSON();   
    expect(tree).toMatchSnapshot();  
  });
});

it("renders correctly", () => {
  renderer.create(<App />);
});

