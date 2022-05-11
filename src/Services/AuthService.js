import commonReq from "./commom-axios";

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
    // return axios
    //   .post("/auth/sign-in", { email, pass })
    //   .then((response) => {
    //     console.log(response.data.token);
    //     if (response.data.token) {
    //       localStorage.setItem("user", JSON.stringify(response.data));

    //       //response.headers("Access-Control-Allow-Origin", "*");
    //     }
    //     return response.data;
    //   });
    return commonReq("post", "/auth/sign-in", { email, pass })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));

          //response.headers("Access-Control-Allow-Origin", "*");
        }
        return response.data;
      });;
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name, surname, email, pass, confirmPass) {
    // return axios.post("/auth/sign-up", {
    //   name,
    //   surname,
    //   email,
    //   pass,
    //   confirmPass
    // });
  }
}

export default new AuthService()