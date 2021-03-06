import {Button, Col, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import Login from "../pages/LoginScreen";
import {useMediaQuery} from "react-responsive/src";
import {useSelector} from "react-redux";
import {useState} from "react";
import ErrorBox from "./Error";


export default function MyNavbar() {

    const isSmallMedia =  useMediaQuery({ query: '(max-width: 1028px)' });
    const cart = useSelector((state) => state.cart);
    const {cartItems} = cart;

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
                        isSmallMedia ? <Nav.Link href="/cart"><div style={{display: "inline-block"}}><FontAwesomeIcon icon={faShoppingCart} /> Koszyk(0) </div></Nav.Link> : (
                            <NavDropdown show={show}  onMouseEnter={showDropdown} onMouseLeave={hideDropdown} className="mr-lg-5" title={<div style={{display: "inline-block"}}><FontAwesomeIcon icon={faShoppingCart} /> Koszyk(0) </div>} id="collasible-nav-dropdown">

                                {
                                    cartItems.length === 0 ? (<h6 className="text-danger ml-1 p-2">Koszyk jest pusty!</h6>) : (

                                    cartItems.map((item) => (
                                        <>
                                            <NavDropdown.Item href={`/product/${item.product}`} key={item._id}>
                                                <Row className="mr-auto">
                                                    <Col lg="4">
                                                        <img style={{marginRight: "20px"}} src={item.image} alt="" width="100px" height="100px"/>
                                                    </Col>
                                                    <Col lg="4">
                                                        <p className="mt-4" style={{marginRight: "200px",whiteSpace: "nowrap", overflow: "hidden",textOverflow: "ellipsis",width: "13ch"}}>
                                                            {item.name}
                                                        </p>
                                                    </Col>
                                                    <Col lg="4">
                                                        <Button variant="outline-danger" className="mt-4">X</Button>
                                                    </Col>
                                                </Row>
                                            </NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/cart">Przejdź do koszyka</NavDropdown.Item>
                                        </>

                                    )))
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