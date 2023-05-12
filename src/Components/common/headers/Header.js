import PublicHeaderContainer from "./PublicHeaderContainer"
import UserHeaderContainer from "./UserHeaderContainer"
import AdminHeader from "./AdminHeader"
import AutoPickerHeader from "./AutoPickerHeader"
import AdminAutoPickerHeader from "./AdminAutoPickerHeader"
import jwt from 'jwt-decode'

import { Component } from "react"
import { clear } from "../../../actions/auth"
import { connect } from "react-redux"

class Header extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    let user = localStorage.getItem("user");
    let decodedToken;
    let roles;
    const { dispatch } = this.props;
    dispatch(clear);
    if (user != null) {
      decodedToken = jwt(user);
      roles = decodedToken.role;
    }
    if (user == null) {
      return <PublicHeaderContainer />;
    }
    else if (findRole(roles, "ADMIN") && findRole(roles, "AUTO_PICKER")) return <AdminAutoPickerHeader />;
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

function mapStateToProps(state) {
  const { user } = state.auth;
  const { account } = state.account;
  const { message } = state.message;
  return {
    user,
    account,
    message
  };


}

export default connect(mapStateToProps)(Header);

