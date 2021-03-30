import {
    CREATE_PRODUCT_FAIL,
    CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS,
    PRODUCT_CATEGORY_LIST_FAIL,
    PRODUCT_CATEGORY_LIST_REQUEST,
    PRODUCT_CATEGORY_LIST_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS
} from "../constants/productsConstants";
import axios from "axios";
import {
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_SIGNIN_SUCCESS
} from "../constants/userConstants";

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
}

export const listProductsCategories = () => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_CATEGORY_LIST_REQUEST});
        const {data} = await axios.get("/api/products/categories");
        dispatch({type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data});
    }catch (error) {
        dispatch({type: PRODUCT_CATEGORY_LIST_FAIL, payload: error.message});
    }
}


export const deleteProduct = (productId) => async(dispatch, getState) => {
    dispatch({type: PRODUCT_DELETE_REQUEST, payload: productId});
    const {userSignin: { userInfo },} = getState();
    try {
        await axios.delete(`/api/products/${productId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({ type: PRODUCT_DELETE_SUCCESS });
    } catch (error) {
        dispatch({type: PRODUCT_DELETE_FAIL, payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,});
    }
}

export const createProduct = (name, image, image1, price, category, countInStock, thumbnail, description) => async (dispatch, getState) => {
    dispatch({type: CREATE_PRODUCT_REQUEST, payload: {name, image, image1, price, category, countInStock, thumbnail, description}});
    const {userSignin: { userInfo },} = getState();
    try{
        const {data} = await axios.post('/api/products/createproduct', {name, image, image1, price, category, countInStock, thumbnail, description}, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({type: CREATE_PRODUCT_SUCCESS, payload: data});
    }catch (error) {
        dispatch({type: CREATE_PRODUCT_FAIL, payload: error.response && error.response.data.message ?
                error.response.data.message : error.message});
    }
}

export const updateProduct = (product) => async (dispatch, getState) => {
    dispatch({type: PRODUCT_UPDATE_REQUEST});
    const {userSignin: { userInfo },} = getState();
    try {
        const { data } = await axios.put(`/api/products/${product._id}`, product, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({type: PRODUCT_UPDATE_FAIL, payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,});
    }
}

