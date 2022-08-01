import {
    FIND_ALL,
    BAN_USER,
    ADD_USER_ROLE,
    APPROVE_USER
  } from "./types";
  import manageUsersService from "../services/manageUsersService.js";
  import jwt from 'jwt-decode'
  
  export const findAll = (pageNumber, pageSize, typeOfRole, name, surname, isActive) => (dispatch) => {
    return manageUsersService.findAll(
            
    ).then(
      (response) => {
        dispatch({
          type: FIND_ALL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: SIGNUP_FAIL,
        });
        console.log("Error message " + message );
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
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
        console.log("error ")
        const message = (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: SIGNIN_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
    );
  };
  
  export const logout = () => (dispatch) => {
    AuthService.logout();
    dispatch({
      type: LOGOUT,
    });
  };