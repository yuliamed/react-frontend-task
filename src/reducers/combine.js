import { combineReducers } from "redux";
import auth from "./auth";
import cash from "./cash";
import message from "./message";
import account from "./account";


export default combineReducers({
    auth,
    cash,
    message,
    account
});