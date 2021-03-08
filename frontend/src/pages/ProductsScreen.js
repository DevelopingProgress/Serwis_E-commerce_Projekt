import React, {useCallback, useState} from 'react';
import "@fortawesome/fontawesome-svg-core/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, Col, Form, Nav} from "react-bootstrap";
import "../index.css";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import LoadingBox from "../components/Loading";
import ErrorBox from "../components/Error";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";
import {faDollarSign, faEdit, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {addToCart} from "../actions/cartActions";


export default function Products(props) {

    const productList = useSelector((state) => state.productList);
    const {loading, error, products} = productList;
    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const [name, setName] = useState('');




    useEffect(() => {


        dispatch(listProducts());

        const body = document.querySelector('#root');

        body.scrollIntoView({
            behavior: 'smooth'
        }, 500);



    }, []);



    return (
            <div className="my-container" id="products">
                <Form>

                    <Form.Row>
                        <Col lg="3"><h1 className="ml-3 mt-5 text-lg">Produkty</h1></Col>
                        <Form.Group as={Col} lg="3" controlId="formGridSort">
                            <Form.Control as="select" defaultValue="Sortuj po..." className="mt-5 text-lg text-danger">
                                <option>Sortuj po...</option>
                                <option>...</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} lg="3" defaultValue="Wybierz kategorię..." controlId="formGridCategory">
                            <Form.Control as="select" className="mt-5 text-lg text-danger">
                                <option>Wybierz kategorię...</option>
                                <option>...</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} lg="3" controlId="formGridSearch">
                            <Form.Label className="mt-3">Wyszukaj</Form.Label>
                            <Form.Control className="text-lg" onChange={e => setName(e.target.value)}/>
                        </Form.Group>
                    </Form.Row>



                </Form>
                {loading ? <LoadingBox/> :error ? <ErrorBox variant="danger">{error}</ErrorBox> : (

                    <div className="row">
                        {
                            products.filter((product) => {
                            if(name === "") {
                                return product;
                            } else if(product.name.toLowerCase().includes(name.toLowerCase())){
                                return product;
                            } else if(product.thumbnail.toLowerCase().includes(name.toLowerCase())){
                                return product;
                            } else if(product.price.toString().toLowerCase().includes(name.toLowerCase())){
                                return product;
                            }

                            }).map( (product) => (
                                    <div className="col-lg-3" key={product._id}>
                                        <Card className="m-lg-3">
                                            <Link to={`/product/${product._id}`}>
                                                <Card.Img variant="top" src={product.image} />
                                            </Link>
                                            <Card.Body>
                                                <Link to={`/product/${product._id}`} className="link-color">
                                                    <Card.Title>{product.name}</Card.Title>
                                                </Link>
                                                <Card.Text>{product.thumbnail}</Card.Text>
                                                <h3 style={{textAlign: 'right'}}>{product.price} zł</h3>
                                                {
                                                    userInfo && !userInfo.isAdmin ? (

                                                        product.countInStock > 0 ? (
                                                                    <>
                                                                        <Button variant="outline-success"
                                                                                className="mb-btn-m w-100 buttons-mb pl-1"><FontAwesomeIcon
                                                                            icon={faDollarSign}/> Kup teraz</Button>
                                                                        <Button
                                                                            onClick={() => dispatch(addToCart(product._id, 1))}
                                                                            variant="outline-dark"
                                                                            className="mb-btn-m w-100 buttons-mb"><FontAwesomeIcon
                                                                            icon={faShoppingCart}/> Do koszyka</Button>
                                                                    </>
                                                                ) : (
                                                                    <h3 className="text-danger m-3 pb-4">Wyprzedano</h3>
                                                            )
                                                        ) :
                                                        (userInfo && userInfo.isAdmin ? (
                                                            <Button
                                                                variant="outline-dark"
                                                                className="mb-btn-m w-100 buttons-mb"><FontAwesomeIcon
                                                                icon={faEdit}/> Edytuj Produkt</Button>
                                                        ) : (
                                                                product.countInStock > 0 ? (
                                                                    <>
                                                                        <Button variant="outline-success"
                                                                                className="mb-btn-m w-100 buttons-mb pl-1"><FontAwesomeIcon
                                                                            icon={faDollarSign}/> Kup teraz</Button>
                                                                        <Button
                                                                            onClick={() => dispatch(addToCart(product._id, 1))}
                                                                            variant="outline-dark"
                                                                            className="mb-btn-m w-100 buttons-mb"><FontAwesomeIcon
                                                                            icon={faShoppingCart}/> Do koszyka</Button>
                                                                    </>
                                                                ) : (
                                                                    <h3 className="text-danger m-3 pb-4">Wyprzedano</h3>
                                                                )
                                                        )
                                                        )
                                                }

                                            </Card.Body>
                                        </Card>
                                    </div>
                                )
                            )
                        }
                    </div>
                )}

            </div>


    );
}
