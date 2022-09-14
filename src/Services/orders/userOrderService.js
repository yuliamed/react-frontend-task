import commonReq from "../commom-axios";
import {
    GET, PATCH,
} from "../requesrTypes";
class UserOrderService {

    getHeader = () => {
        let config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        }
        return config;
    }

    findUsersOrders(userId) {
        return commonReq
            (GET, "/users/" + `${userId}` + "/orders").then((response) => {
                return response.data;
            });
    }

    changeOrderStatus(userId, orderId, statusReq) {
        return commonReq
            (PATCH, "/users/" + `${userId}` + "/orders/" + `${orderId}`, statusReq).then((response) => {
                return response.data;
            });
    }

}

export default new UserOrderService()