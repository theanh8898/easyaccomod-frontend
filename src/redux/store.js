import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas';

// Saga
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(sagaMiddleware),
  // other store enhancers if any
));

// Run saga
sagaMiddleware.run(rootSaga);

export default store;
