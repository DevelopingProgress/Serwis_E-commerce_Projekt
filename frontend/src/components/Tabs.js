import {Tab, Tabs} from "react-bootstrap";
import {useState} from "react";
import OrdersTab from "./Orders";
import ProductsTab from "./Products";

export default function AdminTabs() {

    const [key, setKey] = useState('orders');

    return (
        <div className="mt-3">
            <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)}>
                <Tab eventKey="orders" title="Zamówienia">
                    <OrdersTab/>
                </Tab>
                <Tab eventKey="products" title="Produkty">
                    <ProductsTab/>
                </Tab>
                {/*<Tab eventKey="users" title="Użytkownicy">*/}
                {/*    UsersTab*/}
                {/*</Tab>*/}
            </Tabs>
        </div>

    );
}