//创建sotre 
import { applyMiddleware, legacy_createStore } from "redux"
import reduxThunk from "redux-thunk"
import reduxPromise from "redux-promise"
import reducer from "./reducer"

let middleware = [reduxPromise, reduxThunk]

const stroe = legacy_createStore(reducer, applyMiddleware(...middleware))

export default stroe;