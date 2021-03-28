import {Button, Col, Form, InputGroup, Modal} from "react-bootstrap";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateUserProfile} from "../actions/userActions";


export function UserChangeDetailsModal(props) {

    const userDetails = useSelector(state => state.userDetails);
    const {user} = userDetails;
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState(user.name);
    const [surname, setSurname] = useState(user.surname);
    const [email, setEmail] = useState(user.email);
    const [address, setAddress] = useState(user.address);
    const [city, setCity] = useState(user.city);
    const [state, setState] = useState(user.state);
    const [zip, setZip] = useState(user.zip);
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
        }
        setValidated(true);
        dispatch(updateUserProfile({userId: user._id, name, surname, email, address, city, state, zip}));

    }



    return (
        <>

            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Zmień Dane Adresowe
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

                                <Form.Group as={Col} controlId="validationCustomUsername">
                                    <Form.Label>Email</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control type="email" placeholder="Email" value={email} aria-describedby="inputGroupPrepend" required onChange={e => setEmail(e.target.value)}/>
                                        <Form.Control.Feedback type="invalid">
                                            Proszę wpisać poprawny email.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>

                            </Form.Row>

                            <Form.Row>

                                <Form.Group as={Col} md="12" controlId="validationCustom03">
                                    <Form.Label>Adres</Form.Label>
                                    <Form.Control type="text" placeholder="Adres" required value={address}  onChange={e => setAddress(e.target.value)}/>
                                    <Form.Control.Feedback type="invalid">
                                        Pole miasto jest wymagane.
                                    </Form.Control.Feedback>
                                </Form.Group>

                            </Form.Row>

                            <Form.Row>

                                <Form.Group as={Col} md="4" controlId="validationCustom03">
                                    <Form.Label>Miasto</Form.Label>
                                    <Form.Control type="text" placeholder="Miasto" required value={city}  onChange={e => setCity(e.target.value)}/>
                                    <Form.Control.Feedback type="invalid">
                                        Pole miasto jest wymagane.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} md="5" controlId="formGridState">
                                    <Form.Label>Województwo</Form.Label>
                                    <Form.Control as="select" value={state} onChange={e => setState(e.target.value)}>
                                        <option>Dolnośląskie</option>
                                        <option>Kujawsko-pomorskie</option>
                                        <option>Lubelskie</option>
                                        <option>Lubuskie</option>
                                        <option>Łódzkie</option>
                                        <option>Małopolskie</option>
                                        <option>Mazowieckie</option>
                                        <option>Opolskie</option>
                                        <option>Podkarpackie</option>
                                        <option>Podlaskie</option>
                                        <option>Pomorskie</option>
                                        <option>Śląskie</option>
                                        <option>Świętokrzyskie</option>
                                        <option>Warmińsko-mazurskie</option>
                                        <option>Wielkopolskie</option>
                                        <option>Zachodniopomorksie</option>
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
                        <Button variant="success" type="submit" className="mr-3">Zapisz zmiany</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Zamknij</Button>
                </Modal.Footer>
            </Modal>

        </>

    );
}

export default function UserChangeDetails(props) {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Button onClick={() => setModalShow(true)}>

                Zmień dane

            </Button>

            <UserChangeDetailsModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}