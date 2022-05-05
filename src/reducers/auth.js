import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    SIGNIN_SUCCESS,
    SIGNIN_FAIL,
    LOGOUT,
  } from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SIGNUP_SUCCESS:
            return {
                ...state, isLoggedIn: false,
            };
        case SIGNUP_FAIL:
            return {
                ...state, isLoggedIn: false,
            };
        case SIGNIN_SUCCESS:
            return {
                ...state, isLoggedIn: true, user: payload.user,
            };
        case SIGNIN_FAIL:
            return {
                ...state, isLoggedIn: false, user: null,
            };
        case LOGOUT:
            return {
                ...state, isLoggedIn: false, user: null,
            };
        default: return state;
    }
}
