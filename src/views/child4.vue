<template>
  <div class="mine-container" @click="$notify.clear()">
    <div class="qf-me-header">
      <div class="qf-me-avatar-container">
        <img :src="userInfo.headImgUrl" alt="avatar" />
      </div>
      <div class="qf-me-nickname">
        {{ userInfo.nickName }}
      </div>
    </div>
    <van-cell :title="userInfo.nickName" is-link @click="myHandle" />
    <van-cell title="提现" @click="withdrawalHandle" clickable />
    <van-cell
      v-if="verify"
      title="获取授权码"
      @click="getCodeHandle"
      clickable
    />
    <van-cell-group>
      <van-cell v-for="item in options" :key="item.text" :title="item.text" />
    </van-cell-group>
    <div class="qf-me-ad">品牌宣传or广告</div>
  </div>
</template>
<script>
import { withdrawal, getMerchantInfo } from "@/api/store";
import { getAuthCode } from "@/api/auth";
import { copy } from "@/utils/common";

export default {
  data() {
    return {
      verify: this.$store.state.auth.verify,
      userInfo: this.$store.state.auth.userInfo,
      options: [
        {
          className: "",
          text: "客户服务",
        },
        {
          className: "",
          text: "退出登录",
        },
      ],
      balance: null,
    };
  },
  beforeDestroy() {
    this.$notify.clear();
  },
  methods: {
    getCodeHandle() {
      getAuthCode().then((res) => {
        // this.$notify.clear();
        // this.$notify({
        //   message: `授权码：${res.result}，5分钟内有效`,
        //   type: "success",
        //   duration: 0,
        // });
        const code = res.result;
        this.$codePopup({
          code,
          appear: true,
          copy() {
            if (copy(code)) this.$toast("复制成功");
            else this.$toast("复制失败");
          },
        });
      });
    },
    async withdrawalHandle() {
      const toast = this.$toast.loading({
        // message: "加载中...",
        forbidClick: true,
        duration: 0, // 持续展示 toast
      });
      await this.getMerchantInfo(toast);
      const _this = this;
      this.$withdrawal({
        balance: _this.balance / 100,
        withdrawal() {
          const myAmount = parseInt(this.amount * 100); //金额数据的单位：分
          // 这里执行提现要做的事、默认不执行关闭弹框
          if (!myAmount || _this.balance < myAmount) {
            this.$toast("请输入正确金额");
            return;
          } else {
            _this.withdrawal(myAmount, this);
          }
        },
      });
    },
    async getMerchantInfo(toast) {
      await getMerchantInfo().then((res) => {
        toast.clear();
        this.balance = res.result.balance;
      });
    },
    withdrawal(amount, t) {
      t.disabled = true;
      const data = {
        amount,
        remark: `提现${amount}元`,
      };

      withdrawal(data)
        .then((res) => {
          t.disabled = false;
          this.getMerchantInfo();
        })
        .catch((err) => {
          t.disabled = false;
          console.log(err);
        });
    },
    navigator(name, params) {
      this.$router.push({
        name,
        params,
      });
    },
    myHandle() {
      this.navigator("My");
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.mine-container {
  height: 100%;
  .qf-me-header {
    height: 50vw;
    display: flex;
    justify-content: center;
    align-items: center;
    .qf-me-avatar-container {
      position: relative;
      width: 42px;
      height: 42px;
      border-radius: 18px;
      overflow: hidden;
      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
    .qf-me-nickname {
      font-size: 18px;
      margin-left: 12px;
      color: #333;
    }
  }
  .qf-me-ad {
    width: 100%;
    height: 31.2vw;
    background: #999;
    color: #fff;
    font-size: 36px;
    margin-top: 12px;
    line-height: 31.2vw;
    text-align: center;
  }
}
</style>