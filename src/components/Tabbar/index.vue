<template>
  <div class="tabbar-container">
    <van-tabbar v-model="active" route>
      <van-tabbar-item
        v-for="item in tabbar"
        :key="item.text"
        replace
        :to="item.path"
        :badge="item.badge ? newOrderNum : ''"
      >
        <span>{{ item.text }}</span>
        <template #icon="props">
          <span>{{ item.icon }}</span>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      tabbar: [
        {
          icon: "IC",
          text: "快修",
          path: "/home/child1",
        },
        {
          icon: "IC",
          text: "订单",
          path: "/home/child2",
          badge: true,
        },
        {
          icon: "IC",
          text: "报价",
          path: "/home/child3",
        },
        {
          icon: "IC",
          text: "我的",
          path: "/home/child4",
        },
      ],
    };
  },
  computed: {
    newOrderNum() {
      return this.$store.state.merchant.newOrderNum
        ? this.$store.state.merchant.newOrderNum
        : "";
    },
  },
};
</script>

<style lang="scss" scoped>
.tabbar-container {
  // height: 50px;
  // overflow: hidden;
  // position: relative;
  // // background-color: $color-primary;
  // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  // color: #fff;
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  /deep/.van-tabbar-item__icon {
    font-size: 14px;
    .van-info {
      transform: translate(16px, -50%);
      background-color: $orange;
    }
  }
  .van-tabbar-item--active {
    color: rgb(255, 102, 51);
  }
}
</style>