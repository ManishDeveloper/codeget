import {ALL_CATEGORIES_REQUEST,ALL_CATEGORIES_SUCCESS,ALL_CATEGORIES_FAIL} from "../types";

const initialState = {
    categories:[],
    loading:true
}
const categoryReducer = (state=initialState,action) => {
    let {type,payload} = action;

    switch(type){
        case ALL_CATEGORIES_REQUEST:
            return {
                ...state,
                loading:true
            }
        case ALL_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading:false,
                categories:payload
            }
        case ALL_CATEGORIES_FAIL:
            return {
                ...state,
                loading:false,
                categories:[]
            }
        default:
            return state;
    }
}

export default categoryReducer
