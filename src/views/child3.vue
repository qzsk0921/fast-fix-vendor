<template>
  <div class="container child3-container">
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
        >
          <van-cell
            class="content-wrap"
            @click="
              orderInfoHandle(
                item.orderFixId,
                item.order.longitude,
                item.order.latitude
              )
            "
          >
            <template>
              <div class="line1">
                <span>{{ item.order.brandName }} {{ item.order.model }}</span>
                <span>{{ item.priceStatus | parsePriceStatus }}</span>
              </div>
              <div class="line2">
                {{ item.order.discription }}
              </div>
              <div class="line3">&yen;{{ item.price / 100 }}</div>
              <div class="line4">
                {{ item.createTime | parseTime }}
                <div class="btn-wrap">
                  <button
                    v-if="item.priceStatus === 1"
                    class="btn-edit-price btn"
                    @click.stop="
                      editPriceHandle(
                        item.orderFixId,
                        item.order.longitude,
                        item.order.latitude,
                      )
                    "
                  >
                    修改报价
                  </button>
                  <!-- <button
                    class="btn-order-info btn"
                    @click="
                      orderInfoHandle(
                        item.orderFixId,
                        item.order.longitude,
                        item.order.latitude,
                        item.id
                      )
                    "
                  >
                    详情
                  </button> -->
                </div>
              </div>
            </template>
          </van-cell>
          <van-cell class="imgs-wrap" v-if="item.order.imgUrls.length">
            <!-- 使用 title 插槽来自定义标题 -->
            <template #right-icon>
              <img
                class="img"
                v-for="it in item.order.imgUrls"
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
import { getOrderPrice } from "@/api/order";
import busConf from "@/business/config";

export default {
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
    parsePriceStatus(val) {
      let text = "";
      busConf.fixOrderStatus.some((item) => {
        if (item.value === val) return (text = item.label);
      });
      return text;
    },
    parseTime(val) {
      if (val) {
        const year = new Date(val).getFullYear();
        const month = new Date(val).getMonth() + 1;
        const date = new Date(val).getDate();
        return `${year}-${month}-${date}`;
      }
    },
  },
  methods: {
    getOrderPrice(params) {
      getOrderPrice(params)
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
      this.getOrderPrice({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        status: "",
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
    navigator(params) {
      this.$router.push({
        name: "Order",
        params,
      });
    },
    editPriceHandle(id, longitude, latitude) {
      this.navigator({
        id,
        longitude,
        latitude,
        chain: 1,
        type: "editable",
      });
    },
    orderInfoHandle(id, longitude, latitude) {
      this.navigator({
        id,
        longitude,
        latitude,
        chain: 1,
        type: "readable",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.child3-container {
  // padding: 8px;
  background-color: $bg;
  // .van-list {
  //   .van-cell-group {
  //     &:first-child {
  //       margin-top: 0px !important;
  //     }
  //     &:not(:first-child) {
  //       margin-top: 8px !important;
  //     }
  //   }
  // }
  .content-wrap {
    .line1 {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      span {
        &:first-child {
          font-weight: bold;
        }
        &:last-child {
          color: #969799;
        }
      }
    }
    .line2 {
      margin-top: 8px;
      font-size: 16px;
      // color: #969799;
      color: #333;
    }
    .line3 {
      font-weight: bold;
      margin-top: 8px;
      text-align: right;
    }
    .line4 {
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
      .btn-wrap {
        .btn {
          font-size: 13px;
          border-radius: 4px;
          text-align: center;
          padding: 0 15px;
          height: 30px;
        }
        .btn-edit-price {
          color: #fff;
          background-color: #108ee9;
          border: 1px solid #108ee9;
        }
        // .btn-order-info {
        //   color: #000;
        //   background-color: #ffffff;
        //   border: 1px solid #dddddd;
        //   margin-left: 7px;
        // }
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
</style>