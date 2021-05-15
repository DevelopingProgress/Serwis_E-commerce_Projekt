import {Button, Col, Form, Modal, Tab, Tabs} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {detailsProduct, updateProduct} from "../actions/productActions";
import OrdersTab from "./Orders";
import ProductsTab from "./Products";
import {PRODUCT_UPDATE_RESET} from "../constants/productsConstants";
import ErrorBox from "./Error";
import axios from "axios";
import LoadingBox from "./Loading";





export function ProductEditModal(props) {

    const productId = props.match.params.id;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [image1, setImage1] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [description, setDescription] = useState('');
    const productDetails = useSelector(state => state.productDetails);
    const {product} = productDetails;
    const [key, setKey] = useState('products');

    const productUpdate = useSelector(state => state.productUpdate);
    const {success: successUpdate} = productUpdate;

    const dispatch = useDispatch();

    useEffect(() => {
        if(successUpdate){
            dispatch({type: PRODUCT_UPDATE_RESET});
            props.history.push('/admin');
        }
        if(!product || (product._id !== productId)){
            dispatch(detailsProduct(productId));
        }else {
            setName(product.name);
            setImage(product.image);
            setImage1(product.image1);
            setPrice(product.price);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setThumbnail(product.thumbnail);
            setDescription(product.description);
        }

    }, [product, dispatch, productId, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({_id: productId, name, image, image1, price, category, countInStock, thumbnail, description}));
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

            <div className="mt-3">
                <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)}>
                    <Tab eventKey="orders" title="Zamówienia">
                        <OrdersTab/>
                    </Tab>
                    <Tab eventKey="products" title="Produkty">
                        <ProductsTab/>
                    </Tab>
                    <Tab eventKey="users" title="Użytkownicy">
                        UsersTab
                    </Tab>
                </Tabs>
            </div>


            <Modal {...props} show={true} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edytuj Produkt
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={submitHandler}>
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
                    <Button onClick={() => props.history.push('/admin')}>Zamknij</Button>
                </Modal.Footer>
            </Modal>

        </>

    );
}
