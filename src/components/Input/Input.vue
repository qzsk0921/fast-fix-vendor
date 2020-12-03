<template>
  <div id="input_alertModel" :class="{ hidden: !show }">
    <div class="t-alert-mask" @click="closeHandle"></div>
    <div class="content-box">
      <input type="text" v-model="data" />
      <button class="btn-save" @click="saveHandle" :disabled="disabled">
        保存
      </button>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  data() {
    return {
      show: true,
      data: "",
      disabled: false, //执行时禁止
    };
  },
  watch: {
    show(cur, old) {
      // 通过监控data里的show属性  弹框有三个事件（右上角取消  确定按钮  取消按钮）
      // 每个事件写了 this.show = false
      // 当弹框出现的时候 点击任何一个事件  都会触发这里的监控事件  将页面上的弹框Dom移除
      if (cur === false) {
        const input_alert = document.getElementById("input_alertModel");
        input_alert.parentNode.removeChild(input_alert);
      }
    },
  },
  methods: {
    closeHandle() {
      this.show = false;
      // 删除判断增加的window属性
      delete window.alertIsShow;
    },
    saveHandle() {
      this.save && this.save(this.data)
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#input_alertModel {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  .t-alert-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #f5f5f9;
  }
  .content-box {
    width: 100%;
    padding: 30px 16px 0;
    position: absolute;
    input {
      width: 100%;
      font-size: 17px;
      height: 40px;
      border-bottom: 1px solid $green;
      background-color: transparent;
    }
    .btn-save {
      color: #fff;
      margin-top: 10px;
      background-color: $green;
      font-size: 17px;
      padding: 8px 10px;
      border-radius: 4px;
      border: 1px solid $green;
    }
  }
}
</style>

