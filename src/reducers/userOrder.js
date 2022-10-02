import {

    CREATE_SELECTION_ORDER_SUCCESS,
    CREATE_INSPECTION_ORDER_SUCCESS,
    UPDATE_INSPECTION_ORDER_SUCCESS,
    UPDATE_SELECTION_ORDER_SUCCESS,
    CHANGE_ORDER_STATUS_SUCCESS,
    CREATE_SELECTION_ORDER_FAIL,
    CREATE_INSPECTION_ORDER_FAIL,
    UPDATE_INSPECTION_ORDER_FAIL,
    UPDATE_SELECTION_ORDER_FAIL,
    CHANGE_ORDER_STATUS_FAIL,
    GET_USERS_ORDERS,
    GET_SELECTION_ORDER_BY_ID_SUCCESS
} from "../actions/types";

const initialState = { userOrders: [], order: null }
    ;

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_USERS_ORDERS:
            console.log("GET_USERS_ORDERS");
            return {
                ...state, userOrders: payload,
            };
        case GET_SELECTION_ORDER_BY_ID_SUCCESS:
            console.log("GET_SELECTION_ORDER_BY_ID_SUCCESS");
            return {
                ...state, order: payload,
            };

        default: return state;
    }
}