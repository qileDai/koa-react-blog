const Promise = require("bluebird");
const jwt = require("jsonwebtoken");
const verify = Promise.promisify(jwt.verify);
const keys = require("../config/keys");
async function checkToken(ctx, next) {
  let url = ctx.request.url;
  // 如果是登陆页面和注册页面就不需要验证token了
  if (url === "/api/user/login" || url === "/api/user/add") {
    await next();
  } else {
    // 否则获取到token
    let token = ctx.request.headers.token;
    if (token) {
      // 如果有token的话就开始解析
      const tokenItem = await verify(token, keys.secretOrkey);
      // 将token的创建的时间和过期时间结构出来
      const { time, timeout } = tokenItem;
      // 拿到当前的时间
      let data = new Date().getTime();
      // 判断一下如果当前时间减去token创建时间小于或者等于token过期时间，说明还没有过期，否则过期
      if (data - time <= timeout) {
        // token没有过期
        await next();
      } else {
        ctx.response.status = 405;
        ctx.body = {
          status: 405,
          message: "token已过期，请重新登陆",
        };
      }
    }else{
       await next();
    }
  }
}
module.exports = checkToken;
