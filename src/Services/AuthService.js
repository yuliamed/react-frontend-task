import axios from 'axios';
import zxios from 'axios'

const AUTH_REST_API_URL = "http://localhost:8080/api/v1/auth/";
//TODO - надо наверное написать взодные данные
class AuthService{
    signIn(){
        axios.post(AUTH_REST_API_URL);
    }
}

export default new AuthService()