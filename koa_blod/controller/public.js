const path = require("path"); // 图片路径
class PublicControler {
  static async uplod(ctx) {
    const file = ctx.request.files.file
    const basename = path.basename(file.path)
    const size = (file.size/1024)/1024
    try{
       ctx.response.status = 200;
       if(size>20){
          ctx.body = {
             code: 201,
             message: "图片上传超过20M",
          };
       }else{
         ctx.body = {
           code: 200,
           data: {
             path: file.path,
             url: `${ctx.origin}/public/upload/${basename}`,
           },
           message: "图片上传成功",
         };
       }
      
     }catch(error){
       ctx.response.status = 500;
       ctx.body = {
         code: 500,
         message: "上传错误"
       };
     }
   }
}
module.exports = PublicControler;
