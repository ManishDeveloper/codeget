import {QUESTION_REQUEST,QUESTION_SUCCESS,QUESTION_FAIL} from "../types";
import axios from "axios";

//get question
export const getQuestion = (category) => async dispatch => {

    try {
        dispatch({type:QUESTION_REQUEST});

        let res = await axios.get(`/api/quiz/category/${category}`)

        dispatch({
            type:QUESTION_SUCCESS,
            payload:res.data
        })
    } catch (error) {
        console.log(error.message);
        dispatch({type:QUESTION_FAIL});
    }
}