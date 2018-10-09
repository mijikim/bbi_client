import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from '../reducers'
import sagas from '../sagas'
import { createLogger } from 'redux-logger';
import freeze from 'redux-freeze';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({ collapsed: true }); 

  middlewares.push(logger);
  middlewares.push(freeze);
}

const store = createStore(
  reducer,
  applyMiddleware(...middlewares)
);

Object.values(sagas).forEach(saga => sagaMiddleware.run(saga));

export default store;
