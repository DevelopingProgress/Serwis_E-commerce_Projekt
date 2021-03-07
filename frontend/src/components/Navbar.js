import {Button, Card, Col, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import Login from "../pages/LoginScreen";
import {useMediaQuery} from "react-responsive/src";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {removeFromCart} from "../actions/cartActions";
import {Link} from "react-router-dom";


export default function MyNavbar() {

    const isSmallMedia =  useMediaQuery({ query: '(max-width: 1028px)' });
    const cart = useSelector((state) => state.cart);
    const {cartItems} = cart;
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);


    const showDropdown = (e)=>{
        setShow(!show);
    }
    const hideDropdown = e => {
        setShow(false);
    }


    return (
        <Navbar  expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">E-Commerce Brand</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">

                </Nav>
                <Nav className="mr-lg-5">
                    {
                        isSmallMedia ? <Nav.Link href="/cart"><div style={{display: "inline-block"}}><FontAwesomeIcon icon={faShoppingCart} /> Koszyk({cartItems.length}) </div></Nav.Link> : (
                            <NavDropdown show={show}  onMouseEnter={showDropdown} onMouseLeave={hideDropdown} className="mr-lg-5" title={<div style={{display: "inline-block"}}><FontAwesomeIcon icon={faShoppingCart} /> Koszyk({cartItems.length}) </div>} id="collasible-nav-dropdown">

                                {
                                    cartItems.length === 0 ? (<h6 className="text-danger ml-1 p-2">Koszyk jest pusty!</h6>) : (

                                    cartItems.map((item) => (
                                        <>
                                            <NavDropdown.ItemText  role="button" key={item.product}>
                                                <Row className="mr-auto">
                                                    <Col lg="4">
                                                        <a href={`/product/${item.product}`}>
                                                            <img className="cartImg" style={{marginRight: "20px"}} src={item.image} alt={`cartItem${item.product}`} width="100px" height="100px"/>
                                                        </a>
                                                    </Col>
                                                    <Col lg="4">
                                                        <a className="link-color-carousel" href={`/product/${item.product}`}>
                                                            <p className="mt-4" style={{marginRight: "200px",whiteSpace: "nowrap", overflow: "hidden",textOverflow: "ellipsis",width: "13ch"}}>
                                                                {item.name}
                                                            </p>
                                                        </a>
                                                    </Col>
                                                    <Col lg="4">
                                                        <Button role="button" variant="outline-danger" onClick={() => dispatch(removeFromCart(item.product))} className="mt-4">X</Button>
                                                    </Col>
                                                </Row>
                                            </NavDropdown.ItemText>
                                            <NavDropdown.Divider />
                                        </>

                                    )))
                                }
                                {
                                    cartItems.length > 0 && <NavDropdown.Item href="/cart">Przejdź do koszyka</NavDropdown.Item>
                                }

                            </NavDropdown>
                        )
                    }
                    <Login/>
                </Nav>
            </Navbar.Collapse>

        </Navbar>
    );
}