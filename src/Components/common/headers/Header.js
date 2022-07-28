import PublicHeaderContainer from "./PublicHeaderContainer"
import UserHeaderContainer from "./UserHeaderContainer"
import AdminHeader from "./AdminHeader"
import AutoPickerHeader from "./AutoPickerHeader"
import jwt from 'jwt-decode'
// function Header() {

//   let user = localStorage.getItem("user");
//   let isLoggedIn = localStorage.getItem("isLoggedIn");
//   console.log("HEADER " + user)
//   if (!user || user == null ) {
//     console.log("HEADER PUBLIC")
//     return <PublicHeaderContainer />

//   } else {
//     console.log("HEADER 1")
//     return <UserHeaderContainer />
//   }
// }

// export default Header

import { Component } from "react"
import { toHaveAccessibleDescription } from "@testing-library/jest-dom/dist/matchers";

class Header extends Component {
  constructor(props) {
    super(props);
    // this.state = {isOpen: false};

    // this.toggle = this.toggle.bind(this);
    // this.logout = this.logout.bind(this);
    this.state = {
      roles: "", id: ""
    }

  }

  // // TODO вынести выход из профиля сюда
  // logout() {
  //   // localStorage.removeItem(ACCESS_TOKEN)
  //   // localStorage.removeItem(USER_TOKEN_TYPE)
  //   // localStorage.removeItem(USER_EXPIRES_IN)

  //   // localStorage.removeItem(USER_LOGIN)
  //   // localStorage.removeItem(USER_ID)
  //   // localStorage.removeItem(USER_ROLES)

  //   }

  // toggle() {
  //   this.setState({
  //     isOpen: !this.state.isOpen
  //   });
  // }

  render() {
    let user = localStorage.getItem("user");
    let decodedToken;
    let roles;
    if (user != null) {
      decodedToken = jwt(user);
      roles = decodedToken.role;
    }

    let isLoggedIn = localStorage.getItem("isLoggedIn");
    console.log("HEADER " + user)
    if (user == null) {
      return <PublicHeaderContainer />;
    }
    else if (findRole(roles, "ADMIN")) return <AdminHeader />;
    else if (findRole(roles, "AUTO_PICKER")) return <AutoPickerHeader />;
    else return <UserHeaderContainer />;

  }
}

function findRole(roles, role) {
  for (var i = 0; i < roles.length; i++) {
    let value = roles[i].authority;
    if (value == role) return true;
  }
  return false;
}

export default Header

