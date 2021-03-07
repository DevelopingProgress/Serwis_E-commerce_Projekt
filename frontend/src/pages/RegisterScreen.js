import {Button, Col, Form, InputGroup, Modal} from "react-bootstrap";
import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {register} from "../actions/userActions";


function MyVerticallyCenteredModal(props) {
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [acceptedRules, setAcceptedRules] = useState('');
    const dispatch = useDispatch();


    const submitHandler = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        setValidated(true);

        dispatch(register(name, surname, email, password, address, city, state, zip, acceptedRules));
    };


    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Rejestracja
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>


                <Form onSubmit={submitHandler} noValidate validated={validated}>
                    <Form.Row>

                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Imię</Form.Label>
                            <Form.Control required type="text" placeholder="Imię" value={name} onChange={e => setName(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">
                                Pole imię jest wymagane.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                            <Form.Label>Nazwisko</Form.Label>
                            <Form.Control required type="text" placeholder="Nazwisko" value={surname} onChange={e => setSurname(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">
                                Pole nazwisko jest wymagane.
                            </Form.Control.Feedback>
                        </Form.Group>

                    </Form.Row>

                    <Form.Row>

                        <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                            <Form.Label>Email</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control type="email" placeholder="Email" aria-describedby="inputGroupPrepend" required value={email} onChange={e => setEmail(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    Proszę wpisać poprawny email.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                            <Form.Label>Hasło</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control type="password" placeholder="Hasło" aria-describedby="inputGroupPrepend" required value={password} onChange={e => setPassword(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    Proszę wpisać poprawne hasło.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                    </Form.Row>

                    <Form.Row>

                        <Form.Group as={Col} md="12" controlId="validationCustom03">
                            <Form.Label>Adres</Form.Label>
                            <Form.Control type="text" placeholder="Adres" required  value={address} onChange={e => setAddress(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">
                                Pole miasto jest wymagane.
                            </Form.Control.Feedback>
                        </Form.Group>

                    </Form.Row>

                    <Form.Row>

                        <Form.Group as={Col} md="4" controlId="validationCustom03">
                            <Form.Label>Miasto</Form.Label>
                            <Form.Control type="text" placeholder="Miasto" required value={city} onChange={e => setCity(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">
                                Pole miasto jest wymagane.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="5" controlId="formGridState">
                            <Form.Label>Województwo</Form.Label>
                            <Form.Control as="select" value={state} onChange={e => setState(e.target.value)}>
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
                            <Form.Control type="text" placeholder="xx-xxx" required value={zip} onChange={e => setZip(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">
                                Proszę podać poprawny numer pocztowy.
                            </Form.Control.Feedback>
                        </Form.Group>

                    </Form.Row>

                    <Form.Group>
                        <Form.Check required label="Akceptuję regulamin sklepu" value={acceptedRules} onChange={e => setAcceptedRules(e.target.value)}/>
                    </Form.Group>

                    <Button type="submit">
                        Załóż konto
                    </Button>
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

