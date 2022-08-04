import axios from "axios";
import { API_BASE_URL } from '../constants/const';
import {
    POST, GET, PUT, PATCH, DELETE,GET_WITH_PARAMS,
} from "./requesrTypes";
const user = JSON.parse(localStorage.getItem('user'));

function commonReq(type, url, body) {

    let axiosReq = user ? axios.create({
        baseURL: API_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Authorization": 'Bearer ' + user.token,
        },
    }) : axios.create({
        baseURL: API_BASE_URL, 
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    });

    switch (type) {
        case GET: {
            console.log("user.token "+user.token);
            return axiosReq.get(url, body)
        }
        case POST: {
            //console.log(body)
            return axiosReq.post(url, body)
        }
        case PUT: {
            //console.log(body)
            return axiosReq.put(url, body)
        }
        case PATCH: {
            //console.log(body)
            return axiosReq.patch(url, body)
        }
        case DELETE: {
            //console.log(body)
            return axiosReq.delete(url, body)
        }
        case GET_WITH_PARAMS:{
            return axiosReq.get(url, null, body)
        }
    }
}
export default commonReq;
