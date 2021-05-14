import React, {useState} from 'react';
import "@fortawesome/fontawesome-svg-core/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, Col, Form} from "react-bootstrap";
import "../index.css";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import LoadingBox from "../components/Loading";
import ErrorBox from "../components/Error";
import {useDispatch, useSelector} from "react-redux";
import {listProducts, listProductsCategories} from "../actions/productActions";
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
    const [category, setCategory]= useState('');
    const productCategoryList = useSelector((state) => state.productCategoryList);
    const {categories} = productCategoryList;




    useEffect(() => {


        dispatch(listProducts());

        dispatch(listProductsCategories());

        window.scrollTo(0, 0);




    }, []);

    const editHandler = (product) => {
        window.location.href = `/product/${product._id}/edit`;
    }

    return (
            <div className="my-container mt-5" id="products">
                <Form>

                    <Form.Row>
                        <Col lg="4"><h1 className="ml-3 mt-5 text-lg">Produkty</h1></Col>
                        <Form.Group as={Col} lg="4" controlId="formGridSearch">
                            <Form.Label className="mt-3">Wyszukaj</Form.Label>
                            <Form.Control className="text-lg" onChange={e => setName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group as={Col} lg="4" defaultValue="Wybierz kategorię..." controlId="formGridCategory">
                            <Form.Control as="select" className="mt-5 text-lg"  onChange={e => setCategory(e.target.value)}>
                                <option selected value="all">Wybierz kategorię...</option>
                                {categories.map((c) => (
                                    <option key={c}>{c}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>



                </Form>
                {loading ? <LoadingBox/> :error ? <ErrorBox variant="danger">{error}</ErrorBox> : (

                    <div className="row pb-5" style={{marginBottom: "20%"}}>
                        {
                            products.sort().filter((product) => {
                            if(name === "" && category === "all"){
                                return product;
                            } else if(product.name.toLowerCase().includes(name.toLowerCase()) && category === "all"){
                                return product;
                            }else if(product.thumbnail.toLowerCase().includes(name.toLowerCase()) && category === "all"){
                                return product;
                            } else if(name === "" && product.category.toString().toLowerCase().includes(category.toLowerCase())) {
                                return product;
                            } else if(product.name.toLowerCase().includes(name.toLowerCase()) && product.category.toString().toLowerCase().includes(category.toLowerCase())){
                                return product;
                            } else if(product.thumbnail.toLowerCase().includes(name.toLowerCase()) && product.category.toString().toLowerCase().includes(category.toLowerCase())){
                                return product;
                            }

                            }).map( (product) => (
                                    <div className="col-lg-3 mt-3" key={product._id}>
                                        <Card className="m-lg-3">
                                            <Link to={`/product/${product._id}`}>
                                                <Card.Img variant="top" src={product.image} className="img-fluid w-100"/>
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
                                                                    <Link to={`/cart/${product._id}?qty=1`} style={{textDecoration: 'none'}}>
                                                                        <Button variant="outline-success"
                                                                                className="mb-btn-m w-100 pl-1 mb-2"><FontAwesomeIcon
                                                                            icon={faDollarSign}/> Kup teraz</Button>
                                                                    </Link>
                                                                        <Button
                                                                            onClick={() => dispatch(addToCart(product._id, 1))}
                                                                            variant="outline-dark"
                                                                            className="mb-btn-m w-100"><FontAwesomeIcon
                                                                            icon={faShoppingCart}/> Do koszyka</Button>
                                                                    </>
                                                                ) : (
                                                                    <h3 className="text-danger m-3 pb-4">Wyprzedano</h3>
                                                            )
                                                        ) :
                                                        (userInfo && userInfo.isAdmin ? (
                                                            <Button
                                                                variant="outline-dark"
                                                                className="mb-btn-m w-100"
                                                                onClick={() => editHandler(product)}><FontAwesomeIcon
                                                                icon={faEdit}/> Edytuj Produkt</Button>
                                                        ) : (
                                                                product.countInStock > 0 ? (
                                                                    <>
                                                                        <Link to={`/cart/${product._id}?qty=1`} className="btn btn-outline-success mb-btn-m w-100 buttons-mb pl-1 block"><FontAwesomeIcon
                                                                            icon={faDollarSign}/> Kup teraz</Link>
                                                                        <Button
                                                                            onClick={() => dispatch(addToCart(product._id, 1))}
                                                                            variant="outline-dark"
                                                                            className="mb-btn-m w-100"><FontAwesomeIcon
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
