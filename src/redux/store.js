import {createStore, applyMiddleware} from "redux";
import logger from 'redux-logger';
import {persistStore} from "redux-persist";
import rootReducer from './root-reducer';

const middleware = process.env.NODE_ENV === 'development' ? logger : null;

export const store = createStore(rootReducer, applyMiddleware(middleware));

export const persistor = persistStore(store);

export default {store, persistor};
