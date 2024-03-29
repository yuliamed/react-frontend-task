import axios from "axios";
//import { REACT_APP_API_URL } from '../constants/const';
import {
    POST, GET, PUT, PATCH, DELETE, GET_WITH_PARAMS, OPTIONS,
} from "./requesrTypes";
//const user = JSON.parse(localStorage.getItem('user'));
//localStorage.clear();
function commonReq(type, url, body) {

    let axiosReq = JSON.parse(localStorage.getItem('user')) ? axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Authorization": 'Bearer ' + JSON.parse(localStorage.getItem('user')).token,
        },
    }) : axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    });

    switch (type) {
        case OPTIONS: {
            return axiosReq.options(url, body)
        }
        case GET: {
            return axiosReq.get(url, body)
        }
        case POST: {
            return axiosReq.post(url, body)
        }
        case PUT: {
            return axiosReq.put(url, body)
        }
        case PATCH: {
            return axiosReq.patch(url, body)
        }
        case DELETE: {
            return axiosReq.delete(url, body)
        }
        case GET_WITH_PARAMS: {
            return axiosReq.get(url, null, body)
        }
    }
}
export default commonReq;
