const { createProxyMiddleware } = require("http-proxy-middleware")
module.exports = function (app) {
    app.use(
        createProxyMiddleware(
            "/api",
            {
                target: "http://127.0.0.1:7100", //配置转发目标地址
                changeOrigin: true, //控制服务器接收到的请求头中host字段的值
                pathRewrite: { "^/api": "" },
            }),
    )
}