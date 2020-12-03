const state = {
  merchantId: null,
  newOrderNum: '',
};

const mutations = {
  SET_MERCHANT_ID(state, merchantId) {
    state.merchantId = merchantId;
  },
  SET_NEW_ORDER(state, num) {
    state.newOrderNum = num;
  },
};

const actions = {
  setMerchantId({ commit }, merchantId) {
    commit("SET_MERCHANT_ID", merchantId);
  },
  setNewOrder({ commit }, num) {
    commit("SET_NEW_ORDER", num);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
