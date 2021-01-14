'use strict';

const BaseController = require('./base');
const svgCaptcha = require('svg-captcha')
const {sign} = require('jsonwebtoken')

class Controller extends BaseController {
    constructor(...args){
        super(...args);
        this.entity="report"
    }
    async getReport(){
        const {ctx,service}=this
        const stuNum = ctx.params.stuNum;
        const report = await ctx.service.report.getReport(stuNum);
        ctx.body = report;
    }
}

module.exports = Controller;
