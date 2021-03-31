import {DASHBOARD_QUESTION_REQUEST,DASHBOARD_QUESTION_SUCCESS,DASHBOARD_QUESTION_FAIL,QUESTION_CATEGORY_REQUEST,QUESTION_CATEGORY_SUCCESS,QUESTION_CATEGORY_FAIL, ADD_QUESTION_REQUEST, ADD_QUESTION_SUCCESS, ADD_QUESTION_FAIL,DELETE_QUESTION,DELETE_QUESTION_FAIL, UPDATE_QUESTION_SUCCESS, UPDATE_QUESTION_FAIL} from "../types";
import axios from "axios";
import { toast } from 'react-toastify';

//get question
export const getAllQuestion = () => async dispatch => {

    try {
        await dispatch({type:DASHBOARD_QUESTION_REQUEST});

        let res = await axios.get(`/api/quiz/`);

        await dispatch({
            type:DASHBOARD_QUESTION_SUCCESS,
            payload:res.data
        })
    } catch (error) {
        console.log(error.message);
        dispatch({type:DASHBOARD_QUESTION_FAIL});
    }
}

//get category
export const getAllCategory = () => async dispatch => {

    try {
        await dispatch({type:QUESTION_CATEGORY_REQUEST});

        let res = await axios.get(`/api/category/get`);

        await dispatch({
            type:QUESTION_CATEGORY_SUCCESS,
            payload:res.data
        })
    } catch (error) {
        console.log(error.message);
        dispatch({type:QUESTION_CATEGORY_FAIL});
    }
}


//Add New Question
export const addNewQuestion = (question,category,level,answer) => async dispatch => {
    const setLevel = await Number(level);

    try {
        await dispatch({type:ADD_QUESTION_REQUEST});

    let res = await axios.post(`/api/quiz/add/${category}`,{question,level: setLevel,answer});

        await dispatch({
            type:ADD_QUESTION_SUCCESS,
            payload:res.data
        });

        await toast.success("Question added Successfully!");

    } catch (error) {
        console.log(error.message);
        await toast.error(error.response.data.error);
        await dispatch({type:ADD_QUESTION_FAIL});
    }
}



//Update Question
export const updateQuestion = (quizId,question,category,level,answer) => async dispatch => {
    const setLevel = await Number(level);

    try {

    let res = await axios.patch(`/api/quiz/update/${quizId}`,{category,question,level: setLevel,answer});

        await dispatch({
            type:UPDATE_QUESTION_SUCCESS,
            payload:res.data
        });

        await toast.success("Question updated Successfully!");

    } catch (error) {
        console.log(error.message);
        await toast.error(error.response.data.error);
        await dispatch({type:UPDATE_QUESTION_FAIL});
    }
}


export const deleteQuiz = (id) => async dispatch => {

    try {
        await axios.delete(`/api/quiz/delete/${id}`);

        await dispatch({
            type: DELETE_QUESTION,
            payload:id
        });
        await toast.success("Question Delete Successfully!");
    } catch (error) {
        console.log(error.message);
        await toast.error(error.response.data.error);
        await dispatch({type:DELETE_QUESTION_FAIL});
    }
}