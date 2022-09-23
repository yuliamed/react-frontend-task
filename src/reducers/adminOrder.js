import {
    FIND_ALL_ORDERS,
} from "../actions/orders/admin/types";

const initialState = { orders: [] }
    ;

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case FIND_ALL_ORDERS:
            console.log("FIND_ALL");
            return {
                ...state, orders: payload,
            };

        default: return state;
        
    }
}