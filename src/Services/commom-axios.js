import axios from "axios";
import { API_BASE_URL } from '../constants/const';
import {
    POST, GET, PUT, PATCH,
} from "./requesrTypes";

function commonReq(type, url, body) {
    let axiosReq = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            "Content-type": "application/json"
        }});
    switch (type) {
        case GET: {
           return axiosReq.get(url, body)
        }
        case POST: {
            console.log(body)
           return axiosReq.post(url, body)
        }
}
}
export default commonReq;
