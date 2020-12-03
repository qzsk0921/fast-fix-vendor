<template>
  <!-- <div :class="classObj"> -->
  <div class="app-main">
    <div class="main-container">
      <transition name="fade-transform" mode="out-in">
        <!-- <keep-alive> -->
        <router-view :key="key" />
        <!-- </keep-alive> -->
      </transition>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import { mapState } from 'vuex'

export default {
  computed: {
    key() {
      return this.$route.path;
    },
    //   ...mapState({ device: state => state.device }),
    //   ...mapGetters(['sidebar']),
    //   classObj() {
    //     return {
    //       hideSidebar: !this.sidebar.opened,
    //       openSidebar: this.sidebar.opened,
    //       withoutAnimation: this.sidebar.withoutAnimation,
    //       mobile: this.device === 'mobile'
    //     }
    //   }
  },
};
</script>

<style lang="scss" scoped>
.app-main {
  height: 100%;
  .main-container {
    height: 100%;
  }
}
</style>