import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/style/index.scss"; // 全局css

import "./permission"; //权限控制
import "./assets/icons/index" //icons

import VueAMap from "vue-amap";
VueAMap.initAMapApiLoader({
  key: "7d1edb1f7ba10270bfd96433966a79ad",
  plugin: [
    "AMap.Autocomplete",
    "AMap.PlaceSearch",
    "AMap.Scale",
    "AMap.OverView",
    "AMap.ToolBar",
    "AMap.MapType",
    "AMap.PolyEditor",
    "AMap.CircleEditor",
  ],
});
Vue.use(VueAMap);

// 自动按需引入组件 babel-plugin-import 是一款 babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式
import {
  Tabbar,
  TabbarItem,
  Notify,
  List,
  PullRefresh,
  Cell,
  CellGroup,
  Switch,
  Field,
  Button,
  Toast,
  ImagePreview
} from "vant";
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Notify);
Vue.use(List);
Vue.use(PullRefresh);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Switch);
Vue.use(Field);
Vue.use(Button);
Vue.use(Toast);
Vue.use(ImagePreview)

import withdrawal from "./components/withdrawal/index";
// import PicPreview from "./components/PicPreview/index";
import Authorize from "./components/Authorize/index";
import Input from "./components/Input/index"
import CodePopup from './components/codePopup/index'

Vue.prototype.$withdrawal = withdrawal;
// Vue.prototype.$picPreview = PicPreview;
Vue.prototype.$authorize = Authorize;
Vue.prototype.$input = Input
Vue.prototype.$codePopup = CodePopup

Vue.config.productiontip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
