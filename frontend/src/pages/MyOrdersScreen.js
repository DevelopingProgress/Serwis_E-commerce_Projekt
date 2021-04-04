import LoadingBox from "../components/Loading";
import ErrorBox from "../components/Error";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {listMyOrders} from "../actions/orderActions";
import {Button, Table} from "react-bootstrap";
import Moment from "moment";


export default function MyOrders(props) {

    const myOrdersList = useSelector(state => state.myOrdersList);
    const { loading, error, orders } = myOrdersList;
    Moment.locale('pl');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listMyOrders());

    }, [dispatch]);

    return (
        <div className="container"  style={{marginBottom: '25%'}}>
            <h1 style={{margin: '10px'}}>Historia Zamówień</h1>
            <div className="mb-5">
                {loading ? (<LoadingBox/>) : error ? (<ErrorBox variant="danger">{error}</ErrorBox>) : (
                    <Table className=" striped bordered hover mb-5" responsive>
                        <thead>
                        <tr>
                            <th>NUMER</th>
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
                                <td>{Moment(order.createdAt).format('YYYY/MM/DD HH:MM')}</td>
                                <td>{order.shippingAddress.totalPrice.toFixed(2)} zł</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : (order.shippingAddress.paymentMethod === 'Gotówka przy odbiorze' ? 'Przy odbiorze':'Nieopłacone')}</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (order.shippingAddress.deliveryMethod === 'Odbiór Osobisty' ? 'Odbiór Osobisty': 'Niedostarczone')}</td>
                                <td>
                                    <Button size="sm" onClick={() => {props.history.push(`/order/${order._id}`);}}>Szczegóły</Button>
                                    {/*<Button size="sm" variant="danger" className="ml-3">Anuluj Zamówienie</Button>*/}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                )}
            </div>
        </div>
    );
}