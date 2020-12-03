import Vue from 'vue'
import Authorize from  './Authorize'

let AuthorizeConstructor = Vue.extend(Authorize)

let AuthorizeModel = (o) => {
    let authorizeDom = new AuthorizeConstructor({
        el: document.createElement('div')
    })
    document.body.appendChild(authorizeDom.$el)

    // authorizeDom.title = o.title //顶部标题
    // authorizeDom.successBtn = o.successBtn //支付成功按钮内容
    // authorizeDom.errorBtn = o.errorBtn //支付失败按钮内容

    // // 两个事件 用户点击完成成功和支付失败（和实际结果无关）
    // authorizeDom.a_success = o.success || null
    // authorizeDom.a_error = o.error || null

    authorizeDom.userId = o.userId
    authorizeDom.authorize = o.authorize

}

export default AuthorizeModel

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