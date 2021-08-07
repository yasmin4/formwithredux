import formRecordReducer from './reducer';
import { combineReducers } from "redux";

const rootReducer=combineReducers({
    formRecordReducer:formRecordReducer
    
})
export default rootReducer;