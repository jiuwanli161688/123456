/*
 * @Author: ZhangP
 * @Date: 2022-03-21 10:34:41
 * @LastEditors: ZhangP
 * @LastEditTime: 2022-03-25 14:57:49
 * @description: 文件描述
 */

import Koa from 'koa';
import router from './routes/index.js';

const app = new Koa();

// 启动端口
const port = 3000;

// 延迟指定时间返回
const sleep = function(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time * 1000);
  });
};

app.use(function * (next) {
  const start = new Date();
  this.set({
    // 允许所有的域访问
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    // 根据需要添加头信息
    'Access-Control-Allow-Headers': 'origin,X-Requested-With,Authorization,Content-Type'
  });

  try {
    yield next;
    yield sleep(1);
    const ms = new Date() - start;
    this.set({
      'X-Response-Time': ms + 'ms'
    });
    console.log(`${this.url} ${this.method} ${ms}`);
  } catch (err) {
    console.log('捕获了程序的异常', new Date(), err);
  }
});

// 配置路由
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(port, () => {
  console.log(`启动成功 端口${port}`);
});
