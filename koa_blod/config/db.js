/*
 * @Author: Booble 
 * @Date: 2021-05-Mo 11:22:05 
 * @Last Modified by:   Booble 
 * @Last Modified time: 2021-05-Mo 11:22:05 
 */
const Sequelize = require("sequelize")
const sequelize = new Sequelize('web_blod','root','qile551172',{
    host:'localhost',         // 数据库名    用户名   密码
    port:'3306',
    dialect:'mysql',
    operatorsAliases:false,
    dialectOptions:{
        //字符集
        charset:'utf8mb4',
        collate:'utf8mb4_unicode_ci',
        supportBigNumbers: true,
        bigNumberStrings: true
    },
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00'  //东八时区
});
module.exports = {
    sequelize
};
