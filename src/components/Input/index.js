import Vue from "vue";
import Input from "./Input";

const InputConstructor = Vue.extend(Input);

const InputModel = (o) => {
  const InputDom = new InputConstructor({
    el: document.createElement("div"),
  });

  document.body.appendChild(InputDom.$el);

  InputDom.data = o.data
  InputDom.save = o.save
};

export default InputModel;
