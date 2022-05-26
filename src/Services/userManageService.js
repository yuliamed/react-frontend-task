
import commonReq from './commom-axios';
import {
  POST, GET, PATCH,
} from "./requesrTypes";
class UserService {

  getProfile(id, reqParams) {
    return commonReq
      (GET, "/users/" + `${id}`, reqParams).then((response) => {
        return response.data;
      });
  }

  approveProfile(id) {
    return commonReq
      (PATCH, "/users/approve/" + `${id}`
      ).then((response) => {
        return response.data;
      });
  }

  addUserRole(id, role) {
    return commonReq
      (PATCH, "/users/" + `${id}`,
        {
            typeOfRole: role,
        }
      ).then((response) => {
        return response.data;
      });
  }

 banUser(id, isBanned) {
    return commonReq
      (POST, "/users/" + `${id}`,
        {
            isBanned: isBanned,
        }
      ).then((response) => {
        return response.data;
      });
  }

}

export default new UserService()