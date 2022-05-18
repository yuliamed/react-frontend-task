import axios from "axios";
import { API_BASE_URL } from '../constants/const';
import {
    POST, GET, PUT, PATCH, DELETE,
} from "./requesrTypes";
const user = JSON.parse(localStorage.getItem('user'));

function commonReq(type, url, body) {
    let headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });

    if (user) {
        // console.log(user.token);
        // headers.append("Authorization", 'Bearer ' + user.token);
        headers = new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Authorization": 'Bearer ' + user.token
        });
        console.log(headers)
    }

    const defaults = { headers: headers };

    let axiosReq = user ? axios.create({
        baseURL: API_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Authorization": 'Bearer ' + user.token
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
            return axiosReq.get(url, body)
        }
        case POST: {
            console.log(body)
            return axiosReq.post(url, body)
        }
        case PUT: {
            console.log(body)
            return axiosReq.put(url, body)
        }
        case PATCH: {
            console.log(body)
            return axiosReq.patch(url, body)
        }
        case DELETE: {
            console.log(body)
            return axiosReq.delete(url, body)
        }
    }
}
export default commonReq;
