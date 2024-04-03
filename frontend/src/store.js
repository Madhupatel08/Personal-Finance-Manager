import { createStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { allReducers } from "./reducers";

const rootReducer = combineReducers(allReducers)
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export default store;


// import { applyMiddleware, createStore } from 'redux';
// import rootReducer from './auth/reducer';
// import thunk from 'redux-thunk';

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;

