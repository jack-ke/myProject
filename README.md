# myProject
知乎日报项目测试
# 项目实战

## 项目基础构建

- 先拿到设计稿 

- 与后端进行交接协商，看自己需要哪些数据，那些接口，格式等

- 等待后端将接口给你，再调用接口，数据 

- 如果格式与你自己需要的格式不一样，通过`Object或者Array`等方法进行转化，里面的命名如果也不同，就用后端传过来的  

- 通过接口来进行页面的渲染，然后里面的一些方法，例如增删改查等，一般都是调用后端的接口，然后对数据库进行修改，修改完成之后，在调用一次数据进行重新渲染，这样可以显示更新后的结果

- > 项目时常：难点在于与其他部门前后端的协商沟通，那些需要改变都要慢慢改，自己单独一般一两周就搞定了，但是协商下载，一般需要几个月才能搞定一个小任务

  - 注意：我们要尽量避免报错，可以赋 空值，也不报错 所以我们要多思考一下，那些东西需要校验

> 首先我们要理清楚分了那几个部分，有哪些页面，之间的点击转换逻辑等
>
> 路由配置：  "/"首页   "/detail/:id" 详情页   "/user" 个人中心   "/login"登录注册  "/store"收藏  "/update"更改信息     以上都不是 就跳转到 404页面
>
> 注意选项卡和二级路由的区别：如果页面没有变化 只是中间内容变化 这就是选项卡 但是如果整个页面发生了变化 这就是二级路由
>
> 
>
> 然后进行页面的搭建，处理 `css`优化



### 项目准备

`yarn add create-react-app -g`安装脚手架

`create-react-app  demo` 创建demo

`yarn add antd-mobile`下载`antd`组件库(注意：icon组件库需要单独下载，)

`yarn add redux  yarn add react-redux `下载`redux`状态管理

> 如果`redux-thunk`和`rudux-promise`无法使用，那就单独安装他们 `yarn add redux-thunk`

`yarn add react-router-dom` 下载路由

`yarn add axios`下载`axios`库

> 如有需要，也可以下载`lodash`库 ，`yarn add lodash`引入就是import _  from "lodash"

`yarn add http-proxy-middleware --save` 跨域   这个是`webpack`里面的跨域打包

> 如果需要使用`scss`的`css`，我们要安装一个`sass`的库  因为`scss`就是`sass`里面的`yarn add sass`

> 然后在`src`下面新建一个`setupProxy.js`文件 输入以下内容

```js
const { createProxyMiddleware } = require("http-proxy-middleware")
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api",{   // api下的请求 
      target: "http://localhost:3100", //目标地址
      changeOrigin: true, //控制服务器接收到的请求头中host字段的值
      pathRewrite: { "^/api": "api" }, 
    }),
      //可以写多个请求 一般都是根据前缀进行划分整理
     app.use(
      createProxyMiddleware("/ajax",{   // ajax请求 
      target: "http://127.0.0.1:7100", //目标地址
      changeOrigin: true, //控制服务器接收到的请求头中host字段的值
      pathRewrite: { "^/api": "" }, 
     )
  )
}
```

> 注意：一般复制别人的项目，都要看别人的依赖，不要全都复制 module这一个文件是不需要的，因为东西太多，上传下载都很麻烦，只需要一个package文件即可，然后我们通过命令：yarn 会自动下载这里所需要的包

### 1.安装脚手架

`yarn add create-react-app -g`  全局安装脚手架

`create-react-app --version`    查看脚手架版本 检验是否安装成功

`create-react-app  demo` 创建项目  项目名称只能：数字 小写字母 下划线__

> 这里可以把里面的module 和 package.lock 删掉 然后命令行用yarn 这样用的就是yarn包不是npm包

`yarn start` 项目启动

一个React项目中默认会安装：

