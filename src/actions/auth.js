import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  CLEAR_MESSAGE,
} from "./types";
import AuthService from "../services/AuthService";
import jwt from 'jwt-decode'
import { AUTHENTICATION_ERROR, NO_USER_WITH_EMAIL, USER_WITH_EMAIL_EXIST } from "../constants/messages";
import userService from "../services/userService";

export const signUp =
  (name, surname, email, pass, confirmPass, isAutoPicker) => (dispatch) => {
    return AuthService.register(name, surname, email, pass, confirmPass, isAutoPicker).then(
      (response) => {
        dispatch({
          type: SIGNUP_SUCCESS,
        });
        dispatch(saveErrorMessage(response.data.message));
        return Promise.resolve();
      },
      (error) => {
        const message = getErrorMessage(error);
        if (message.includes("is not available")) {
          dispatch(saveErrorMessage(USER_WITH_EMAIL_EXIST));
        }
        dispatch({ type: SIGNUP_FAIL, });
        console.log("Error message " + message);
        return Promise.reject();
      }
    );
  };

export const signIn = (email, pass) => (dispatch) => {
  return AuthService.signIn(email, pass).then(
    (data) => {
      let decodedToken = jwt(data.token);

      let userData = {
        token: data.token,
        id: decodedToken.id,
        email: decodedToken.email,
        roles: decodedToken.role,
      }
      dispatch({
        type: SIGNIN_SUCCESS,
        payload: { user: userData },
      });

      console.log("login token " + userData.token);
      // dispatch({
      //   type: SIGNIN_SUCCESS,
      //   payload: { user: data },
      // });
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: SIGNIN_FAIL,
      });
      dispatch(saveErrorMessage(AUTHENTICATION_ERROR));
      return Promise.reject();
    }
  );
};

export const recoverPass = (email) => (dispatch) => {
  dispatch({ type: CLEAR_MESSAGE });
  return userService.recoverPass(email).then(
    (data) => {
      console.log(data);
      return Promise.resolve();
    },
    (error) => {
      var message = getErrorMessage(error);
      if (message.includes("There is no user with email")) {
        message = NO_USER_WITH_EMAIL;
      }
      dispatch(saveErrorMessage(message));
      return Promise.reject();
    }
  );
};

export function getAndSaveMessage(error) {
  var message = getErrorMessage(error);
  return ({
    type: SET_MESSAGE,
    payload: message,
  });
}

export function saveErrorMessage(message) {
  return ({
    type: SET_MESSAGE,
    payload: message,
  });
}

export function getErrorMessage(error) {
  return (error.response &&
    error.response.data &&
    error.response.data.message) ||
    error.message ||
    error.toString();
}

export const clear = () => (dispatch) => {
  dispatch({
    type: CLEAR_MESSAGE,
  });
};


export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
  dispatch({
    type: CLEAR_MESSAGE,
  });
};