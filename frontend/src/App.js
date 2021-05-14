import React from 'react';
import "@fortawesome/fontawesome-svg-core/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import {BrowserRouter, Link, Route} from "react-router-dom";
import Home from "./pages/HomeScreen";
import ProductPage from "./pages/ProductScreen";
import Products from "./pages/ProductsScreen";
import MyNavbar from "./components/Navbar";
import MyFooter from "./components/Footer";
import CartPage from "./pages/CartScreen";
import ShippingPage from "./pages/ShippingScreen";
import {LoginModal} from "./components/LoginModal";
import Summary from "./pages/SummaryScreen";
import Order from "./pages/OrderScreen";
import Account from "./pages/AccountScreen";
import MyOrders from "./pages/MyOrdersScreen";
import CookieConsent from "react-cookie-consent";
import PrivacyPage from "./pages/PrivacyScreen";
import AdminPanel from "./pages/AdminPanelScreen";
import AdminRoute from "./components/AdminRoute";
import {ProductEditModal} from "./components/ProductEditModal";




export default function App() {


    return (
      <>


          <BrowserRouter>
              <MyNavbar/>
              <Route path="/" component={Home} exact/>
              <AdminRoute path="/product/:id/edit" component={ProductEditModal} exact/>
              <AdminRoute path="/admin" component={AdminPanel} exact/>
              <Route path="/privacy" component={PrivacyPage} exact/>
              <Route path="/myorders" component={MyOrders} exact/>
              <Route path="/account" component={Account} exact/>
              <Route path="/order/:id" component={Order} exact/>
              <Route path="/summary" component={Summary} exact/>
              <Route path="/cart" component={CartPage} exact/>
              <Route path="/cart/:id" component={CartPage} exact/>
              <Route path="/product" component={Products} exact/>
              <Route path="/product/:id" component={ProductPage}/>
              <Route path="/login" component={LoginModal}/>
              <Route path="/shipping" component={ShippingPage}/>
              <CookieConsent
                  location="bottom"
                  buttonText="Potwierdź"
                  cookieName="PrivacyPolicy"
                  style={{ background: "#2B373B" }}
                  buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                  expires={365}
              >
                  Ten serwis wykorzystuje pliki cookies. Więcej informacji znajdziesz w <Link to="/privacy">Polityce Prywatności i Regulaminie</Link>.{" "}
              </CookieConsent>
              <MyFooter/>
          </BrowserRouter>
      </>
  );
}

