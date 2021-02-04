import {
  SAVE_TOKEN,
  ON_APP_LOADING_FINISH,
  ON_USER_DATA
} from '../actions';

import { combineReducers } from 'redux';

const initialState = {
  loading: false,
  isAppReady: false,
  token: null,
  user: null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_USER_DATA: {
      return { ...state, user: action.payload };
    }
    case SAVE_TOKEN: {
      return { ...state, token: action.payload };
    }
    case ON_APP_LOADING_FINISH: {
      return { ...state, isAppReady: true };
    }
    default:
      return state;
  }
};

const reducers = {
  rootReducer,
};
const allReducers = combineReducers(reducers);

export default allReducers;
