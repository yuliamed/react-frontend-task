import commonReq from './commom-axios';


class UserService {

  getProfile(id) {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("user.id: "+user.token);
    return commonReq
      ("get", "/users/" + `${id}`,
        {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          }
        }).then((response) => {
          if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
          return response.data;
        });
  }

}

export default new UserService()