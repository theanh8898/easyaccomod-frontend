import {combineReducers} from 'redux';
import user from './user.reducer';
import {LOGOUT_SUCCESS_AC} from '../actions';

const appReducer = combineReducers({
  user,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_SUCCESS_AC) {
    state = undefined
  }
  return appReducer(state, action)
};

export default rootReducer;
