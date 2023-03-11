import React, { Suspense } from 'react'
import routes from './routes'
import { Mask, DotLoading } from "antd-mobile"
import { Routes, Route, useNavigate, useLocation, useParams, useSearchParams } from "react-router-dom"

const Element = function Element(props) {
    let { component: Component } = props
    let { title = "知乎日报-webApp" } = props.meta || {}
    document.title = title;

    const navigate = useNavigate(),
        location = useLocation(),
        params = useParams(),
        [usp] = useSearchParams();

    return <Component navigate={navigate} location={location} params={params} usp={usp} />
}

const RouteView = function RouteView() {
    return <Suspense fallback={<Mask>
        <DotLoading color="primary" />
    </Mask>} >

        <Routes>
            {routes.map(item => {
                let { name, path } = item
                return <Route key={name} path={path} element={<Element {...item} />} />
            })}
        </Routes>

    </Suspense>
}

export default RouteView;
