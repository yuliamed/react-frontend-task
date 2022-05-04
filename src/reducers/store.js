import { createStore, combineReducers } from 'redux';
import auth  from "./auth"
import cash from "./cash"
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReduser = combineReducers({
    auth, cash
})

export const store = createStore(rootReduser, composeWithDevTools())