import {combineReducers} from 'redux';
import gameReducer from './game';

const appReducer = combineReducers({
  game: gameReducer
});

export default (state, action) => {
  if (action.type === 'NEW_GAME') {
    state = undefined;
  }

  return appReducer(state, action);
};
