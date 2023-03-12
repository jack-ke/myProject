import React, { useEffect, useState } from 'react'
import "../CSS/detail.scss"
import { Badge } from "antd-mobile"
import { LeftOutline, UploadOutline, LikeOutline, StarOutline, MessageOutline } from "antd-mobile-icons"
import api from "../api/index"
import SkeletonAgain from "../component/SkeletonAgain"
import { flushSync } from "react-dom"



export default function Detail(props) {
    // 页面信息状态
    const [info, setInfo] = useState(null);
    // 点赞信息状态
    const [extra, setExtra] = useState(null);
    // 结构props
    let { navigate, params } = props

    // 处理样式方法 需要传入形参 也就是先通过后端接收到数据 然后再去更改样式
    let link;
    const handleStyle = (result) => {
        let { css } = result;
        if (!Array.isArray(css)) return;
        css = css[0]
        if (!css) return;
        // 创建link
        link = document.createElement("link")
        link.rel = "stylesheet";
        link.href = css;
        document.head.appendChild(link)
    }

    // 处理大图 这个要注意,需要先加载完之后才有img的dom 所以这个函数和获取数据之间是同步 先获取数据 才能处理图片,这里就需要使用一个flushSync 这个方法 是react-dom自带的 将异步变成同步
    const handleImg = (result) => {

        // 服务器传来的dom不能通过ref获取,只能通过document获取
        let imgPlaceHolder = document.querySelector(".img-place-holder")
        if (!imgPlaceHolder) return;

        // 创建大图 先创建一个img标签
        let img = new Image;
        img.src = result.image;
        // 加载成功 就把图片放进去
        img.onload = () => {
            imgPlaceHolder.appendChild(img)
        }
        //加载失败就删除这一个图片的占位
        img.onerror = () => {
            let parent = imgPlaceHolder.parentNode; //先获取祖先元素 才能删除父元素
            parent.parentNode.removeChild(parent);
        }
    }

    // 第一次获取信息
    useEffect(() => {
        (async () => {
            try {
                await api.queryNewsInfo(params.id).then(res => {
                    console.log(res.data)
                    let result = res.data


                    flushSync(() => {
                        setInfo(result)
                        handleStyle(result)
                    })

                    //处理样式 数据库自带 处理图片
                    handleImg(result)


                })
            } catch (_) { }
        })()

        // 移除link 
        return () => {
            if (link) document.head.removeChild(link);
        }
    }, [])

    // 获取点赞信息
    useEffect(() => {
        (async () => {
            try {
                await api.queryExtra(params.id).then(res => {
                    console.log(res.data)
                    setExtra(res.data)
                })
            } catch (_) { }
        })()
    }, [])

    return (
        // 注意 详情页的内容结构都是服务器返回的，我们只需要调接口就好了
        // CMS内容管理系统 toB
        <div className='detail-box'>

            {/* 新闻内容 */}
            {info ? <div className="content" dangerouslySetInnerHTML={{ __html: info.body }}>
            </div> : <SkeletonAgain />
            }


            {/* 底部返回栏 */}
            <div className="detail-navbar-box">
                {/* 一般左边一部分 返回图标  剩下的图标放在右边 */}
                <div className="back" onClick={() => {
                    navigate(-1)
                }}> <LeftOutline /> </div>
                {/* 右边的图标内容 */}
                <div className="icons">
                    {/* 如果图标上面有数字的话,就要用badge徽章,这个会在右上角显示数字 */}
                    <Badge content={extra ? extra.comments : 0}>   <MessageOutline /> </Badge>
                    <Badge content={extra ? extra.popularity : 0}>  <LikeOutline /></Badge>

                    <span> <StarOutline /></span>
                    <span> <UploadOutline /></span>

                </div>
            </div>
        </div >
    )
}
