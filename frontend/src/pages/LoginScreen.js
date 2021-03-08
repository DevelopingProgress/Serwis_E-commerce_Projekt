import {Button, Form, Modal, Nav} from "react-bootstrap";
import React, {useState} from 'react';
import Register from "./RegisterScreen";
import {useDispatch, useSelector} from "react-redux";
import {signin} from "../actions/userActions";
import LoadingBox from "../components/Loading";
import ErrorBox from "../components/Error";

    function MyVerticallyCenteredModal(props) {

        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const dispatch = useDispatch();
        const userSignin = useSelector(state => state.userSignin);
        const {loading, error} = userSignin;



        const submitHandler = (e) =>{
            e.preventDefault();
            dispatch(signin(email, password));
        }


        return (
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
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
                    <Button onClick={props.onHide}>Zamknij</Button>
                </Modal.Footer>
            </Modal>
        );
}

export default function Login(props) {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <Nav.Link onClick={() => setModalShow(true)}>

                    Zaloguj się

            </Nav.Link>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

