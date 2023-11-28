import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Reduce from '../reduce/reduce';

const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    Reduce,
    composeEnhacer(applyMiddleware(thunkMiddleware))
);

export default store;