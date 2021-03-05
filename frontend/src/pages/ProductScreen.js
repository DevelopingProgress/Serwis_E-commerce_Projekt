import React, {useEffect} from 'react';
import {Button, Card, Carousel, Col, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import LoadingBox from "../components/Loading";
import ErrorBox from "../components/Error";
import {detailsProduct} from "../actions/productActions";


export default function ProductPage(props) {

    const productDetails = useSelector((state) => state.productDetails);
    const {loading, error, product} = productDetails;
    const productId = props.match.params.id;
    const dispatch = useDispatch();
    const body = document.querySelector('#root');

    useEffect(() => {

        dispatch(detailsProduct(productId));

        body.scrollIntoView({
            behavior: 'smooth'
        }, 500);


    }, [dispatch, productId]);

    return (
        <>
        <div className="my-container m-3">
            <Row className="p-4 mt-3">
                <Col lg="12">
                    <h1 className="title">Karta Techniczna Produktu</h1>
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
                                          src={product.image}
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
                              <Row className="ms-0 mt-3 ml-1 p-0">
                                  <Form>

                                      <Form.Row>
                                          <Form.Group as={Col} lg="6" controlId="formGridSize">
                                              <Form.Control as="select" defaultValue="Rozmiar..." className="mt-5 text-lg">
                                                  <option>Rozmiar...</option>
                                                  <option>...</option>
                                              </Form.Control>
                                          </Form.Group>
                                          <Form.Group as={Col} lg="6" controlId="formGridQty">
                                              <Form.Control as="select" defaultValue="Ilość..." className="mt-5 text-lg">
                                                  <option>Ilość...</option>
                                                  <option>...</option>
                                              </Form.Control>
                                          </Form.Group>
                                          <div className="col-lg-3 mt-4">
                                              <h1 className="text-lg">{product.price} zł</h1>
                                          </div>
                                          <Col lg="12">
                                              <Button variant="success" size="lg" type="submit" className="mt-5 text-lg mb-3" block>
                                                  Kup teraz
                                              </Button>
                                          </Col>
                                          <Col lg="12">
                                              <Button variant="dark" size="lg" type="submit" className="text-lg mb-5" block>
                                                  Do koszyka
                                              </Button>
                                          </Col>
                                      </Form.Row>

                                  </Form>
                              </Row>
                          </Col>
                      </Row>
                      <div className="container  bg-light mt-5">
                          <Row className="p-4 pr-2">
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