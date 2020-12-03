<template>
  <div class="container order-container">
    <van-cell center title="道路救援">
      <template #right-icon>
        <van-switch v-model="formData.isRescue" size="24" disabled />
      </template>
    </van-cell>
    <van-cell title="车辆品牌" :value="formData.brandName" />
    <van-cell title="车辆型号" :value="formData.model" />
    <van-cell title="行驶里程" :value="formData.mileage" />
    <van-cell title="出厂时间" :value="formData.createTime | parseTime" />
    <div class="section section-imgs">
      <p>车损照片</p>
      <div class="imgs-wrap">
        <img
          class="section-imgs-img"
          v-for="(item, index) in formData.imgUrls"
          :src="item.url"
          :key="item.id"
          alt=""
          @click="imgClickHandle(index)"
        />
      </div>
    </div>
    <div class="section section-description">
      <p class="section-description-tit">情况描述及维修要求</p>
      <p class="section-description-des">
        {{ formData.discription }}
      </p>
    </div>
    <van-cell
      class="fix-way"
      title="接送车方式"
      :value="formData.fixWay | parseFixWay"
    />
    <van-cell v-if="formData.fixWay" title="接车地址" :value="formData.addr" />
    <div v-if="formData.fixWay" class="amap-wrapper">
      <el-amap vid="amapDemo" :zoom="map.zoom" :center="map.center">
        <el-amap-marker
          v-for="marker in map.markers"
          :position="marker.position"
          :key="marker.position[0]"
        ></el-amap-marker>
        <el-amap-text
          v-for="marker in map.markers"
          :text="marker.addr"
          :offset="marker.offset"
          :key="marker.position[1]"
        ></el-amap-text>
      </el-amap>
      <!-- <el-amap vid="amapDemo" :amap-manager="amapManager" :zoom="zoom" :center="center"> </el-amap> -->
    </div>
    <van-cell class="tip" value="以上为车辆维修信息，请评估报价" />
    <!-- 允许输入数字，调起带符号的纯数字键盘 -->
    <van-field
      v-model="form.price"
      type="number"
      label="评估报价"
      placeholder="请输入维修金额(元)"
      :disabled="
        !!(params.chain == 0 && form.price) ||
        (params.chain == 1 && !['edit', 'editable'].includes(params.type))
      "
    />
    <van-field
      v-model="form.discription"
      rows="1"
      autosize
      label="备注信息"
      type="textarea"
      placeholder="请输入其他相关信息"
      :disabled="
        !!(params.chain == 0 && form.price) ||
        (params.chain == 1 && !['edit', 'editable'].includes(params.type))
      "
    />
    <!-- :disabled="params.type === 'readable' || !+params.type" -->
    <!-- v-if="+params.type && !['readable', 'editable'].includes(params.type)" -->
    <van-button
      v-if="
        !!(params.chain == 0 && !form.price) ||
        ['edit'].includes(params.type)
      "
      text="发出报价"
      :loading="loading"
      type="info"
      loading-text="报价中..."
      block
      @click="submit"
    />
    <van-button
      v-if="params.type === 'editable'"
      text="修改报价"
      :loading="loading"
      type="info"
      loading-text="报价中..."
      block
      @click="submit"
    />
  </div>
</template>

<script>
import { getOrderById, addOrder, updateOrder } from "@/api/order";
import VueAMap from "vue-amap";
import busConf from "@/business/config";
import { ImagePreview } from "vant";
import { getNewOrder } from "@/api/store";
// const amapManager = new VueAMap.AMapManager();

