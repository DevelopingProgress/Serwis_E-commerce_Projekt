import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";
import {useEffect} from "react";
import LoadingBox from "./Loading";
import ErrorBox from "./Error";
import {Button, Col, Row, Table} from "react-bootstrap";


export default function ProductsTab(props) {

    const productList = useSelector(state => state.productList);
    const {loading, error, products} = productList;
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);


    return (
        <div style={{paddingBottom: '14%', marginBottom: '8%'}}>




            <Row className="mr-0">
                <Col lg="2"><h1 style={{margin: '10px'}}>Produkty</h1></Col>
                <Col lg="6"><Button className="m-3">Utwórz Produkt</Button></Col>
            </Row>


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
                                            <Button size="sm" variant="danger" className="ml-3">Usuń</Button>
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