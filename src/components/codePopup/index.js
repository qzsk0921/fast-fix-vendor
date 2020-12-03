import Vue from "vue";
import CodePopup from "./codePopup";

const codePopupConstructor = Vue.extend(CodePopup);

const CodePopup_model = (o) => {
  let codePopupDom = new codePopupConstructor({
    el: document.createElement("div"),
  });
  
  document.body.appendChild(codePopupDom.$el);

  codePopupDom.code = o.code; //验证码
  codePopupDom.appear = o.appear //顶部弹出
  codePopupDom.copy = o.copy || null;
};

export default CodePopup_model;
