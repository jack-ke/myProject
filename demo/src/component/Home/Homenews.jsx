import react, { useEffect, useRef, useState } from "react"
import NewsItem from "../NewsItem"
import SkeletonAgain from "../SkeletonAgain"
import "../../CSS/home.scss"
import { Divider, DotLoading } from "antd-mobile"
import api from "../../api"


const Homenews = function Homenews(props) {

    const [newslist, setNewsList] = useState([])
    const loadref = useRef()
    // console.log(loadref)
    // 接收数据
    useEffect(() => {
        (async () => {
            try {
                api.queryNewsLatest().then(res => {
                    let { stories, date } = res.data
                    // 注意 这里再给里面添加一次storie是为了下面的双重循环做准备
                    // 因为map是数组的方法，因此需要两个数组
                    newslist.push({ date, stories })
                    // console.log(newslist)
                    setNewsList([...newslist])

                })
            } catch (_) { console.log("GG") }
        })()
    }, [])
    // 设置监听器
    useEffect(() => {
        // IntersectionObserver这个api就是一个监听器

        // changes就是当监听内容出现/消失 就执行的函数
        let ob = new IntersectionObserver(async changes => {
            // changes是监听多个 我们只需要一个就是changes[0]
            // isIntersecting 这个值有true和false 代表出现和消失
            let { isIntersecting } = changes[0]
            // 所以 当isIntersecting为true 加载更多 为false 就不加载
            if (isIntersecting) {
                // 加载更多 请求数据
                try {
                    //调用api接口，获取往日数据，往日数据传参 根据time 因此我们要获取到time 
                    // 而 time 是在数据的最后一项的date 因此我们要活得最后一项的date
                    let time = newslist[newslist.length - 1]["date"]
                    // 这个获取的方法与上方 方法放法一致
                    await api.queryNewsBefore(time).then(res => {
                        let { stories, date } = res.data
                        newslist.push({ date, stories })
                        setNewsList([...newslist])
                    })
                } catch (_) {
                    console.log("GG")
                }
            }

        });
        // 这里标识监听的内容
        let reloadref = loadref.current
        ob.observe(loadref.current)

        // 当我们组件释放的时候，需要移除监听器，优化性能 
        return () => {
            //注意 组件释放的时候 react会自动移除dom 因此这里的ref就监听不了，因此需要先赋值给另一个
            ob.unobserve(reloadref) //unobserve就是移除监听
            ob = null; // 然后销毁 ob 这个监听器
        }

    }, [])

    return <div className="home-news-box">

        {/* 骨架屏有没有取决于有没有数据 如果有数据，就不显示骨架屏 */}

        {newslist.length === 0 ? <SkeletonAgain /> :
            //  这里利用空标记<> 占一个位置 要不然这里map会报错
            <>
                {newslist.map((item, index) => {
                    let { stories, date, id } = item
                    return <div key={id}>
                        {/* 这里看是不是第一条，第一条就不显示分割线 */}
                        {index !== 0 ? <Divider contentPosition="left">
                            {/* 这里的data是8位数字，可以到时候通过函数处理一下 */}
                            {date}
                        </Divider> : null}
                        <div>
                            {stories.map(value => {
                                // 循环创建newItem 并且将父元素的属性传递过去
                                return <NewsItem key={value.id} info={value} myprops={props} />
                            })}
                        </div>
                    </div>
                })}
            </>
        }



        {/* 加载更多 loading */}
        {/*这个加载也要进行判断，有数据就不显示，没有就显示 这里也要通过 useRef 的current获取dom元素 */}
        {/* 有两个方案 1.按长度来判断宣布渲染  2 利用display:none 来掩藏 */}
        {/* 问题：方法1 不会获取dom元素   方法2可以获取dom元素 */}
        {/* 因此，对于不经常操作的用方法1，因为不需要频繁获取dom 可以优化数据 因为我们可以少渲染数据 */}
        {/* 但是对于选项卡这种频繁操作，就用方法2，只是改变样式，不需要频繁创建和销毁元素 */}
        < div className="loadmore-box" ref={loadref} style={{
            display: newslist.length === 0 ? "none" : "block"
        }}>
            <DotLoading /> 数据加载中
        </div>
    </div>
}
export default Homenews;