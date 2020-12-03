export default {
  appid: "wxe9760d83354a0fdf",
  weixinUri: function() {
    return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
      this.appid
    }&redirect_uri=${encodeURIComponent(
      // process.env.VUE_APP_REDIRECT_URI
      location.href
    )}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
  },
  deliveryData: [
    { label: "到店维修", value: 0 },
    { label: "上门提车", value: 1 },
    // 2拖车
  ],
  fixOrderStatus: [
    // 0报价被拒绝 1等待确认 2报价被选中
    { label: "报价被拒绝", value: 0 },
    { label: "等待确认", value: 1 },
    { label: "报价被选中", value: 2 },
  ],
};
