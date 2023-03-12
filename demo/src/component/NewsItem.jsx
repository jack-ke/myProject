import React from 'react'
import "../CSS/home.scss";
import { Image } from "antd-mobile"
import { Link } from "react-router-dom"
// 规则校验
import propTypes from "prop-types"

export default function NewsItem(props) {
    // 接收父元素传递过来的参数
    let { info } = props
    // 这里也要判断一下info的是否有值
    if (!info) return null;
    // 结构出所需要的内容
    let { title, id, hint, images } = info
    // 结构出来的img也要判断一下 如果没有就显示空 着用antd里的会有一个裂图的效果
    // 注意看后端传入的image格式，如果是数组就进行数组判定
    if (!Array.isArray(images)) return images = [""]

    // 规则校验  就是我们接收到了父级的info 但是如果其他人输的不对 或者格式错误 就显示null
    NewsItem.defaultProps = {
        info: null // 默认给一个null；
    }
    NewsItem.propTypes = {
        info: propTypes.object // 如果要传 格式必须是object
    }

    return (
        // 新闻详细内容
        <div className='news-item-box'>
            {/* 由于父元素已经循环创建了newsItem 所以我们从父元素传递的属性中结构出需要的内容即可 */}

            <Link to={{ pathname: `detail/${id}` }}>
                <div className='content'>
                    <div className="title">{title}</div>
                    <div className="author">{hint}</div>
                </div>
                {/* 记得加上lazy 懒加载 */}
                <Image src={images[0]} alt="这是一张图片" lazy />
            </Link>

        </div>
    )

}
