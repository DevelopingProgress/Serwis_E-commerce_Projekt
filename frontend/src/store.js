import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {
    productCategoryListReducer, productCreateReducer,
    productDeleteReducer,
    productDetailsReducer,
    productListReducer, productUpdateReducer
} from "./reducers/productReducers";
import {cartReducer} from "./reducers/cartReducers";
import {
    userAddressReducer,
    userDetailsReducer,
    userRegisterReducer,
    userSigninReducer,
    userUpdateProfileReducer
} from "./reducers/userReducers";
import {
    adminOrdersReducer, deleteOrdersReducer,
    myOrdersReducer,
    orderCreateReducer, orderDeliverReducer,
    orderDetailsReducer,
    orderPayReducer
} from "./reducers/orderReducers";



const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    },
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
    }
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productCategoryList: productCategoryListReducer,
    userAddressDetails: userAddressReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    myOrdersList: myOrdersReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderList: adminOrdersReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    deleteOrder: deleteOrdersReducer,
    orderDeliver: orderDeliverReducer
});

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            trace: true, traceLimit: 25
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk),

);

const store = createStore(reducer, initialState, enhancer);


export default store;