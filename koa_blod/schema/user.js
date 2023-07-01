/*
 * @Author: Booble 
 * @Date: 2021-05-Mo 10:41:59 
 * @Last Modified by:   Booble 
 * @Last Modified time: 2021-05-Mo 10:41:59 
 */
const Sequelize = require("sequelize");
const moment = require("moment");
const users = (sequelize, DataTypes) => {
  return sequelize.define(
    "users",
    {
      user_id: {
        type: Sequelize.INTEGER(3),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "username",
      },
      passwd: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "passwd",
      },
      nick_name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "nick_name",
        set(val) {
          this.setDataValue("nick_name", val);
        },
      },
      user_img: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "user_img",
        set(val) {
          this.setDataValue("user_img", val);
        },
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "path",
        set(val) {
          this.setDataValue("path", val);
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "email",
        set(val) {
          this.setDataValue("email", val);
        },
      },
      motto: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "motto",
        set(val) {
          this.setDataValue("motto", val);
        },
      },
      intersting: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "intersting",
        set(val) {
          this.setDataValue("intersting", val);
        },
      },
      introduction: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "introduction",
        set(val) {
          this.setDataValue("introduction", val);
        },
      },
      authority: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "authority",
      },
      roleType: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "roleType",
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        get() {
          return moment(this.getDataValue("createdAt")).format(
            "YYYY-MM-DD HH:mm"
          );
        },
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        get() {
          return moment(this.getDataValue("updatedAt")).format(
            "YYYY-MM-DD HH:mm"
          );
        },
      },
    },
    {
      /**
       * 如果为true，则表示名称和model相同，即user
       * 如果为fasle，mysql创建的表名称会是复数，即users
       * 如果指定的表名称本身就是复数，则形式不变
       */
      freezeTableName: true,
      tableName: "users",
    }
  );
};
module.exports = users;