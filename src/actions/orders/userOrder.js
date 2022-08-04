import {

    CHANGE_ORDER_STATUS_SUCCESS,

    CHANGE_ORDER_STATUS_FAIL,
    GET_USERS_ORDERS, SET_MESSAGE
} from "../types";
import UserOrderService from "../../services/orders/userOrderService";


export const findUserOrders =
    (userID) =>
        (dispatch) => {
            return UserOrderService.findUsersOrders(
                userID
            ).then(
                (response) => {
                    console.log("Response find all orders" + response)
                    dispatch({
                        type: GET_USERS_ORDERS,
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

export const changeOrderStatus = (id, orderId, statusName) => (dispatch) => {
    return UserOrderService.changeOrderStatus(id, orderId, 
        {
            newOrderStatus: statusName
        }
    ).then(
        (response) => {
            dispatch({
                type: CHANGE_ORDER_STATUS_SUCCESS,
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
                type: CHANGE_ORDER_STATUS_FAIL,
            });
            console.log("Error message " + message);
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};

