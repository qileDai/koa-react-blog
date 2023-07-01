/*
 * @Author: Booble 
 * @Date: 2021-05-Th 03:45:47 
 * @Last Modified by:   Booble 
 * @Last Modified time: 2021-05-Th 03:45:47 
 */
const db = require("../config/db");
const Sequelize = db.sequelize;
const Tags = Sequelize.import("../schema/tags.js");
Tags.sync({ alter: true });

class TagsModule {
  static async gettags(query, limit) {
    return await Tags.findAndCountAll({
      where: {
        ...query,
      },
      order: [["id", "DESC"]],
      offset: limit.offset,
      limit: limit.limit,
    });
  }
  static async gettagsAll() {
    const list = await Tags.findAll();
    const array = []
    list.map((item,index)=>{
      let label = {
        name:item.name,
        id:item.id
      }
      array.push(label)
    })
    return array
  }
  static async delTag(id) {
    return await Tags.destroy({
      where: {
        id,
      },
    });
  }
  static async updateTag(data) {
    const { id, name } = data;
    return await Tags.update(
      {
        id,
        name,
      },
      {
        where: {
          id,
        },
      }
    );
  }
  static async addTag(query) {
    return await Tags.create({
      name: query.name,
    });
  }
}

module.exports = TagsModule;
