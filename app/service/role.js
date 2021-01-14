'use strict';

const BaseService = require('./base');

class Service extends BaseService {
  constructor(...args){
    super(...args);
    this.entity="role"
  }
  async getResource(){
    const {app} = this
    const resources =  await app.mysql.select('resource')
    const rootMenus = []
    const map={}
    resources.forEach(resource => {
      resource.children=[]
      map[resource.id]=resource
      if(resource.parent_id === 0){
        rootMenus.push(resource)
      }else{
        map[resource.parent_id].children.push(resource)
      }
    });
    return rootMenus
  }
  async setResource({roleId,resourceIds}){
    const {app}=this
    await app.mysql.query(`DELETE FROM role_resource WHERE role_id=?`,[roleId])
    for(let i=0;i<resourceIds.length;i++){
      const resourceId = resourceIds[i];

      await app.mysql.insert('role_resource',{
        role_id:roleId,
        resource_id:resourceId
      })
    }
  }
  async getUser(){
    const {app} = this
    const users =  await app.mysql.select('user')
    return users
  }
  async setUser({roleId,userIds}){
    const {app}=this
    const conn = await app.mysql.beginTransaction()
    try {
      await conn.mysql.query(`DELETE FROM role_user WHERE role_id=?`,[roleId])
      for(let i=0;i<userIds.length;i++){
        const userId = userIds[i];
        await conn.mysql.insert('role_user',{
          role_id:roleId,
          user_id:userId
        })
      }
      await conn.commit()
    } catch (error) {
      await conn.rollback()
      throw error
    }
    
  }
}

module.exports = Service;
