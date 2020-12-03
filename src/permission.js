import router from "./router";
import getPageTitle from "./utils/get-page-title";
import { getToken, setToken } from "./utils/auth"; //从cookie获取token
import store from "./store";
import NProgress from "nprogress"; // Add nprogress.js and nprogress.css to your project.
import "nprogress/nprogress.css";
import busConf from "./business/config";
import url from "url";
import { getNewOrder } from "./api/store";

// import scrollPosition from './utils/scroll-position'

NProgress.configure({ showSpinner: false });

// // 先清空token，为了获取用户信息
// removeToken();

// const whiteList = ["/login"];

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  // 保存滚动条位置
  // scrollPosition.save(from.path);
  // 设置页码标题
  document.title = getPageTitle(to.meta.title);
  // 确定用户是否已经登录
  const token =
    "eyJhbGciOiJIUzUxMiIsInppcCI6IkRFRiJ9.eNqqViotTi3KTFGyMtRRyi9IzQMxlfIrioOcy80jXLK9M3QDTExCnS3yHYMqCw1dSkKVdJSKk4EqlayiwXqVYnWUUisKgAaYGRhbmhhbGBjXAgAAAP__.ouK1xQ_5d8DCneCzMQgF_3qm0Uad3afGZALaYXHIQWzdogTWjQ5kK7cvXa3CgiEHy8Vl0i85YUCE3MC30r7dAA";
  store.commit("auth/SET_TOKEN", token);
  const userInfo = {
    createTime: "2020-09-28T07:38:09.000+0000",
    id: 1,
    lastLoginIp: null,
    lastLoginTime: null,
    nickName: "Ewan Sun",
    openId: "oxsRCw7XDkKh-P44UC8oARyq1DtU",
    passWord: null,
    salt: null,
    storeId: 1,
    tel: "",
    userName: "Ewan Sun",
    userStatus: 1,
    city: "衢州",
    country: "中国",
    groupId: null,
    headImgUrl:
      "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epgQPbsnxKiasporsC3NUkH6XpiaXxtzq42LAw9yLJUApiaY5DyfOtKfgRrNicX3SYoeWJA3J9icwCiciaOw/132",
  };
  store.commit("auth/SET_USER_INFO", userInfo);
  // const token = getToken();
  if (token) {
    if (!store.state.auth.userInfo.openId) {
      await store.dispatch("auth/getUserInfo");
    }

    next();
    NProgress.done();
  } else {
    let httpUrl = window.location.search;
    let weiXinCode = url.parse(httpUrl, true).query.code || "";
    if (weiXinCode) {
      await store.dispatch("auth/getAuthToken", weiXinCode);
      await store.dispatch("auth/getUserInfo");
      const path = location.href.split("#")[1];
      next({ path, replace: true }); //跳转到指定路径
    } else {
      location.href = busConf.weixinUri();
      // next(busConf.weixinUri());
    }
  }
  // if(!flag) {
  //     console.log('a')
  //     flag = 1
  //     const accessRoutes = await store.dispatch('permission/generateRoutes', ['admin'])
  //     router.addRoutes(accessRoutes)
  //     next({ path: accessRoutes[0].path, replace: true })
  // } else {
  //     console.log('b')
  //     next()
  // }
});
// let flag = 0

router.afterEach((to) => {
  if (to.path === "/home/child1") {
    getNewOrder().then((res) => {
      const data = res.result;
      store.commit("merchant/SET_NEW_ORDER", data);
    });
  }
  NProgress.done();
});
