import {Button, Col, Container, Form, Table} from "react-bootstrap";
import LoadingBox from "./Loading";
import ErrorBox from "./Error";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {listOrders, orderDelete} from "../actions/orderActions";
import {ORDER_DELETE_RESET} from "../constants/orderConstants";
import Moment from "moment";
import {Link} from "react-router-dom";

export default function OrdersTab(props) {

    const orderList = useSelector(state => state.orderList);
    const {loading, error, orders} = orderList;
    const dispatch = useDispatch();
    const deleteOrder = useSelector(state => state.deleteOrder);
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = deleteOrder;
    const [name, setName] = useState('');

    useEffect(() => {
        dispatch({type: ORDER_DELETE_RESET});
        dispatch(listOrders());
    }, [dispatch, successDelete]);

    const Mailto = ({ email, subject = '', body = '', children }) => {
        let params = subject || body ? '?' : '';
        if (subject) params += `subject=${encodeURIComponent(subject)}`;
        if (body) params += `${subject ? '&' : ''}body=${encodeURIComponent(body)}`;

        return <Link to={`mailto:${email}${params}`}>{children}</Link>;
    };

    const deleteHandler = (order) => {
        if(window.confirm(`Jesteś pawny/a, że chcesz usunąć zamówienie numer ${order._id}?`)){
            dispatch(orderDelete(order._id));
        }
    }

    return (
        <div style={{paddingBottom: '14%', marginBottom: '8%'}}>
            <h1 style={{margin: '10px'}}>Zamówienia</h1>
            <Form>
                <Form.Row style={{margin: '10px'}}>
                    <Form.Group as={Col} lg="4" controlId="formGridSearch">
                        <Form.Label className="mt-3">Wyszukaj</Form.Label>
                        <Form.Control className="text-lg" onChange={e => setName(e.target.value)}/>
                    </Form.Group>
                </Form.Row>
            </Form>

            {loadingDelete && <LoadingBox/>}
            {errorDelete && <ErrorBox variant="danger">{errorDelete}</ErrorBox>}
            {loading ? (<LoadingBox/>) : error ? (<ErrorBox variant="danger">{error}</ErrorBox>) : (
                    <Table className="mb-5" striped bordered responsive>
                        <thead>
                        <tr>
                            <th>NUMER</th>
                            <th>EMAIL</th>
                            <th>DATA</th>
                            <th>KWOTA</th>
                            <th>ZAPŁACONE</th>
                            <th>DOSTARCZONE</th>
                            <th>AKCJE</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.filter((order) => {
                            if(name === ""){
                                return order;
                            } else if(order._id.toLowerCase().includes(name.toLowerCase())){
                                return order;
                            }else if(order.shippingAddress.email.toLowerCase().includes(name.toLowerCase())){
                                return order;
                            } else if(order.createdAt.toLowerCase().includes(name.toLowerCase())){
                                return order;
                            }

                        }).map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td><Mailto email={order.user.email} subject={`Zamówienie nr ${order._id}`} body="Dzień Dobry...Pozdrawiamy">{order.user.email}</Mailto></td>
                                <td>{Moment(order.createdAt).format('YYYY/MM/DD HH:MM')}</td>
                                <td>{order.shippingAddress.totalPrice.toFixed(2)} zł</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : (order.shippingAddress.paymentMethod === 'Gotówka przy odbiorze' ? 'Przy odbiorze':'Nieopłacone')}</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (order.shippingAddress.deliveryMethod === 'Odbiór Osobisty' ? 'Odbiór Osobisty': 'Niedostarczone')}</td>
                                <td>
                                    <Button size="sm" onClick={() => {window.location.href =`/order/${order._id}`;}}>Szczegóły</Button>
                                    { !order.isPaid ? (
                                        <Button size="sm" variant="danger" className="ml-3" onClick={() => deleteHandler(order)}>Anuluj Zamówienie</Button>
                                    ) : (
                                        <Button size="sm" variant="danger" className="ml-3" onClick={() => deleteHandler(order)}>Zwrot Klienta</Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                )}
        </div>
    );
}