- react ： 框架核心
- react-dom ： 视图渲染核心 基于React构建WebApp 也就是HTML
- react-native : 移动端APP 
- react-scripts：脚手架对打包命令的封装   --- webpack打包规则和一些loader插件隐藏在module
- web-vitals ： 性能检测工具  
- ![image-20230310092348974](https://gitee.com/ke-xy/image/raw/master/image/image-20230310092348974.png)

- start 开发环境，在本地启动web服务，预览打包内容
- build 生产环境，打包部署，把打包的内容输出到dist目录
- test    单元测试
- eject  暴露webpack配置规则 ： 原因就是想修改webpack默认的规则 所以才暴露出来
- ![image-20230310092711924](https://gitee.com/ke-xy/image/raw/master/image/image-20230310092711924.png)
- eslintConfig这个就是ESlink规则  检查 词法错误，是否符合标准，是否符合ESlink规范
- ![image-20230310092845124](https://gitee.com/ke-xy/image/raw/master/image/image-20230310092845124.png)
- `browserlist` 浏览器兼容 就是` postcss-loader  + autoprefixer` 会给`CSS3`设置相关前缀



### 2.`antd mobile`组件库的引入

`yarn add antd-mobile` 安装

>  引入就按需引入 `import {Button} form "antd-mobile"`

> 兼容性问题 在`babel`里面加一个配置 这个`babel`是`webpack-loader`里面的 因此我们要改变原来的默认的值，就要先把`webpack`暴露出来，使用命令：`yarn eject`
>
> 然后在新出来的`config `下面的 `webpack.json`下面 找到 babel 然后在里面输入 `targets`的内容
>
> ```json
> "presets": [
>  [
>    "@babel/preset-env",
>    {
>      "targets": {
>        "chrome": "49",
>        "ios": "10"
>      }
>    }
> ```

![image-20230310095910703](https://gitee.com/ke-xy/image/raw/master/image/image-20230310095910703.png)

- 语言包导入：

```jsx
import {ConfigProvider} from "antd-mobile"
import zhCN from "antd-mobile/es/locales/zh-CN"

return (
	<ConfigProvider local={zhCN} >
    	<App\>
    </ConfigProvider>
)
```

- `loading`利用`antd`里面的`mask`组件，mask就是一个蒙版，当然也可以使用`loading`，一般都是再蒙版上加上`loading`，这样显示效果就会好很多

- 一般的懒加载都是放在 `react `里面的`suspence的fallback`里面，`<Suspence fallback={loading}> 路由页面内容 </Suspence> `

  

### 3.路由管理

- 创建一个`router`文件夹 `/src/router`

- 里面创建`index.jsx` 文件 这个就是整个路由的入口

- 里面创建一个`routes.jsx`文件 这里面写放路由，懒加载等  

- >  注意，这里的懒加载 lazy   用法 `lazy( ()=>import("/xxx"))`

> 注意： 因为打开就是首页，所以首页不需要懒加载，直接导入， 其他页面进行懒加载处理

路由我可以使用动态生成路由，一般来说在新建的路由页面创建好内容，格式是一个数组，然后在外面引用的时候通过数组的`map`映射来把之前路由的内容显示出来，这样就形成了一个动态路由

```js
//1.先在routes.jsx里面创建 一个路由模块
const routes = [
    {
    path:"/",
    name:"",
    component:Home， //打开就是首页，因此首页不需要懒加载
    meta:{
    title:"标题"
},
    {
    path:"/uesr",
    name:"user",
    component:lazy( ()=>import("./User"))， // 懒加载 
    meta:{
    title:"标题"
},
    //如果是404页面，那么路径path就要是万能符 *  这样不符合上面的路径都是404
     {
    path:"*",
    name:"404",
    component:lazy( ()=>import("./Notfound"))， // 懒加载 
    meta:{
    title:"标题"
},
    
}]
export default routes

// 2. 在index 里面导入routes 然后放到Routes里面动态生成Route
// 记得使用懒加载 suspence包裹路由 里面有个fallback={}这里面放loading
// loading使用antd-mobile的mask蒙版 在mask里面可以加一个loading 记得从antd-mobile导入
export default RouterView = function RouterView(){
    return  <Suspence fallback={ <Mask visibilt={true} opicaity={thinck } /> } >
<Routes>
      
      	{routes.map(item =>{
         let {name,path} = item
		<Route key={name} path={path} Element={<Element {...item} />} />
        })}
     
      </Routes>
</Suspence>
}

// 3.创建一个ELEMENT函数 这个接收路由里面的element内容 然后导入到上面的路由中
const Element = function Element(props){
    //结构出 组件 
    let {component:Component} = props;
    //结构出meta的标题
    let {title="xxx"} = props.meta || {}
    document.title = title; // 修改标题
    
    //这些都是常见的路由方法  我们现在不用withRouter 传输 而是使用这种方式将方法传递到route里面
    // 这样当其他页面需要使用这些方法单独时候，直接传入Props就可以调用到这些方法，具体看自己需要什么方法
    const naviate = UseNavigate(),
          location = UseLocation(),
          params = UseParams(),
          [usp] = UseSeacrchParams()
    
    return <Component naviate={naviate} location={location} params={params} usp={usp}  />
}
    
    
// 4. 在项目入口引入路由 RouterView
   // 注意： 一般来说我们会把所有的内容放到一个App的入口里面，但是这个入口不是最终的，还有一个index.js的入口，我们会把App再导入到这个里面。
 export default App ()=>{
     return <HasnRputer>
         		<RouterView/>
         	 // 如果有导航也可以放在这里
         </HashRouter>
 }
```



### 4.`redux`配置

- 创建一个`store`文件夹

- 在`store`文件下创建 

  - `index.js`   redux入口 引入reducer

  - `action-types.js`    统一管理标识 type

  - `reducer/index.js base.js `   整合reducer

  - `action/index.js  base.js`     整合action

```js
// 首先创建了一个store的文件加  里面有一个index action-types两个文件 然后 reducer aciton两个文件夹，在reducer里面一个index整合reducer 剩下都是单独的reducer  action同理

 // 1. store/index.js  这是整个store的入口 ，注意： createStore变成了 legacy_createStore
import {legacy_createStore,applymiddleWare} from "redux"
import reducer from "./reducer/index"
import reduxThunk from "redux-thunk"
import reduxPromise from "redux-Promise"
import reduxLogger from "redux-logger"

let middleware = [reduxThunk,reduxPromise]；
let env = proccess.env.NODE.ENV; //环境变量
if(env === "development"){
    midleware.push(thunkLogger) //开发模式就加入这个中间件
}
 // 创建store 里面放一个reducer 一个applymiddleware中间件 里面的内容根据我们的需要放不同的中间件
const store = legacy_createStore(reducer,applymiddleware(...middleware)) 

// store/action-types 这是统一标识


//  store / reducer / index  整合reducer combineReducer({})
import {combineReducer} from "redux"
import baseReducer from "baseReducer"
...其他的reducer

const reducer = combineReducer({
    baseReducer,  
    //一般格式是 name ：value 但是ES6规定要是 name===value 那么就直接写一个name就行，因此我们命名的时候最好命名成一样的
   	...其他ruducer
})
export default reducer;

// reducer/baseReducer 单个reducer的页面内容，这里一般就是一个初始化状态 然后一个action的type，不同的type进行不同的操作
const inital = {
    info:null
}
const baseReducer = function baseReducer (state=inital , action){
    // 1. 复制一下状态
    state = {...state}
    //2.根据状态使用不同内容
    switch(action.type){
            case:
            break;
        default:
    }
    //  返回state
    return state
}
export default baseReducer


// store/action/baseAction  单独标识 这个就是获得actiontype
const baseAction = {
    
}
export default baseAction;

// store/action/index  标识整合在一起
import baseAction from "./baseAction"
const action = {
    baseAction,
    ....action
}
export default action;


// react-redux 在APP页面导入 包裹APP 其他页面利用connect直接使用状态
import {provider} from "react-reudx"
import store from "/index"

<Provider store={store}>
	<App/>
</Provider>
```



### 5.接口的处理

这里利用`axios`和代理` setupProxy.js` 来进行获取接口 ,` setupProxy.js`先配置好，在项目准备里面有

> 一般都是创建一个单独的`api`文件，里面专门放我们的请求

```js
// 在src下面创建一个api的文件加，在里面创建index文件 这里就是api的集合
// 注意先去setupPorxy.js里面配置好
import axios from "axios"

const queryNewsLast = ()=>axios.get("/api/news_last")  //这是最简单的直接获取信息
// 比如我要调用这一个函数 api.queryNewsLast().then(res=>{console.log(res.data)})
//注意：axios是基于promise的，所以如果我们使用了，就需要.then里面查看res.data 这里才是数据，至于需要什么，就根据自己的需求在res.data.time.. 继续点了

//根据time来进行管理 这里多加了一个params，目的是为了根据parmas来进行状态的管理，根据里面的内容和后端的接口，来对我们接收的数据进行一个接收和管理
const queryNewsBefore = (time)=>{
    return axios.get("api/news_before",{
        params:{
            time
        }
    })
}
// 根据ID进行管理
const queryStory = (id)=>{
    return axios.get("api/news/story-extra",{
        params:{
            id
        }
    })
}

// 将这些函数集合在一起然后导出 要使用就直接 .函数名
const api = {
    queryNewsLast,
    queryNewsBefore,
    queryStory
}
export default api ; 
```





### 6.抽离封装

- 公用的，发现公用的抽离出来封装，使用时直接调用

- 一个页面内容较多，代码全在一起，不方便维护，我们进行抽离拆分，最后合并渲染
- 对组件库的二次封装，二次封装的目的主要是为了更改一些样式，因为组件库自带样式，我们需要变成我们自己的样式，然后再给其他有需要的页面进行使用。

> 一般在`src`下面创建`component`文件，里面放不同的组件，如果需要放`css/scss`等，也可以创建一个单独的`Css`文件加，在下面存放



## 项目具体内容搭建

## 1. 首页

- 先看设计图，然后根据内容对首页进行划分，拆解，然后分成不同的模块，将这些模块划分成不同的组件，然后再组件内写完内容再导入到 首页 ， 尽量一个页面使用一个`css`来进行管理，这样每一个页面就是一个`css`，里面组件`css`样式进行划分，看起来就整洁很多

```js
// 例如 首页 分为三个部分，一个是顶部的nav  一个是中间的轮播图  一个是下面的 具体信息
import Nav from "./nav"
import Swiper from "./swiper"
import NewsItem from "./newsItem"
const Home = function Home(){
    return <div className="home-box">
        	<Nav/>
        	<Swiper/>
        	<NewItem/>
        </div>
}
// 这样首页看起来就很干净 

// 然后再其他页面 例如 首页中间的nav组件内 
import "./home.scss"
const Nav = function Nav(){
    return <div className="home-nav-box">
        
        </div>
}
export default Nav;
// 这里也要注意 css的命名规范 首页是 home-box 然后内部就是 home-nav-box 

// 轮播图 
import "./home.scss"
const Swiper = function Swiper(){
    return <div className="home-swiper-nav"> 
        
        </div>
}
export default Swiper;

//信息页面 
import News from './news'
import "./home.scss"
const NewsItem = function NewsItem(){
    return <div className="home-newsItem-box">
        	<News/>
        	</div>
}
export default NewsItem;

// 这样首页就写完了 ，需要什么内容就往各个不同的组件里面添加即可  如果每个组件里面的东西也很多，那就可以继续划分一个更细的组件 

// 例如 再 newsItem组件内 内容太多了，那就创建一个News的组件 
const News = function News(){
    return <div className="home-newsItem-news-box">
        
        </div>
}
export default News;
```

