import {
  EDIT_INSPECTION_BODY_REPORT,
  EDIT_INSPECTION_ELECTRIC_REPORT,
  EDIT_INSPECTION_ENGINE_REPORT,
  EDIT_INSPECTION_MAIN_INFO,
  EDIT_INSPECTION_PENDANT_REPORT,
  EDIT_INSPECTION_SALON_REPORT,
  EDIT_INSPECTION_TRANSMISSION_REPORT,
  GET_INSPECTION_REPORT,
  SAVE_EDITTED_ELECTRIC_REPORT,
  SAVE_EDITTED_ENGINE_REPORT,
  SAVE_EDITTED_INSPECTION_BODY_REPORT,
  SAVE_EDITTED_INSPECTION_MAIN_INFO,
  SAVE_EDITTED_INSPECTION_SALON_REPORT,
  SAVE_EDITTED_PENDANT_REPORT,
  SAVE_EDITTED_TRANSMISSION_REPORT,
  EDIT_BODY_PART_DESCRIPTION,
  GET_INSPECTION_ORDER,
  SAVE_EDITTED_COMPUTER_ERRORS_REPORT,
  CREATE_INSPECTION_REPORT, CLEAN_REPORT,
  SAVE_NEW_INSPECTION_REPORT_SUCCESS,
  EDIT_INSPECTION_COMPUTER_ERRORS_REPORT,
  EDIT_PEDANT_PART_DESCRIPTION,

} from "./types";

import { SET_MESSAGE } from "../../types";
import AutopickerReportService from "../../../services/orders/autopicker/autoPickerReportService";


export const getInspectionReport =
  (report) =>
    (dispatch) => {
      console.log(report);
      dispatch({
        type: GET_INSPECTION_REPORT,
        payload: report
      });
      return report;
    };

export const editMainReportData =
  (report) =>
    (dispatch) => {
      console.log(report);
      dispatch({
        type: EDIT_INSPECTION_MAIN_INFO,
        payload: report
      });
      return report;
    };

export const editSalonReport =
  (report) =>
    (dispatch) => {
      console.log(report);
      dispatch({
        type: EDIT_INSPECTION_SALON_REPORT,
        payload: report
      });
      return report;
    };

export const editBodyReport =
  (report) =>
    (dispatch) => {
      console.log(report);
      dispatch({
        type: EDIT_INSPECTION_BODY_REPORT,
        payload: report
      });
      return report;
    };

export const editPedantReport =
  (report) =>
    (dispatch) => {
      console.log(report);
      dispatch({
        type: EDIT_INSPECTION_PENDANT_REPORT,
        payload: report
      });
      return report;
    };

export const editElectroReport =
  (report) =>
    (dispatch) => {
      console.log(report);
      dispatch({
        type: EDIT_INSPECTION_ELECTRIC_REPORT,
        payload: report
      });
      return report;
    };

export const editBodyPartDescription =
  (description, id) =>
    (dispatch) => {
      let value = {
        description: description, id: id
      }
      dispatch({
        type: EDIT_BODY_PART_DESCRIPTION,
        payload: value
      });
      return description;
    };

export const editElectricPartDescription =
  (description, id) =>
    (dispatch) => {
      let value = {
        description: description, id: id
      }
      dispatch({
        type: EDIT_INSPECTION_ELECTRIC_REPORT,
        payload: value
      });
      return description;
    };

    export const editSalonPartDescription =
    (description, id) =>
      (dispatch) => {
        let value = {
          description: description, id: id
        }
        dispatch({
          type: EDIT_INSPECTION_SALON_REPORT,
          payload: value
        });
        return description;
      };

export const editPedantPartDescription =
  (description, id) =>
    (dispatch) => {
      let value = {
        description: description, id: id
      }
      dispatch({
        type: EDIT_PEDANT_PART_DESCRIPTION,
        payload: value
      });
      return description;
    };

export const editElectricalEquipmentReport =
  (report) =>
    (dispatch) => {
      console.log(report);
      dispatch({
        type: EDIT_INSPECTION_ELECTRIC_REPORT,
        payload: report
      });
      return report;
    };

export const editPendantReport =
  (report) =>
    (dispatch) => {
      console.log(report);
      dispatch({
        type: EDIT_INSPECTION_PENDANT_REPORT,
        payload: report
      });
      return report;
    };

export const editEngineReport =
  (report) =>
    (dispatch) => {
      console.log(report);
      dispatch({
        type: EDIT_INSPECTION_ENGINE_REPORT,
        payload: report
      });
      return report;
    };

