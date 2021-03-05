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
                          <Row className="p-4">
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

            <div className="my-container container">
                <h1 className="ms-3 pt-5 mt-5 text-lg">Polecane</h1>
                <div className="row">
                    <div className="col-lg-3">
                        <Card className="m-lg-3">
                            <Link to={`/product/1`}>
                                <Card.Img variant="top" src={"../../images/subufery-z-cieniem-removebg-preview.png"} />
                            </Link>
                            <Card.Body>
                                <Link to={`/product/1`} className="link-color">
                                    <Card.Title>Product 1</Card.Title>
                                </Link>
                                <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                                <h3 style={{textAlign: 'right'}}>121 zł</h3>
                                <a href="/" className="btn btn-outline-success mb-btn-m w-100 buttons-mb"><i className="fas fa-shopping-cart"/> Kup teraz</a>
                                <a href="/" className="btn btn-outline-dark mb-btn-m w-100"><i className="fas fa-clipboard-list"/> Do koszyka</a>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-lg-3">
                        <Card className="m-lg-3">
                            <Link to={`/product/2`}>
                                <Card.Img variant="top" src={"../../images/subufery-z-cieniem-removebg-preview.png"} />
                            </Link>
                            <Card.Body>
                                <Link to={`/product/2`} className="link-color">
                                    <Card.Title>Product 1</Card.Title>
                                </Link>
                                <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                                <h3 style={{textAlign: 'right'}}>121 zł</h3>
                                <a href="/" className="btn btn-outline-success mb-btn-m w-100 buttons-mb"><i className="fas fa-shopping-cart"/> Kup teraz</a>
                                <a href="/" className="btn btn-outline-dark mb-btn-m w-100"><i className="fas fa-clipboard-list"/> Do koszyka</a>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-lg-3">
                        <Card className="m-lg-3">
                            <Link to={`/product/3`}>
                                <Card.Img variant="top" src={"../../images/subufery-z-cieniem-removebg-preview.png"} />
                            </Link>
                            <Card.Body>
                                <Link to={`/product/3`} className="link-color">
                                    <Card.Title>Product 1</Card.Title>
                                </Link>
                                <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                                <h3 style={{textAlign: 'right'}}>121 zł</h3>
                                <a href="/" className="btn btn-outline-success mb-btn-m w-100 buttons-mb"><i className="fas fa-shopping-cart"/> Kup teraz</a>
                                <a href="/" className="btn btn-outline-dark mb-btn-m w-100"><i className="fas fa-clipboard-list"/> Do koszyka</a>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-lg-3">
                        <Card className="m-lg-3">
                            <Link to={`/product/4`}>
                                <Card.Img variant="top" src={"../../images/subufery-z-cieniem-removebg-preview.png"} />
                            </Link>
                            <Card.Body>
                                <Link to={`/product/4`} className="link-color">
                                    <Card.Title>Product 1</Card.Title>
                                </Link>
                                <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                                <h3 style={{textAlign: 'right'}}>121 zł</h3>
                                <a href="/" className="btn btn-outline-success mb-btn-m w-100 buttons-mb"><i className="fas fa-shopping-cart"/> Kup teraz</a>
                                <a href="/" className="btn btn-outline-dark mb-btn-m w-100"><i className="fas fa-clipboard-list"/> Do koszyka</a>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-lg-3">
                        <Card className="m-lg-3">
                            <Link to={`/product/5`}>
                                <Card.Img variant="top" src={"../../images/subufery-z-cieniem-removebg-preview.png"} />
                            </Link>
                            <Card.Body>
                                <Link to={`/product/5`} className="link-color">
                                    <Card.Title>Product 1</Card.Title>
                                </Link>
                                <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                                <h3 style={{textAlign: 'right'}}>121 zł</h3>
                                <a href="/" className="btn btn-outline-success mb-btn-m w-100 buttons-mb"><i className="fas fa-shopping-cart"/> Kup teraz</a>
                                <a href="/" className="btn btn-outline-dark mb-btn-m w-100"><i className="fas fa-clipboard-list"/> Do koszyka</a>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-lg-3">
                        <Card className="m-lg-3">
                            <Link to={`/product/6`}>
                                <Card.Img variant="top" src={"../../images/subufery-z-cieniem-removebg-preview.png"} />
                            </Link>
                            <Card.Body>
                                <Link to={`/product/6`} className="link-color">
                                    <Card.Title>Product 1</Card.Title>
                                </Link>
                                <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                                <h3 style={{textAlign: 'right'}}>121 zł</h3>
                                <a href="/" className="btn btn-outline-success mb-btn-m w-100 buttons-mb"><i className="fas fa-shopping-cart"/> Kup teraz</a>
                                <a href="/" className="btn btn-outline-dark mb-btn-m w-100"><i className="fas fa-clipboard-list"/> Do koszyka</a>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-lg-3">
                        <Card className="m-lg-3">
                            <Link to={`/product/7`}>
                                <Card.Img variant="top" src={"../../images/subufery-z-cieniem-removebg-preview.png"} />
                            </Link>
                            <Card.Body>
                                <Link to={`/product/7`} className="link-color">
                                    <Card.Title>Product 1</Card.Title>
                                </Link>
                                <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                                <h3 style={{textAlign: 'right'}}>121 zł</h3>
                                <a href="/" className="btn btn-outline-success mb-btn-m w-100 buttons-mb"><i className="fas fa-shopping-cart"/> Kup teraz</a>
                                <a href="/" className="btn btn-outline-dark mb-btn-m w-100"><i className="fas fa-clipboard-list"/> Do koszyka</a>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </>

    )
}