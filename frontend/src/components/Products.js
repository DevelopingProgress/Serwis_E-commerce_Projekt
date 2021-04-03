import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteProduct, listProducts, listProductsCategories} from "../actions/productActions";
import {useEffect} from "react";
import LoadingBox from "./Loading";
import ErrorBox from "./Error";
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import {PRODUCT_DELETE_RESET} from "../constants/productsConstants";
import ProductCreate from "./ProductCreateModal";



export default function ProductsTab(props) {

    const productList = useSelector(state => state.productList);
    const {loading, error, products} = productList;
    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete;
    const productCreate = useSelector(state => state.productCreate);
    const {loading: loadingCreate, error: errorCreate, success: successCreate} = productCreate;
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [category, setCategory]= useState('');
    const productCategoryList = useSelector((state) => state.productCategoryList);
    const {categories} = productCategoryList;


    const editHandler = (product) => {
        window.location.href = `/product/${product._id}/edit`;
    }


    useEffect(() => {

        if(successDelete){
            dispatch({type: PRODUCT_DELETE_RESET});
        }
        dispatch(listProducts());
        dispatch(listProductsCategories());

        const body = document.querySelector('#root');

        body.scrollIntoView({
            behavior: 'smooth'
        }, 500);

    }, [dispatch, successDelete, successCreate]);

    const deleteHandler = (product) => {
        if(window.confirm(`Jesteś pawny/a, że chcesz usunąć produkt ${product.name}?`)){
            dispatch(deleteProduct(product._id));
        }
    }


    return (
        <div style={{paddingBottom: '14%', marginBottom: '8%'}}>




            <Row className="mr-0">
                <Col lg="2"><h1 style={{margin: '10px'}}>Produkty</h1></Col>
                <Col lg="6"><ProductCreate /></Col>
            </Row>
            {loadingDelete && <LoadingBox/>}
            {errorDelete && <ErrorBox variant="danger">{errorDelete}</ErrorBox>}
            {loadingCreate && <LoadingBox/>}
            {errorCreate && <ErrorBox variant="danger">{errorCreate}</ErrorBox>}

            <Form.Row className="ml-2">
                <Form.Group as={Col} lg="4" controlId="formGridSearch">
                    <Form.Label className="mt-3">Wyszukaj</Form.Label>
                    <Form.Control className="text-lg" onChange={e => setName(e.target.value)}/>
                </Form.Group>
                <Form.Group as={Col} lg="4" defaultValue="Wybierz kategorię..." controlId="formGridCategory">
                    <Form.Control as="select" className="mt-5 text-lg"  onChange={e => setCategory(e.target.value)}>
                        <option selected value="all">Wybierz kategorię...</option>
                        {categories.map((c) => (
                            <option key={c}>{c}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
            </Form.Row>

            {
                loading ? <LoadingBox/>:
                    error ? <ErrorBox variant="danger">{error}</ErrorBox>:
                        <Table className="mb-5" striped bordered responsive>
                            <thead>
                            <tr>
                                <th>NUMER PRODUKTU</th>
                                <th>NAZWA</th>
                                <th>CENA</th>
                                <th>KATEGORIA</th>
                                <th>AKCJE</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                products.filter((product) => {
                                    if(name === "" && category === "all"){
                                        return product;
                                    } else if(product.name.toLowerCase().includes(name.toLowerCase()) && category === "all"){
                                        return product;
                                    }else if(product.thumbnail.toLowerCase().includes(name.toLowerCase()) && category === "all"){
                                        return product;
                                    } else if(name === "" && product.category.toString().toLowerCase().includes(category.toLowerCase())) {
                                        return product;
                                    } else if(product.name.toLowerCase().includes(name.toLowerCase()) && product.category.toString().toLowerCase().includes(category.toLowerCase())){
                                        return product;
                                    } else if(product._id.toLowerCase().includes(name.toLowerCase()) && product.category.toString().toLowerCase().includes(category.toLowerCase())){
                                        return product;
                                    }
                                    else if(product.thumbnail.toLowerCase().includes(name.toLowerCase()) && product.category.toString().toLowerCase().includes(category.toLowerCase())){
                                        return product;
                                    }

                                }).map((product) => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price} zł</td>
                                        <td>{product.category}</td>
                                        <td>
                                            <Button size="sm" onClick={() => editHandler(product)}>
                                                Edytuj
                                            </Button>
                                            <Button size="sm" variant="danger" className="ml-3" onClick={() => deleteHandler(product)}>Usuń</Button>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>

                        </Table>
            }
        </div>
    );
}