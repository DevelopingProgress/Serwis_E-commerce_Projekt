import {Button, Col, Form, Modal} from "react-bootstrap";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createProduct} from "../actions/productActions";
import ErrorBox from "./Error";
import axios from "axios";
import LoadingBox from "./Loading";





export function ProductCreateModal(props) {

    const [validated, setValidated] = useState(false)
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [image1, setImage1] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
        }
        setValidated(true);
        dispatch(createProduct(name, image, image1, price,  category, countInStock, thumbnail, description));
    }

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [error, setError] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
        try {
            const {data} = await axios.post('/api/uploads', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`
                }
            });
            setImage(data);
            setLoadingUpload(false);
        } catch (error) {
            setError(error.message);
            setLoadingUpload(false);
        }
    }

    const [loadingUpload1, setLoadingUpload1] = useState(false);
    const [error1, setError1] = useState('');
    const uploadFile1Handler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload1(true);
        try {
            const {data} = await axios.post('/api/uploads', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`
                }
            });
            setImage1(data);
            setLoadingUpload1(false);
        } catch (error1) {
            setError1(error1.message);
            setLoadingUpload1(false);
        }
    }


    return (
        <>

            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Dodaj Produkt
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={submitHandler} noValidate validated={validated}>
                        <Form.Row>

                            <Form.Group as={Col} md="6" controlId="validationCustom01">
                                <Form.Label>Nazwa Produktu</Form.Label>
                                <Form.Control required type="text" placeholder="Nazwa Produktu" value={name} onChange={e => setName(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    Pole nazwa produktu jest wymagane.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId="validationCustom01">
                                <Form.Label>Cena Produktu</Form.Label>
                                <Form.Control required type="text" placeholder="Cena Produktu" value={price} onChange={e => setPrice(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    Pole cena produktu jest wymagane.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId="validationCustom01">
                                <Form.Label>Zdjęcie nr 1 Produktu</Form.Label>
                                <Form.Control required type="text" placeholder="Zdjęcie nr 1 Produktu" value={image} onChange={e => setImage(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    Pole zdjęcie produktu jest wymagane.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId="validationCustom01">
                                <Form.Label>Wybierz Zdjęcie nr 1</Form.Label>
                                <Form.Control type="file" onChange={uploadFileHandler}/>
                                <Form.Control.Feedback type="invalid">
                                    Pole zdjęcie produktu jest wymagane.
                                </Form.Control.Feedback>
                                {error && <ErrorBox variant="danger">{error}</ErrorBox>}
                                {loadingUpload && <LoadingBox/>}
                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId="validationCustom01">
                                <Form.Label>Zdjęcie nr 2 Produktu</Form.Label>
                                <Form.Control required type="text" placeholder="Zdjęcie nr 2 Produktu" value={image1} onChange={e => setImage1(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    Pole zdjęcie produktu jest wymagane.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId="validationCustom01">
                                <Form.Label>Wybierz Zdjęcie nr 2</Form.Label>
                                <Form.Control type="file" onChange={uploadFile1Handler}/>
                                <Form.Control.Feedback type="invalid">
                                    Pole zdjęcie produktu jest wymagane.
                                </Form.Control.Feedback>
                                {error1 && <ErrorBox variant="danger">{error1}</ErrorBox>}
                                {loadingUpload1 && <LoadingBox/>}
                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId="validationCustom01">
                                <Form.Label>Kategoria Produktu</Form.Label>
                                <Form.Control required type="text" placeholder="Kategoria Produktu" value={category} onChange={e => setCategory(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    Pole kategoria produktu jest wymagane.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId="validationCustom01">
                                <Form.Label>Ilość Produktu</Form.Label>
                                <Form.Control required type="text" placeholder="Ilość Produktu" value={countInStock} onChange={e => setCountInStock(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    Pole ilość produktu jest wymagane.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId="validationCustom01">
                                <Form.Label>Opis Produktu wyświetlany na stronie głównej</Form.Label>
                                <Form.Control required type="text" placeholder="Opis Produktu wyświetlany na stronie głównej" value={thumbnail} onChange={e => setThumbnail(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    Pole opis produktu jest wymagane.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId="validationCustom01">
                                <Form.Label>Opis Produktu w szczegółach produktu</Form.Label>
                                <Form.Control required type="text" placeholder="Opis Produktu w szczegółach produktu" value={description} onChange={e => setDescription(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    Pole opis produktu jest wymagane.
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

export default function ProductCreate(props) {
    const [modalShow, setModalShow] = useState(false);


    return (
        <>

            <Button className="m-3" onClick={() => setModalShow(true)}>
                Utwórz Produkt
            </Button>


            <ProductCreateModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}