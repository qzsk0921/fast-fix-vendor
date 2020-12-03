<template>
  <div id="auth_alertModel" :class="{ hidden: !show }">
    <div class="t-alert-mask"></div>
    <div class="auth-box">
      <van-field
        v-model="authCode"
        center
        clearable
        label="授权码"
        placeholder="请输入授权码"
        use-button-slot
      >
        <van-button
          @click="authHandle"
          slot="button"
          size="small"
          type="primary"
          >点击授权</van-button
        >
      </van-field>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  data() {
    return {
      show: true, // 通过这个属性，控制是否移除dom元素
      userId: "",
      authCode: "",
    };
  },
  watch: {
    show(cur, old) {
      // 通过监控data里的show属性  弹框有三个事件（右上角取消  确定按钮  取消按钮）
      // 每个事件写了 this.show = false
      // 当弹框出现的时候 点击任何一个事件  都会触发这里的监控事件  将页面上的弹框Dom移除
      if (cur === false) {
        const auth_alert = document.getElementById("auth_alertModel");
        auth_alert.parentNode.removeChild(auth_alert);
      }
    },
  },
  methods: {
    closeHandle() {
      this.show = false;
      // 删除判断增加的window属性
      delete window.alertIsShow;
    },
    authHandle() {
      this.authorize &&
        this.authorize(this.userId, this.authCode).then((res) => {
          store.commit("auth/SET_VERIFY", true);
          this.$notify({ type: "success" }, "授权成功");
          setTimeout(function () {
            this.show = false;
            location.href = "/";
          }, 500);
        });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#auth_alertModel {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  .t-alert-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #f5f5f9;
  }
  .auth-box {
    background-color: #fff;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    width: 95vw;
  }
}
</style>

