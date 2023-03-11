import React, { useState, useEffect } from 'react'
import Homehead from "../component/Homehead"
// import Homeswiper from '../component/Homeswiper'
import { Swiper, Image, Divider, DotLoading } from "antd-mobile"
import { Link } from "react-router-dom"
// import test from "../img/test.jpg"
import "../component/Homeswiper.scss"
import api from "../api/index"
import NewsItem from '../component/NewsItem'
import SkeletonAgain from "../component/SkeletonAgain"


export default function Home(props) {

    // 给头部传递状态，让他们根据时间显示不同内容 
    // 一般默认时间都是8位数字，因此我们要使用newDate().to 
    let [today, setToday] = useState("20230310");
    // 轮播图数据
    const [bannerlist, setBannerList] = useState([]);

    // 新闻内容 
    const [newsList, setNewsList] = useState([]);

    // 第一次渲染 useEffect副作用函数
    useEffect(() => {
        // try {
        //     // axios.get("/api/news_latest").then(res => {
        //     //     console.log(res.data)
        //     //     setBannerList(res.data.top_stories)
        //     // }
        //     api.queryNewsLatest().then(res => {
        //         console.log(res)
        //         setBannerList(res.data.top_stories)
        //     })

        // } catch (_) {
        //     console.log("GG")
        // }

        // 也可以用async await
        // 之前定义了一个API 里面都是请求方法 可以直接调用其中一个
        (async () => {
            try {
                // 结构请求的内容
                await api.queryNewsLatest().then(res => {
                    console.log(res.data)
                    setBannerList(res.data.top_stories)
                    setNewsList(res.data.stories)
                    setToday(res.data.date)
                })

            } catch (_) { console.log("GG") }
        })()
    }, [])
    return (
        <div className='home-box'>
            {/* 头部 */}
            <Homehead today={today} props={props} />

            {/* 轮播图 */}
            <div className='home-swiper-box'>
                {bannerlist.length > 0 ? <Swiper autoplay={true} loop={true}>
                    {/* swiper item需要循环创建 利用map */}

                    {bannerlist.map(item => {
                        let { id, image, title, hint } = item
                        return <Swiper.Item key={id} >
                            <Link to={{ pathname: `/detail/${id}` }}>
                                {/* 运用antd的Image组件 加上lazy属性 进行懒加载 */}
                                <Image src={image} lazy />
                                <div className="desc">
                                    <h3 className="title">{title}</h3>
                                    <p className="author">{hint}</p>
                                </div>
                            </Link>
                        </Swiper.Item>
                    })}

                </Swiper > : null
                }

            </div >


            {/* 底部信息卡片 */}

            {/* 没有数据之前 展示一个骨架图 */}
            <SkeletonAgain />
            {/* 一个大div就是一天新闻 里面的item动态创建 */}
            <div className="news-box">
                {/* 分割线组件 antd Divider*/}
                <Divider contentPosition='left'>12月31日</Divider>
                {/* 新闻列表 */}
                <div className="news-list">
                    <NewsItem />
                    <NewsItem />
                    <NewsItem />
                </div>
            </div>
            {/* 一个大div就是一天新闻 */}
            <div className="news-box">
                {/* 分割线组件 antd Divider*/}
                <Divider contentPosition='left'>1月1日</Divider>
                {/* 新闻列表 */}
                <div className="news-list">
                    <NewsItem />
                    <NewsItem />
                    <NewsItem />
                </div>
            </div>

            {/* 数据加载 当到了底部 就继续加载 这里有一个loading效果*/}
            <div className='loadmore-box'>
                <DotLoading />
                数据加载中
            </div>
        </div>

    )
}
