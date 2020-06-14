import "react-native";
import React from "react";
import App from "../App";

import renderer from "react-test-renderer";

describe("<App />", () => {
  it("match to snapshot", () => {
    const tree = renderer.create(<App />).toJSON();
    console.log(tree);
    expect(tree).toMatchSnapshot();
    // expect(tree).not.toEqual(null);
  });
});

it("renders correctly", () => {
  renderer.create(<App />);
});

// it('works', () => {
//   expect(1).toBe(1);
// });
