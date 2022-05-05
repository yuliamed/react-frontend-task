import axios from 'axios';

const API_URL = "http://localhost:8080/api/v1/auth/";
class AuthService{
    signIn(email, pass){
        axios.post(API_URL + "sign-in", {email, pass})
        .then((response)=>{
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
              }
              return response.data;
        });
    }
    logout() {
        localStorage.removeItem("user");
      }
      register(name, surname, email, password, confirmPass) {
        return axios.post(API_URL + "sign-up", {
          name,
          surname,
          email,
          password,
          confirmPass
        });
      }
}

export default new AuthService()