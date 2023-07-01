/*
 * @Author: Booble
 * @Date: 2021-05-Mo 11:21:51
 * @Last Modified by:   Booble
 * @Last Modified time: 2021-05-Mo 11:21:51
 */
const db = require("../config/db");
const Sequelize = db.sequelize;
const User = Sequelize.import("../schema/user.js");
User.sync({ alter: true });

class UserModule {
  static async getUsers(query, limit) {
    if (limit.limit > 0) {
      return await User.findAll({
        where: {
          ...query,
        },
        order: [["user_id", "DESC"]],
        offset: limit.offset,
        limit: limit.limit,
      });
    } else {
      return await User.findOne({
        where: {
          ...query,
        },
      });
    }
  }
  static async getAll() {
    const data = await User.findAll({
      order: [["createdAt", "DESC"]],
    });
    return data.length;
  }
  static async delUser(user_id) {
    return await User.destroy({
      where: {
        user_id,
      },
    });
  }
  static async updateUser(data) {
    const { user_id } = data;
    const hasUser = await User.findOne({
      where: {
        user_id,
      },
    });
    let result = "";
    if (!data.nick_name) {
      const { username, passwd, authority, roleType } = data;
      result = await hasUser.update({
        username,
        passwd,
        authority,
        roleType,
      });
      hasUser.save();
    } else {
      const { nick_name, user_img,path, email, motto, intersting, introduction } = data;
      result = await hasUser.update({
        nick_name,
        user_img,
        path,
        email,
        motto,
        intersting,
        introduction,
      });
      hasUser.save();
    }
    return result;
  }
  static async addUsers(query) {
    if (!query.authority) {
      return await User.create({
        user_id: "",
        username: query.username,
        passwd: query.password,
        nick_name: "",
        user_img: "",
        path: "",
        email: "",
        motto: "",
        intersting: "",
        introduction: "",
        authority: query.username == "admin" ? "1" : "0",
        roleType: query.username == "admin" ? "admin" : "normal",
      });
    } else {
      return await User.create({
        username: query.username,
        passwd: query.password,
        nick_name: "",
        user_img: "",
        path: "",
        email: "",
        motto: "",
        intersting: "",
        introduction: "",
        authority: query.authority,
        roleType: query.authority == "1" ? "admin" : "normal",
      });
    }
  }
  static async editUser(data) {
    //编辑用户信息
    const {
      user_id,
      nick_name,
      user_img,
      path,
      email,
      motto,
      intersting,
      introduction,
    } = data;
    const hasUser = await User.findOne({
      where: {
        user_id,
      },
    });
    const updatedUser = await hasUser.update({
      nick_name,
      user_img,
      path,
      email,
      motto,
      intersting,
      introduction,
    });
    hasUser.save();
    return updatedUser;
  }
  static async userLogin(data) {
    console.log('data',data);
    const { username,user_id } = data;
    let prams = {};
    if(username){
      prams.username = username;
    }else{
      prams.user_id = user_id;
    }
    return await User.findOne({
      where: prams,
    });
  }
}

module.exports = UserModule;
