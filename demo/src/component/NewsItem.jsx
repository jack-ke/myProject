import React, { useState, useEffect } from 'react'
import api from '../api';

export default function NewsItem() {
    const [newslist, setNewsList] = useState([])

    useEffect(() => {
        (async () => {
            try {
                // 结构请求的内容
                await api.queryNewsLatest().then(res => {
                    console.log(res.data)
                    setNewsList(res.data.stories)
                })

            } catch (_) { console.log("g") }
        })()

    })

    return (
        <div className='news-item-box'>
            {newslist.map(item => {
                return <div className="content" key={item.id}>
                    <h4 className='title'>{item.title}</h4>
                </div>
            })}

        </div>
    )
}
