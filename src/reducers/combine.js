import { combineReducers } from "redux";
import auth from "./auth";
import cash from "./cash";


export default combineReducers({
    auth,
    cash,
});