export const editTransmissionReport =
  (report) =>
    (dispatch) => {
      console.log(report);
      dispatch({
        type: EDIT_INSPECTION_TRANSMISSION_REPORT,
        payload: report
      });
      return report;
    };

export const editComputerErrorsReport =
  (report) =>
    (dispatch) => {
      console.log(report);
      dispatch({
        type: EDIT_INSPECTION_COMPUTER_ERRORS_REPORT,
        payload: report
      });
      return report;
    };

export const saveEditedMainDataReport =
  (autoPickerId, orderID, mainDataReport) =>
    (dispatch) => {
      return AutopickerReportService.editMainReportData(
        autoPickerId, orderID, mainDataReport
      ).then(
        (response) => {
          dispatch({
            type: SAVE_EDITTED_INSPECTION_MAIN_INFO,
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

export const saveEditedSalonReport =
  (autoPickerId, orderID, salonReport) =>
    (dispatch) => {
      return AutopickerReportService.editSalonReport(
        autoPickerId, orderID, salonReport
      ).then(
        (response) => {
          dispatch({
            type: SAVE_EDITTED_INSPECTION_SALON_REPORT,
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

export const saveEditedBodyReport =
  (autoPickerId, orderID, bodyReport) =>
    (dispatch) => {
      return AutopickerReportService.editBodyReport(
        autoPickerId, orderID, bodyReport
      ).then(
        (response) => {
          dispatch({
            type: SAVE_EDITTED_INSPECTION_BODY_REPORT,
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

export const saveEditedElectroReport =
  (autoPickerId, orderID, electroReport) =>
    (dispatch) => {
      return AutopickerReportService.editElectroReport(
        autoPickerId, orderID, electroReport
      ).then(
        (response) => {
          dispatch({
            type: SAVE_EDITTED_ELECTRIC_REPORT,
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

export const saveEditedPendantReport =
  (autoPickerId, orderID, PendantReport) =>
    (dispatch) => {
      return AutopickerReportService.editPendantReport(
        autoPickerId, orderID, PendantReport
      ).then(
        (response) => {
          dispatch({
            type: SAVE_EDITTED_PENDANT_REPORT,
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

export const saveEditedTransmissionReport =
  (autoPickerId, orderID, TransmissionReport) =>
    (dispatch) => {
      return AutopickerReportService.editTransmissionReport(
        autoPickerId, orderID, TransmissionReport
      ).then(
        (response) => {
          dispatch({
            type: SAVE_EDITTED_TRANSMISSION_REPORT,
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

export const saveEditedEngineReport =
  (autoPickerId, orderID, EngineReport) =>
    (dispatch) => {
      return AutopickerReportService.editEngineReport(
        autoPickerId, orderID, EngineReport
      ).then(
        (response) => {
          dispatch({
            type: SAVE_EDITTED_ENGINE_REPORT,
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

export const saveEditedComputerErrorsReport =
  (autoPickerId, orderID, computerErrors) =>
    (dispatch) => {
      return AutopickerReportService.editComputerErrorsReport(
        autoPickerId, orderID, computerErrors
      ).then(
        (response) => {
          dispatch({
            type: SAVE_EDITTED_COMPUTER_ERRORS_REPORT,
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

export const savePhoto = (autoPickerId, orderID, photo) => (dispatch) => {
  let data = new FormData();
  data.append("file", photo);
  let info = AutopickerReportService.savePhoto(
    autoPickerId, orderID, data
  )
  return info;
}

export const getPhoto = (autoPickerId, orderID, path) => (dispatch) => {
  return AutopickerReportService.getPhoto(
    autoPickerId, orderID, path
  ).then((resp) => {
    return resp;

  })
};

export const saveNewInspectionReport = (autoPickerId, orderID, report) => (dispatch) => {
  return AutopickerReportService.saveNewIspectionReport(
    autoPickerId, orderID, report
  ).then(
    (response) => {
      dispatch({
        type: SAVE_NEW_INSPECTION_REPORT_SUCCESS, payload: response
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
}

export const createInspectionReport =
  (report) =>
    (dispatch) => {
      console.log(report);
      dispatch({
        type: CREATE_INSPECTION_REPORT,
        payload: report
      });
      return report;
    };

export const cleanInspectionReport =
  () =>
    (dispatch) => {
      dispatch({
        type: CLEAN_REPORT
      });
      return null;
    };

export const getInspectionOrder =
  (order) =>
    (dispatch) => {
      console.log(order);
      dispatch({
        type: GET_INSPECTION_ORDER,
        payload: order
      });
      return order;
    };