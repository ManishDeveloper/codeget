import {ALL_CATEGORIES_REQUEST,ALL_CATEGORIES_SUCCESS,ALL_CATEGORIES_FAIL} from "../types";
import axios from "axios";

//get all categories
export const getCategories = () => async dispatch => {
    try {

        await dispatch({type:ALL_CATEGORIES_REQUEST}); 

        let res = await axios.get("/api/category/get");

        await dispatch({
            type:ALL_CATEGORIES_SUCCESS,
            payload:res.data
        }); 

        
    } catch (error) {
        console.log(error.message);
        await dispatch({type:ALL_CATEGORIES_FAIL});
    }
}