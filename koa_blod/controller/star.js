/*
 * @Author: Booble 
 * @Date: 2021-06-Tu 03:18:09 
 * @Last Modified by:   Booble 
 * @Last Modified time: 2021-06-Tu 03:18:09 
 */

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const StarModule = require("../modules/star");
class StarControler {
  static async starlist(ctx) {//查询列表
    let query = ctx.request.body;
    try {
      let pageSize = query.pageSize;
      let page = query.pageNo ? (query.pageNo - 1) * pageSize : 0;
      let sql = {
        title: {
          [Op.like]: "%" + query.title + "%",
        },
      };
      let limitpage = {
        offset: page,
        limit: pageSize,
      };
      const { rows: result, count: total } = await StarModule.getStar(
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
  static async addstar(ctx) {
    let query = ctx.request.body;
    if (!query.title) {
      ctx.response.status = 200;
      ctx.body = {
        code: 1003,
        desc: "标签不能为空",
      };
      return false;
    }
    try {
      const data = await StarModule.addStar(query);
      ctx.response.status = 200;
      if (data) {
        ctx.body = {
          code: 200,
          message: "新增收藏成功",
        };
      } else {
        ctx.body = {
          code: 201,
          message: "新增收藏失败",
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
  static async delestar(ctx) {//删除
    const { id } = ctx.params;
    try {
      const result = await StarModule.delStar(id);
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
  static async updatestar(ctx) {
    //更新
    let query = ctx.request.body;
    try {
      const result = await StarModule.updateStar(query);
      if (result) {
        ctx.response.status = 200;
        ctx.body = {
          code: 200,
          message: "数据更改成功",
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
module.exports = StarControler;
