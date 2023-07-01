/*
 * @Author: Booble 
 * @Date: 2021-05-Mo 11:21:37 
 * @Last Modified by:   Booble 
 * @Last Modified time: 2021-05-Mo 11:21:37 
 */
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const UserModule = require('../modules/users')
const md5password = require("../utlis/password-handle");
const jwt = require("jsonwebtoken")
const keys = require("../config/keys")
const tool =  require("../utlis/index");
class UserControler {
  static async adduser(ctx) {
    //注册
    const query = ctx.request.body;
    //let passwd = tool.decrypt(query.password,"front_666666");
    //query.password = md5password(passwd);
    query.password = tool.encrypt(query.password, "2021dan");
    try {
      let sqlt = {
        username: query.username,
      };
      ctx.response.status = 200;
      const result = await UserModule.userLogin(sqlt);
      if (result) {
        ctx.body = {
          code: 201,
          message: "该用户已存在,请勿重复注册",
        };
      } else {
        const data = await UserModule.addUsers(query);
        if (data) {
          const payload = {
            name: data.username,
            time: new Date().getTime(),
            timeout: 1000 * 60 * 60 * 24,
          };
          const token = jwt.sign(payload, keys.secretOrkey, {
            expiresIn: "24h",
          });
          ctx.body = {
            code: 200,
            data: {
              user_info: data,
              token: token,
            },
            message: query.authority ? "新增成功" : "注册成功",
          };
        } else {
          ctx.body = {
            code: 400,
            message: query.authority ? "新增失败" : "注册失败",
          };
        }
      }
    } catch (err) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "服务器错误,请求失败!",
      };
    }
  }

  static async login(ctx) {
    //登录
    const query = ctx.request.body;
    console.log("query", query);
    //let passwd = tool.decrypt(query.password, "front_666666");
    let sqlt = {
      username: query.username,
    };
    try {
      const data = await UserModule.userLogin(sqlt);
      ctx.response.status = 200;
      if (data) {
        if (tool.decrypt(data.passwd, "2021dan") == query.password) {
          const payload = {
            name: query.username,
            time: new Date().getTime(),
            timeout: 1000 * 60 * 60 * 24,
          };
          const token = jwt.sign(payload, keys.secretOrkey, {
            expiresIn: "24h",
          });
          ctx.body = {
            code: 200,
            token: token,
            data: {
              user_info: data,
              token: token,
            },
            message: "登陆成功",
          };
        } else {
          ctx.body = {
            code: 201,
            message: "用户名密码不正确，请重新输入",
          };
        }
      } else {
        ctx.body = {
          code: 400,
          message: "该用户不存在,请先注册",
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
  static async userlist(ctx) {
    //查询列表
    let ctx_query = ctx.request.body;
    try {
      let pageSize = ctx_query.pageSize ? ctx_query.pageSize : 0;
      let page = ctx_query.pageNo ? (ctx_query.pageNo - 1) * pageSize : 0;
      let sql = {
        username: {
          [Op.like]: "%" + ctx_query.username + "%",
        },
      };
      let limitpage = {
        offset: page,
        limit: pageSize,
      };
      const result = await UserModule.getUsers(sql, limitpage);
      let status = Array.isArray(result);
      ctx.response.status = 200;
      if (status) {
        result.map((item) => {
          item.passwd = tool.decrypt(item.passwd, "2021dan");
        });
      }
      if (result) {
        ctx.body = {
          code: 200,
          data: result,
          total: status == "true" ? result.length : 0,
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
  static async getall(ctx) {
    try {
      const result = await UserModule.getAll();
      ctx.response.status = 200;
      if (result) {
        ctx.body = {
          code: 200,
          data: result,
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
  static async deluser(ctx) {
    //删除
    const { id } = ctx.params;
    console.log('id',id);
    try {
      const user = await UserModule.userLogin({user_id:id});
      if(user){
        const result = await UserModule.delUser(id);
        if (result) {
          ctx.response.status = 200;
          ctx.body = {
            code: 200,
            message: "数据删除成功",
          };
        }
      }else{
        ctx.response.status = 200;
        ctx.body = {
          code: 400,
          message: "当前数据已不存在",
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
  static async upadteuser(ctx) {
    //更新
    let query = ctx.request.body;
    query.passwd = tool.encrypt(query.password, "2021dan");
    try {
      const result = await UserModule.updateUser(query);
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

  static async edituser(ctx) {
    //用户信息更新
    let query = ctx.request.body;
    try {
      const result = await UserModule.editUser(query);
      if (result) {
        ctx.response.status = 200;
        ctx.body = {
          code: 200,
          data: {
            user_info: result,
          },
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

module.exports = UserControler;