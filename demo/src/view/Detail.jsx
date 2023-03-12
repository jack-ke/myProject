import React from 'react'
import "../CSS/detail.scss"


export default function Detail(props) {
    let { navigate } = props
    console.log(navigate)
    return (
        // 注意 详情页的内容结构都是服务器返回的，我们只需要调接口就好了
        // CMS内容管理系统 toB
        <div className='detail-box'>
            {/* 新闻内容 */}
            <div className="detail-content-box">

            </div>
            {/* 底部返回栏 */}
            <div className="detail-navbar-box">
                {/* 一般左边一部分 返回图标  剩下的图标放在右边 */}
                <div className="back" onClick={() => {
                    navigate(-1)
                }}></div>

                <div className="icons"></div>
            </div>
        </div>
    )
}
