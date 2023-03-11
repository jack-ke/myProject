import React, { useState, useEffect } from 'react'
import api from '../api';
import "../CSS/home.scss";
import temp from "../img/temp.jpg"
import { Image } from "antd-mobile"
import { Link } from "react-router-dom"

export default function NewsItem(props) {
    const [newslist, setNewsList] = useState([])
    let { myprops, info } = props
    // console.log(myprops, info)
    useEffect(() => {
        (async () => {
            try {
                // 结构请求的内容
                await api.queryNewsLatest().then(res => {
                    // console.log(res.data)
                    setNewsList(res.data.stories)
                })

            } catch (_) { console.log("g") }
        })()

    })

    return (
        // 新闻详细内容
        <div className='news-item-box'>
            {/* {newslist.map(item => {
                let { id, title } = item
                return <div className="content" key={id}>
                    <h4 className='title'>{title}</h4>
                </div>
            })} */}
            {/* 相信内容分为两部分 一部分是标题时间  一部分是图片 */}
            <Link to={{ pathname: `detail/xxx` }}>
                <div className="content">
                    <h4 className="title">这是标题</h4>
                    <div className='autor'>这是简介</div>
                </div>
                <Image src="xxx" alt="这是一张图片" lazy />
            </Link>
        </div>
    )
}
