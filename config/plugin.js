'use strict';

/** @type Egg.EggPlugin */
module.exports = {
 
  mysql : {
    enable: true,
    package: 'egg-mysql',
  },
  cors:{
    package:'egg-cors',
    enable:true
  }
};
