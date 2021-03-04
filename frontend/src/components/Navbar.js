import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";


export default function MyNavbar() {
    return (
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
                    <Nav.Link className="mr-lg-3" href="/login">
                        Zaloguj się
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>

        </Navbar>
    );
}