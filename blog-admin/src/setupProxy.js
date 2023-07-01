const proxy = require('http-proxy-middleware')
const publicIp =
   process.env.NODE_ENV === "development"
     ? "http://127.0.0.1:3001"
     : "http://webapi.wxinxianyun.com";
module.exports = function(app) {
  app.use(
    proxy("/api", {
      target: publicIp,
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        "/api": "/",
      },
      // cookieDomainRewrite: "http://localhost:3000"
    })
  );
}