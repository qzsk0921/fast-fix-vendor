<template>
  <div class="home1-container">
    <div class="qf-home-ad" justify="center" align="center">品牌宣传or广告</div>
    <div class="qf-home-nav-list">
      <router-link
        class="qf-home-nav-item"
        v-for="item in section"
        :key="item.path"
        :to="item.path"
      >
        {{ item.text }}
        <span v-if="item.dot ? newOrderNum : ''" class="dot"></span>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      section: [
        {
          path: "/home/child2",
          text: "订单",
          dot: true,
        },
        {
          path: "/about",
          text: "使用说明",
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
<style lang="sass" scoped>
.qf-home-ad
  width: 100%
  height: 60.8vw
  line-height: 60.8vw
  background: #999
  color: #fff
  font-size: 36px

.qf-home-nav-list
  display: flex
  flex-direction: column
  background: #fff
  padding: 8px 24px
  width: 100%

.qf-home-nav-item
  font-size: 20px
  padding: 16px 0
  border-bottom: 1px solid #eee
  width: 100%
  color: #333
  .dot
    display: inline-block
    height: 8px
    width: 8px
    border-radius: 100%
    background: $orange
    border-radius: 50%
    transform: translate(-6px, -12px)
  &:last-child
    border-bottom: none
</style>