import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Button, Table, Form, Image} from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeFromCart} from "../actions/cartActions";

export default function CartPage(props){

    const cart = useSelector((state) => state.cart);
    const {cartItems} = cart;
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    return (
    <>
        <div className="ml-5 pl-4 mt-4">
            <h1  className='mb-5' style={{textAlign: 'left'}}>
                Koszyk
            </h1>
        </div>

        <Row className='m-auto'>
            <Container className='bg-light mb-5 pr-0'>
                <Col lg="12">
                    {
                        cartItems.length === 0 ? (<h1 className="text-danger ml-1 p-5">Koszyk jest pusty! <a
                            href="/product">Przejdź do zakupów</a></h1>) : (

                            cartItems.map((item) => (
                                <Row className='p-3 mb-3'>
                                    <Col lg="2">
                                        <Image width={100} height={100} roundedCircle src={item.image}/>
                                    </Col>
                                    <Col lg="2" className="mx-3 pt-4">
                                        <h6>{item.name}</h6>
                                    </Col>
                                    <Col lg="2" className="mx-3 pt-2">
                                        <h6><Form.Label>Ilość</Form.Label></h6>
                                        <Form.Control as="select" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col lg="2" className="mx-3 pt-3">
                                        <h5>{(item.price * item.qty).toFixed(2)} zł</h5>
                                        <span>{item.price} zł za sztukę</span>
                                    </Col>
                                    <Col lg="2" className="mx-3 pt-3">
                                        <Button variant="outline-danger" onClick={() => dispatch(removeFromCart(item.product))}>Usuń</Button>
                                    </Col>
                                </Row>
                            )))
                    }

                </Col>
            </Container>

            <Col lg='3'>
                <h2 className="text-center">Podsumowanie</h2>
                <div className="bg-light p-5">
                    <Row>
                        <Col lg="6">
                            <h4 className="text-center">Razem:</h4>
                        </Col>
                        <Col lg="6">
                            <h3 className="text-center">{cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)} zł</h3>
                        </Col>
                    </Row>
                </div>
            </Col>

        </Row>

    </>
    );
}

