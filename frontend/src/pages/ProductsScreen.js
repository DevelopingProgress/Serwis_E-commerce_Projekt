import React from 'react';
import "@fortawesome/fontawesome-svg-core/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, Col, Form} from "react-bootstrap";
import "../index.css";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import LoadingBox from "../components/Loading";
import ErrorBox from "../components/Error";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";


export default function Products(props) {

    const productList = useSelector((state) => state.productList);
    const {loading, error, products} = productList;
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(listProducts());

        const body = document.querySelector('#root');

        body.scrollIntoView({
            behavior: 'smooth'
        }, 500)

    }, []);


    return (
            <div className="my-container" id="products">
                <Form>

                    <Form.Row>
                        <Col lg="2"><h1 className="ml-3 mt-5 text-lg">Produkty</h1></Col>
                        <Col lg="2"/>
                        <Form.Group as={Col} lg="2" controlId="formGridSort">
                            <Form.Control as="select" defaultValue="Sortuj po..." className="mt-5 text-lg">
                                <option>Sortuj po...</option>
                                <option>...</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} lg="2" defaultValue="Wybierz kategorię..." controlId="formGridCategory">
                            <Form.Control as="select" className="mt-5 text-lg">
                                <option>Wybierz kategorię...</option>
                                <option>...</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} lg="2" controlId="formGridSearch">
                            <Form.Control className=" mt-5 text-lg"/>
                        </Form.Group>
                        <Col lg="2">
                            <Button variant="primary" type="submit" className=" mt-5 text-lg mb-5">
                                Wyszukaj
                            </Button>
                        </Col>
                    </Form.Row>



                </Form>
                {loading ? <LoadingBox/> :error ? <ErrorBox variant="danger">{error}</ErrorBox> : (

                    <div className="row">
                        {
                            products.map( (product) => (
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
                                                <a href="/" className="btn btn-outline-success mb-btn-m w-100 buttons-mb"><i className="fas fa-shopping-cart"/> Kup teraz</a>
                                                <a href="/" className="btn btn-outline-dark mb-btn-m w-100"><i className="fas fa-clipboard-list"/> Do listy życzeń</a>
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
