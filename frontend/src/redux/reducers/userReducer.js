import {USER_DETAILS_REQUEST,USER_DETAILS_SUCCESS,USER_DETAILS_FAIL,USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGIN_FAIL,USER_LOGOUT} from "../types";

const initialState = {
    loading:true,
    loading2:false,
    userInfo:null,
    isAuthenticated:false,
    token:localStorage.token ? localStorage.token : null
}
const userReducer = (state=initialState,action) => {
    let {type,payload} = action;

    switch(type){
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading:true
            }
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loading2:true
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                token:payload.token,
                loading2:false,
                loading:false
            }
        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading:false,
                loading2:false,
                isAuthenticated:true,
                userInfo:payload
            }
        case USER_DETAILS_FAIL:
        case USER_LOGIN_FAIL:
        case USER_LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                userInfo:null,
                loading:false,
                loading2:false,
                isAuthenticated:false,
                token:null
            }
        default:
            return state;
    }
}

export default userReducer;
