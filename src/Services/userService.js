import axios from  "./commom-axios";
import authHeader from './auth-header';


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
      .get("/users/"+ `${id}`,
        {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          }
        });
  }

  // getProfileEmail(id) {
  //   return axios.get(API_URL + id, { headers: authHeader() });
  // }
}

export default new UserService()