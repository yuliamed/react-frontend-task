import commonReq from "../commom-axios";
import jwt from 'jwt-decode';
import {
    POST, GET, PATCH, GET_WITH_PARAMS
} from "../requesrTypes";
class UserSelectionOrderService {

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
            (POST, "/users/" + `${userId}` + "/selection-orders", orderReq).then((response) => {
                return response.data;
            });
    }

    updateOrder(userId, orderId, orderUpdateReq) {
        return commonReq
            (PUT, "/users/" + `${userId}` + "/selection-orders/" + `${orderId}`, orderUpdateReq).then((response) => {
                return response.data;
            });
    }

}

export default new UserSelectionOrderService()