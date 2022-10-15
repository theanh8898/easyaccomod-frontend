import {
  CHECK_REMEMBERED_USER_AC,
  CHECK_REMEMBERED_USER_SUCCESS_AC,
  GET_CURRENT_USER_SUCCESS_AC,
  LOGIN_SUCCESS_AC
} from '../actions';
import createReducer from '../createReducer';

const initialState = {
  isAuthenticated: false,
  isCheckingRememberedUser: false,
  info: null,
};

const handler = {
  [LOGIN_SUCCESS_AC]: (state) => {
    return {
      ...state,
      isAuthenticated: true,
    };
  },
  [GET_CURRENT_USER_SUCCESS_AC]: (state, action) => ({
    ...state,
    info: action.data,
    isAuthenticated: true,
    isCheckingRememberedUser: false,
  }),
  [CHECK_REMEMBERED_USER_AC]: (state) => ({
    ...state,
    isCheckingRememberedUser: true,
  }),
  [CHECK_REMEMBERED_USER_SUCCESS_AC]: (state, action) => ({
    ...state,
    isCheckingRememberedUser: false,
    isAuthenticated: !!action.isAuthenticated,
  }),
};

export default createReducer(initialState, handler);
