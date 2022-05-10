import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api/v1/users/";

class UserService {
  // getHeader = () => {
  //     let config = {
  //       headers: {
  //         "Access-Control-Allow-Origin": "*"
  //       }
  //     }
  //     return config;
  //   }

  getProfile(id) {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios
      .get(API_URL + `${id}`,
        {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          }
        });
  }

  getProfileEmail(id) {
    return axios.get(API_URL + id, { headers: authHeader() });
  }
}

export default new UserService()