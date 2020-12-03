<template>
  <div id="tip_alertModel" :class="{ hidden: !show }">
    <div class="t-alert-mask" @click="closeHandle"></div>
    <!-- <div class="payment-box">
      <div class="tit item">{{title}}</div>
      <div class="success item" @click="successHandler">{{successBtn}}</div>
      <div class="error item" @click="errorHandler">{{errorBtn}}</div>
    </div> -->
    <div class="withdrawal-box">
      <span>提现金额</span>
      <div class="input-box">
        <span class="symbol">&yen;</span>
        <input type="number" autofocus v-model="amount" />
      </div>
      <p class="description">当前余额{{ balance }}元</p>
      <button class="btn-withdrawal" @click="withdrawalHandle" :disabled="disabled">提现</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true, // 通过这个属性，控制是否移除dom元素
      balance: null, //余额
      amount: null, //提现金额
      disabled: false //执行提现时禁用
    };
  },
  watch: {
    show(cur, old) {
      // 通过监控data里的show属性  弹框有三个事件（右上角取消  确定按钮  取消按钮）
      // 每个事件写了 this.show = false
      // 当弹框出现的时候 点击任何一个事件  都会触发这里的监控事件  将页面上的弹框Dom移除
      if (cur === false) {
        const tip_alert = document.getElementById("tip_alertModel");
        tip_alert.parentNode.removeChild(tip_alert);
      }
    }
  },
  methods: {
    withdrawalHandle() {
      this.withdrawal && this.withdrawal();
      // this.show = false;
    },
    closeHandle() {
      this.show = false
      // 删除判断增加的window属性
      delete window.alertIsShow;
    }
    // successHandler() {
    //   this.a_success && this.a_success();
    //   this.show = false;
    // },
    // errorHandler() {
    //   this.a_error && this.a_error();
    //   this.show = false;
    // },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#tip_alertModel {
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
  .withdrawal-box {
    background-color: #fff;
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    width: 80vw;
    padding: 15px 20px;
    font-size: 14px;
    .input-box {
      font-size: 25px;
      padding-top: 10px;
      border-bottom: 1px solid #eeeeee;
      margin-bottom: 10px;
      input {
        margin-left: 10px;
        height: 50px;
        width: calc(100% - 30px);
        caret-color: #000;
      }
    }
    .description {
      color: #969799;
      margin-bottom: 10px;
    }
    .btn-withdrawal {
      color: #fff;
      width: 100%;
      border-radius: 4px;
      background-color: $green;
      border: 1px solid $green;
      text-align: center;
      font-size: 17px;
      padding: 10px;
    }
  }
  // .payment-box {
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  //   width: px2rem(600);
  //   border-radius: px2rem(10);
  //   background-color: #fff;
  //   text-align: center;
  //   font-size: px2rem(30);
  //   .tit {
  //   }
  //   .success {
  //       color: #ff2828;
  //   }
  //   .error {
  //       color: #666;
  //   }
  //   .item {
  //       padding: px2rem(40) 0;
  //       &:not(:first-child) {
  //           border-top: px2rem(1) solid #ececec;
  //       }
  //   }
  // }
}
</style>

