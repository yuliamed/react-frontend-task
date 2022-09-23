import commonReq from "../../commom-axios";
import {
  POST, GET, PUT, PATCH
} from "../../requesrTypes";
class AdminOrderService {

  findAll(userId, param) {
    return commonReq
      (GET, "/admin/" + `${userId}` + "/orders", param).then((response) => {
        return response.data;
      });
  }

  setAutopicker(
    adminID, orderId, autoPickerId
  ) {
    let param = {
      "autoPickerId": autoPickerId
    }
    return commonReq
      (PATCH, "/admin/" + `${adminID}` + "/orders/" + `${orderId}`, param).then((response) => {
        return response.data;
      });
  }
}

export default new AdminOrderService()