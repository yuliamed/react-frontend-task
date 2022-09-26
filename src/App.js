import 'antd/dist/antd.css';
import { Routes, Route, } from "react-router-dom";
import LoginComponent from "./components/auth/LoginComponent";
import SignUpComponent from "./components/auth/SignUpComponent";
import AdminComponent from "./components/admin/AdminComponent";
import AutopickerOrdersPage from "./components/autopicker/AutopickerOrdersPage";
import NotFound from "./components/common/NotFound";
import Profile from "./components/user/Profile";
import { Layout } from "antd";
import UserOrdersComponent from './components/user/orders/UserOrdersPage';
import NewOrderComponent from './components/user/orders/NewOrderComponent';
import SelectionOrderDescription from './components/user/orders/selection/SelectionOrderDescriptionPage';
import InspectionOrderDescription from './components/user/orders/inspection/InspectionOrderDescriptionPage';
import AutopickerInspectionOrderPage from './components/autopicker/orders/AutopickerInspectionOrderPage';
import AutopickerSelectionOrderPage from './components/autopicker/orders/AutopickerSelectionOrderPage';
import OrderPage from './components/admin/OrderPage';
const { Footer, Content } = Layout;

function App() {
  console.log("USER : " + localStorage.getItem("user"))
  let user = localStorage.getItem("user");
  return (
    <><Layout align="center">
      <Content >
        <Routes>
          <Route path="/users/:id" exact={true} element={<Profile />} />
          <Route path="/logout" exact={true} element={<LoginComponent />} />
          <Route path="/sign-in" exact={true} element={<LoginComponent />} />
          <Route path="/" exact={true} element={user ? <Profile /> : <LoginComponent />} />
          <Route path="/sign-up" exact={true} element={<SignUpComponent />} />

          <Route path="/users/:id/new-order" exact={true} element={<NewOrderComponent />} />
          <Route path="/users/:id/orders" exact={true} element={<UserOrdersComponent />} />
          <Route path="/users/:userId/selection-order/:orderId" exact={true} element={<SelectionOrderDescription />} />
          <Route path="/users/:userId/inspection-order/:orderId" exact={true} element={<InspectionOrderDescription />} />

          <Route path="/admin/users" exact={true} element={<AdminComponent />} />
          <Route path="/admin/orders" exact={true} element={<OrderPage />} />

          <Route path="/auto-picker/:autoPickerId/orders" exact={true} element={<AutopickerOrdersPage />} />
          <Route path="/auto-picker/:autoPickerId/orders/:orderId" exact={true} element={<AutopickerOrdersPage />} />
          <Route path="/auto-picker/:autoPickerId/inspection-order/:orderId"
            exact={true}
            element={<AutopickerInspectionOrderPage />} />
          <Route path="/auto-picker/:autoPickerId/selection-order/:orderId"
            exact={true}
            element={<AutopickerSelectionOrderPage />} />
          <Route path="/*" exact={true} element={<NotFound />} />
        </Routes>
      </Content>
    </Layout></>
  );

}

export default App;
