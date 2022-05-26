import PublicHeaderContainer from "./PublicHeaderContainer"
import UserHeaderContainer from "./UserHeaderContainer"

function Header() {

  let user = localStorage.getItem("user");
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  console.log("HEADER " + user)
  if (!user || user == null ) {
    console.log("HEADER PUBLIC")
    return <PublicHeaderContainer />

  } else {
    console.log("HEADER 1")
    return <UserHeaderContainer />
  }
}

export default Header