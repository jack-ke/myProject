import React, { useMemo, useState } from 'react'
import temp from "../../img/temp.jpg"
import "../../CSS/home.scss"



export default function Homehead(props) {
    const [today, setToday] = useState("20230310");
    let myprops = props.props
    // let { today } = props
    //时间处理 利用useMemo存状态 当today发生变化，那么这个显示的时间也会发生变化 
    // 为什么不用useState 原因是state如果发生了改变不会重新渲染页面，memo会重新渲染页面
    let time = useMemo(() => {
        //结构 获取到月和日 
        let [, month, day] = today.match(/^\d{4}(\d{2})(\d{2})$/)  //正则 取8位数字分4 2 2划分 后面两个就是月日
        //因为我们显示的月是中文 因此这里要进行转变一下 day就不需要转变了
        let area = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二",]
        return {
            month: area[+month] + "月",  //这里 +month是为了把这个变成数字 然后去索引数组里面的内容
            day
        }
    }, [today])



    //头像点击事件 点击跳转到个人user页面
    const handleImg = () => {
        // console.log(myprops)
        myprops.navigate("/login")

    }
    return (
        <div className='home-head-box'>
            <div className='info'>
                <div className='time'>
                    <span>{time.day}</span>
                    <span>{time.month}</span>
                </div>

                <h2 className="title">知乎日报</h2>
            </div>
            <div className="person">
                {/* 通过webpack打包之后图片路径不能写相对路径 */}
                {/* 可以通过import xxx from "/xx/xx.jpg"引入 这样就能够显示了 */}
                <img src={temp} alt="图片" style={{ width: "100%" }} onClick={handleImg} />
            </div>
        </div>
    )
}
