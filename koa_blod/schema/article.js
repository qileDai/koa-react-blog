/*
 * @Author: Booble 
 * @Date: 2021-06-Tu 06:11:53 
 * @Last Modified by:   Booble 
 * @Last Modified time: 2021-06-Tu 06:11:53 
 */
const Sequelize = require("sequelize");
const moment = require("moment");
const article = (sequelize, DataTypes) => {
  return sequelize.define(
    "article",
    {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(255),
        field: "title",
      },
      readedCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
        field: "readedCount",
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "author",
      },
      summary: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "summary",
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "category",
      },
      tag: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "tag",
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: "content",
      },
      collect: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
        field: "collect",
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
      freezeTableName: true,
    }
  );
};

module.exports = article;