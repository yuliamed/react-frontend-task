
import { NavLink, Routes, Route,  } from "react-router-dom";
import LoginComponent from "./components/auth/LoginComponent";
import SignUpComponent from "./components/auth/SignUpComponent";
import AdminComponent from "./components/admin/AdminComponent";
import OrdersComponent from "./components/auto-picker/OrdersComponent";
import NotFound from "./components/common/NotFound";
import Home from "./components/user/Home"
import Profile from "./components/user/Profile"; 
import { useDispatch } from "react-redux";
import { Layout, Space } from "antd";
import { logout } from "./actions/auth";
import Header from "./components/common/headers/Header"
const { Footer, Content} = Layout;
//import Layout from "./Components/Layout"

function App() {
  let user = localStorage.getItem("user");
  console.log("USER : " + localStorage.getItem("user"))
  const dispatch = useDispatch();
  // if(!user){

  // }
  return (
    <><Layout>
      {/* <Space>
        <Header>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/sign-in">SignIn</NavLink>
          <NavLink to="/sign-up">SignUp</NavLink>
          <NavLink to="/logout" onClick={(event) => {event.preventDefault();  dispatch(logout())}}>LogOut</NavLink>
         </Header>
      </Space> */}
      <Header/>
      <Content>
        <Routes>
          {/* <Route path="/" element={<Layout/>}> */}
          <Route path="/home" exact={true} element={<Home/>}/>
          <Route path="/profile" exact={true} element = {<Profile/>}/>
          <Route path="/logout" exact={true} element={<LoginComponent />} />
          <Route path="/sign-in" exact={true} element={<LoginComponent />} />
          <Route path="/sign-up" exact={true} element={<SignUpComponent />} />
          <Route path="/admin" exact={true} element={<AdminComponent />} />
          <Route path="/orders" exact={true} element={<OrdersComponent />} />
          <Route path="/*"exact={true} element={<NotFound />} />
          {/* </Route> */}s
        </Routes>
      </Content>

      {/* <Footer>Footer</Footer> */}
    </Layout></>
  ); 

}

export default App;
