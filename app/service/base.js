'use strict';

const Service = require('egg').Service;

class BaseService extends Service {
    async find(id) {
        // 假如 我们拿到用户 id 从数据库获取用户详细信息
        const entity = await this.app.mysql.get(this.entity, { id });
        return { entity };
      }
      async list(pageNum,pageSize,where){
        // 获取当页数据
        const data = await this.app.mysql.select(this.entity,{
          where,
          order:[['id','asc'],['username','asc']],
          offset:(pageNum-1)*pageSize,
          limit:pageSize
        });
        const total = await this.app.mysql.count(this.entity,where)
        return {data,total}
      }
      async create(entity){
        if(this.entity=='user'){
          const data = await this.app.mysql.query(`SELECT * FROM user WHERE username=?`,[entity.username])
          if(data.length>0)return false
        }
        let result =  await this.app.mysql.insert(this.entity,entity);
        return result.affectedRows>0

      }
      async update(entity){
        let result =  await this.app.mysql.update(this.entity,entity)
        return result.affectedRows>0
      }
      async destroy(id) {
        let result =  await this.app.mysql.delete(this.entity,id)
        return result.affectedRows>0

      }
}

module.exports = BaseService;
