import {Button, Form, Modal, Nav} from "react-bootstrap";
import React from 'react';
import Register from "./RegisterScreen";

    function MyVerticallyCenteredModal(props) {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Logowanie
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Adres email</Form.Label>
                            <Form.Control type="email" placeholder="Email" />
                            <Form.Text className="text-muted">
                                Nigdy nie podamy twojego maila innej osobie.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Hasło</Form.Label>
                            <Form.Control type="password" placeholder="Hasło" />
                        </Form.Group>
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

