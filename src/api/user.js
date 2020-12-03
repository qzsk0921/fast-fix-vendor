import request from "@/utils/request";

/**
 * 获取当前用户信息
 * No parameters
 */
export function getUserInfo() {
  return request({
    url: "/user",
    method: "get",
  });
}
