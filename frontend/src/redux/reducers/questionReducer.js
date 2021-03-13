import {QUESTION_REQUEST,QUESTION_SUCCESS,QUESTION_FAIL,GET_NEXT_QUESTION} from "../types";

const initialState = {
    loading:true,
    questionsList:[],
    success:false,
    currentQuestionNum:0,
    singleQuestion:[]
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
                questionsList:payload,
                singleQuestion:payload[0]
            }
        case GET_NEXT_QUESTION:
            return {
            ...state,
            loading:false,
            singleQuestion:state.questionsList[payload],
            currentQuestionNum:payload
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
