import {
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS
} from "../constants/productsConstants";
import axios from "axios";

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST});
        const {data} = await axios.get("/api/products");
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    }catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
    }
}

export const detailsProduct = (productId) => async (dispatch) => {

    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
        const { data } = await axios.get(`/api/products/${productId}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({type: PRODUCT_DETAILS_FAIL, payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,});
    }
};