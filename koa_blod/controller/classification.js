/*
 * @Author: Booble
 * @Date: 2021-05-Th 04:36:42
 * @Last Modified by:   Booble
 * @Last Modified time: 2021-05-Th 04:36:42
 */
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const ClassModule = require("../modules/classification");
class ClassControler {
  static async classlist(ctx) {
    //查询列表
    let ctx_query = ctx.request.body;
    try {
      let pageSize = ctx_query.pageSize;
      let page = ctx_query.pageNo ? (ctx_query.pageNo - 1) * pageSize : 0;
      let sql = {
        name: {
          [Op.like]: "%" + ctx_query.name + "%",
        },
      };
      let limitpage = {
        offset: page,
        limit: pageSize,
      };
      const { rows: result, count: total } = await ClassModule.getClass(
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
  static async getAll(ctx) {
    try {
      const data = await ClassModule.getclassAll();
      ctx.response.status = 200;
      if (data) {
        ctx.body = {
          code: 200,
          data: data,
          message: "获取成功",
        };
      } else {
        ctx.body = {
          code: 201,
          message: "获取失败",
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
  static async addclass(ctx) {
    let query = ctx.request.body;
    if (!query.name) {
      ctx.response.status = 200;
      ctx.body = {
        code: 1003,
        desc: "标签不能为空",
      };
      return false;
    }
    try {
      const data = await ClassModule.addClass(query);
      ctx.response.status = 200;
      if (data) {
        ctx.body = {
          code: 200,
          message: "新增成功",
        };
      } else {
        ctx.body = {
          code: 201,
          message: "新增失败",
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
  static async deleteclass(ctx) {
    //删除
    //const { id } = ctx.request.body;
    const { id } = ctx.params;
    try {
      const result = await ClassModule.delClass(id);
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
  static async updateclass(ctx) {
    //更新
    let query = ctx.request.body;
    try {
      const result = await ClassModule.updateClass(query);
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
module.exports = ClassControler;
