import {
  TOKEN_LOADING,
  ON_APP_LOADING_FINISH,
} from '../actions';

const initialState = {
  loading: false,
  isAppReady: false,
  token: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN_LOADING: {
      return { ...state, token: action.payload };
    }
    case ON_APP_LOADING_FINISH: {
      return { ...state, isAppReady: true };
    }
    default:
      return state;
  }
};

export default rootReducer;
