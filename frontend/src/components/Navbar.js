import {Button, Col, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import Login from "../pages/LoginScreen";
import {Link} from "react-router-dom";


export default function MyNavbar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">E-Commerce Brand</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">

                </Nav>
                <Nav className="mr-lg-5">

                    <NavDropdown className="mr-lg-5 mx-5" title={<div style={{display: "inline-block"}}><FontAwesomeIcon icon={faShoppingCart} /> Koszyk(0) </div>} id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/">
                                <Row className="mr-auto">
                                    <Col lg="4">
                                        <img style={{marginRight: "20px"}} src="../../../images/subufery-z-cieniem-removebg-preview.png" alt="" width="100px" height="100px"/>
                                    </Col>
                                    <Col lg="4">
                                        <p className="mt-4" style={{marginRight: "200px"}}>
                                            Produkt 1dasdasda
                                        </p>
                                    </Col>
                                    <Col lg="4">
                                       <Button variant="outline-danger" className="mt-4">X</Button>
                                    </Col>
                                </Row>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/">
                                <Row className="mr-auto">
                                    <Col lg="4">
                                        <img style={{marginRight: "20px"}} src="../../../images/subufery-z-cieniem-removebg-preview.png" alt="" width="100px" height="100px"/>
                                    </Col>
                                    <Col lg="4">
                                        <p className="mt-4" style={{marginRight: "200px"}}>
                                            Produkt 1dasdasda
                                        </p>
                                    </Col>
                                    <Col lg="4">
                                        <Button variant="outline-danger" className="mt-4">X</Button>
                                    </Col>
                                </Row>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/">
                                <Row className="mr-auto">
                                    <Col lg="4">
                                        <img style={{marginRight: "20px"}} src="../../../images/subufery-z-cieniem-removebg-preview.png" alt="" width="100px" height="100px"/>
                                    </Col>
                                    <Col lg="4">
                                        <p className="mt-4" style={{marginRight: "200px"}}>
                                            Produkt 1dasdasda
                                        </p>
                                    </Col>
                                    <Col lg="4">
                                        <Button variant="outline-danger" className="mt-4">X</Button>
                                    </Col>
                                </Row>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/cart">Przejdź do koszyka</NavDropdown.Item>

                    </NavDropdown>
                    <Login/>
                </Nav>
            </Navbar.Collapse>

        </Navbar>
    );
}