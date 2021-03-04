import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {data} from "./data"

const initialState = {

};
const reducer = (state, action) => {
    return {products: data.products}
}

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