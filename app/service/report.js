'use strict';

const BaseService = require('./base');

class Service extends BaseService {
  constructor(...args){
    super(...args);
    this.entity="report"
  }
  async getReport(stuNum){
    const result = await this.app.mysql.get('report', { stuNum });
    return { 
        code:200,
        data:result
    };
  }  
}

module.exports = Service;
