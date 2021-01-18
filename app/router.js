'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.post('/signup', controller.user.signup);//注册
  router.post('/signin', controller.user.signin);//登录

  router.get('/user/:id', controller.home.index);
  router.resources('user','/api/user',controller.user);
  router.resources('role','/api/role',controller.role);
  router.resources('roleUser','/api/roleUser',controller.roleUser);
  router.resources('roleResource','/api/roleResource',controller.roleResource);
  router.resources('resource','/api/resource',controller.resource);

  router.get('/api/role/getResource',controller.role.getResource);//获取所有资源
  router.post('/api/role/setResource',controller.role.setResource);//设置角色的资源关系

  router.get('/api/role/getUser',controller.role.getUser);//获取所有用户
  router.post('/api/role/setUser',controller.role.setUser);//设置角色的用户关系

  router.get('/api/captcha',controller.user.captcha);
  router.post('/api/checkCaptcha',controller.user.checkCaptcha);

  router.resources('report','/api/report',controller.report);
  router.get('report','/api/report/:stuNum',controller.report.getReport);
  router.post('/api/report/import',controller.report.import);

  router.resources('course','/api/course',controller.course);
  router.get('course','/api/course/:classnum',controller.course.getCourse);
  router.post('/api/course/import',controller.course.import);
};
