import {

    BAN_USER_SUCCESS,
    BAN_USER_FAIL,
    ADD_USER_ROLE_SUCCESS,
    ADD_USER_ROLE_FAIL,
    APPROVE_USER_SUCCESS,
    APPROVE_USER_FAIL,FIND_ALL
} from "../actions/types";

const initialState = { findUsers: [] }
    ;

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case FIND_ALL:
            console.log("FIND_ALL");
            return {
                ...state, findUsers: payload,
            };
        
        default: return state;
    }
}