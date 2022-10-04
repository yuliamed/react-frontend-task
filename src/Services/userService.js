
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
  // changePass(id, token, newPass) {
  //   return commonReq
  //     (PUT, "/users/" + `${id}` + "/change-password",
  //       {
  //         name: newUser.name,
  //         surname: newUser.surname,
  //         email: newUser.email
  //       }
  //     ).then((response) => {
  //       if (response.data.token) {
  //         localStorage.setItem("user", JSON.stringify(response.data));
  //       }
  //       return response.data;
  //     });
  // }

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

  recoverPass(user_email) {
    return commonReq
      (POST, "/mail/recovery-password",
        {
          email: user_email
        }
      ).catch(
        (resp) => {
          console.log("ERROR FROM SERVICE " + resp.message)
        }
      ).then((response) => {
        if (response.data) {
          localStorage.setItem("messageRecover", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  resetPass(token, pass) {
    return commonReq
      (PUT, "/mail/reset-password",
        {
          token: token,
          pass: pass
        }
      ).then((response) => {
        // if (response.data) {
        //   localStorage.setItem("isPassChangedMessage", JSON.stringify(response.data));
        // }
        return response.data;
      });
  }

  deletePicture(id) {
    return commonReq
      (DELETE, "/users/" + `${id}` + "/delete-image").then((response) => {
        return response.data;
      });
  }

  getPhoto(id) {
    return commonReq(GET, "/users/" + `${id}` + "/image").then((response) => {
      return response.data;
    });
  }

  savePhoto(id, data) {
    return commonReq(PATCH, "/users/" + `${id}` + "/image", data).then((response) => {
      return response.data;
    });
  }

  deletePhoto(id) {
    return commonReq(DELETE, "/users/" + `${id}` + "/image").then((response) => {
      return response.data;
    });
  }
}

export default new UserService()