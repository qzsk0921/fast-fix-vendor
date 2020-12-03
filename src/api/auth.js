import request from "@/utils/request";

// /**
//  * 权限管理-获取全局权限表（分页列表）
//  * @param {Number} isSearchCount //是否计算总页数，默认1计算
//  * @param {String} name //权限名称
//  * @param {Number} pageNum //当前页码（默认1）
//  * @param {Number} pageSize //每页记录数（默认10）
//  * @param {*} data
//  * @param {String} loading //可传入一个 DOM 对象或字符串；若传入字符串，则会将其作为参数传入 document.querySelector以获取到对应 DOM 节点
//  */
// export function getAuthList(data) {
//     return request({
//         url: '/user/user-sys-config/meunList',
//         method: 'post',
//         data,
//         loading: 'tbody'
//     })
// }

/**
 * 微信登录接口
 * @param {*} code
 */
export function getAuthToken(code) {
  return request({
    url: `auth/login/${code}`,
    method: "get",
  });
}

/**
 * wxJsSdkConfig
 * @param {*} url
 */
export function getWeiXinSdkConf(url) {
  return request({
    url: "auth/api",
    method: "get",
    params: { url },
  });
}

/**
 * 生成商户验证code接口
 * @param {integer($int64)} timestamp
 */
export function getAuthCode(timestamp) {
  return request({
    url: `/auth/code/${timestamp ? timestamp : 300}`,
    method: "get",
  });
}

/**
 * 商户绑定接口
 * @param /auth/check/{userId}/{code}
 */
export function authVerify(params) {
  return request({
    url: `/auth/check/${params.userId}/${params.code}`,
    method: "get",
  });
}
