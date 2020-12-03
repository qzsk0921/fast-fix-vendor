import { getToken, setToken, removeToken } from "@/utils/auth";
import { getAuthToken } from "@/api/auth";
import { getUserInfo } from "@/api/user";

const state = {
  token: getToken(),
  userInfo: {},
  verify: false, //是否授权
};
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  SET_VERIFY(state, boolean) {
    state.verify = boolean;
  },
};
const actions = {
  getAuthToken({ commit }, weiXinCode) {
    return new Promise((resolve, reject) => {
      getAuthToken(weiXinCode)
        .then((res) => {
          commit("SET_TOKEN", res.token);
          // commit('SET_USER_INFO', res.userInfo)
          setToken(res.token);
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // login({ commit }, userInfo) {
  //     const { username, password } = userInfo
  //     return new Promise((resolve, reject) => {
  //         // -------------------------------------------(6)去api line 28 <=> 29---------------------------------------------------
  //         login({ loginId: username.trim(), loginPwd: password, agentCode: '00' }).then(res => {
  //             // login({ username: username.trim(), password: password, agentCode: '00' }).then(res => {
  //             // -------------------------------------------(7)去api line 31-33 <=> 35-37---------------------------------------------------
  //             const { object } = res
  //             commit('SET_TOKEN', object.token)
  //             setToken(object.token)

  //             // const { data } = res
  //             // commit('SET_TOKEN', data.token)
  //             // setToken(data.token)

  //             // commit('SET_NICK_NAME', object.accountName)

  //             resolve()
  //         }).catch(error => {
  //             reject(error)
  //         })
  //     })
  // },
  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getUserInfo()
        .then((response) => {
          const { result } = response;
          if (!result) {
            reject("验证失败，请重新登录");
          }
          commit("SET_USER_INFO", result);

          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // resetUserInfo({ commit }) {
  //     return new Promise((resolve, reject) => {
  //         commit('SET_TOKEN', '')
  //         commit('SET_ROLES', [])
  //         commit('permission/SET_ROUTES_READY', false, { root: true })
  //         removeToken()

  //         resolve()
  //     })
  // },
  // logout({ dispatch }) {
  //     return new Promise((resolve, reject) => {
  //         dispatch('resetUserInfo')
  //         resetRouter()

  //         resolve()
  //         // logout().then(() => {
  //         //     dispatch('resetUserInfo')
  //         //     resetRouter()
  //         //     // reset visited views and cached views
  //         //     resolve()
  //         // }).catch(error => {
  //         //     reject(error)
  //         // })
  //     })
  // }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
