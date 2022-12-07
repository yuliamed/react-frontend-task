import {
    FIND_ALL,
    BAN_USER_SUCCESS,
    BAN_USER_FAIL,
    APPROVE_USER_SUCCESS,
    APPROVE_USER_FAIL,
    ADD_USER_ROLE_SUCCESS,
    ADD_USER_ROLE_FAIL, SET_MESSAGE
} from "./types";
import ManageUsersService from "../services/manageUsersService";
import jwt from 'jwt-decode'
export const findAllAll = () => (dispatch) => {
    return ManageUsersService.findAllAll().then((resp) => {
        console.log("FIND ALL ALL WORKED! + " + resp)
    })
}
export const findAll =
    (p_pageNumber, p_pageSize, p_typeOfRole = "", p_name = "",
        p_surname = "", p_isActive) =>
        (dispatch) => {
            //if (p_pageNumber == undefined) p_pageNumber = 0;
            //if (p_pageSize == undefined) p_pageSize = 20;
            return ManageUsersService.findAll(
                p_pageNumber, p_pageSize, p_typeOfRole, p_name,
                p_surname, p_isActive

            ).then(
                (response) => {
                    console.log("Response find all " + response.objects)

                    dispatch({
                        type: FIND_ALL,

                    });
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
                        type: SET_MESSAGE,
                        payload: message,
                    });
                    return Promise.reject();
                }
            );
        };

export const findAllAutoPickers = () => (dispatch) => {
    return ManageUsersService.findAllAutoPickers().then((resp) => {
        dispatch({
            type: FIND_ALL
        })
        return resp;

    }, (error) => {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        dispatch({
            type: APPROVE_USER_FAIL,
        });
        console.log("Error message " + message);
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });
        return Promise.reject();
    })
}

export const banUser = (id, p_isBanned) => (dispatch) => {
    return ManageUsersService.banUser(id,
        {
            isBanned: p_isBanned
        }
    ).then(
        (response) => {
            dispatch({
                type: BAN_USER_SUCCESS,
            });
            // dispatch({
            //     type: SET_MESSAGE,
            //     payload: response.data.message,
            // });
            //return Promise.resolve();
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
                type: BAN_USER_FAIL,
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

export const approveUser = (id) => (dispatch) => {
    return ManageUsersService.approveUser(id
    ).then(
        (response) => {
            dispatch({
                type: APPROVE_USER_SUCCESS,
            });
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
                type: APPROVE_USER_FAIL,
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


export const addUserRole = (id, p_typeOfRole) => (dispatch) => {
    return ManageUsersService.addUserRole(id,
        {
            typeOfRole: p_typeOfRole
        }
    ).then(
        (response) => {
            dispatch({
                type: ADD_USER_ROLE_SUCCESS,
            });
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
                type: ADD_USER_ROLE_FAIL,
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

export const changeRoleList = (id, list) => (dispatch) => {
    let arr = [];
    for (let i = 0; i < list.length; i++) {
        arr.push({ typeOfRole: list[i] })
    }
    return ManageUsersService.changeRoleList(id,
        {
            roles: arr
        }
    ).then(
        (response) => {
            // dispatch({
            //     type: ADD_USER_ROLE_SUCCESS,
            // });
            return response;
        },
        // (error) => {
        //     const message =
        //         (error.response &&
        //             error.response.data &&
        //             error.response.data.message) ||
        //         error.message ||
        //         error.toString();
        //     dispatch({
        //         type: ADD_USER_ROLE_FAIL,
        //     });
        //     console.log("Error message " + message);
        //     dispatch({
        //         type: SET_MESSAGE,
        //         payload: message,
        //     });
        //     return Promise.reject();
        // }
    );
};
