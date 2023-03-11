import react, { useEffect, useState } from "react"
import NewsItem from "../NewsItem"
import SkeletonAgain from "../SkeletonAgain"
import "../../CSS/home.scss"
import { Divider, DotLoading } from "antd-mobile"
import api from "../../api"


const Homenews = function Homenews(props) {

    const [newslist, setNewsList] = useState([])
    useEffect(() => {
        (async () => {
            try {
                api.queryNewsLatest().then(res => {
                    let { stories, date } = res.data
                    // 注意 这里再给里面添加一次storie是为了下面的双重循环做准备，因此需要两个数组
                    newslist.push({ date, stories })
                    console.log(newslist)
                    setNewsList([...newslist])

                })
            } catch (_) { console.log("GG") }
        })()
    }, [])

    return <div className="home-news-box">

        {/* 骨架屏有没有取决于有没有数据 如果有数据，就不显示骨架屏 */}

        {newslist.length === 0 ? <SkeletonAgain /> :
            <>
                {newslist.map((item, index) => {
                    let { stories, date, id } = item
                    return <div key={id}>
                        {index !== 0 ? <Divider contentPosition="left">{date}</Divider> : null}
                        <div>
                            {stories.map(value => {
                                return <NewsItem info={value} myprops={props} />
                            })}
                        </div>
                    </div>
                })}
            </>
        }



        {/* 加载更多 loading */}
        < div className="loadmore-box" >
            <DotLoading /> 数据加载中
        </div>
    </div>
}
export default Homenews;