import React from 'react';
import "@fortawesome/fontawesome-svg-core/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./pages/HomeScreen";
import ProductPage from "./pages/ProductScreen";
import Products from "./pages/ProductsScreen";
import MyNavbar from "./components/Navbar";
import MyFooter from "./components/Footer";
import CartPage from "./pages/CartScreen";
import ShippingPage from "./pages/ShippingScreen";


export default function App() {
  return (
      <>
         <MyNavbar/>

          <BrowserRouter>
              <Route path="/" component={Home} exact/>
              <Route path="/cart" component={CartPage} exact/>
              <Route path="/cart/:id" component={CartPage} exact/>
              <Route path="/product" component={Products} exact/>
              <Route path="/product/:id" component={ProductPage}/>
              <Route path="/shipping" component={ShippingPage}/>
          </BrowserRouter>

          <MyFooter/>
      </>
  );
}

