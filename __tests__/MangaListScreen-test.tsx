import "react-native";
import React from "react";
import MangaListScreen from "../screens/manga/MangaListScreen";

import renderer from "react-test-renderer";

describe("<MangaListScreen />", () => {
  jest.mock('react-redux', () => {
    const ActualReactRedux = require.requireActual('react-redux');
    return {
        ...ActualReactRedux,
        useSelector: jest.fn().mockImplementation(() => {
            return mockState;
        }),
    };
});

  it("match to snapshot", () => {
    const mangaListScreen = renderer.create(<MangaListScreen />).toJSON();   
    expect(mangaListScreen).toMatchSnapshot();  
  });
});

it("renders correctly", () => {
  renderer.create(<MangaListScreen />);
});
