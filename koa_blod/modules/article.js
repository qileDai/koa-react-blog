/*
 * @Author: Booble 
 * @Date: 2021-06-Tu 09:04:45 
 * @Last Modified by:   Booble 
 * @Last Modified time: 2021-06-Tu 09:04:45 
 */
const db = require("../config/db");
const Sequelize = db.sequelize;
const Article = Sequelize.import("../schema/article.js");
Article.sync({ alter: true });

class ArticleModule {
  static async getList(query, limit) { 
    return await Article.findAndCountAll({
      where: {
        ...query,
      },
      order: [["id", "DESC"]],
      offset: limit.offset,
      limit: limit.limit,
    });
  }
  static async getAll(){
   const data =  await Article.findAll({
     order: [["createdAt", "DESC"]],
   });
   const list = []
   data.map((item,index)=>{
     let label = {
       id: item.id,
       title: item.title,
       createdAt: item.createdAt,
       collect: item.collect,
     };
     list.push(label)
   })
   return list;
 }

  static async delArticle(id) {
    return await Article.destroy({
      where: {
        id,
      },
    });
  }

  static async articleDetail(id){
     let { readedCount } = await Article.findOne({ id });
     readedCount++;
     await Article.update(
       { readedCount },
       {
         where: {
           id,
         },
       }
     );
     return await Article.findOne({
       where: {
         id,
       },
     });
  }

  static async updateArticle(data) {
    const { id, title, readedCount, author,summary,category,tag,content,collect} = data;
    return await Article.update(
      {
        id,
        title,
        readedCount,
        author,
        summary,
        category,
        tag,
        content,
        collect,
      },
      {
        where: {
          id,
        },
      }
    );
  }
  static async addArticle(data) {
    const {
      id,
      title,
      readedCount,
      author,
      summary,
      category,
      tag,
      content,
      collect,
    } = data;  
    return await Article.create({
      id,
      title,
      readedCount,
      author,
      summary,
      category,
      tag,
      content,
      collect,
    });
  }
}

module.exports = ArticleModule;