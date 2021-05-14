import {Carousel} from "react-bootstrap";
import {Link} from "react-router-dom";


export default function MyCarousel() {
    return (
        <Carousel indicators={false}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="../../../images/pexels-karolina-grabowska-5632371.jpg"
                    alt="First slide"
                />
                <Carousel.Caption className="upper-caption">
                    <div className="carousel-caption-p">
                        <h2 className="carousel-h1" style={{color: 'black'}}>Witaj w Naszym Sklepie Internetowym!</h2>
                        <Link to={"/product"} className="link-color-carousel"><h4>Przejdź do zakupów</h4></Link>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="../../../images/pexels-karolina-grabowska-5632402.jpg"
                    alt="Third slide"
                />

                <Carousel.Caption className="upper-caption">
                    <div className="carousel-caption-p">
                        <h2 className="carousel-h1" style={{color: 'black'}}>Witaj w Naszym Sklepie Internetowym!</h2>
                        <Link to={"/product"} className="link-color-carousel"><h4>Przejdź do zakupów</h4></Link>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}