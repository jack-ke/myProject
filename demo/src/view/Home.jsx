import React from 'react'
import "../CSS/home.scss"
import Homehead from "../component/Home/Homehead"
import HomeSwiper from '../component/Home/Homeswiper'
import Homenews from '../component/Home/Homenews'


export default function Home(props) {

    // 给头部传递状态，让他们根据时间显示不同内容 
    // 一般默认时间都是8位数字，因此我们要使用newDate().to 

    // 轮播图数据
    // const [bannerlist, setBannerList] = useState([]);

    // // 新闻内容 
    // const [newsList, setNewsList] = useState([]);

    // 第一次渲染 useEffect副作用函数
    // useEffect(() => {
    //     // try {
    //     //     // axios.get("/api/news_latest").then(res => {
    //     //     //     console.log(res.data)
    //     //     //     setBannerList(res.data.top_stories)
    //     //     // }
    //     //     api.queryNewsLatest().then(res => {
    //     //         console.log(res)
    //     //         setBannerList(res.data.top_stories)
    //     //     })

    //     // } catch (_) {
    //     //     console.log("GG")
    //     // }

    //     // 也可以用async await
    //     // 之前定义了一个API 里面都是请求方法 可以直接调用其中一个
    //     (async () => {
    //         try {
    //             // 结构请求的内容
    //             await api.queryNewsLatest().then(res => {
    //                 console.log(res.data)
    //                 // setBannerList(res.data.top_stories)
    //                 setNewsList(res.data.stories)
    //                 setToday(res.data.date)
    //             })

    //         } catch (_) { console.log("GG") }
    //     })()
    // }, [])
    return (
        <div className='home-box'>
            {/* 头部 */}
            <Homehead props={props} />

            {/* 轮播图 */}
            <HomeSwiper props={props} />

            {/* 底部信息卡片 */}
            <Homenews props={props} />
        </div>

    )
}
