
import { NavLink, Routes, Route,  } from "react-router-dom";
import LoginComponent from "./components/auth/LoginComponent";
import SignUpComponent from "./components/auth/SignUpComponent";
import AdminComponent from "./components/admin/AdminComponent";
import OrdersComponent from "./components/auto-picker/OrdersComponent";
import NotFound from "./components/common/NotFound";
import Home from "./components/user/Home"
import Profile from "./components/user/Profile"; 
import { Layout, Space } from "antd";
const { Footer, Content} = Layout;

function App() {
  console.log("USER : " + localStorage.getItem("user"))
  
  return (
    <><Layout>
      <Content>
        <Routes>
          {/* <Route path="/" element={<Layout/>}> */}
          <Route path="/home" exact={true} element={<Home/>}/>
          <Route path="/profile" exact={true} element = {<Profile/>}/>
          <Route path="/logout" exact={true} element={<LoginComponent />} />
          <Route path="/sign-in" exact={true} element={<LoginComponent />} />
          <Route path="/sign-up" exact={true} element={<SignUpComponent />} />
          <Route path="/orders" exact={true} element={<OrdersComponent />} />
          <Route path="/users" exact={true} element={<AdminComponent />} />
          <Route path="/*"exact={true} element={<NotFound />} />
          
        </Routes>
      </Content>
    </Layout></>
  ); 

}

export default App;
