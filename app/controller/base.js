'use strict';

const Controller = require('egg').Controller;
const uuid = require('uuid') 

class BaseController extends Controller {
    async index() {
        const {ctx,service} =this
        const {pageNum,pageSize,...where} = ctx.query
        let list = await service[this.entity].list(isNaN(pageNum)?1:pageNum,isNaN(pageSize)?5:pageSize,where)
        this.success(list)
      }
      async create(){
        const {ctx,service} =this
        let entity = ctx.request.body
        if(this.entity=='user'){
            entity.uuid = uuid.v4()
        }
        let result = await service[this.entity].create(entity);
        result?this.success({data:'success'}):this.error('创建失败')
      }
      async update(){
        const {ctx,service} =this
        let id = ctx.params.id
        let entity = ctx.request.body
        entity.id= id
        let result = await service[this.entity].update(user)
        result?this.success({data:'success'}):this.error('更新失败')
      }
      async destory(){
        const {ctx,service} =this
        let id = ctx.params.id
        let result = await service[this.entity].destory(id)
        result?this.success({data:'success'}):this.error('删除失败')
      }
      success(data){
          this.ctx.body={
            code:200,
            ...data
          }
      }
      error(data){
        this.ctx.body={
          code:500,
          data
        }
      }
}

module.exports = BaseController;