export default {
  data() {
    return {
      formData: {}, //订单信息
      params: this.$route.params,
      loading: false,
      form: {
        price: null,
        discription: null,
      },
      map: {
        // amapManager,
        zoom: 12,
        center: [this.$route.params.longitude, this.$route.params.latitude], //[121.5273285, 31.21515044]
        markers: [
          {
            position: [
              this.$route.params.longitude,
              this.$route.params.latitude,
            ],
            addr: "",
            offset: [0, -45],
          },
        ], //{"name":{"content":"深圳","offset":[20,20]},"point":[114.06, 22.52]}
      },
    };
  },
  // watch: {
  //   map: {
  //     handler(n) {

  //     },
  //     immediate: true,
  //     deep: true,
  //   },
  // },
  filters: {
    parseFixWay(val) {
      let text = "";
      busConf.deliveryData.some((item) => {
        if (item.value === val) return (text = item.label);
      });
      return text;
    },
    parseTime(val) {
      if (val) {
        const myDate = new Date(val);
        const year = myDate.getFullYear();
        const month = myDate.getMonth() + 1;
        const date = myDate.getDate();
        return `${year}-${month}-${date}`;
      }
    },
  },
  methods: {
    imgClickHandle(index) {
      const images = this.formData.imgUrls.map((item) => item.url);
      ImagePreview({
        images: images,
        startPosition: index,
      });
      // this.$picPreview({
      //   url,
      //   index,
      //   total,
      // });
    },
    submit() {
      if (this.form.price === "" || null) return this.$toast("请输入金额");
      let data = {
        orderFixId: this.params.id,
        price: parseInt(this.form.price * 100), //单位分
        discription: this.form.discription,
      };
      if (this.params.type === "editable") {
        delete data.orderFixId;
        data.id = this.params.pid;
        return this.updateOrder(data);
      }
      this.addOrder(data);
    },
    getOrderById(id) {
      getOrderById(id).then((res) => {
        const data = res.result;
        this.formData = data;

        if (data.quotation) {
          this.form.price = data.quotation.price / 100;
          this.form.discription = data.quotation.discription
            ? data.quotation.discription
            : "无";
        }
        const center = [data.longitude, data.latitude];
        // this.map.center.push.apply(this.map.center, center);
        this.map.center = center;
        this.map.markers[0].position = center;
        this.map.markers[0].addr = data.addr;
        this.getNewOrder();
      });
    },
    updateOrder(data) {
      this.loading = true;
      updateOrder(data).then((res) => {
        this.loading = false;
        this.$toast.success("修改成功");
        this.$router.push({
          name: "Child3",
        });
      });
    },
    addOrder(data) {
      this.loading = true;
      addOrder(data).then((res) => {
        this.loading = false;
        this.$toast.success("报价成功");
        this.$router.push({
          name: "Child2",
        });
      });
    },
    // getPriceOrderById(pid) {
    //   getPriceOrderById(pid).then((res) => {
    //     const { discription, price } = res.result;
    //     this.form.discription = discription;
    //     this.form.price = price / 100;
    //   });
    // },
    getNewOrder() {
      getNewOrder().then((res) => {
        const data = res.result;
        this.$store.dispatch("merchant/setNewOrder", data);
      });
    },
  },
  mounted() {
    this.getOrderById(this.params.id);
    // 修改报价或查看报价详情时执行
    // if (+this.params.pid) {
    //   this.getPriceOrderById(this.params.pid);
    // }
  },
};
</script>

<style lang="scss" scoped>
.order-container {
  background-color: $bg;
  .van-cell {
    font-size: 17px;
    .van-cell__value {
      flex: 3;
    }
  }
  .van-cell__value {
    color: #000;
  }
  /deep/.van-field__control {
    &:disabled {
      color: #000;
      -webkit-text-fill-color: #000;
      text-align: right;
    }
  }
  .section {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 16px;
    overflow: hidden;
    color: #323233;
    font-size: 17px;
    line-height: 24px;
    background-color: #fff;
  }
  .section-imgs {
    p {
      font-size: 17px;
    }
    .imgs-wrap {
      display: flex;
      justify-content: flex-start;
      overflow: auto;
      height: 100px;
      .section-imgs-img {
        width: 100px;
        height: 100px;
        display: inline-block;
        margin-right: 5px;
      }
    }
  }
  .section-description {
    .section-description-tit {
      font-size: 18px;
    }
    .section-description-des {
      min-height: 24px;
      color: #969799;
    }
  }
  .tip {
    margin-bottom: 8px;
    .van-cell__value--alone {
      font-size: 13px;
      color: #888888;
    }
  }
  .amap-wrapper {
    height: 200px;
  }
  /deep/.van-field__label {
    color: #000;
  }
  .van-button--normal {
    margin: 24px 12px;
    font-size: 18px;
    border-radius: 5px;
    width: calc(100% - 24px);
  }
  .fix-way {
    .van-cell__title {
      flex: 2;
    }
  }
}
</style>