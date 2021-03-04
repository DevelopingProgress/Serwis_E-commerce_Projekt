import React from 'react';
import "@fortawesome/fontawesome-svg-core/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from "react-bootstrap";
import "../index.css";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
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

    }, []);

    return (
            <div className="my-container" id="products">
                <h1 className="ml-3 mt-5 text-lg">Produkty</h1>
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
