<template>
  <div ref="codePopup" id="code_alertModel" :class="{ 'enter-active': appear }">
    <span class="message"
      >授权码：<b>{{ code }}</b
      >，5分钟内有效</span
    >
    <button class="btn-copy" @click="copyHandle">复制</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: null,
      appear: false,
      timers: [],
    };
  },
  watch: {
    appear(cur, old) {
      if (cur === false) {
        this.$refs.codePopup.style.transform = "translateY(-85px)";
        const timer = setTimeout(function () {
          const code_alert = document.getElementById("code_alertModel");
          code_alert.parentNode.removeChild(code_alert);
        }, 1000);
        this.timers.push(timer);
        this.timers.forEach((itmer) => {
          clearTimeout(this.timer);
        });
      } else {
        const t = this;
        const timer1 = setTimeout(function () {
          t.$refs.codePopup.style.transform = "translateY(85px)";
        }, 0);
        // 持续5秒
        const timer2 = setTimeout(() => {
          t.appear = false;
        }, 5000);
        this.timers.push.apply(this.timers, [timer1, timer2]);
      }
    },
  },
  methods: {
    copyHandle() {
      this.copy && this.copy();
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
#code_alertModel {
  position: fixed;
  left: 2%;
  top: -80px;
  width: 96vw;
  height: 80px;
  z-index: 100;
  background-color: #fff;
  transition: all 0.3s ease-in-out;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  .message {
    b {
      color: $orange;
    }
  }
  .btn-copy {
    color: #fff;
    background-color: $green;
    border-radius: 4px;
    border: 1px solid $green;
    text-align: center;
    font-size: 14px;
    padding: 8px;
    margin-left: 10px;
  }
}
.enter-active {
  // transform: translateY(150px);
}
</style>