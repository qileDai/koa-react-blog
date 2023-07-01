//对外提供的服务地址
export const publicIp =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:3001"
    : "http://webapi.wxinxianyun.com";
//对外提供获取图片的地址
export const logoImgIp = process.env.NODE_ENV === "development" ? "" : "";
// 登录路由
export const LOGIN = "";
