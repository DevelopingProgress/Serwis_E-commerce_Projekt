import {Button, Container, Table} from "react-bootstrap";
import LoadingBox from "./Loading";
import ErrorBox from "./Error";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {listOrders} from "../actions/orderActions";

export default function OrdersTab(props) {

    const orderList = useSelector(state => state.orderList);
    const {loading, error, orders} = orderList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listOrders());
    }, [dispatch]);

    const Mailto = ({ email, subject = '', body = '', children }) => {
        let params = subject || body ? '?' : '';
        if (subject) params += `subject=${encodeURIComponent(subject)}`;
        if (body) params += `${subject ? '&' : ''}body=${encodeURIComponent(body)}`;

        return <a href={`mailto:${email}${params}`}>{children}</a>;
    };

    return (
        <div style={{paddingBottom: '14%', marginBottom: '8%'}}>
            <h1 style={{margin: '10px'}}>Zamówienia</h1>
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
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td><Mailto email={order.user.email} subject={`Zamówienie nr ${order._id}`} body="Dzień Dobry...Pozdrawiamy">{order.user.email}</Mailto></td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.shippingAddress.totalPrice.toFixed(2)} zł</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'Nieopłacone'}</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'Niedostarczone'}</td>
                                <td>
                                    <Button size="sm" onClick={() => {window.location.href =`/order/${order._id}`;}}>Szczegóły</Button>
                                    <Button size="sm" variant="danger" className="ml-3">Anuluj Zamówienie</Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                )}
        </div>
    );
}