<template>
  <div class="my-container container">
    <van-cell
      title="店铺名称"
      is-link
      :value="merchantInfo.fullName"
      @click="setHandle('fullName')"
    />
    <van-cell
      title="地址"
      is-link
      :value="merchantInfo.address"
      @click="setHandle('address')"
    />
  </div>
</template>

<script>
import { getMerchantInfo, setStore } from "@/api/store";

export default {
  data() {
    return {
      merchantInfo: "",
    };
  },
  methods: {
    init() {
      this.getMerchantInfo();
    },
    getMerchantInfo() {
      getMerchantInfo().then((res) => {
        this.merchantInfo = res.result;
        if (!this.$store.state.merchantId) {
          this.$store.dispatch("merchant/setMerchantId", res.result.id);
        }
      });
    },
    setHandle(arg) {
      const _this = this;
      let val = "";

      if (arg === "address") {
        val = this.merchantInfo.address;
      } else if (arg === "fullName") {
        val = this.merchantInfo.fullName;
      }

      this.$input({
        data: val,
        save: function (data) {
          this.disabled = true;
          let obj = {};
          obj[arg] = data;
          setStore(_this.merchantInfo.id, obj).then((res) => {
            _this.merchantInfo[arg] = data
            this.disabled = false;
            this.show = false;
          });
        },
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
</style>