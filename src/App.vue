<template>
  <div id="app">
    <router-view name="tabbar" />
    <router-view />
  </div>
</template>

<script>
import ResizeMixin from "@/layout/mixin/ResizeHandler";
// import { removeToken } from "./utils/auth";
// import Bus from "./utils/bus";

export default {
  name: "App",
  mixins: ["ResizeMixin"],
  mounted() {
    // // 微信貌似不兼容
    // window.addEventListener("beforeunload", function (event) {
    //   // document.cookie='bbb=0;expires='+new Date(0)
    //   removeToken()
    //   console.log("I am the 1st one.");
    // });
  },
};
</script>
<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
