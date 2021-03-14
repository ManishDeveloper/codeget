import {USER_DETAILS_REQUEST,USER_DETAILS_SUCCESS,USER_DETAILS_FAIL,USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGIN_FAIL, USER_LOGOUT} from "../types";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import { toast } from 'react-toastify';

//get auth user
export const getUserDetails = () => async dispatch => {
    try {
        if(localStorage.token){
            setAuthToken(localStorage.token);
        }

    await dispatch({type: USER_DETAILS_REQUEST});

    let res = await axios.get('/api/users/auth');

    dispatch({
        type:USER_DETAILS_SUCCESS,
        payload:res.data
    });
        
    } catch (error) {
        console.log(error.message);
        await dispatch({type:USER_DETAILS_FAIL})
    }
}


//user login
export const userLogin = (email, password) => async dispatch => {

    try {
        await dispatch({type:USER_LOGIN_REQUEST});

        let res = await axios.post("/api/users/login",{email,password});

        localStorage.setItem("token",res.data.token);

        await dispatch(getUserDetails());

        await dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:res.data
        });

        await toast.success("Successfully Login!");
        
    } catch (error) {
        console.log(error.message);
        await toast.error(error.response.data.error);
        await dispatch({type:USER_LOGIN_FAIL});
    }
}


//user login
export const userLogout = () => async dispatch => {

    await dispatch({
        type:USER_LOGOUT
    });
}