import {DASHBOARD_QUESTION_REQUEST,DASHBOARD_QUESTION_SUCCESS,DASHBOARD_QUESTION_FAIL,QUESTION_CATEGORY_REQUEST,QUESTION_CATEGORY_SUCCESS,QUESTION_CATEGORY_FAIL,ADD_QUESTION_REQUEST,ADD_QUESTION_SUCCESS,ADD_QUESTION_FAIL,DELETE_QUESTION, UPDATE_QUESTION_SUCCESS} from "../types";

const initialState = {
    loading:true,
    addloading:true,
    questionsList:[],
    success:false,
    categoryList:[],
    currentQuestionNum:0,
    singleQuestion:[]
}
const dashboardQuestionReducer = (state=initialState,action) => {
    let {type,payload} = action;

    switch(type){
        case DASHBOARD_QUESTION_REQUEST:
        case QUESTION_CATEGORY_REQUEST:
            return {
                ...state,
                loading:true
            }
        case ADD_QUESTION_REQUEST:
            return {
                ...state,
                addloading:true
            }
        case ADD_QUESTION_SUCCESS:
            return {
                ...state,
                questionsList:[payload, ...state.questionsList]
            }
        case UPDATE_QUESTION_SUCCESS:
            return {
                ...state,
                questionsList:state.questionsList.map(quiz => {
                    if(quiz._id.toString() === payload._id.toString()){
                        return payload;
                    }
                    else return quiz;
                })
            }
        case DELETE_QUESTION:
            return {
                ...state,
                questionsList:state.questionsList.filter(qus=>qus._id!==payload)
            }
        case QUESTION_CATEGORY_SUCCESS:
            return {
                ...state,
                categoryList:payload
            }
        case DASHBOARD_QUESTION_SUCCESS:
            return {
                ...state,
                loading:false,
                success:true,
                questionsList:payload,
                singleQuestion:payload[0]
            }
        case DASHBOARD_QUESTION_FAIL:
        case QUESTION_CATEGORY_FAIL:
            return {
                ...state,
                loading:false,
                success:false,
                categoryList:[],
                questionsList:[]
            }
        default:
            return state;
    }
}

export default dashboardQuestionReducer;
