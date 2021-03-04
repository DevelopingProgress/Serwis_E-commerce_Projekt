import "@fortawesome/fontawesome-svg-core/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, CardGroup, Carousel, Nav, Navbar, NavDropdown} from "react-bootstrap";
import "../index.css";
import {Link} from "react-router-dom";
import {data} from "../data"

export default function Home(props) {
    return (
        <>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="../../../images/pexels-karolina-grabowska-5632371.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption className="carousel-caption-p">
                        <div className="carousel-caption-p">
                            <h3 className="black-text-lg">First slide label</h3>
                            <p className="black-text-md">Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="../../../images/pexels-cottonbro-3944405.jpg"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <div className="carousel-caption-p">
                            <h3 className="black-text-lg">Second slide label</h3>
                            <p className="black-text-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="../../../images/pexels-karolina-grabowska-5632402.jpg"
                        alt="Third slide"
                    />

                    <Carousel.Caption className="carousel-caption-p">
                        <div className="carousel-caption-p ">
                            <h3 className="black-text-lg">Third slide label</h3>
                            <p className="black-text-md">Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <div className="my-container">
                <h1 className="ms-3 pt-5 mt-5 text-lg">Produkty</h1>
                <div className="row">
                    {
                        data.products.map( (product) => (
                                <div className="col-lg-3">
                                    <Card className="m-lg-3">
                                        <Link to={`/product/${product._id}`}>
                                            <Card.Img variant="top" src={product.image} />
                                        </Link>
                                        <Card.Body>
                                            <Card.Title>{product.name}</Card.Title>
                                            <Card.Text>{product.thumbnail}</Card.Text>
                                            <a href="#" className="btn btn-outline-success mb-btn-m w-100 buttons-mb"><i className="fas fa-shopping-cart"/> Kup teraz</a>
                                            <a href="#" className="btn btn-outline-dark mb-btn-m w-100"><i className="fas fa-clipboard-list"/> Do listy życzeń</a>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </>


    );
}
