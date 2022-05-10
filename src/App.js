
import { NavLink, Routes, Route } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import SignUpComponent from "./components/SignUpComponent";
import NotFound from "./components/NotFound";
import Home from "./components/Home"
import Profile from "./components/user/Profile";import { useDispatch } from "react-redux";
import { Layout, Space } from "antd";
import { logout } from "./actions/auth";
const { Header, Footer, Content } = Layout;
//import Layout from "./Components/Layout"

function App() {
  const dispatch = useDispatch();
  return (
    <><Layout>
      <Space>
        <Header>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/sign-in">SignIn</NavLink>
          <NavLink to="/sign-up">SignUp</NavLink>
          <NavLink to="/logout" onClick={(event) => {event.preventDefault();  dispatch(logout())}}>LogOut</NavLink>
        </Header>
      </Space>
      <Content>
        <Routes>
          {/* <Route path="/" element={<Layout/>}> */}
          <Route path="/home" element={<Home/>}/>
          <Route path="/profile" element = {<Profile/>}/>
          <Route path="/sign-in" element={<LoginComponent />} />
          <Route path="/sign-up" element={<SignUpComponent />} />
          <Route path="/*" element={<NotFound />} />
          {/* </Route> */}
        </Routes>

      </Content>

      <Footer>Footer</Footer>
    </Layout></>
  );

}

export default App;
