import {
    FIND_ALL_ORDERS, SET_AUTOPICKER_SUCCESS, SET_AUTOPICKER_FAIL
} from "./types";
import { SET_MESSAGE } from "../../types";
import AdminOrderService from "../../../services/orders/admin/adminOrderService";


export const findAll =
    (userID, param) =>
        (dispatch) => {
            return AdminOrderService.findAll(
                userID, param
            ).then(
                (response) => {

                    dispatch({
                        type: FIND_ALL_ORDERS,
                    });
                    return response;
                },
                (error) => {

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

export const setAutopicker =
    (adminID, orderId, autoPickerId) =>
        (dispatch) => {
            return AdminOrderService.setAutopicker(
                adminID, orderId, autoPickerId
            ).then(
                (response) => {

                    dispatch({
                        type: SET_AUTOPICKER_SUCCESS,
                    });
                    return response;
                },
                (error) => {
                    dispatch({
                        type: SET_AUTOPICKER_FAIL,
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