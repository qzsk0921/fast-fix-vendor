import Vue from 'vue'
import Withdrawal from  './withdrawal'

let WithdrawalConstructor = Vue.extend(Withdrawal)

let withdrawalModel = (o) => {
    let withdrawalDom = new WithdrawalConstructor({
        el: document.createElement('div')
    })
    document.body.appendChild(withdrawalDom.$el)

    // withdrawalDom.title = o.title //顶部标题
    // withdrawalDom.successBtn = o.successBtn //支付成功按钮内容
    // withdrawalDom.errorBtn = o.errorBtn //支付失败按钮内容

    // // 两个事件 用户点击完成成功和支付失败（和实际结果无关）
    // withdrawalDom.a_success = o.success || null
    // withdrawalDom.a_error = o.error || null

    withdrawalDom.balance = o.balance //余额
    withdrawalDom.withdrawal = o.withdrawal

}

export default withdrawalModel

// this.$paymentAlert({
//     title: '请确认微信支付是否已完成',
//     successBtn: '已完成支付',
//     errorBtn: '支付遇到问题 , 重新支付',
//     success() {
//       // 这里执行已完成支付要做的事、默认执行关闭弹框
//     },
//     error() {
//       // 这里执行重新支付要做的事、默认执行关闭弹框
//     }
//   })