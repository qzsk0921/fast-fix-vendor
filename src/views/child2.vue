<template>
  <div class="container child2-container">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <!-- <div class="list" v-for="item in list" :key="item.id">
      {{ item.brandName }}
      <img v-for="it in item.imgUrls" :key="it.id" :src="it.url" alt="" />
    </div> -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell-group
          style="margin-top: 2px"
          v-for="item in list"
          :key="item.id"
          @click="clickHandle(item.id)"
        >
          <van-cell class="content-wrap">
            <template>
              <div class="line-head">
                <div class="line-head-left">
                  <div v-if="item.fixWay">
                    <svg-icon icon-class="location" class-name="svg-location" />
                    <span>{{ item.addr }}</span>
                  </div>
                  <div v-else>
                    {{ item.fixWay | fixWayParse }}
                  </div>
                </div>
                <span v-if="!item.storeState" class="dot"></span>
              </div>
              <div class="line1">
                <span>{{ item.brandName }} {{ item.model }}</span>
                <span>{{ item.mileage }}</span>
              </div>
              <div class="line2">
                <p>{{ item.discription }}</p>
                <!-- <span :class="{ active: !item.storeState }">{{
                  item.storeState | parseStoreStatus
                }}</span> -->
              </div>
            </template>
          </van-cell>
          <van-cell class="imgs-wrap">
            <!-- 使用 title 插槽来自定义标题 -->
            <template #right-icon>
              <img
                class="img"
                v-for="it in item.imgUrls"
                :key="it.id"
                :src="it.url"
                alt=""
              />
            </template>
          </van-cell>
        </van-cell-group>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { getOrder } from "@/api/order";
import busConf from "@/business/config";

export default {
  name: "Home",
  // components: {
  //   HelloWorld,
  // },
  data() {
    return {
      pageNum: 0,
      pageSize: 10,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  filters: {
    fixWayParse(val) {
      let text = "";
      busConf.deliveryData.some((item) => {
        if (item.value === val) return (text = item.label);
      });
      return text;
    },
    // parseStoreStatus(val) {
    //   return val ? "已读" : "未读";
    // },
  },
  methods: {
    getOrder(params) {
      getOrder(params)
        .then((res) => {
          if (this.refreshing) {
            this.list = [];
            this.refreshing = false;
          }
          // 加载状态结束
          this.loading = false;
          this.list.push.apply(this.list, res.page.list);
          // 数据全部加载完成
          if (this.pageNum >= res.page.pages) this.finished = true;
        })
        .catch((err) => {
          this.finished = true;
        });
    },
    onLoad() {
      this.pageNum += 1;
      // 异步更新数据
      this.getOrder({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      });
    },
    onRefresh() {
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      // 清空列表数据
      this.finished = false;
      this.pageNum = 0;
      this.onLoad();
    },
    // clickHandle(id, longitude, latitude) {
    //   this.navigator({ id, longitude, latitude, pid: 0, type: 'edit' });
    // },
    clickHandle(id) {
      this.navigator({ id, chain: 1, type: "edit" });
    },
    navigator(params) {
      this.$router.push({
        name: "Order",
        params,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.child2-container {
  // padding: 8px;
  background-color: $bg;
  .active {
    color: $orange;
  }
  // .van-list {
  //   .van-cell-group {
  //     &:first-child {
  //       margin-top: 0 !important;
  //     }
  //     &:not(:first-child) {
  //       margin-top: 8px !important;
  //     }
  //   }
  // }
  .content-wrap {
    .line-head {
      display: flex;
      justify-content: space-between;
      .line-head-left {
        font-size: 14px;
        color: #969799;
      }
      .dot {
        height: 9px;
        width: 9px;
        border-radius: 100%;
        background: $orange;
        border-radius: 50%;
      }
    }
    .line1 {
      display: flex;
      justify-content: space-between;
      span {
        &:first-child {
          font-size: 16px;
          font-weight: bold;
        }
        &:last-child {
          font-size: 16px;
          color: #969799;
        }
      }
    }
    .line2 {
      color: #969799;
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      p {
        width: 90%;
        @include txt-cut(1);
      }
    }
  }
  /deep/.imgs-wrap {
    padding-right: 50px;
    flex-wrap: wrap;
    .img {
      width: 25vw;
      height: 25vw;
      margin-right: 3px;
      margin-bottom: 3px;
    }
  }
}
.svg-location {
  color: #19b9d4;
  margin-right: 5px;
}
</style>