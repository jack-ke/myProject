// 单个页面的状态 

import _ from "lodash"

let inital = {
    info: null
}

const baseReducer = function baseReducer(state = inital, action) {
    //克隆初始状态
    state = _.clone(state)
    switch (action.type) {
        default:
    }
    return state;
}

export default baseReducer;