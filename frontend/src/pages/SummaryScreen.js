import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import {createOrder} from "../actions/orderActions";
import {useEffect} from "react";
import {ORDER_CREATE_RESET} from "../constants/orderConstants";
import {Link} from "react-router-dom";


export default function Summary(props) {
    const cart = useSelector(state => state.cart);
    const orderCreate = useSelector(state => state.orderCreate);
    const {loading, success, error, order} = orderCreate;
    const dispatch = useDispatch();


    useEffect(() => {
        if(cart.cartItems.length === 0){
            props.history.push('/cart');
        }
        if(success){
            props.history.push(`/order/${order._id}`);
            dispatch({type: ORDER_CREATE_RESET});
        }

        window.scrollTo(0, 0);

    }, [dispatch, order, props.history, success])


    const placeOrderHandler = () => {
        dispatch(createOrder({...cart, orderItems: cart.cartItems}))
    }

    return (
        <>
            <Row className="mr-0">
                <Col lg="6" className="ml-2">

                    <Container className="mt-5 mb-5 p-3 border border-dark">
                        <Row>
                            <Col lg="6">
                                <div className="mb-5">
                                    <h2>1.Sposób dostawy</h2>
                                </div>
                                <div className="ml-3">
                                    <h4>{cart.shippingAddress.deliveryMethod}</h4>
                                </div>
                            </Col>
                        </Row>
                    </Container>

                    <Container className="mt-5 mb-5 p-3 border border-dark">
                        <Row>
                            <Col lg="6">
                                <div className="mb-5">
                                    <h2>2.Metoda Płatności</h2>
                                </div>
                                <div className="ml-3">
                                    <h4>{cart.shippingAddress.paymentMethod}</h4>
                                </div>

                            </Col>
                        </Row>
                    </Container>

                    <Container  className="mt-5 mb-5 p-3 border border-dark">
                        <Row>
                            <Col lg="6">
                                <div className="mb-3">
                                    <h2>3.Dane Adresowe</h2>
                                </div>
                                <div className="my-1 ml-3">
                                    <h5>E-mail:</h5><p>{cart.shippingAddress.email}</p>
                                </div>
                                <div className="my-1 ml-3">
                                    <h5>Imię i Nazwisko: </h5><p>{cart.shippingAddress.name} {cart.shippingAddress.surname}</p>
                                </div>
                                <div className="my-1 ml-3">
                                    <h5>Adres: </h5><p>{cart.shippingAddress.address}, {cart.shippingAddress.state}, {cart.shippingAddress.city}, {cart.shippingAddress.zip}</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <Container  className="mt-5 mb-5 p-3 border border-dark">
                        <Row>
                            <Col lg="8">
                                <div className="mb-5">
                                    <h2>4.Zawartość Koszyka:</h2>
                                </div>
                                <div>
                                    {
                                        cart.cartItems.map((item) => (
                                            <Row className="mb-3">
                                                <Col lg="4">
                                                    <Link to={`/product/${item.product}`}>
                                                        <Image className="img-fluid" src={item.image}/>
                                                    </Link>
                                                </Col>
                                                <Col lg="4">
                                                    <Link className="link-color-carousel" to={`/product/${item.product}`}>
                                                        <p className="mt-4" style={{marginRight: "200px",whiteSpace: "nowrap", overflow: "hidden",textOverflow: "ellipsis",width: "13ch"}}>
                                                            {item.name} x {item.qty}
                                                        </p>
                                                    </Link>
                                                </Col>
                                                <Col lg="4">
                                                    <p className="mt-4" style={{marginRight: "200px",whiteSpace: "nowrap", overflow: "hidden",textOverflow: "ellipsis",width: "13ch"}}>{(item.qty * item.price).toFixed(2)} zł</p>
                                                </Col>
                                            </Row>
                                        ))
                                    }
                                </div>

                            </Col>
                        </Row>
                    </Container>
                </Col>

                <Col lg="4" className="mt-5">
                    <h2 className="text-center">Podsumowanie</h2>
                    <div className="bg-light p-3 mr-2">
                        <Row className="mt-4">
                            <Col lg="5">
                                <h4 className="text-center">Koszyk:</h4>
                            </Col>
                            <Col lg="7">
                                <h3 className="text-center">{cart.shippingAddress.cartPrice.toFixed(2)} zł</h3>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col lg="5">
                                <h4 className="text-center">Dostawa:</h4>
                            </Col>
                            <Col lg="7">
                                <h3 className="text-center">{cart.shippingAddress.deliveryMethod === 'Kurier' ? cart.shippingAddress.deliveryPrice.toFixed(2) : '0.00'} zł</h3>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col lg="5">
                                <h4 className="text-center">Razem:</h4>
                            </Col>
                            <Col lg="7">
                                <h3 className="text-center">{cart.shippingAddress.deliveryMethod === 'Kurier' ? (cart.shippingAddress.cartPrice + cart.shippingAddress.deliveryPrice).toFixed(2): cart.shippingAddress.cartPrice.toFixed(2) } zł</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="success" type="submit" size="lg" className="mt-5 text-lg mb-3" block onClick={placeOrderHandler}>
                                    Do Płatności
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Link to="/product"  style={{textDecoration: 'none'}}>
                                    <Button variant="outline-dark" size="lg" className="text-lg mb-5" block>
                                        Kontynuuj Zakupy
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    </div>


                </Col>
            </Row>
            <Row>

            </Row>
        </>

    );
}