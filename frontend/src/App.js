import React from 'react';
import "@fortawesome/fontawesome-svg-core/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, CardGroup, Carousel, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./pages/HomeScreen";
import ProductPage from "./pages/ProductScreen";


function App() {
  return (
      <>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Brand href="/">E-Commerce Brand</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="mr-auto">

                  </Nav>
                  <Nav className="mr-lg-5">

                      <NavDropdown className="mr-lg-3" title={<div style={{display: "inline-block"}}><FontAwesomeIcon icon={faShoppingCart} /> Koszyk(0) </div>} id="collasible-nav-dropdown">
                          <NavDropdown.Item href="/">Action</NavDropdown.Item>
                          <NavDropdown.Item href="/">Another action</NavDropdown.Item>
                          <NavDropdown.Item href="/">Something</NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item href="/">Separated link</NavDropdown.Item>
                      </NavDropdown>
                      <Nav.Link className="mr-lg-3" href="/">
                          Zaloguj się
                      </Nav.Link>
                      <NavDropdown className="mr-lg-3" title="Administrator" id="collasible-nav-dropdown">
                          <NavDropdown.Item href="/">Action</NavDropdown.Item>
                          <NavDropdown.Item href="/">Another action</NavDropdown.Item>
                          <NavDropdown.Item href="/">Something</NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item href="/">Separated link</NavDropdown.Item>
                      </NavDropdown>
                  </Nav>
              </Navbar.Collapse>

          </Navbar>

          <BrowserRouter>
            <Route path="/" component={Home}/>
            <Route path="/product/:id" component={ProductPage} exact/>
          </BrowserRouter>
      </>


  );
}

export default App;
