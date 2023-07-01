/*
 * @Author: Booble 
 * @Date: 2021-06-Tu 09:27:03 
 * @Last Modified by:   Booble 
 * @Last Modified time: 2021-06-Tu 09:27:03 
 */
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const ArticleModule = require("../modules/article");
class ArticleControler {
  static async list(ctx) {//查询列表
    let query = ctx.request.body;
    try {
      let pageSize = query.pageSize;
      let page = query.pageNo ? (query.pageNo - 1) * pageSize : 0;
      let title = query.title ? query.title : "";
      let sql = {
        title: {
          [Op.like]: "%" + title + "%",
        },
      };
      let limitpage = {
        offset: page,
        limit: pageSize,
      };
      const { rows: result, count: total } = await ArticleModule.getList(
        sql,
        limitpage
      );
      ctx.response.status = 200;
      if (result) {
        ctx.body = {
          code: 200,
          data: result,
          total: total ? total : 0,
        };
      } else {
        ctx.body = {
          code: 400,
          message: "请求连接错误",
        };
      }
    } catch (err) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "服务器错误,请求失败!",
      };
    }
  }
  static async getall(ctx){
    try{
      const result = await ArticleModule.getAll();
       ctx.response.status = 200;
       if (result) {
         ctx.body = {
           code: 200,
           data: result
         };
       } else {
         ctx.body = {
           code: 400,
           message: "请求连接错误",
         };
       }
    }catch(err){
       ctx.response.status = 500;
       ctx.body = {
         code: 500,
         message: "服务器错误,请求失败!",
       };
    }
  }
  static async add(ctx) { //添加文章
    let query = ctx.request.body;
    if (!query.title) {
      ctx.response.status = 200;
      ctx.body = {
        code: 1003,
        desc: "文章标题不能为空",
      };
      return false;
    }
    try {
      const data = await ArticleModule.addArticle(query);
      ctx.response.status = 200;
      if (data) {
        ctx.body = {
          code: 200,
          message: "文章新增成功",
        };
      } else {
        ctx.body = {
          code: 201, 
          message: "文章新增失败",
        };
      }
    } catch (err) {
      const msg = err.errors[0];
      ctx.body = {
        code: 500,
        message: msg.value + msg.message,
      };
    }
  }
  static async  detail(ctx){
    const { id } = ctx.params;
     try {
       const result = await ArticleModule.articleDetail(id);
       if (result) {
         ctx.response.status = 200;
         ctx.body = {
           code: 200,
           data:result,
           message: "数据获取成功",
         };
       }
     } catch (err) {
       ctx.response.status = 500;
       ctx.body = {
         code: 500,
         message: "服务器错误,请求失败!",
       };
     }
  }

  static async delete(ctx) {//删除
    const { id } = ctx.params;
    try {
      const result = await ArticleModule.delArticle(id);
      if (result) {
        ctx.response.status = 200;
        ctx.body = {
          code: 200,
          message: "数据删除成功",
        };
      }
    } catch (err) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "服务器错误,请求失败!",
      };
    }
  }
  static async updatearticle(ctx) {//更新
    let query = ctx.request.body;
    try {
      const result = await ArticleModule.updateArticle(query);
      if (result) {
        ctx.response.status = 200;
        ctx.body = {
          code: 200,
          message: "文章更新成功",
        };
      }
    } catch (err) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "服务器错误,请求失败",
      };
    }
  }
}
module.exports = ArticleControler;