import React from 'react';
import "@fortawesome/fontawesome-svg-core/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./pages/HomeScreen";
import ProductPage from "./pages/ProductScreen";
import Login from "./pages/LoginScreen";
import Products from "./pages/ProductsScreen";
import MyNavbar from "./components/Navbar";
import MyFooter from "./components/Footer";


function App() {
  return (
      <>
         <MyNavbar/>

          <BrowserRouter>
              <Route path="/" component={Home} exact/>
              <Route path="/product" component={Products} exact/>
              <Route path="/product/:id" component={ProductPage}/>
          </BrowserRouter>

          <MyFooter/>
      </>
  );
}

export default App;
