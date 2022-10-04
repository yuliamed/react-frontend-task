import {
  CHANGE_PASS_FAIL, CHANGE_PASS_SUCCESS,
  SET_MESSAGE,
} from "./types";
import UserService from "../services/userService";
import jwt from 'jwt-decode'

export const changePass = (newPass, token) => (dispatch) => {
  return UserService.resetPass(token, newPass).then(
    (response) => {
      dispatch({
        type: CHANGE_PASS_SUCCESS,
      });
      // dispatch({
      //   type: SET_MESSAGE,
      //   payload: response.data.message,
      // });
      return response;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: CHANGE_PASS_FAIL,
      });
      console.log("Error message " + message);
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};


export const getPhoto = (id) => (dispatch) => {
  return UserService.getPhoto(id).then((resp) => {
    return resp;

  })
}

export const savePhoto = (id, photo) => (dispatch) => {
  let data = new FormData();
  data.append("file", photo);
  return UserService.savePhoto(id, data).then((resp) => {
    return resp;

  })
}

export const deletePhoto = (id) => (dispatch) => {
  return UserService.deletePhoto(id).then((resp) => {
    return resp;

  })
}