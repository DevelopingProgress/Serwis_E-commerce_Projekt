import {signin} from "../actions/userActions";
import {Button, Col, Form, Image, Modal, Row} from "react-bootstrap";
import LoadingBox from "./Loading";
import ErrorBox from "./Error";
import Register from "../pages/RegisterScreen";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeFromCart} from "../actions/cartActions";
import {Link} from "react-router-dom";

export function LoginModal(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo, error, loading} = userSignin;
    const cart = useSelector((state) => state.cart);
    const {cartItems} = cart;


    useEffect(()=>{
        if(userInfo){
            props.history.push('/shipping');
        }
    }, [props.history, userInfo]);

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(signin(email, password));
    }


    return (
        <>
            <div  style={{marginBottom: '17%'}}>
                <div className="ml-5 pl-4 mt-4">
                    <h1  className='mb-5' style={{textAlign: 'left'}}>
                        Koszyk
                    </h1>
                </div>

                <Row className='mb-5 mx-5'>
                    <Col md="9">
                        {
                            cartItems.length === 0 ? (<h1 className="text-danger ml-1 p-5">Koszyk jest pusty! <Link
                                to="/product">Przejdź do zakupów</Link></h1>) : (

                                cartItems.map((item) => (
                                    <Row className='p-3 mb-4'>
                                        <Col lg="2">
                                            <Image width={100} height={100} roundedCircle src={item.image}/>
                                        </Col>
                                        <Col lg="2" className="mx-3 pt-4">
                                            <h6>{item.name}</h6>
                                        </Col>
                                        <Col lg="2" className="mx-3 pt-2">
                                            <h6><Form.Label>Ilość</Form.Label></h6>
                                            <Form.Control as="select" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                        <Col lg="2" className="mx-3 pt-3">
                                            <h5>{(item.price * item.qty).toFixed(2)} zł</h5>
                                            <span>{item.price} zł za sztukę</span>
                                        </Col>
                                        <Col lg="2" className="mx-3 pt-3">
                                            <Button variant="outline-danger" onClick={() => dispatch(removeFromCart(item.product))}>Usuń</Button>
                                        </Col>
                                    </Row>
                                )))
                        }

                    </Col>
                    {
                        cartItems.length === 0 ? <></> : (
                            <Col md='3'>
                                <h2 className="text-center">Podsumowanie</h2>
                                <div className="bg-light p-3 mr-2">
                                    <Row className="mt-4">
                                        <Col lg="5">
                                            <h4 className="text-center">Razem:</h4>
                                        </Col>
                                        <Col lg="7">
                                            <h3 className="text-left">{cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)} zł</h3>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>

                                            <Button variant="success" size="lg" className="mt-5 text-lg mb-3" block>
                                                Złóż Zamówienie
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Link to="/product"  style={{textDecoration: 'none'}}>
                                                <Button variant="outline-dark" size="lg" className="text-lg mb-5" block>
                                                    Kontynuuj Zakupy
                                                </Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        )
                    }


                </Row>

            </div>

            <Modal {...props} show={true} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Logowanie
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Adres email</Form.Label>
                                <Form.Control type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                                <Form.Text className="text-muted">
                                    Nigdy nie podamy twojego maila innej osobie.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Hasło</Form.Label>
                                <Form.Control type="password" placeholder="Hasło" onChange={e => setPassword(e.target.value)}/>
                            </Form.Group>
                            {loading && <LoadingBox/>}
                            {error && <ErrorBox variant="danger">{error}</ErrorBox>}
                            <Button variant="primary" type="submit">
                                Zaloguj się
                            </Button>
                        </Form>
                    </p>
                    <Register />

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.history.goBack}>Zamknij</Button>
                </Modal.Footer>
            </Modal>
        </>

    );
}