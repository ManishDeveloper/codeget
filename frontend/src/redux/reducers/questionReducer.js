import {QUESTION_REQUEST,QUESTION_SUCCESS,QUESTION_FAIL} from "../types";

const initialState = {
    loading:true,
    questionsList:[],
    success:false
}
const questionReducer = (state=initialState,action) => {
    let {type,payload} = action;

    switch(type){
        case QUESTION_REQUEST:
            return {
                ...state,
                loading:true
            }
        case QUESTION_SUCCESS:
            return {
                ...state,
                loading:false,
                success:true,
                questionsList:payload
            }
        case QUESTION_FAIL:
            return {
                ...state,
                loading:false,
                success:false,
                question:[]
            }
        default:
            return state;
    }
}

export default questionReducer;
