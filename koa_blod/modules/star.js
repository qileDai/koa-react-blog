/*
 * @Author: Booble 
 * @Date: 2021-06-Tu 02:56:25 
 * @Last Modified by:   Booble 
 * @Last Modified time: 2021-06-Tu 02:56:25 
 */
const db = require("../config/db");
const Sequelize = db.sequelize;
const Star = Sequelize.import("../schema/star.js");
Star.sync({ alter: true });
class starModule {
  static async getStar(query, limit) {
    return await Star.findAndCountAll({
      where: {
        ...query,
      },
      order: [["id", "DESC"]],
      offset: limit.offset,
      limit: limit.limit,
    });
  }
  static async addStar(query) {
    if (query.article_id){
        return await Star.create({
          title: query.title,
          url: "",
          article_id: query.article_id,
        });
    }else{
         return await Star.create({
           title: query.title,
           url: query.url,
           article_id:''
         });
    }
     
  }
  static async updateStar(data) {
    const { id, title, url } = data;
    return await Star.update(
      {
        id,
        title,
        url,
      },
      {
        where: {
          id,
        },
      }
    );
  }
  static async delStar(id) {
    return await Star.destroy({
      where: {
        id,
      },
    });
  }
}
module.exports = starModule;