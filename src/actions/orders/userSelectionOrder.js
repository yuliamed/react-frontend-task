import {
    CREATE_SELECTION_ORDER_SUCCESS,
    UPDATE_SELECTION_ORDER_SUCCESS,
    CREATE_SELECTION_ORDER_FAIL,
    UPDATE_SELECTION_ORDER_FAIL,
    GET_SELECTION_ORDER_BY_ID_FAIL,
    GET_SELECTION_ORDER_BY_ID_SUCCESS,
    SET_MESSAGE
} from "../types";
import UserSelectionOrderService from "../../services/orders/userSelectionOrderService";
import { GET_SELECTION_REPORT } from "./autopicker/types";


export const createOrder =
    (userID, orderParams) =>
        (dispatch) => {
            return UserSelectionOrderService.createOrder(
                userID, orderParams
            ).then(
                (response) => {

                    dispatch({
                        type: CREATE_SELECTION_ORDER_SUCCESS,
                    });
                    return response;
                },
                (error) => {
                    dispatch({
                        type: CREATE_SELECTION_ORDER_FAIL,
                    });
                    const message =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    dispatch({
                        type: SET_MESSAGE,
                        payload: message,
                    });
                    return Promise.reject();
                }
            );
        };

export const updateOrder =
    (userID, orderId, orderParams) =>
        (dispatch) => {
            return UserSelectionOrderService.updateOrder(
                userID, orderId, orderParams
            ).then(
                (response) => {

                    dispatch({
                        type: UPDATE_SELECTION_ORDER_SUCCESS,
                    });
                    return response;
                },
                (error) => {
                    dispatch({
                        type: UPDATE_SELECTION_ORDER_FAIL,
                    });
                    const message =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    dispatch({
                        type: SET_MESSAGE,
                        payload: message,
                    });
                    return Promise.reject();
                }
            );
        };

export const getOrderById = (userID, orderId) =>
    (dispatch) => {
        return UserSelectionOrderService.getOrderByID(userID, orderId)
            .then((resp) => {
                dispatch({ type: GET_SELECTION_ORDER_BY_ID_SUCCESS, payload: resp }
                );
                dispatch({ type: GET_SELECTION_REPORT, payload: resp.report}
                );
                return resp;
            }, (error) => {
                dispatch({
                    type: GET_SELECTION_ORDER_BY_ID_FAIL,
                });
                const message =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                dispatch({
                    type: SET_MESSAGE,
                    payload: message,
                });
                return Promise.reject();
            })
    }