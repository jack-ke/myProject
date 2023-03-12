import react, { useState, useEffect } from "react"
import "../../CSS/home.scss"
import { Swiper, Image } from "antd-mobile"
import { Link } from "react-router-dom"
import api from "../../api"

const HomeSwiper = function HomeSwiper() {
    const [bannerlist, setBannerList] = useState([])

    useEffect(() => {
        (async () => {
            try {
                api.queryNewsLatest().then(res => {
                    // console.log(res.data);
                    setBannerList(res.data.top_stories)
                })
            } catch (_) { console.log("gg") }
        })()
    }, [])

    return <div className="home-swiper-box">

        {bannerlist.length > 0 ?
            <Swiper autoplay={true} loop={true}>
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

    </div>
}

export default HomeSwiper;