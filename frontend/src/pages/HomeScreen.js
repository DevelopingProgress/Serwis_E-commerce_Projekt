import {Carousel} from "react-bootstrap";
import {Link} from "react-router-dom";
import Products from "./ProductsScreen";


export default function Home(props) {
    return (
        <>
            <Carousel indicators={false}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="../../../images/pexels-karolina-grabowska-5632371.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <div className="carousel-caption-p">
                            <h3 className="black-text-lg">Witaj w Naszym Sklepie Internetowym!</h3>
                            <Link to={"/product"} className="black-text-md link-color-carousel">Przejdź do zakupów</Link>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="../../../images/pexels-karolina-grabowska-5632402.jpg"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <div className="carousel-caption-p ">
                            <h3 className="black-text-lg">Witaj w Naszym Sklepie Internetowym!</h3>
                            <Link to={"/product"} className="black-text-md link-color-carousel">Przejdź do zakupów</Link>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <Products/>
        </>


    );
}