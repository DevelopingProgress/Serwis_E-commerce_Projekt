import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {productDetailsReducer, productListReducer} from "./reducers/productReducers";

const initialState = {

};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
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