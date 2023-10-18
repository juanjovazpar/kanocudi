import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import authenticateReduce from './authenticate/reducer';

const rootReducer = combineReducers({
  authenticateState: authenticateReduce,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
