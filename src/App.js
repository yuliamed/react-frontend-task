import 'antd/dist/antd.css';
import {  Routes, Route,  } from "react-router-dom";
import LoginComponent from "./components/auth/LoginComponent";
import SignUpComponent from "./components/auth/SignUpComponent";
import AdminComponent from "./components/admin/AdminComponent";
import OrdersComponent from "./components/auto-picker/OrdersComponent";
import NotFound from "./components/common/NotFound";
import Profile from "./components/user/Profile"; 
import { Layout } from "antd";
import UserOrdersComponent from './components/user/UserOrdersPage';
import NewOrderComponent from './components/user/NewOrderComponent';
import SelectionOrderDescription from './components/user/SelectionOrderDescriptionPage';
import InspectionOrderDescription from './components/user/InspectionOrderDescriptionPage';
const { Footer, Content} = Layout;

function App() {
  console.log("USER : " + localStorage.getItem("user"))
  
  return (
    <><Layout align="center">
      <Content >
        <Routes>
          
          <Route path="/profile" exact={true} element = {<Profile/>}/>
          <Route path="/logout" exact={true} element={<LoginComponent />} />
          <Route path="/sign-in" exact={true} element={<LoginComponent />} />
          <Route path="/" exact={true} element={<LoginComponent />} />
          <Route path="/sign-up" exact={true} element={<SignUpComponent />} />
          <Route path="/orders" exact={true} element={<OrdersComponent />} />
          <Route path="/new-order" exact={true} element={<NewOrderComponent />} />
          <Route path="/user-orders" exact={true} element={<UserOrdersComponent />} />
          <Route path="/users" exact={true} element={<AdminComponent />} />
          <Route path="/selection-order/*" exact={true} element={<SelectionOrderDescription />} />
          <Route path="/*"exact={true} element={<NotFound />} />
          <Route path="/inspection-order/*" exact={true} element={<InspectionOrderDescription />} />
          
        </Routes>
      </Content>
    </Layout></>
  ); 

}

export default App;
