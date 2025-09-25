/*
 * @Author: ZhangP
 * @Date: 2022-03-15 10:24:29
 * @LastEditors: [name]
 * @LastEditTime: 2025-09-24 22:01:11
 * @description: fetch拦截器
 */

import axios from 'axios';
import urls from './urls';
import { showToast } from 'vant';
import router from '@/router';
// import store from '@/store';
import Cookies from 'js-cookie';

// 如果是打包后的状态、为了防止本地开发切换地址遗忘、则需要覆盖配置地址
// if (!__DEV__) {
//   urls.base = 'http://39.107.183.67:120/api/login';
// }

// 创建axios实例
const service = axios.create({
  baseURL: '',
  timeout: 15000
});

// request拦截器
service.interceptors.request.use(
  async config => {
    config.baseURL = urls.baseUrl;
    // 此处进行登录拦截、处理请求头信息、全局loading等工作
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = Cookies.get('token') || '';
    config.headers['tenant-id'] = Cookies.get('tenantId') || '';
    return config;
  },
  error => {
    Promise.reject(error);
  }
);
// 响应拦截
service.interceptors.response.use(
  response => {
    const res = response.data;

    if (response.config.responseType === 'blob') {
      return res;
    }
    // 根据后端规范、返回的status值非200或code值非0为错误请求
    // console.log(res, new Date());
    if (res.code === 0 || res.status === 200 || res.retCode === 'succ') {
      return res.data;
    } else if (res.code == 200) {
      return res;
    }
    showToast({
      type: 'fail',
      message: res.msg || res.message || res.retMsg
    });
    return Promise.reject(res.msg || res.message);
  },
  error => {
    // 非200的状态吗
    if (error.response && error.response.status) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default service;
