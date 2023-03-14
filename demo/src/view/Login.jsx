import React from 'react'
import NavbarAgain from '../component/NavbarAgain'
import "../CSS/login.scss"
import { Button, Form, Input } from "antd-mobile"

export default function Login(props) {
    return (
        <div className='login-box'>
            {/* 这个页面分为两个模块 一个是顶部菜单 一个是内容 */}
            <div className="login-nav-box">
                {/* 顶部菜单就是一个简单的返回按钮和一个标题  这个导航栏之前封装过*/}
                <NavbarAgain title="登录/注册" props={props} />
            </div>
            <div className="login-content-box">
                {/* 内容就是一个登录注册的表单 */}
                {/* 使用页脚 里面放提交按钮，这个一直在最下面 */}
                <Form layout='horizontal' style={{ "--border-top": "none" }} footer={<Button type='submit' color="primary" >提交</Button>}>

                    <Form.Item label="手机号" name="phone">
                        <Input placeholder='请输入手机号' />
                    </Form.Item>

                    <Form.Item label='短信验证码'
                        rules={[{ required: true, message: '验证码不能为空!' }]}
                        extra={<a>发送验证码</a>}>
                        <Input placeholder='请输入' />
                    </Form.Item>
                </Form>
            </div>

        </div >
    )
}
