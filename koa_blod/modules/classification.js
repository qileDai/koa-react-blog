/*
 * @Author: Booble
 * @Date: 2021-05-Th 03:45:47
 * @Last Modified by:   Booble
 * @Last Modified time: 2021-05-Th 03:45:47
 */
const db = require("../config/db");
const Sequelize = db.sequelize;
const ClassiFication = Sequelize.import("../schema/classification.js");
ClassiFication.sync({ alter: true });

class ClassModule {
  static async getClass(query, limit) {
    return await ClassiFication.findAndCountAll({
      where: {
        ...query,
      },
      order: [["id", "DESC"]],
      offset: limit.offset,
      limit: limit.limit,
    });
  }
  static async getclassAll() {
    const list = await ClassiFication.findAll();
    const array = [];
    list.map((item, index) => {
      let label = {
        name: item.name,
        id: item.id,
      };
      array.push(label);
    });
    return array;
  }
  static async delClass(id) {
    return await ClassiFication.destroy({
      where: {
        id,
      },
    });
  }
  static async updateClass(data) {
    const { id, name } = data;
    return await ClassiFication.update(
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
  static async addClass(query) {
    return await ClassiFication.create({
      name: query.name,
    });
  }
}

module.exports = ClassModule;
