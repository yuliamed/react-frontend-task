import commonReq from "./commom-axios";
import jwt from 'jwt-decode';
import {
    POST, GET, PATCH, GET_WITH_PARAMS
} from "./requesrTypes";
class ManageUsersService {

    getHeader = () => {
        let config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        }
        return config;
    }

    findAll(p_pageNumber = 0, p_pageSize = 20, p_typeOfRole = "", p_name = "",
    p_surname = "", p_isActive) {
        let reqParams={
            pageNumber: p_pageNumber,
            pageSize: p_pageSize,
            name:p_name,
            surname: p_surname
        };
        
        return commonReq
            (GET, "/admin/users" + "?pageNumber="+`${p_pageNumber}`+"&pageSize="+`${p_pageSize}`).then((response) => {
                return response.data;
            });
    }

    findAllAll(){
        return commonReq
            (GET, "/admin/users").then((response) => {
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

export default new ManageUsersService()