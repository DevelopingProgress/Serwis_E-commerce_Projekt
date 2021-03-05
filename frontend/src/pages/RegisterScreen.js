import {Button, Col, Form, InputGroup, Modal, Nav} from "react-bootstrap";
import React, {useState} from 'react';


function MyVerticallyCenteredModal(props) {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };
    return (
        <Modal

            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Rejestracja
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>


                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Imię</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Imię"
                            />
                            <Form.Control.Feedback type="invalid">
                                Pole imię jest wymagane.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>Nazwisko</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Nazwisko"
                            />
                            <Form.Control.Feedback type="invalid">
                                Pole nazwisko jest wymagane.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                            <Form.Label>Email</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Proszę wpisać poprawny email.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="4" controlId="validationCustom03">
                            <Form.Label>Miasto</Form.Label>
                            <Form.Control type="text" placeholder="Miasto" required />
                            <Form.Control.Feedback type="invalid">
                                Pole miasto jest wymagane.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="5" controlId="formGridState">
                            <Form.Label>Województwo</Form.Label>
                            <Form.Control as="select" >
                                <option>dolnośląskie</option>
                                <option>kujawsko-pomorskie</option>
                                <option>lubelskie</option>
                                <option>lubuskie</option>
                                <option>łódzkie</option>
                                <option>małopolskie</option>
                                <option>mazowieckie</option>
                                <option>opolskie</option>
                                <option>podkarpackie</option>
                                <option>podlaskie</option>
                                <option>pomorskie</option>
                                <option>śląskie</option>
                                <option>świętokrzyskie</option>
                                <option>warmińsko-mazurskie</option>
                                <option>wielkopolskie</option>
                                <option>zachodniopomorksie</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Proszę wybrać województwo.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="validationCustom05">
                            <Form.Label>Numer pocztowy</Form.Label>
                            <Form.Control type="text" placeholder="xx-xxx" required />
                            <Form.Control.Feedback type="invalid">
                                Proszę podać poprawny numer pocztowy.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group>
                        <Form.Check
                            required
                            label="Akceptuję regulamin sklepu"
                        />
                    </Form.Group>
                    <Button type="submit">Załóż konto</Button>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Zamknij</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default function Register(props) {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <Button variant="transparent" onClick={() => setModalShow(true)}>

                Zarejestuj się!

            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

