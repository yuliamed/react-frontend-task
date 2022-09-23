import { combineReducers } from "redux";
import auth from "./auth";
import cash from "./cash";
import message from "./message";
import account from "./account";
import manageUsers from "./manageUsers";
import adminOrder from "./adminOrder";


export default combineReducers({
    auth,
    cash,
    message,
    account,
    manageUsers,
    adminOrder
});