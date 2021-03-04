import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookF, faInstagram, faTwitter} from "@fortawesome/free-brands-svg-icons";


export default function MyFooter() {
    return (
        <footer className="bg-dark text-center text-white">

            <div className="container p-4 pb-0">

                <section className="mb-4">

                    <a className="btn btn-outline-light btn-floating m-1" href="https://mdbootstrap.com/" role="button"
                    ><FontAwesomeIcon icon={faFacebookF} /></a>

                    <a className="btn btn-outline-light btn-floating m-1" href="https://mdbootstrap.com/" role="button"
                    ><FontAwesomeIcon icon={faTwitter} /></a>

                    <a className="btn btn-outline-light btn-floating m-1" href="https://mdbootstrap.com/" role="button"
                    ><FontAwesomeIcon icon={faInstagram} /></a>

                </section>

            </div>

            <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
                © 2020 Copyright:
                <a className="text-white" href="https://mdbootstrap.com/">ecommerce</a>
            </div>

        </footer>
    );
}