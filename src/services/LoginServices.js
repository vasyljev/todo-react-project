import axios from 'axios';
import {API_BASE} from "../constants/API";
// import fakeAuth from "./FakeAuth"

class LoginServices {
    signIn(user) {
       return axios.post(`${API_BASE}/users/sign_in`, user)
              .then(res => {
                console.log(res.data.auth, res.data.token);
                  return res.data;
              })
              .catch(error => {
                  console.log(error);
              })
    }
    signUp(user) {
        console.log(user);
        return axios.post(`${API_BASE}/users/sign_up`, user)
        .then(
            res => {
                console.log(res);
                console.log(res.data);
            }
        )
        .catch(
            error => console.log(error)
        )
    }
}
const LoginService = new LoginServices();
export default LoginService;