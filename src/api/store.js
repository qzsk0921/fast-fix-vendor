import request from "@/utils/request";

/**
 * 商户提现接口
 * @param {integer} amount //提现金额
 * @param {string} remark
 * /store/withdrawal
 */
export function withdrawal(data) {
  return request({
    url: "/store/withdrawal",
    method: "post",
    data,
  });
}

/**
 * 获取当前商户信息接口
 */
export function getMerchantInfo() {
  return request({
    url: "/store",
    method: "get",
  });
}

/**
 * setMyStore
 * 修改店铺信息
 * @param {integer} id
 */
export function setStore(id, data) {
  return request({
    url: `/auth/mystore/${id}`,
    method: "post",
    data,
  });
}

/**
 * 商户未读订单数量接口
 */
export function getNewOrder() {
  return request({
    url: "/store/neworder",
    method: "get",
  });
}
