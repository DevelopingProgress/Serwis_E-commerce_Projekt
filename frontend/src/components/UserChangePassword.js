import {Button, Col, Form, InputGroup, Modal} from "react-bootstrap";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateUserProfile} from "../actions/userActions";


export function UserChangePasswordModal(props) {

    const userDetails = useSelector(state => state.userDetails);
    const {user} = userDetails;
    const [validated, setValidated] = useState(false);
    const [password, setPassword] =  useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
        }
        setValidated(true);
        if (password !== confirmPassword) {
            alert('Hasła muszą być takie same!');
        } else {
            dispatch(updateUserProfile({userId: user._id, password}));
        }
    }



    return (
        <>

            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Zmień Hasło
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitHandler} noValidate validated={validated}>
                        <Form.Row>

                            <Form.Group as={Col} md="6" controlId="validationCustom01">
                                <Form.Label>Hasło</Form.Label>
                                <Form.Control required type="password" placeholder="Hasło" value={password} onChange={e => setPassword(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    Pole hasło jest wymagane.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId="validationCustom02">
                                <Form.Label>Powtórz Hasło</Form.Label>
                                <Form.Control required type="password" placeholder="Powtórz Hasło" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    Pole powtórz hasło jest wymagane.
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

export default function UserChangePassword(props) {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Button style={{float: 'right'}} onClick={() => setModalShow(true)}>

                Zmień hasło

            </Button>

            <UserChangePasswordModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}