import Vue from 'vue'
import PicPreview from  './PicPreview'

let PicPreviewConstructor = Vue.extend(PicPreview)

let PicPreviewModel = (o) => {
    let PicPreviewDom = new PicPreviewConstructor({
        el: document.createElement('div')
    })
    document.body.appendChild(PicPreviewDom.$el)

    // PicPreviewDom.title = o.title //顶部标题
    // PicPreviewDom.successBtn = o.successBtn //支付成功按钮内容
    // PicPreviewDom.errorBtn = o.errorBtn //支付失败按钮内容

    // // 两个事件 用户点击完成成功和支付失败（和实际结果无关）
    // PicPreviewDom.a_success = o.success || null
    // PicPreviewDom.a_error = o.error || null

    PicPreviewDom.url = o.url //图片地址
    PicPreviewDom.total = o.total //图片合计数
    PicPreviewDom.index = o.index //当前图片索引

}

export default PicPreviewModel

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