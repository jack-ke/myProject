import React, { useState, useEffect } from 'react'
import api from '../api';

export default function NewsItem(props) {
    const [newslist, setNewsList] = useState([])
    // console.log(props)
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
            {newslist.map(item => {
                let { id, title } = item
                return <div className="content" key={id}>
                    <h4 className='title'>{title}</h4>
                </div>
            })}
        </div>
    )
}
