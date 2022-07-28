import commonReq from "./commom-axios";
import jwt from 'jwt-decode'

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
    return commonReq("post", "/auth/sign-in", { email, pass })
      .then((response) => {
        let decodedToken = jwt(response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", decodedToken.id);
        localStorage.setItem("roles", decodedToken.role);
        localStorage.setItem("email", decodedToken.email);
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name, surname, email, pass, confirmPass) {
    return commonReq('post', "/auth/sign-up", {
      name,
      surname,
      email,
      pass,
      confirmPass
    });
  }
}

export default new AuthService()