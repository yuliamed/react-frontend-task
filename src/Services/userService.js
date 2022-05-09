import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api/v1/users/";
class UserService {

    getHeader = () => {
        let config = {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        }
        return config;
      }

    getProfile(id) {
        return axios.get(API_URL + id, { headers: authHeader() });
    }
    
    getProfileEmail(id) {
        return axios.get(API_URL + id, { headers: authHeader() });
    }
}

export default new UserService()