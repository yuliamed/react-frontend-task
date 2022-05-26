
import authHeader from './auth-header';
import commonReq from './commom-axios';
import {
  POST, GET, PUT, PATCH, DELETE
} from "./requesrTypes";
class UserService {

  getProfile(id) {
    return commonReq
      (GET, "/users/" + `${id}`).then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  editProfile(id, newUser) {
    return commonReq
      (PUT, "/users/" + `${id}`,
        {
          name: newUser.name,
          surname: newUser.surname,
          email: newUser.email
        }
      ).then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
//TODO - ???
  changePass(id, newUser) {
    return commonReq
      (PUT, "/users/" + `${id}`,
        {
          name: newUser.name,
          surname: newUser.surname,
          email: newUser.email
        }
      ).then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  addPicture(id, imagePath) {
    return commonReq
      (PATCH, "/users/" + `${id}` + "/add-image",
        {
          imagePath: imagePath,
        }
      ).then((response) => {
        return response.data;
      });
  }

  deletePicture(id) {
    return commonReq
      (DELETE, "/users/" + `${id}` + "/delete-image").then((response) => {
        return response.data;
      });
  }
}

export default new UserService()