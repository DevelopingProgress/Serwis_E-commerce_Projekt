import React, {useEffect, useState} from 'react';
import {Button, Card, Carousel, Col, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import LoadingBox from "../components/Loading";
import ErrorBox from "../components/Error";
import {detailsProduct, listProducts} from "../actions/productActions";
import {addToCart} from "../actions/cartActions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";


export default function ProductPage(props) {

    const productDetails = useSelector((state) => state.productDetails);
    const {loading, error, product} = productDetails;
    const productId = props.match.params.id;
    const dispatch = useDispatch();
    const body = document.querySelector('#root');
    const [qty, setQty] = useState(1);
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    useEffect(() => {

        dispatch(detailsProduct(productId));

        window.scrollTo(0, 0);


    }, [dispatch, productId]);

    const editHandler = (product) => {
        window.location.href = `/product/${product._id}/edit`;
    }

    return (
        <>
        <div className="m-3">
            <Row className="p-4 mt-3">
                <Col lg="12">
                    <h1 className="title">Szczegóły Produktu</h1>
                </Col>
            </Row>
            {
              loading ? <LoadingBox/>  : error ? <ErrorBox variant="danger">{error}</ErrorBox> : (
                  <>
                      <Row>
                          <Col lg="6">
                              <Carousel indicators={false}>
                                  <Carousel.Item>
                                      <img
                                          className="d-block w-100"
                                          src={product.image}
                                          alt="First slide"
                                      />
                                  </Carousel.Item>

                                  <Carousel.Item>
                                      <img
                                          className="d-block w-100"
                                          src={product.image1}
                                          alt="Third slide"
                                      />

                                  </Carousel.Item>
                              </Carousel>
                          </Col>
                          <Col lg="6">
                              <div className="mt-4 mb-4">
                                  <h1 className="text-lg">{product.name}</h1>
                              </div>
                              <div className="text-md">
                                  {product.thumbnail}
                              </div>
                              {
                                  userInfo && !userInfo.isAdmin || !userInfo ? (
                                      <Row className="ms-0 mt-3 ml-1 p-0">
                                          <Form>

                                              <Form.Row>
                                                  {product.countInStock > 0 && (
                                                      <>
                                                          <Form.Group as={Col} lg="6" controlId="formGridQty">
                                                              <Form.Label className="mt-5 text-lg">Ilość</Form.Label>
                                                              <Form.Control as="select" defaultValue="Ilość..." className="text-lg w-75" value={qty} onChange={(e) => setQty(e.target.value)}>
                                                                  {[...Array(product.countInStock).keys()].map(
                                                                      (x) => (
                                                                          <option key={x + 1} value={x + 1}>
                                                                              {x + 1}
                                                                          </option>
                                                                      )
                                                                  )}
                                                              </Form.Control>
                                                          </Form.Group>
                                                          <Form.Group as={Col} lg="6" controlId="formGridSize">

                                                          </Form.Group>
                                                      </>
                                                  )}

                                                  <div className="col mt-4">
                                                      <h1 className="text-lg">{product.price} zł</h1>
                                                  </div>
                                                  {
                                                      product.countInStock > 0 ? (
                                                          <>
                                                              <Col lg="12">
                                                                  <Link to={`/cart/${product._id}?qty=${qty}`} style={{textDecoration: 'none'}}>
                                                                      <Button variant="success" size="lg"
                                                                              className="mt-5 mb-3 w-75" block>
                                                                          Kup teraz
                                                                      </Button>
                                                                  </Link>
                                                              </Col>
                                                              <Col lg="12">
                                                                  <Button variant="dark" size="lg"
                                                                          className="mb-5  w-75" onClick={() => dispatch(addToCart(product._id, qty))} block>
                                                                      Do koszyka
                                                                  </Button>
                                                              </Col>
                                                          </>) : (
                                                          <Col lg="12">
                                                              <h3 className="text-danger mt-3 pb-4">Wyprzedano</h3>
                                                          </Col>
                                                      )
                                                  }
                                              </Form.Row>

                                          </Form>
                                      </Row>
                                  ) : (
                                      <>
                                          <div className="mt-4">
                                              <h1 className="text-lg">{product.price} zł</h1>
                                          </div>
                                          <Button
                                              variant="outline-dark"
                                              className="mb-btn-m mt-5 w-100 buttons-mb"
                                              onClick={() => editHandler(product)}><FontAwesomeIcon
                                              icon={faEdit}/> Edytuj Produkt</Button>
                                      </>
                                  )

                              }
                          </Col>
                      </Row>
                      <div className="bg-light mt-5 p-3">
                          <Row className="text-center">
                              <Col>
                                  <h2>
                                      Opis Produktu
                                  </h2>
                              </Col>
                          </Row>
                          <Row className="p-4">
                              <Col>
                                  <div className="col-lg text-dark text-start text-break lh-lg text-sm">
                                      {product.description}
                                  </div>
                              </Col>
                          </Row>
                      </div>
                  </>
              )}

        </div>

        </>

    )
}