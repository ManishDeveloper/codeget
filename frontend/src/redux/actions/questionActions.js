import {QUESTION_REQUEST,QUESTION_SUCCESS,QUESTION_FAIL,SINGLE_QUESTION_REQUEST,SINGLE_QUESTION_SUCCESS,SINGLE_QUESTION_FAIL,DONE_QUESTION_REQUEST,DONE_QUESTION_SUCCESS,DONE_QUESTION_FAIL,SEND_DONE_QUESTION_REQUEST,SEND_DONE_QUESTION_SUCCESS,SEND_DONE_QUESTION_FAIL,REMOVE_DONE_QUESTION_REQUEST,REMOVE_DONE_QUESTION_SUCCESS,REMOVE_DONE_QUESTION_FAIL,LEVEL_UPDATE_REQUEST,LEVEL_UPDATE_SUCCESS,LEVEL_UPDATE_FAIL} from "../types";
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


//get Important Question
export const getImpQuestion = (category) => async dispatch => {

    try {
        dispatch({type:QUESTION_REQUEST});

        let res = await axios.get(`/api/quiz/2/${category}`)

        dispatch({
            type:QUESTION_SUCCESS,
            payload:res.data
        })
    } catch (error) {
        console.log(error.message);
        dispatch({type:QUESTION_FAIL});
    }
}

//get Single question
export const getSingleQuestion = (quizId) => async dispatch => {

    try {
        dispatch({type:SINGLE_QUESTION_REQUEST});

        let res = await axios.get(`/api/quiz/${quizId}`)

        dispatch({
            type:SINGLE_QUESTION_SUCCESS,
            payload:res.data
        })
    } catch (error) {
        console.log(error.message);
        dispatch({type:SINGLE_QUESTION_FAIL});
    }
}

//Update Question Level
export const updateQuizLevel = (id,level) => async dispatch => {

    try {
        dispatch({type:LEVEL_UPDATE_REQUEST});

        let res = await axios.patch(`/api/quiz/update/level/${level}/${id}`)

        dispatch({
            type:LEVEL_UPDATE_SUCCESS,
            payload:res.data
        })
    } catch (error) {
        console.log(error.message);
        dispatch({type:LEVEL_UPDATE_FAIL});
    }
}


//Send Done Question
export const sendDoneQuestion = (id) => async dispatch => {

    try {
        dispatch({type:SEND_DONE_QUESTION_REQUEST});

        let res = await axios.post(`/api/quiz/user/done/${id}`)

        dispatch({
            type:SEND_DONE_QUESTION_SUCCESS,
            payload:res.data
        })
    } catch (error) {
        console.log(error.message);
        dispatch({type:SEND_DONE_QUESTION_FAIL});
    }
}


//Remove Done Question
export const removeDoneQuestion = (id) => async dispatch => {

    try {
        dispatch({type:REMOVE_DONE_QUESTION_REQUEST});

        let res = await axios.delete(`/api/quiz/user/done/${id}`)

        dispatch({
            type:REMOVE_DONE_QUESTION_SUCCESS,
            payload:res.data
        })
    } catch (error) {
        console.log(error.message);
        dispatch({type:REMOVE_DONE_QUESTION_FAIL});
    }
}


//Get Done Question
export const getDoneQuestion = () => async dispatch => {

    try {
        dispatch({type:DONE_QUESTION_REQUEST});

        let res = await axios.put(`/api/quiz/user/done`)

        dispatch({
            type:DONE_QUESTION_SUCCESS,
            payload:res.data
        })
    } catch (error) {
        console.log(error.message);
        dispatch({type:DONE_QUESTION_FAIL});
    }
}
