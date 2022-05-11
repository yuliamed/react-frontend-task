
import { NavLink, Routes, Route } from "react-router-dom";
import LoginComponent from "./components/auth/LoginComponent";
import SignUpComponent from "./components/auth/SignUpComponent";
import NotFound from "./components/common/NotFound";
import Home from "./components/user/Home"
import Profile from "./components/user/Profile"; import { useDispatch } from "react-redux";
import { Layout, Space } from "antd";
import { logout } from "./actions/auth";
//import Header from "./components/common/Header"
const { Header, Footer, Content } = Layout;
//import Layout from "./Components/Layout"

function App() {
  console.log("USER : " + localStorage.getItem("user"))
  const dispatch = useDispatch();
  return (
    <><Layout>
      <Space>
        <Header>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/sign-in">SignIn</NavLink>
          <NavLink to="/sign-up">SignUp</NavLink>
          <NavLink to="/logout" onClick={(event) => {event.preventDefault();  dispatch(logout())}}>LogOut</NavLink> */}
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
          {/* </Route> */}s
        </Routes>

      </Content>

      <Footer>Footer</Footer>
    </Layout></>
  ); 
  // else {
  //   return(
  //   <><Layout>
  //     <Space>
  //       <Header>
  //         <NavLink to="/home">Home</NavLink>
  //         {/* <NavLink to="/profile">Profile</NavLink> */}
  //         <NavLink to="/sign-in">SignIn</NavLink>
  //         <NavLink to="/sign-up">SignUp</NavLink>
  //         {/* <NavLink to="/logout" onClick={(event) => { event.preventDefault(); dispatch(logout()) }}>LogOut</NavLink> */}
  //       </Header>
  //     </Space>
  //     <Content>
  //       <Routes>
  //         {/* <Route path="/" element={<Layout/>}> */}
  //         <Route path="/home" element={<Home />} />
  //         {/* <Route path="/profile" element={<Profile />} /> */}
  //         <Route path="/sign-in" element={<LoginComponent />} />
  //         <Route path="/sign-up" element={<SignUpComponent />} />
  //         <Route path="/*" element={<NotFound />} />
  //         {/* </Route> */}s
  //       </Routes>

  //     </Content>

  //     <Footer>Footer</Footer>
  //   </Layout></>)
  // }

}

export default App;
