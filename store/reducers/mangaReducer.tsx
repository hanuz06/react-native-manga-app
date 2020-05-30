import { SET_MANGA_LIST, IBookState, BookActionsType } from "../../types";

const initialState: IBookState = {
  allMangaBooks: [],
};

export default (state = initialState, action: BookActionsType) => {
  switch (action.type) {
    case SET_MANGA_LIST:
      return {
        ...state,
        allMangaBooks: action.books,
      };
    default:
      return state;
  }
};
