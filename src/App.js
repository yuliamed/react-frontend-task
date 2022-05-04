
import { NavLink, Routes, Route } from "react-router-dom";
import LoginComponent from "./Components/LoginComponent";
import SignUpComponent from "./Components/SignUpComponent";
import NotFound from "./Components/NotFound";
import Home from "./Components/Home"
import { Layout, Space } from "antd";
const { Header, Footer, Content } = Layout;
//import Layout from "./Components/Layout"




function App() {
  return (
    <><Layout>
      <Space>
        <Header>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/sign-in">SignIn</NavLink>
          <NavLink to="/sign-up">SignUp</NavLink>
        </Header>
      </Space>
      <Content>
        <Routes>
          {/* <Route path="/" element={<Layout/>}> */}
          <Route path="/" element={<Home/>}/>
          <Route path="/sign-in" element={<LoginComponent />} />
          <Route path="/sign-up" element={<SignUpComponent />} />
          <Route path="*" element={<NotFound />} />
          {/* </Route> */}
        </Routes>

      </Content>

      <Footer>Footer</Footer>
    </Layout></>
  );

}

export default App;
