import {combineReducers} from 'redux';
import userReducer from "./userReducer";
import categoryReducer from "./categoryReducer";
import questionReducer from "./questionReducer";

const rootReducer = combineReducers({
    user:userReducer,
    category:categoryReducer,
    questions:questionReducer
});

export default rootReducer;