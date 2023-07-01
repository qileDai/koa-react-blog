const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const serve = require("koa-static");
const logger = require('koa-logger');
const moment = require("moment");
const cors = require("koa2-cors");
const path = require("path"); 
const koaBody = require("koa-body");
const checkToken = require("./utlis/checkToken");
const index = require('./routes/index')
const users = require('./routes/users')
const publics = require("./routes/publics");
const tags = require("./routes/tags");
const classification = require("./routes/classification");
const star = require("./routes/star");
const article = require("./routes/article"); 
const loggers = logger((str) => {
  // 使用日志中间件
  console.log(moment().format("YYYY-MM-DD HH:mm:ss") + str);
}); 
// error handler
onerror(app)
// 1.静态资源服务，指定对外提供访问的根目录
app.use(serve(path.join(__dirname, '/public')));

// middlewares
/* app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
})) */
app.use(
  koaBody({
    enableTypes: ["json", "form", "text"],
    multipart: true,
    strict: false,
    formidable: {
      maxFileSize: 20 * 1024 * 1024, // 设置上传文件大小最大限制，默认20M
      uploadDir: path.join(__dirname, "public/upload/"), //设置文件上传的目录
      keepExtensions: true, // 保留文件扩展名
    },
  })
);
app.use(json())
app.use(loggers);

app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
//允许跨域
app.use(cors())
app.use(checkToken);
// routes 
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(publics.routes(), publics.allowedMethods())
app.use(tags.routes(), tags.allowedMethods())
app.use(classification.routes(), classification.allowedMethods());
app.use(star.routes(), star.allowedMethods());
app.use(article.routes(), article.allowedMethods());
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
