import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookF, faInstagram, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {Link} from "react-router-dom";


export default function MyFooter() {
    return (
        <footer className="bg-dark text-center text-white">

            <div className="container p-4 pb-0">

                <section className="mb-4">

                    <Link className="btn btn-outline-light btn-floating m-1" to="https://facebook.com/" role="button"
                    ><FontAwesomeIcon icon={faFacebookF} /></Link>

                    <Link className="btn btn-outline-light btn-floating m-1" to="https://twitter.com/" role="button"
                    ><FontAwesomeIcon icon={faTwitter} /></Link>

                    <Link className="btn btn-outline-light btn-floating m-1" to="https://www.instagram.com/" role="button"
                    ><FontAwesomeIcon icon={faInstagram} /></Link>

                </section>

            </div>

            <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
                © 2021 Kacper Gaweł
            </div>

        </footer>
    );
}