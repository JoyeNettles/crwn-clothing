import {createStore, applyMiddleware} from "redux";
import logger from 'redux-logger';
import {persistStore} from "redux-persist";
import rootReducer from './root-reducer';
import thunk from 'redux-thunk';

const loggerMiddleware = process.env.NODE_ENV === 'development' ? logger : null;

const middlewares = [loggerMiddleware, thunk];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default {store, persistor};
