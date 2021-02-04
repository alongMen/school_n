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
  async getReportAll(classRoom){
    const result = await this.app.mysql.query(`SELECT * FROM report WHERE class=${classRoom} order by totalScore desc`);
    return { 
        code:200,
        data:result
    };
  } 
  async import(result){
    const values = [];
    result.forEach(function(n) {
      const _arr = [];
      for(const m in n) {
        _arr.push(n[m]);
      }
      values.push(_arr);
    });
        // 重点sql语句
        const addSql = 'INSERT INTO report (class,stuNum,name,chinese,math,english,physics,chemistry,biology,geography,history,sports,technology,totalScore,ranking) VALUES ?';
        const _result = await this.app.mysql.query(addSql, [values]);
        return _result.affectedRows >= 1?true:false;
  } 
}

module.exports = Service;
