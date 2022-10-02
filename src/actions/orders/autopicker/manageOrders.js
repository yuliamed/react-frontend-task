import {
  GET_AUTOPICKER_ORDERS,
  SAVE_NEW_SELECTION_REPORT_SUCCESS,
  SAVE_EDITED_SELECTION_REPORT_SUCCESS,
  GET_SELECTION_REPORT,
  EDIT_SELECTION_REPORT,
  CREATE_SELECTION_REPORT,
  CLEAN_REPORT
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

export const saveNewSelectionReport =
  (autoPickerId, orderID, report) =>
    (dispatch) => {
      return AutopickerOrderService.createSelectionReport(
        autoPickerId, orderID, report
      ).then(
        (response) => {
          dispatch({
            type: SAVE_NEW_SELECTION_REPORT_SUCCESS, payload: response
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

export const saveEditedSelectionReport =
  (autoPickerId, orderID, report) =>
    (dispatch) => {
      return AutopickerOrderService.editSelectionReport(
        autoPickerId, orderID, report
      ).then(
        (response) => {
          dispatch({
            type: SAVE_EDITED_SELECTION_REPORT_SUCCESS,
            payload: response
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

export const getSelectionReport =
  (report) =>
    (dispatch) => {
      console.log(report);
      dispatch({
        type: GET_SELECTION_REPORT,
        payload: report
      });
      return report;
    };

export const editSelectionReport =
  (report) =>
    (dispatch) => {
      console.log(report);
      dispatch({
        type: EDIT_SELECTION_REPORT,
        payload: report
      });
      return report;
    };

export const createSelectionReport =
  (report) =>
    (dispatch) => {
      dispatch({
        type: CREATE_SELECTION_REPORT,
        payload: report
      });
      return report;
    };

    export const cleanSelectionReport =
    () =>
      (dispatch) => {
        dispatch({
          type: CLEAN_REPORT
        });
        return null;
      };

