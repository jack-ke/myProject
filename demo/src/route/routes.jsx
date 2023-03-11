import { lazy } from "react";
import Home from "../view/Home";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        meta: {
            title: "知乎日报-webApp"
        }
    },
    {
        path: "/detail/:id",
        name: "detail",
        component: lazy(() => import("../view/Detail")),
        meta: {
            title: "知乎日报-详情"
        }
    },
    {
        path: "/user",
        name: "user",
        component: lazy(() => import("../view/User")),
        meta: {
            title: "知乎日报-个人页面"
        }
    },
    {
        path: "/update",
        name: "update",
        component: lazy(() => import("../view/Update")),
        meta: {
            title: "知乎日报-更改个人信息"
        }
    },
    {
        path: "/store",
        name: "store",
        component: lazy(() => import("../view/Store")),
        meta: {
            title: "知乎日报-收藏页面"
        }
    },
    {
        path: "/login",
        name: "login",
        component: lazy(() => import("../view/Login")),
        meta: {
            title: "知乎日报-登录/注册页面"
        }
    },
    {
        path: "*",
        name: "404",
        component: lazy(() => import("../view/Notfound")),
        meta: {
            title: "知乎日报-404未找到"
        }
    },

]

export default routes;