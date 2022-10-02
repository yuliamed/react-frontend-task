import commonReq from "../../commom-axios";
import {
  POST, GET, PUT, PATCH
} from "../../requesrTypes";
class AutopickerOrderService {

  findAll(userId) {
    return commonReq
      (GET, "/auto-picker/" + `${userId}` + "/orders").then((response) => {
        return response.data;
      });
  }

  createSelectionReport(autoPickerId, orderID, report) {
    return commonReq
      (POST, "/auto-picker/" + `${autoPickerId}` + "/selection-orders/" + `${orderID}` + "/report", report).then((response) => {
        return response.data;
      });
  }

  editSelectionReport(autoPickerId, orderID, report) {
    return commonReq
      (PUT, "/auto-picker/" + `${autoPickerId}` + "/selection-orders/" + `${orderID}` + "/report", report).then((response) => {
        return response.data;
      });
  }

}

export default new AutopickerOrderService()