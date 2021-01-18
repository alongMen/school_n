'use strict';

const BaseService = require('./base');

class Service extends BaseService {
  constructor(...args){
    super(...args);
    this.entity="course"
  }
  async getCourse(classnum){
    const result = await this.app.mysql.select('course', { 
      where:{
        classnum:classnum
      }});
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
        const addSql = 'INSERT INTO course (date,dayone,daytwo,daythree,dayfour,dayfive,daysix,dayseven,daydayone,daydaytwo,daydaythree,daydayfour,classnum) VALUES ?';
        const _result = await this.app.mysql.query(addSql, [values]);
        return _result.affectedRows >= 1?true:false;
  } 
}

module.exports = Service;
