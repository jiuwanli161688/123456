/*
 * @Author: ZhangP
 * @Date: 2022-03-15 10:24:29
 * @LastEditors: [name]
 * @LastEditTime: 2025-09-24 23:08:01
 * @description: urls
 */

export default {
  baseUrl: '/api/admin-api',

  // 获取租户id(tenant-id)
  getTenantId: '/system/tenant/get-id-by-name',
  // 查询人员信息
  getPersonList: '/device/person/page',
  // 信息提交
  createPersonList: '/device/person/create',
  // 图片上传
  uploadImg: '/infra/file/upload',
};
