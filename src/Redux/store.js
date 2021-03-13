import { applyMiddleware, combineReducers, createStore } from 'redux';
import reducer from './reducer';
import thunkMiddleware from 'redux-thunk';

const reducers = combineReducers({
  reducer: reducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
