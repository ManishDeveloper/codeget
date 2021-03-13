import {QUESTION_REQUEST,QUESTION_SUCCESS,QUESTION_FAIL,GET_NEXT_QUESTION} from "../types";
import axios from "axios";

//get question
export const getQuestion = (level,category) => async dispatch => {

    try {
        dispatch({type:QUESTION_REQUEST});

        let res = await axios.get(`/api/quiz/${level}/${category}`)

        dispatch({
            type:QUESTION_SUCCESS,
            payload:res.data
        })
    } catch (error) {
        console.log(error.message);
        dispatch({type:QUESTION_FAIL});
    }
}


export const getNextQuestion = (quizNumber) => async dispatch => {

    await dispatch({
        type: GET_NEXT_QUESTION,
        payload:quizNumber
    })
    
}