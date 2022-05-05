import { createStore, applyMiddleware } from 'redux';
// import auth from "./reducers/auth"
// import cash from "./reducers/cash"
import rootReducer from "./reducers/combine";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
const middleware = [thunk];

export const store = createStore(
    rootReducer, 
    composeWithDevTools(applyMiddleware(...middleware)))