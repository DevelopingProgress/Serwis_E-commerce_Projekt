import axios from "axios";
import {
    USER_ADDRESS_FAIL,
    USER_ADDRESS_REQUEST, USER_ADDRESS_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNOUT
} from "../constants/userConstants";
import {PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_SUCCESS} from "../constants/productsConstants";

export const signin = (email, password) => async (dispatch) =>{
    dispatch({type: USER_SIGNIN_REQUEST, payload: {email, password}});
    try{
        const {data} = await axios.post('/api/users/signin', {email, password});
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    }catch (error) {
        dispatch({type: USER_SIGNIN_FAIL, payload: error.response && error.response.data.message ?
                error.response.data.message : error.message});
    }
};


export const signout = () => async (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    dispatch({type: USER_SIGNOUT});
}

export const register = (name, surname, email, password, address, city, state, zip, acceptedRules) => async (dispatch) =>{
    dispatch({type: USER_REGISTER_REQUEST, payload: {name, surname, email, password, address, city, state, zip, acceptedRules}});
    try{
        const {data} = await axios.post('/api/users/register', {name, surname, email, password, address, city, state, zip, acceptedRules});
        dispatch({type: USER_REGISTER_SUCCESS, payload: data});
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    }catch (error) {
        dispatch({type: USER_REGISTER_FAIL, payload: error.response && error.response.data.message ?
                error.response.data.message : error.message});
    }
};

export const getAddress = (userId) => async (dispatch) => {
    try {
        dispatch({type: USER_ADDRESS_REQUEST, payload: userId});
        const {data} = await axios.get(`/api/users/${userId}`);
        dispatch({ type: USER_ADDRESS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({type: USER_ADDRESS_FAIL, payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,});
    }

}