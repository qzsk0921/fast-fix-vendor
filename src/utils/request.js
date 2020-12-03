import axios from "axios";
import store from "@/store";
import { getToken, removeToken } from "@/utils/auth";
import Config from "@/business/config";
// import { Message, Loading } from 'element-ui'
// import { stringifyParam } from "@/utils/common";
// import router from "@/router";
import router from "../router";
import bus from "@/utils/bus";
import { authVerify } from "@/api/auth";

// let loadingSelector = []; // 加载的选择器集合
// let loadingInstanceArr = []; //加载的实例集合

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url 只有以 VUE_APP_ 开头的变量会被 webpack.DefinePlugin 静态嵌入到客户端侧的包中
  timeout: 10000,
});

service.interceptors.request.use(
  (requestConfig) => {
    // no timeout
    // if (requestConfig.timeout === "infinite") {
    //   requestConfig.time = 0;
    // }
    // // 加载数据时显示动效(loading实例)
    // if (requestConfig.loading) {
    //   if (!loadingSelector.includes(requestConfig.loading)) {
    //     loadingSelector.push(requestConfig.loading);

    //     const loadingInstance = Loading.service({
    //       target: requestConfig.loading, //dom字符串 要挂载的类名
    //     });

    //     loadingInstanceArr.push({
    //       key: requestConfig.url,
    //       loadingInstance: loadingInstance,
    //       loading: requestConfig.loading,
    //     });
    //   } else {
    //     // 相同区域的loading
    //     let loadingInstance = null;

    //     loadingInstanceArr.some((_) => {
    //       if (_.loading === requestConfig.loading) {
    //         loadingInstance = _.loadingInstance;

    //         return true;
    //       }
    //     });

    //     loadingInstanceArr.push({
    //       key: requestConfig.url,
    //       loadingInstance: loadingInstance,
    //       loading: requestConfig.loading,
    //     });
    //   }
    // }

    // requestConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded' //axios会根据body设置对应的content-type
    if (store.getters.token) {
      requestConfig.headers["x-token"] = store.getters.token;
    }

    // //调用接口时接口所在页面带上所归属的的菜单ID 在header: menuId(菜单id（标记接口源头）,如不属于某个菜单，传0)
    // if (store.getters.menu_id)
    //   requestConfig.headers["menuId"] = store.getters.menu_id;
    // else requestConfig.headers["menuId"] = 0;

    // // 设置请求头
    // if (requestConfig.header) {
    //   const keys = Object.keys(requestConfig.header);
    //   keys.forEach((key) => {
    //     // if(requestConfig.header[key]==='multipart/form-data') {
    //     //     doStringifyParam = false
    //     // }
    //     requestConfig.headers[key] = requestConfig.header[key];
    //   });
    // }

    // // 当不是表单提交时才对数据进行stringifyParam (data/formdata表示是formData)
    // if (!["data/formdata", "data/json"].includes(requestConfig.dataType)) {
    //   requestConfig.data = stringifyParam(requestConfig.data);
    // }

    return requestConfig;
  },
  (error) => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    // // 清除loading
    // if (loadingInstanceArr.length > 0) {

    //     const key = response.config.url

    //     const loading = response.config.loading

    //     loadingInstanceArr.some((_, index) => {

    //         if (_.key === key) {

    //             loadingInstanceArr.splice(index, 1)

    //             const res = loadingInstanceArr.some(_ => _.loading === loading)

    //             // 最后一个请求返回时清除loading
    //             if (!res) {

    //                 loadingSelector.splice(loadingSelector.indexOf(_.loading), 1)

    //                 return _.loadingInstance.close()
    //             }
    //         }
    //     })
    // }

    // console.log(response);
    const res = response.data;
    if (res.code !== 20000) {
      // 402-无权访问
      // if (res.code === 402) return router.push({ path: '/login' })
      //   if (res.code === 402) {
      //     // 重置
      //     store.user.commit("SET_ROUTES_READY", false);
      //     return router.push({ path: "/login" });
      //   }

      //   Message({
      //     message: res.message || "Error",
      //     type: "error",
      //   });

      if (res.code === 40007) {
        console.log(40007);
        // token验证失败
        if (getToken()) {
          removeToken();
        }
        return (location.href = Config.weixinUri());
      } else if (res.code === 42503) {
        // {"code":42503,"msg":"商家用户未验证, 请先验证","details":[2]}
        // return router.push("Child4");
        store.commit("auth/SET_VERIFY", false);
        bus.$authorize({
          userId: res.details[0],
          authorize(userId, code) {
            return authVerify({ userId, code });
          },
        });
      } else if (res.code === 42006) {
        // code过期或失效
        return (location.href = Config.weixinUri());
      }
      bus.$notify(res.msg);
      return Promise.reject(new Error(res.msg || "Error"));
    } else {
      if (!store.state.auth.verify) {
        store.commit("auth/SET_VERIFY", true);
      }
    }
    return res;
  },
  (error) => {
    console.log(error); // for debug
    // Message({
    //   message: error.message || "Error",
    //   type: "error",
    // });
    bus.$notify(error.msg || "Error");
    return Promise.reject(error);
  }
);

export default service;
