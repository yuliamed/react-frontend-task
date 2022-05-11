import PublicHeaderContainer from "./PublicHeaderContainer"
import UserHeaderContainer from "./UserHeaderContainer"

const Header = () => {

    let user = localStorage.getItem("user");
    console.log(user)
    if (user) {
       return <UserHeaderContainer/>
    } else {
      // not logged in so display public
      return <PublicHeaderContainer/>
    }
  }

export default Header