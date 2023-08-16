import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Public,
  Home,
  NotFound,
  DetailProduct,
  Shop,
  Login,
  OAuthLogin,
  ForgotPassword,
} from "./pages/public/";
import { Modal } from "./components/general";
import {
  Member,
  Order,
  Address,
  Profile,
  Logout,
  Cart,
  Checkout,
} from "./pages/member/";
import {
  Admin,
  DashBoard,
  ManageOrder,
  ManageProduct,
  ManageUser,
} from "./pages/admin";
import path from "./utils/paths";
import { getProducts } from "./store/app/appSlice";
import { ToastContainer } from "react-toastify";
import "./scss/app.scss";

function App() {
  const dispatch = useDispatch();
  const { isShowModal, modalChildren } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="font-roboto relative">
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.SNEAKER} element={<Shop key={0} />} />
          <Route path={path.OUTLET} element={<Shop outlet={true} key={1} />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.OAUTHLOGIN} element={<OAuthLogin />} />
          <Route path={path.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path={path.DETAIL} element={<DetailProduct />} />

          <Route path={path.CART} element={<Cart />} />
          <Route path={path.CHECKOUT} element={<Checkout />} />

          <Route path={path.ALL} element={<NotFound />} />
        </Route>
        <Route path={path.MEMBER} element={<Member />}>
          <Route path={path.ORDER} element={<Order />} />
          <Route path={path.ADDRESS} element={<Address />} />
          <Route path={path.PROFILE} element={<Profile />} />
          <Route path={path.LOGOUT} element={<Logout />} />
        </Route>
        <Route path={path.ADMIN} element={<Admin />}>
          <Route path={path.DASHBOARD} element={<DashBoard />} />
          <Route path={path.MANAGEUSER} element={<ManageUser />} />
          <Route path={path.MANAGEPRODUCT} element={<ManageProduct />} />
          <Route path={path.MANAGEORDER} element={<ManageOrder />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
