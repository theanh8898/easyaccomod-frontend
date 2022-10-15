import {all} from 'redux-saga/effects';
import UserWatcher from './user.saga';

export default function* rootSaga() {
  yield all([
    ...UserWatcher(),
  ]);
}
