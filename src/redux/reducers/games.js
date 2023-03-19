import { GAMES_FETCH, GAMES_FETCH_FAILED } from "../actions/games";

const initialState = { games: null };

const Games = (state = initialState, action) => {
  switch (action.type) {
    case GAMES_FETCH:
      return {
        games: action.games,
      };
    default:
      return { ...state };
  }
};

export default Games;
