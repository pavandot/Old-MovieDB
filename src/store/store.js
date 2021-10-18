import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./reducers/userReducer";
import { uiReducer } from "./reducers/uiReducer";
const reducer = combineReducers({ user: userReducer, ui: uiReducer });
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(reducer, enhancer);

export default store;
