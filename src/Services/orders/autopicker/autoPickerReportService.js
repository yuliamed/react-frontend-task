import commonReq from "../../commom-axios";
import {
  POST, GET, PUT, PATCH
} from "../../requesrTypes";
class AutopickerReportService {

  findAll(userId) {
    return commonReq
      (GET, "/auto-picker/" + `${userId}` + "/orders").then((response) => {
        return response.data;
      });
  }

  createInspectionReport(autoPickerId, orderID, report) {
    return commonReq
      (POST, "/auto-picker/" + `${autoPickerId}` + "/inspection-orders/" + `${orderID}` + "/report", report).then((response) => {
        return response.data;
      });
  }

  editMainReportData(autoPickerId, orderID, mainDataReport) {
    return commonReq
      (PUT, "/auto-picker/" + `${autoPickerId}` + "/selection-orders/" + `${orderID}` + "/report", mainDataReport)
      .then((response) => {
        return response.data;
      });
  }

  editSalonReport(autoPickerId, orderID, salonReport) {
    return commonReq
      (PATCH, "/auto-picker/" + `${autoPickerId}` + "/selection-orders/" + `${orderID}` + "/report/salon", salonReport)
      .then((response) => {
        return response.data;
      });
  }

  editBodyReport(autoPickerId, orderID, bodyReport) {
    return commonReq
      (PATCH, "/auto-picker/" + `${autoPickerId}` + "/selection-orders/" + `${orderID}` + "/report/body", bodyReport)
      .then((response) => {
        return response.data;
      });
  }

  editElectroReport(autoPickerId, orderID, electroReport) {
    return commonReq
      (PATCH, "/auto-picker/" + `${autoPickerId}` + "/selection-orders/" + `${orderID}` + "/report/electrical-equipment", electroReport)
      .then((response) => {
        return response.data;
      });
  }

  editPendantReport(autoPickerId, orderID, pendantReport) {
    return commonReq
      (PATCH, "/auto-picker/" + `${autoPickerId}` + "/selection-orders/" + `${orderID}` + "/report/pendant", pendantReport)
      .then((response) => {
        return response.data;
      });
  }

  editEngineReport(autoPickerId, orderID, engineReport) {
    return commonReq
      (PATCH, "/auto-picker/" + `${autoPickerId}` + "/selection-orders/" + `${orderID}` + "/report/engine", engineReport)
      .then((response) => {
        return response.data;
      });
  }

  editTransmissionReport(autoPickerId, orderID, transmissionReport) {
    return commonReq
      (PATCH, "/auto-picker/" + `${autoPickerId}` + "/selection-orders/" + `${orderID}` + "/report/transmission", transmissionReport)
      .then((response) => {
        return response.data;
      });
  }


}

export default new AutopickerReportService()