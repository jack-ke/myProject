// 合并reducer
import { combineReducers } from "redux";
import baseReducer from "./baseReducer";



const reducer = combineReducers({
    baseReducer,
    
})

export default reducer;