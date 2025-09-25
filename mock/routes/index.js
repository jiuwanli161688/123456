/*
 * @Author: 陈秉昌
 * @Date: 2022-04-14 17:33:22
 * @LastEditors: 陈秉昌
 * @LastEditTime: 2022-06-22 14:00:44
 * @description: 文件描述
 */

import Mock from 'mockjs';
import path from 'path';
import fs from 'fs';
import Router from 'koa-router';

const router = Router();

// 登陆
router.post('/api/v1/user/login', function (ctx) {
  ctx.body = {
    code: 200,
    data: {
      createTime: "2022-04-07 18:33:32",
      email: null,
      officePhone: null,
      position: null,
      sex: null,
      status: "1",
      telephone: "13312312311",
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYmYiOjE2NzY2MjU5ODksImlzcyI6InRlc3RfYW1iZXIiLCJleHAiOjE2NzY2MjY1ODksImlhdCI6MTY3NjYyNTk4OX0.y5CvqLy9fVhcFuUjZHbzB6AwwPgUY3QiMLVS8FtIbD0",
      userAccount: "admin",
      userId: 11,
      userName: "admin"
    },
    msg: "登录成功！",
    success: true
  }
});

// 获取菜单
router.post('/api/v1/getMenuList', function (ctx) {
  ctx.body = {
    code: 200,
    data: new Array(10).fill({
      children: new Array(20).fill({
        children: [],
        createTime: Mock.Random.date(),
        id: Mock.Random.id(),
        iframeUrl: null,
        menuDeleteFlag: "1",
        menuIcon: "icon-newsCategory",
        menuLevel: "2",
        menuName: Mock.Random.name(),
        menuParentId: 2,
        menuType: "pc",
        menuUrl: "newsCategory",
        menuVal: "/pages/newsCategory/index"
      }),
      createTime: Mock.Random.date(),
      id: Mock.Random.id(),
      iframeUrl: null,
      menuDeleteFlag: "1",
      menuIcon: "icon-newsCategory",
      menuLevel: "2",
      menuName: Mock.Random.name(),
      menuParentId: 2,
      menuType: "pc",
      menuUrl: "newsCategory",
      menuVal: "/pages/newsCategory/index"
    })
  }
});

router.post('/api/v1/multimedia/image/waterMark', function (ctx) {
  const filePath = path.join(__dirname, '../56444.png');
  const file = fs.readFileSync(filePath);
  ctx.body = file;
});

// 主机信息列表
router.get('/api/v1/vm/list', function (ctx) {
  ctx.body = {
    'retCode': 'succ',
    'retMsg': '成功',
    'data': {
      'total': 3,
      'records': new Array(20).fill({
        'id': Mock.Random.id(),
        'deptName': Mock.Random.cfirst(),
        'appName': Mock.Random.first(),
        'vmName': Mock.Random.cfirst(),
        'ip': Mock.Random.ip(),
        'level': 'A',
        'username': Mock.Random.cfirst(),
        'passwd': Mock.Random.id(),
        'vmStatus': 0
      })
    }
  };
});

// 加入白/黑名单
router.put('/api/v1/vm/status/320000199702028709', function (ctx) {
  ctx.body = {
    'retCode': 'succ',
    'retMsg': '成功',
    'data': {
      'waring': '加入成功'
    }
  };
});

// 删除进程
router.delete('/api/v1/processrule/530000199911155172', function (ctx) {
  ctx.body = {
    'retCode': 'succ',
    'retMsg': '成功',
    'data': {
      'waring': '删除成功'
    }
  };
});

export default router
