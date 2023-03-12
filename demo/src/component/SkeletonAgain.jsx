import React from 'react'
import { Skeleton } from "antd-mobile"
import "./skeleton.scss"

//对骨架屏的二次封装 设置一些通用的样式
// 二次封装就是对里面的属性进行一些修改，后面其他地方引用的时候就可以用修改好的内容
const SkeletonAgain = function SkeletonAgain() {
    return (
        <div className="skeleton-again-box">
            <Skeleton.Title animated />
            <Skeleton.Paragraph lineCount={5} animated />
        </div>
    )
}
export default SkeletonAgain;
