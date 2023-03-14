import React from 'react'
import { NavBar } from "antd-mobile"
import PropTypes from 'prop-types'

// 对ANTD组件库中的NAVBA 的 二次封装
// 目的：对一些复杂的业务逻辑进行统一处理
const NavbarAgain = function NavbarAgain(props) {
    console.log(props)
    let { title } = props

    const handleBack = () => {

    }
    // 点击按钮跳转 usenavigate ... 复杂逻辑


    return (
        <div>
            <NavBar onBack={handleBack}> {title} </NavBar>
        </div>
    )
}
// 规则校验  设置一个默认porps 如果不传props进来 
NavbarAgain.defaultProps = {
    title: "个人中心"
}
NavbarAgain.PropsTypes = {
    title: PropTypes.string
};

export default NavbarAgain;
