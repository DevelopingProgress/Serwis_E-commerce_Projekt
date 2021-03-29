import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createProduct, deleteProduct, listProducts} from "../actions/productActions";
import {useEffect} from "react";
import LoadingBox from "./Loading";
import ErrorBox from "./Error";
import {Button, Col, Row, Table} from "react-bootstrap";
import {CREATE_PRODUCT_RESET, PRODUCT_DELETE_RESET} from "../constants/productsConstants";
import ProductCreate from "./ProductCreateModal";


export default function ProductsTab(props) {

    const productList = useSelector(state => state.productList);
    const {loading, error, products} = productList;
    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete;
    const productCreate = useSelector(state => state.productCreate);
    const {loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate;
    const dispatch = useDispatch();


    useEffect(() => {

        if(successDelete){
            dispatch({type: PRODUCT_DELETE_RESET});
        }
        dispatch(listProducts());

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
                                products.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price} zł</td>
                                        <td>{product.category}</td>
                                        <td>
                                            <Button size="sm">Edytuj</Button>
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