import {
  GET_AUTOPICKER_ORDERS
} from "./types";
import { SET_MESSAGE } from "../../types";
import AutopickerOrderService from "../../../services/orders/autopicker/autopickerOrderService";


export const findAll =
  (userID) =>
    (dispatch) => {
      return AutopickerOrderService.findAll(
        userID
      ).then(
        (response) => {
          dispatch({
            type: GET_AUTOPICKER_ORDERS,
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
