import {
    CHANGE_PASS_FAIL, CHANGE_PASS_SUCCESS,
  } from "../actions/types";

const initialState = { isPassChanged: false }
    ;

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CHANGE_PASS_SUCCESS:
            return {
                ...state, isPassChanged: true,
            };
        case CHANGE_PASS_FAIL:
            return {
                ...state, isPassChanged: false,
            };
        default: return state;
    }
}
