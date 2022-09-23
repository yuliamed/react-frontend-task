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

}

export default new AutopickerOrderService()