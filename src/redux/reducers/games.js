import { GAMES_FETCH, GAMES_FETCH_FAILED } from "../actions/games";

const initialState = {};

const Games = (state = initialState, action) => {
  switch (action.type) {
    case GAMES_FETCH:
      return {
        ...action.games,
      };
    default:
      return { ...state };
  }
};

export default Games;
