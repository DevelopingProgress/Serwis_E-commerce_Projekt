import React, {useEffect} from 'react';
import {Button, Card, Carousel, Col, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";


export default function ProductPage(props) {

    const body = document.querySelector('#root');

    useEffect(() => {

        body.scrollIntoView({
            behavior: 'smooth'
        }, 500);


    }, []);

    return (
        <>
        <div className="my-container m-3">
            <Row className="p-4 mt-3">
                <Col lg="12">
                    <h1 className="title">Karta Techniczna Produktu</h1>
                </Col>
            </Row>
            <Row>
                <Col lg="6">
                    <Carousel indicators={false}>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="../../../images/subufery-z-cieniem-removebg-preview.png"
                                alt="First slide"
                            />
                        </Carousel.Item>

                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="../../../images/subufery-z-cieniem-removebg-preview.png"
                                alt="Third slide"
                            />

                        </Carousel.Item>
                    </Carousel>
                </Col>
                <Col lg="6">
                    <div className="text-md">
                        UV-C LAMP to antybakteryjna i antywirusowa lampa przepływowa, generująca promienie ultrafioletowe o odpowiedniej częstotliwości,
                        które skutecznie usuwają z otoczenia wirusy, bakterie, grzyby oraz roztocza.
                        Urządzenie powinno być stosowane wszędzie tam, gdzie pomieszczenie powinno spełniać wysoki poziom sterylności.
                        Dezynfekcja powietrza odbywa się wewnątrz urządzenia w zabezpieczonym kanale przepływowym gdzie promienie UV-C
                        oczyszczają przepływające powietrze. Urządzenie jest bezpieczne dla ludzi i zwierząt i może pracować jednocześnie
                        z przebywającymi w pomieszczeniu ludźmi.
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
                                        Do Koszyka
                                    </Button>
                                </Col>
                                <Col lg="12">
                                    <Button variant="dark" size="lg" type="submit" className="text-lg mb-5" block>
                                        Do Listy Życzeń
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
                            UV-C Lamp to lampa antybakteryjna służąca do sterylizacji powietrza w różnego rodzaju pomieszczeniach. Umożliwia ona usuwanie z powietrza bakterii, wirusów, grzybów, pleśni oraz innych drobnoustrojów, które mają negatywny wpływ na zdrowie.
                            Przepływające przez kanał sterylizujący nieoczyszczone powietrze zostaje tam naświetlone oraz zdezynfekowane przy użyciu promieni światła UV-C o odpowiedniej długości fali. Światło UV-C degraduje kod DNA i RNA znajdujący się w komórkach
                            żywych organizmów drobnoustrojów wewnątrz lampy. W przeciwieństwie do tradycyjnych lamp działających w układzie otwartym, konstrukcja UV-C Lamp zapewnia, że człowiek nie ma bezpośredniego kontaktu z promieniami UV-C, które zwykle są
                            szkodliwe dla organizmów żywych. W UV-C Lamp naświetlanie powietrza promieniami UV-C odbywa się wewnątrz UV-C Lamp, a promienie nie wydostają się na zewnątrz. Tym samym ludzie, zwierzęta i rośliny, jeśli tylko zachowane są proste zasady
                            bezpieczeństwa, opisane w dołączonej do produktu instrukcji użytkowania, mogą bezpiecznie przebywać w bezpośredniej bliskości UV- C Lamp, bez narażenia życia lub zdrowia.
                        </div>
                    </Col>
                </Row>
            </div>
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
                                <a href="/" className="btn btn-outline-dark mb-btn-m w-100"><i className="fas fa-clipboard-list"/> Do listy życzeń</a>
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
                                <a href="/" className="btn btn-outline-dark mb-btn-m w-100"><i className="fas fa-clipboard-list"/> Do listy życzeń</a>
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
                                <a href="/" className="btn btn-outline-dark mb-btn-m w-100"><i className="fas fa-clipboard-list"/> Do listy życzeń</a>
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
                                <a href="/" className="btn btn-outline-dark mb-btn-m w-100"><i className="fas fa-clipboard-list"/> Do listy życzeń</a>
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
                                <a href="/" className="btn btn-outline-dark mb-btn-m w-100"><i className="fas fa-clipboard-list"/> Do listy życzeń</a>
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
                                <a href="/" className="btn btn-outline-dark mb-btn-m w-100"><i className="fas fa-clipboard-list"/> Do listy życzeń</a>
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
                                <a href="/" className="btn btn-outline-dark mb-btn-m w-100"><i className="fas fa-clipboard-list"/> Do listy życzeń</a>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </>

    )
}