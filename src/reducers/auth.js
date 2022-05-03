const user = {
    name: "",
    email : "",
    pass: ""
}

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case "SIGNUP_SUCCEESS":
            return {
                ...state, isLoggedIn: false,
            };
        case "SIGNUP_FAIL":
            return {
                ...state, isLoggedIn: false,
            };
        case "SIGNIN_SUCCEESS":
            return {
                ...state, isLoggedIn: true, user: payload.user,
            };
        case "SIGNIN_FAIL":
            return {
                ...state, isLoggedIn: false, user: null,
            };
        case "LOGOUT":
            return {
                ...state, isLoggedIn: false, user: null,
            };
        default: return state;
    }
}
