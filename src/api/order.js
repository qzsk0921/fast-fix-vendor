import request from "@/utils/request";

/**
 * 获取等待报价订单接口
 * @params {integer} pageNum required
 * @params {integer} pageSize required
 */
export function getOrder(params) {
  return request({
    url: "/order",
    method: "get",
    params,
  });
}

/**
 * 通过id获取等待报价订单
 * @param {*} id
 */
export function getOrderById(id) {
  return request({
    url: `/order/${id}`,
    method: "get",
  });
}

/**
 * 新增报价接口
 * /order/price
 * @param {integer} price
 * @param {integer} id
 * @param {integer} orderFixId
 */
export function addOrder(data) {
  return request({
    url: "/order/price",
    method: "post",
    data,
  });
}

/**
 * 获取报价列表
 * @param{integer($int32)} pageNum require
 * @param{integer($int32)} pageSize require
 * @param{integer($int32)} status require
 */
export function getOrderPrice(params) {
  return request({
    url: "order/price",
    method: "get",
    params,
  });
}

/**
 * 修改报价接口
 * @param {*} params
 */
export function updateOrder(data) {
  return request({
    url: "order/price",
    method: "put",
    data,
  });
}

/**
 * 根据id获取已报价订单
 * @params{integer($int32)} require
 */
export function getPriceOrderById(id) {
  return request({
    url: `order/price/${id}`,
    method: "get",
  });
}
