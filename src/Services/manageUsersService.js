import commonReq from "./commom-axios";
import jwt from 'jwt-decode';
import {
    POST, GET, PATCH
} from "./requesrTypes";
class AuthService {

    getHeader = () => {
        let config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        }
        return config;
    }

    findAll(reqParams) {
        return commonReq
            (GET, "/admin/users", reqParams).then((response) => {
                return response.data;
            });
    }

    banUser(id, reqParams) {
        return commonReq
            (POST, "/admin/users/" + `${id}`, reqParams).then((response) => {
                return response.data;
            });
    }
    approveUser(id, reqParams) {
        return commonReq(PATCH, "/admin/users/approve/" + `${id}`, reqParams)
            .then((response) => {
                return response.data;
            });
    }
    addUserRole(id, reqParams) {
        return commonReq
            (PATCH, "admin/users/" + `${id}`, reqParams).then((response) => {
                return response.data;
            });
    }


}

export default new AuthService()