import {
    EDIT_BODY_PART_DESCRIPTION,
    SAVE_NEW_SELECTION_REPORT_SUCCESS,
    SAVE_EDITED_SELECTION_REPORT_SUCCESS,
    GET_SELECTION_REPORT,
    EDIT_SELECTION_REPORT,
    CREATE_SELECTION_REPORT,
    CLEAN_REPORT,
    GET_INSPECTION_ORDER,
    GET_INSPECTION_REPORT,
    EDIT_INSPECTION_BODY_REPORT,
    EDIT_INSPECTION_SALON_REPORT,
    EDIT_INSPECTION_ELECTRIC_REPORT,
    EDIT_INSPECTION_MAIN_INFO,
    EDIT_INSPECTION_ENGINE_REPORT,
    SAVE_EDITTED_ENGINE_REPORT,
    EDIT_INSPECTION_TRANSMISSION_REPORT,
    EDIT_INSPECTION_PENDANT_REPORT,
    SAVE_EDITTED_INSPECTION_BODY_REPORT,
    SAVE_EDITTED_INSPECTION_SALON_REPORT,
    SAVE_EDITTED_ELECTRIC_REPORT,
    SAVE_EDITTED_INSPECTION_MAIN_INFO,
    SAVE_EDITTED_PENDANT_REPORT,
    SAVE_EDITTED_TRANSMISSION_REPORT
} from "../actions/orders/autopicker/types";

const initialState = { report: null, order: null };

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
        case GET_INSPECTION_ORDER:
            console.log("GET_INSPECTION_ORDER");
            return {
                ...state, order: payload,
            };
        case GET_INSPECTION_REPORT:
            console.log("GET_INSPECTION_REPORT");
            return {
                ...state, report: payload,
            };
        case EDIT_INSPECTION_BODY_REPORT, EDIT_INSPECTION_SALON_REPORT,
            EDIT_INSPECTION_ELECTRIC_REPORT, EDIT_INSPECTION_MAIN_INFO,
            EDIT_INSPECTION_ENGINE_REPORT, EDIT_INSPECTION_PENDANT_REPORT,
            EDIT_INSPECTION_TRANSMISSION_REPORT:
            return {
                ...state, report: payload,
            };
        case SAVE_EDITTED_INSPECTION_BODY_REPORT, SAVE_EDITTED_INSPECTION_SALON_REPORT,
            SAVE_EDITTED_ELECTRIC_REPORT,SAVE_EDITTED_INSPECTION_MAIN_INFO,
            SAVE_EDITTED_ENGINE_REPORT, SAVE_EDITTED_PENDANT_REPORT,
            SAVE_EDITTED_TRANSMISSION_REPORT :
            return {
                ...state, report: payload,
            };
        case EDIT_BODY_PART_DESCRIPTION:{
            let newReport = state.report;
            newReport.bodyReport.descriptions[payload.id]=payload.description;
            return{
                ...state, report: newReport
            }
        }

        case CLEAN_REPORT:
            return {
                ...state, report: null
            }
        default: return state;
    }
}