import commonReq from "../commom-axios";
import {
  POST, GET, PUT
} from "../requesrTypes";
class UserInspectionOrderService {

  getHeader = () => {
    let config = {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    }
    return config;
  }

  createOrder(userId, orderReq) {
    return commonReq
      (POST, "/users/" + `${userId}` + "/inspection-orders", orderReq).then((response) => {
        return response.data;
      });
  }

  updateOrder(userId, orderId, orderUpdateReq) {
    console.log(orderUpdateReq)
    return commonReq
      (PUT, "/users/" + `${userId}` + "/inspection-orders/" + `${orderId}`, orderUpdateReq).then((response) => {
        return response.data;
      });
  }

  getOrderByID(userId, orderId) {
    return commonReq
      (GET, "/users/" + `${userId}` + "/inspection-orders/" + `${orderId}`).then((response) => {
        return response.data;
      });
  }
}

export default new UserInspectionOrderService()