/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1610000033506_5093';

  // add your middleware config here
  config.middleware = [];
  // config.middleware = ['auth'];
  // config.auth={
  //   authUrls:[
  //     ''
  //   ]
  // }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security={
    csrf:{
      enable:false
    },
    domainWhiteList:['http://localhost:8000','http://localhost:8080']
  }
  config.auth={}
  config.jwtSecret='yryr'
  config.baseDir = ''
  config.multipart = {
    fileSize: '50mb',
    mode: 'stream',
    fileExtensions: ['.xlsx', '.txt'], // 扩展几种上传的文件格式
  };

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123456',
      // 数据库名
      database: 'test',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };



  return {
    ...config,
    ...userConfig,
  };
};
