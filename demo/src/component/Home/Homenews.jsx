import react from "react"
import NewsItem from "../NewsItem"
import SkeletonAgain from "../SkeletonAgain"
import "../../CSS/home.scss"
import { Divider } from "antd-mobile"


const Homenews = function Homenews(props) {
    return <div className="home-news-box">
        {/* 先放一个骨架屏 */}
        <SkeletonAgain />
        {/* 放新闻的详细内容 , 一个大div就是一天新闻 里面的item动态创建 */}
        {/* 分割线组件 antd Divider*/}
        <Divider contentPosition='left'>12月31日</Divider>
        {/* 新闻列表 */}
        <div className="news-list">
            <NewsItem props={props} />
        </div>
    </div>
}

export default Homenews;