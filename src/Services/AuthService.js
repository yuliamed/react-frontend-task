import axios from 'axios';

const API_URL = "http://localhost:8080/api/v1/auth/";
class AuthService {

  getHeader = () => {
    let config = {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    }
    return config;
  }

  signIn(email, pass) {
    return axios
      .post(API_URL + "sign-in", { email, pass })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          //response.headers("Access-Control-Allow-Origin", "*");
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name, surname, email, pass, confirmPass) {
    return axios.post(API_URL + "sign-up", {
      name,
      surname,
      email,
      pass,
      confirmPass
    });
  }
}

export default new AuthService()