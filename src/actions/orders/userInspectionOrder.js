import {
    CREATE_INSPECTION_ORDER_SUCCESS,
    UPDATE_INSPECTION_ORDER_SUCCESS,
    CREATE_INSPECTION_ORDER_FAIL,
    UPDATE_INSPECTION_ORDER_FAIL,
    GET_INSPECTION_ORDER_BY_ID_SUCCESS,
    GET_INSPECTION_ORDER_BY_ID_FAIL,
    SET_MESSAGE
} from "../types";
import UserInspectionOrderService from "../../services/orders/userInspectionOrderService";


export const createOrder =
    (userID, orderParams) =>
        (dispatch) => {
            return UserInspectionOrderService.createOrder(
                userID, orderParams
            ).then(
                (response) => {

                    dispatch({
                        type: CREATE_INSPECTION_ORDER_SUCCESS,
                    });
                    return response;
                },
                (error) => {
                    dispatch({
                        type: CREATE_INSPECTION_ORDER_FAIL,
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
            return UserInspectionOrderService.updateOrder(
                userID, orderId, orderParams
            ).then(
                (response) => {

                    dispatch({
                        type: UPDATE_INSPECTION_ORDER_SUCCESS,
                    });
                    return response;
                },
                (error) => {
                    dispatch({
                        type: UPDATE_INSPECTION_ORDER_FAIL,
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
        return UserInspectionOrderService.getOrderByID(userID, orderId)
            .then((resp) => {
                dispatch({ type: GET_INSPECTION_ORDER_BY_ID_SUCCESS })
                return resp;
            }, (error) => {
                dispatch({
                    type: GET_INSPECTION_ORDER_BY_ID_FAIL,
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