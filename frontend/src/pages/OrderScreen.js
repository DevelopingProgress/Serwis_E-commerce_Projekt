import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import {deliverOrder, detailsOrder, payOrder} from "../actions/orderActions";
import {useEffect, useState} from "react";
import {ORDER_DELIVER_RESET, ORDER_PAY_RESET} from "../constants/orderConstants";
import axios from "axios";
import LoadingBox from "../components/Loading";
import {PayPalButton} from "react-paypal-button-v2";
import ErrorBox from "../components/Error";
import Moment from 'moment';
import {Link} from "react-router-dom";


export default function Order(props) {

    const cart = useSelector((state) => state.cart);
    const {cartItems} = cart;
    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const orderDetails = useSelector((state) => state.orderDetails);
    const {order, loading, error} = orderDetails;
    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, error: errorPay, success: successPay,} = orderPay;
    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;
    const dispatch = useDispatch();
    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { loading: loadingDeliver, error: errorDeliver, success: successDeliver,} = orderDeliver;
    Moment.locale('pl');

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}&currency=PLN`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if (!order || successPay || successDeliver || (order && order._id !== orderId)) {
            dispatch({type:ORDER_PAY_RESET});
            dispatch({type:ORDER_DELIVER_RESET});
            dispatch(detailsOrder(orderId));
        } else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, orderId, sdkReady, successPay, successDeliver, order])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    }

    const deliverHandler = () => {
        if(window.confirm(`Czy chcesz dostarczyć zamówienie numer ${order._id}?`)) {
            dispatch(deliverOrder(order._id));
        }
    }

    return loading ? (<LoadingBox/>) : error ? (<ErrorBox variant="danger">{error}</ErrorBox>) : (
        <>
            <Row className="mr-0">
                <Col lg="6" className="ml-2">
                    <Col sm="6">
                        <h1 className="mt-3 black-text-lg">Zamówienie nr</h1>
                        <h1 className="black-text-lg">{order._id}</h1>
                    </Col>
                    <Container className="mt-5 mb-5 p-3 border border-dark">
                        <Row>
                            <Col lg="6">
                                <div className="mb-5">
                                    <h2>1.Sposób dostawy</h2>
                                </div>
                                <div className="ml-3">
                                    <h4>{order.shippingAddress.deliveryMethod}</h4>
                                </div>
                            </Col>
                        </Row>
                        <div className="mt-3 mx-3">
                            {order.isDelivered ? <ErrorBox variant="success">Dostarczono: {Moment(order.deliveredAt).format('YYYY/MM/DD HH:MM')}</ErrorBox>: (order.shippingAddress.deliveryMethod === 'Kurier' && <ErrorBox variant="danger">Zamówienie Niedostarczone</ErrorBox>)}
                        </div>
                    </Container>


                    <Container className="mt-5 mb-5 p-3 border border-dark">
                        <Row>
                            <Col lg="6">
                                <div className="mb-5">
                                    <h2>2.Metoda Płatności</h2>
                                </div>
                                <div className="ml-3">
                                    <h4>{order.shippingAddress.paymentMethod}</h4>
                                </div>
                            </Col>
                        </Row>
                        <div className="mt-3 mx-3">
                            {order.isPaid ? <ErrorBox variant="success">Zapłacono: {Moment(order.paidAt).format('YYYY/MM/DD HH:MM')}</ErrorBox>: (order.shippingAddress.paymentMethod === 'PayPal' && <ErrorBox variant="danger">Zamówienie Nieopłacone</ErrorBox>)}
                        </div>
                    </Container>

                    <Container  className="mt-5 mb-5 p-3 border border-dark">
                        <Row>
                            <Col lg="6">
                                <div className="mb-3">
                                    <h2>3.Dane Adresowe</h2>
                                </div>
                                <div className="my-1 ml-3">
                                    <h5>E-mail:</h5><p>{order.shippingAddress.email}</p>
                                </div>
                                <div className="my-1 ml-3">
                                    <h5>Imię i Nazwisko: </h5><p>{order.shippingAddress.name} {order.shippingAddress.surname}</p>
                                </div>
                                <div className="my-1 ml-3">
                                    <h5>Adres: </h5><p>{order.shippingAddress.address}, {order.shippingAddress.state}, {order.shippingAddress.city}, {order.shippingAddress.zip}</p>
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
                                        order.orderItems.map((item) => (
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

                <Col lg="4" className="mt-5 ml-3">
                    <h2 className="text-center">Podsumowanie</h2>
                    <div className="bg-light p-3 mr-2">
                        <Row className="mt-4">
                            <Col lg="5">
                                <h4 className="text-center">Koszyk:</h4>
                            </Col>
                            <Col lg="7">
                                <h3 className="text-center">{order.shippingAddress.cartPrice.toFixed(2)} zł</h3>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col lg="5">
                                <h4 className="text-center">Dostawa:</h4>
                            </Col>
                            <Col lg="7">
                                <h3 className="text-center">{order.shippingAddress.deliveryMethod === 'Kurier' ? order.shippingAddress.deliveryPrice.toFixed(2) : '0.00'} zł</h3>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col lg="5">
                                <h4 className="text-center">Razem:</h4>
                            </Col>
                            <Col lg="7">
                                <h3 className="text-center">{order.shippingAddress.deliveryMethod === 'Kurier' ? (order.shippingAddress.cartPrice + order.shippingAddress.deliveryPrice).toFixed(2): order.shippingAddress.cartPrice.toFixed(2) } zł</h3>
                            </Col>
                        </Row>
                        {!userInfo.isAdmin && !order.isPaid && order.shippingAddress.paymentMethod === 'PayPal' && (
                            <div>
                                {!sdkReady ? (
                                    <LoadingBox/>
                                ) : (
                                    <div>
                                        {errorPay && (
                                            <ErrorBox variant="danger">{errorPay}</ErrorBox>
                                        )}
                                        {
                                            <PayPalButton amount={order.shippingAddress.totalPrice} onSuccess={successPaymentHandler} currency="PLN"/>
                                        }
                                    </div>
                                )}

                            </div>
                        )}

                        {userInfo.isAdmin && order.isPaid && !order.isDelivered && order.shippingAddress.deliveryMethod === "Kurier" &&(
                            <Button variant="outline-dark" size="md" className="mt-5 px-3 text-lg mb-3" block onClick={deliverHandler}>Dostarcz Zamówienie</Button>
                        )}
                        {userInfo.isAdmin && !order.isPaid && !order.isDelivered && order.shippingAddress.paymentMethod === "Gotówka przy odbiorze" &&(
                            <Button variant="outline-dark" size="md" className="mt-5 px-3 text-lg mb-3" block onClick={deliverHandler}>Dostarcz Zamówienie</Button>
                        )}
                    </div>


                </Col>
            </Row>
            <Row>

            </Row>
        </>

    );
}