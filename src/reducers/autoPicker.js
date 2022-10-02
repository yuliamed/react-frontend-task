import {
    GET_AUTOPICKER_ORDERS,
    SAVE_NEW_SELECTION_REPORT_SUCCESS,
    SAVE_EDITED_SELECTION_REPORT_SUCCESS,
    GET_SELECTION_REPORT,
    EDIT_SELECTION_REPORT,
    CREATE_SELECTION_REPORT,
    CLEAN_REPORT
} from "../actions/orders/autopicker/types";

const initialState = { report: null };

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SAVE_NEW_SELECTION_REPORT_SUCCESS:
            return {
                ...state, report: payload,
            };
        case SAVE_EDITED_SELECTION_REPORT_SUCCESS:
            return {
                ...state, report: payload,
            };
        case EDIT_SELECTION_REPORT:
            console.log(payload);
            return {
                ...state, report: payload,
            };
        case CREATE_SELECTION_REPORT:
            return {
                ...state, report: payload,
            };
        case GET_SELECTION_REPORT:
            console.log("GET_SELECTION_REPORT");
            return {
                ...state, report: payload,
            };
        case CLEAN_REPORT:
            return {
                ...state, report: null
            }
        default: return state;
    }
}