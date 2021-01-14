'use strict';

const BaseController = require('./base');
const svgCaptcha = require('svg-captcha')
const {sign} = require('jsonwebtoken')
const utility = require("utility")//密码加密

class Controller extends BaseController {
    constructor(...args){
        super(...args);
        this.entity="user"
      }
      async captcha(){
        const {ctx} =this
        let captchaObj = svgCaptcha.create()
        ctx.session.captcha = {
          text:captchaObj.text,
          expries:new Date(Date.now()+60*1000)
        };//把文本信息放到属性中
        ctx.set('Content-Type','image/svg+xml')
        ctx.body = captchaObj.data
      }
      async checkCaptcha(){
        const {ctx} =this
        let captcha = ctx.request.body.captcha
        // console.log(captcha+','+ctx.session.captcha)
        if(captcha === ctx.session.captcha.text&&ctx.session.captcha.expries.getTime()>Date.now()){
          ctx.body = 'captcha验证成功'
        }else{
          ctx.body = 'captcha验证失败'
        }

      }
      async signup(){
        const {ctx,app} =this
        const pswd = ctx.request.body.password
        const password = utility.md5(pswd)
        let user = ctx.request.body
        user.password = password

        const result = await app.mysql.insert('user',user)
        if(user.affectedRows >0){
          this.success({
            id:result.insertId
          })
        }else{
          this.error('注册失败')

        }
      }
      //登录
      async signin(){
        const {ctx,app} =this
        const res = await app.mysql.select('user',{
          where:{
            username,password
          },
          limit:1
        })
        if(res&&res.lenght>0){
          let user = JSON.parse(JSON.stringify(res[0]))
          delete user.password
          this.success(sign(user,this.config.jwtSecret))

        }else{
          this.error('登录失败')

        }
      }
}

module.exports = Controller;
