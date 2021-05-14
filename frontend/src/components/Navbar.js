import {Button, Card, Col, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart, faUser} from "@fortawesome/free-solid-svg-icons";
import Login from "../pages/LoginScreen";
import {useMediaQuery} from "react-responsive/src";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {removeFromCart} from "../actions/cartActions";
import {signout} from "../actions/userActions";
import {Link} from "react-router-dom";


export default function MyNavbar() {

    const isSmallMedia =  useMediaQuery({ query: '(max-width: 1028px)' });
    const cart = useSelector((state) => state.cart);
    const {cartItems} = cart;
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    useEffect(() => {

    }, [cartItems])

    const signoutHandler = () => {
        dispatch(signout());
        window.location = '/'
    }

    const showDropdown = (e)=>{
        setShow(!show);
    }
    const hideDropdown = e => {
        setShow(false);
    }

    const showDropdownUser = (e)=>{
        setShowUser(!showUser);
    }
    const hideDropdownUser = e => {
        setShowUser(false);
    }


    return (
        <Navbar  expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">E-Commerce</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">

                </Nav>
                <Nav className="mr-lg-5">
                    {
                        (userInfo && !userInfo.isAdmin || !userInfo ? (
                        isSmallMedia ? <Nav.Link href="/cart"><div style={{display: "inline-block"}}><FontAwesomeIcon icon={faShoppingCart} /> Koszyk({cartItems.length}) </div></Nav.Link> : (
                            <NavDropdown show={show}  onMouseEnter={showDropdown} onMouseLeave={hideDropdown} className="mr-lg-5" title={<div style={{display: "inline-block"}}><FontAwesomeIcon icon={faShoppingCart} /> Koszyk({cartItems.length}) </div>} id="collasible-nav-dropdown">

                                {
                                    cartItems.length === 0 ? (<h6 className="text-danger ml-1 p-2">Koszyk jest pusty!</h6>) : (

                                    cartItems.map((item) => (
                                        <>
                                            <NavDropdown.ItemText  role="button" key={item._id}>
                                                <Row>
                                                    <Col lg="4">
                                                        <Link to={`/product/${item.product}`}>
                                                            <img className="cartImg img-fluid" src={item.image} alt={`cartItem${item.product}`}/>
                                                        </Link>
                                                    </Col>
                                                    <Col lg="4">
                                                        <Link className="link-color-carousel" to={`/product/${item.product}`}>
                                                            <p className="mt-4" style={{marginRight: "185px",whiteSpace: "nowrap", overflow: "hidden",textOverflow: "ellipsis",width: "13ch"}}>
                                                                {item.name} x {item.qty}
                                                            </p>
                                                        </Link>
                                                    </Col>
                                                    <Col lg="4">
                                                        <Button role="button" variant="outline-danger" size="sm" onClick={() => dispatch(removeFromCart(item.product))} className="mt-4">X</Button>
                                                    </Col>
                                                </Row>
                                            </NavDropdown.ItemText>
                                            <NavDropdown.Divider />
                                        </>

                                    )))
                                }
                                {
                                    cartItems.length > 0 && (
                                        <>
                                            <NavDropdown.ItemText><h6>Wartość koszyka: {cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)} zł</h6></NavDropdown.ItemText>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/cart">Przejdź do koszyka</NavDropdown.Item>
                                        </>
                                    )

                                }

                            </NavDropdown>
                        )) :
                            (
                                <></>
                            )
                        )
                    }
                    {
                        userInfo && !userInfo.isAdmin ? (

                            <>
                                <Nav className="mr-lg-1">
                                    <NavDropdown show={showUser}  onMouseEnter={showDropdownUser} onMouseLeave={hideDropdownUser} className="mr-lg-1" title={<div style={{display: "inline-block"}}><FontAwesomeIcon icon={faUser} /> Użytkownik({userInfo.name}) </div>} id="collasible-nav-dropdown">
                                        <NavDropdown.Item href="/account">
                                            Konto
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/myorders">
                                            Zamówienia
                                        </NavDropdown.Item >
                                        <NavDropdown.Item onClick={signoutHandler}>
                                            Wyloguj się
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </>

                            ) :
                        (userInfo && userInfo.isAdmin ? (

                            <>
                                <Nav className="mr-lg-1">
                                    <NavDropdown show={showUser}  onMouseEnter={showDropdownUser} onMouseLeave={hideDropdownUser} className="mr-lg-1" title={<div style={{display: "inline-block"}}><FontAwesomeIcon icon={faUser} /> Administrator({userInfo.name}) </div>} id="collasible-nav-dropdown">
                                        <NavDropdown.Item href="/admin">
                                            Panel Administratora
                                        </NavDropdown.Item>
                                        <NavDropdown.Item onClick={signoutHandler}>
                                            Wyloguj się
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </>

                        ) : (<Login/>))
                    }
                </Nav>
            </Navbar.Collapse>

        </Navbar>
    );
}