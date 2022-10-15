import {call, put, takeEvery} from 'redux-saga/effects';
import {history} from '../../history';
import {
  CHECK_REMEMBERED_USER_AC,
  checkRememberedUserSuccessAC,
  GET_CURRENT_USER_AC,
  GET_CURRENT_USER_SUCCESS_AC,
  getCurrentUserAC,
  getCurrentUserSuccessAC,
  LOGIN_SUCCESS_AC,
  LOGOUT_AC,
  logoutAC,
  logoutSuccessAC
} from '../actions';
import {getQueryParams, getValueFromStorage, removeValueFromStorage, storeValueToStorage} from '../../common/helpers';
import {STORAGE_KEYS} from '../../common/constants';
import {getCurrentUserAPI} from '../../api';

function* loginSuccessFlow(action) {
  const {tokens} = action;
  storeValueToStorage(STORAGE_KEYS.Tokens, tokens);
  yield put(getCurrentUserAC());
  const params = getQueryParams();
  if (params.redirectTo) {
    history.push(params.redirectTo);
    return;
  }
  history.push('/user/profile');
}

function* logoutFlow(action) {
  removeValueFromStorage(STORAGE_KEYS.Tokens);
  yield put(logoutSuccessAC());
  if (action.isSessionExpired) {
  }
  history.push('/login');
}

function* checkRememberedUserFlow() {
  try {
    const tokens = getValueFromStorage(STORAGE_KEYS.Tokens);
    if (!tokens) {
      yield put(checkRememberedUserSuccessAC(false));
      history.push('/login');
    } else {
      const {data: {data}} = yield call(getCurrentUserAPI);
      yield put(getCurrentUserSuccessAC(data));
    }
  } catch (e) {
    yield put(checkRememberedUserSuccessAC(false));
    history.push('/login');
  }
}

function* getCurrentUserInfoFlow() {
  try {
    const {data: {data}} = yield call(getCurrentUserAPI);
    yield put(getCurrentUserSuccessAC(data));
  } catch (e) {
    yield put(logoutAC(true));
  }
}

function getCurrentUserSuccessFlow(action) {
  try {
    const {data} = action;
    const user = getValueFromStorage(STORAGE_KEYS.User, {});
    if (data.id !== user.id) {
      storeValueToStorage(STORAGE_KEYS.User, {
        id: data.id,
      });
    }
  } catch (error) {

  }
}

export default function* () {
  yield takeEvery(LOGIN_SUCCESS_AC, loginSuccessFlow);
  yield takeEvery(LOGOUT_AC, logoutFlow);
  yield takeEvery(CHECK_REMEMBERED_USER_AC, checkRememberedUserFlow);
  yield takeEvery(GET_CURRENT_USER_AC, getCurrentUserInfoFlow);
  yield takeEvery(GET_CURRENT_USER_SUCCESS_AC, getCurrentUserSuccessFlow);
}
