<template>
  <div id="pic_alertModel" :class="{ hidden: !show }" @click="closeHandle">
    <div class="t-alert-mask"></div>
    <div class="pic-preview-page">{{ index }} / {{ total }}</div>
    <div class="pic-preview-box" ref="picPreviewBox">
      <img
        :src="url"
        alt=""
        @touchstart="touchstartHandle"
        @touchmove="touchmoveHandle"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true, // 通过这个属性，控制是否移除dom元素
      url: "", //图片地址
      total: "", //图片合计数
      index: "", //当前图片索引
      startTouch: {
        x1: "",
        y1: "",
        x2: "",
        y2: "",
      },
      distanceX: "",
      distanceY: "",
      // moveTouch: {
      //   x1: '',
      //   y1: '',
      //   x2: '',
      //   y2: ''
      // }
      pic_preview_box_width: "",
    };
  },
  watch: {
    show(cur, old) {
      // 通过监控data里的show属性  弹框有三个事件（右上角取消  确定按钮  取消按钮）
      // 每个事件写了 this.show = false
      // 当弹框出现的时候 点击任何一个事件  都会触发这里的监控事件  将页面上的弹框Dom移除
      if (cur === false) {
        const pic_alert = document.getElementById("pic_alertModel");
        pic_alert.parentNode.removeChild(pic_alert);
      }
    },
    distanceX(c, o) {
      let width = this.$refs.picPreviewBox.offsetWidth - parseInt(c / 5);
      // alert('width='+width)
      // alert('parent='+this.$refs.picPreviewBox.parentElement.offsetWidth)
      this.$refs.picPreviewBox.style.width =
        width < this.$refs.picPreviewBox.parentElement.offsetWidth * 0.8
          ? this.$refs.picPreviewBox.parentElement.offsetWidth * 0.8
          : width + "px";
    },
    distanceY(c, o) {
      let height = this.$refs.picPreviewBox.offsetWidth - parseInt(c / 5);
      this.$refs.picPreviewBox.style.width =
        height < this.$refs.picPreviewBox.parentElement.offsetWidth * 0.8
          ? this.$refs.picPreviewBox.parentElement.offsetWidth * 0.8
          : height + "px";
    },
  },
  methods: {
    withdrawalHandle() {
      this.withdrawal && this.withdrawal();
      // this.show = false;
    },
    closeHandle() {
      this.show = false;
      // 删除判断增加的window属性
      delete window.alertIsShow;
    },
    touchstartHandle(e) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      if (e.touches.length >= 2) {
        this.startTouch.x1 = touch1.clientX;
        this.startTouch.y1 = touch1.clientY;
        this.startTouch.x2 = touch2.clientX;
        this.startTouch.y2 = touch2.clientY;
      }
    },
    touchmoveHandle(e) {
      // this.throttle(() => {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        if (e.touches.length >= 2) {
          // this.moveTouch.x1 = touch1.clientX
          // this.moveTouch.y1 = touch1.clientY
          // this.moveTouch.x2 = touch2.clientX
          // this.moveTouch.y2 = touch2.clientY
          this.distanceX =
            Math.abs(this.startTouch.x1 - this.startTouch.x2) -
            Math.abs(touch1.clientX - touch2.clientX);
          this.distanceY =
            Math.abs(this.startTouch.y1 - this.startTouch.y2) -
            Math.abs(touch1.clientY - touch2.clientY);
        }
      // });
    },
    throttle(fn, threshhold) {
      let timeout;
      const start = new Date();
      threshhold = threshhold || 160;
      return (function () {
        const context = this,
          args = arguments,
          curr = new Date() - 0;
        if (timeout) {
          clearTimeout(timeout); //总是干掉事件回调
        }
        // alert(curr - start >= threshhold);
        if (curr - start >= threshhold) {
          console.log("now", curr, curr - start); //注意这里相减的结果，都差不多是160左右
          fn.apply(context, args); //只执行一部分方法，这些方法是在某个时间段内执行一次
          start = curr;
        } else {
          //让方法在脱离事件后也能执行一次
          timeout = setTimeout(function () {
            fn.apply(context, args);
          }, threshhold);
        }
      })();
    },
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
#pic_alertModel {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 199;
  .t-alert-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
  }
  .pic-preview-page {
    position: absolute;
    top: 20px;
    left: 50%;
    color: #fff;
    transform: translateX(-50%);
  }
  .pic-preview-box {
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100vw;
    // padding: 15px 20px;
    font-size: 14px;
  }
}
</style>

