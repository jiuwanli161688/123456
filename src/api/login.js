import fetch from './fetch';
import urls from './urls';
import qs from 'qs';

/**
 * @description: 获取租户id
 * @param {*}
 * @return {*}
 */
export const getTenantIdApi = (params) => {
  return fetch.get(`${urls.getTenantId}?name=${params.name}`, {});
};

/**
 * @description: 查询人员信息
 * @param {*}
 * @return {*}
 */
export const getPersonListApi = (params) => {
  return fetch.get(`${urls.getPersonList}?${qs.stringify(params)}`, {});
};

/**
 * @description: 信息提交
 * @param {*}
 * @return {*}
 */
export const createPersonListApi = (params) => {
  return fetch.post(urls.createPersonList, params);
};

/**
 * @description: 图片上传
 * @param {*}
 * @return {*}
 */
export const uploadImgApi = (params) => {
  return fetch.post(urls.uploadImg, params);
};
