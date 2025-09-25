import fetch from './fetch';
import urls from './urls';

/**
 * @description: 获取菜单列表
 * @param {*}
 * @return {*}
 */
export const getMenuList = (params) => {
  return fetch.post(urls.getMenuList, params);
};