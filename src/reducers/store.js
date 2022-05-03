import { createStore, combineReducers } from 'redux';
import auth  from "./auth"
import cash from "./cash"

const rootReduser = combineReducers({
    auth, cash
})

export const store = createStore(rootReduser)