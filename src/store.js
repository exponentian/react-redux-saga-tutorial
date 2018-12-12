import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import rootReducer from './reducers/';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middleware = [
  sagaMiddleware,
  createLogger()
];

const store = createStore(
  rootReducer,
  undefined,
  compose(
    applyMiddleware(...middleware)
  )
);

sagaMiddleware.run(rootSaga);

export default store;