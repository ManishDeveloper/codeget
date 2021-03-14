import {combineReducers} from 'redux';
import userReducer from "./userReducer";
import categoryReducer from "./categoryReducer";
import questionReducer from "./questionReducer";
import dashboardQuestionReducer from "./dashboardQuestionReducer";

const rootReducer = combineReducers({
    user:userReducer,
    category:categoryReducer,
    questions:questionReducer,
    dashboardQuestions:dashboardQuestionReducer
});

export default rootReducer;