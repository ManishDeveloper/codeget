import {QUESTION_REQUEST,QUESTION_SUCCESS,QUESTION_FAIL,SINGLE_QUESTION_REQUEST,SINGLE_QUESTION_SUCCESS,SINGLE_QUESTION_FAIL,DONE_QUESTION_REQUEST,DONE_QUESTION_SUCCESS,DONE_QUESTION_FAIL,SEND_DONE_QUESTION_REQUEST,SEND_DONE_QUESTION_SUCCESS,SEND_DONE_QUESTION_FAIL,REMOVE_DONE_QUESTION_REQUEST,REMOVE_DONE_QUESTION_SUCCESS,REMOVE_DONE_QUESTION_FAIL} from "../types";

const initialState = {
    loading:true,
    doneLoading:true,
    questionsList:[],
    singleQuestion:[],
    doneQuestion:[],
    currentCategory:null,
    numDoneQuestion:null,
    success:false
}
const questionReducer = (state=initialState,action) => {
    let {type,payload} = action;

    switch(type){
        case QUESTION_REQUEST:
        case SINGLE_QUESTION_REQUEST:
        case DONE_QUESTION_REQUEST:
        case SEND_DONE_QUESTION_REQUEST:
        case REMOVE_DONE_QUESTION_REQUEST:
            return {
                ...state,
                loading:true,
                doneLoading:true
            }
        case QUESTION_SUCCESS:
            return {
                ...state,
                loading:false,
                success:true,
                currentCategory:payload[0].category,
                questionsList:payload
            }
        case DONE_QUESTION_SUCCESS:
        case SEND_DONE_QUESTION_SUCCESS:
        case REMOVE_DONE_QUESTION_SUCCESS:
            
                    let DoneNumg = state.questionsList.filter((quiz, index)=> ((payload.quizDone.indexOf(quiz._id.toString()) !== -1) && state.questionsList[0].category.toString() === state.currentCategory.toString()));

                    return {
                        ...state,
                        loading:false,
                        doneLoading:false,
                        success:true,
                        numDoneQuestion:DoneNumg.length,
                        doneQuestion:payload
                    }
        case SINGLE_QUESTION_SUCCESS:
            return {
                ...state,
                loading:false,
                success:true,
                questionsList:[],
                singleQuestion:payload
            }
        case QUESTION_FAIL:
        case SINGLE_QUESTION_FAIL:
        case DONE_QUESTION_FAIL:
        case SEND_DONE_QUESTION_FAIL:
        case REMOVE_DONE_QUESTION_FAIL:
            return {
                ...state,
                loading:false,
                success:false,
                doneLoading:false,
                questionsList:[],
                singleQuestion:[],
                doneQuestion:[]
            }
        default:
            return state;
    }
}

export default questionReducer;
