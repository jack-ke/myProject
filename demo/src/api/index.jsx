// 导入各个模块接口

import axios from "axios"


//利用axios接收数据

// 获取今日信息
const queryNewsLatest = () => axios.get("/api/news_latest")

// 获取往日信息
const queryNewsBefore = (time) => {
    return axios.get("api/news_before", {
        // params问号传参 根据time自动获取
        params: {
            time
        }
    })
}

// 获取详细信息
const queryNewsInfo = (id) => {
    return axios.get("/api/news_info", {
        params: {
            id
        }
    })
}

// 获取点赞信息
const queryExtra = (id) => {
    return axios.get("/api/story_extra", {
        params: {
            id
        }
    })
}

// 这些想要在外面使用 就要暴露API 统一放在一个API里面
const api = {
    queryNewsBefore,
    queryNewsInfo,
    queryNewsLatest,
    queryExtra
}
export default api;
// 以后就是 api.queryStory  这样来使用