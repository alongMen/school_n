'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;
    const userId = ctx.params.id;
    const user = await ctx.service.user.find(userId);
    ctx.body = user;
  }
}

module.exports = HomeController;
