import commonReq from "../../commom-axios";
import {
  POST, GET, PUT, PATCH, OPTIONS
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
      (PUT, "/auto-picker/" + `${autoPickerId}` + "/inspection-orders/" + `${orderID}` + "/report", mainDataReport)
      .then((response) => {
        return response.data;
      });
  }

  editSalonReport(autoPickerId, orderID, salonReport) {
    return commonReq
      (PATCH, "/auto-picker/" + `${autoPickerId}` + "/inspection-orders/" + `${orderID}` + "/report/salon", salonReport)
      .then((response) => {
        return response.data;
      });
  }

  editBodyReport(autoPickerId, orderID, bodyReport) {
    return commonReq
      (PATCH, "/auto-picker/" + `${autoPickerId}` + "/inspection-orders/" + `${orderID}` + "/report/body", bodyReport)
      .then((response) => {
        return response.data;
      });
  }

  editElectroReport(autoPickerId, orderID, electroReport) {
    return commonReq
      (PATCH, "/auto-picker/" + `${autoPickerId}` + "/inspection-orders/" + `${orderID}` + "/report/electrical-equipment", electroReport)
      .then((response) => {
        return response.data;
      });
  }

  editPendantReport(autoPickerId, orderID, pendantReport) {
    return commonReq
      (PATCH, "/auto-picker/" + `${autoPickerId}` + "/inspection-orders/" + `${orderID}` + "/report/pendant", pendantReport)
      .then((response) => {
        return response.data;
      });
  }

  editEngineReport(autoPickerId, orderID, engineReport) {
    return commonReq
      (PATCH, "/auto-picker/" + `${autoPickerId}` + "/inspection-orders/" + `${orderID}` + "/report/engine", engineReport)
      .then((response) => {
        return response.data;
      });
  }

  editTransmissionReport(autoPickerId, orderID, transmissionReport) {
    return commonReq
      (PATCH, "/auto-picker/" + `${autoPickerId}` + "/inspection-orders/" + `${orderID}` + "/report/transmission", transmissionReport)
      .then((response) => {
        return response.data;
      });
  }

  savePhoto(autoPickerId, orderId, file) {
    return commonReq(POST, "/auto-picker/" + `${autoPickerId}`
      + "/inspection-orders/" + `${orderId}` + "/report/image", file)
      .then((response) => {
        return response.data;
      });
  }

  getPhoto(autoPickerId, orderId, path) {

    return commonReq(GET, "/auto-picker/" + `${autoPickerId}`
      + "/inspection-orders/" + `${orderId}` + "/report/image?file=" + `${path}`).then((response) => {
        return response.data;
      });
  }

  saveNewIspectionReport(autoPickerId, orderId, report) {
    return commonReq(POST, "/auto-picker/" + `${autoPickerId}`
      + "/inspection-orders/" + `${orderId}` + "/report", report).then((response) => {
        return response.data;
      });
  }

}

export default new AutopickerReportService()