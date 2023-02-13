const state = () => ({
  text: "",
  timeout: 3000,
  location: "top right",
  color: "error",
  open: false,
});

const mutations = {
  SET_STATE: (state, payload) => {
    state.text = payload.text;
    state.color = payload.color;
    state.open = payload.open;
    state.timeout = payload.timeout || 1500;
  },
  SET_OPEN: (state, payload) => {
    state.open = payload.open;
  },
};

const actions = {
  startToast: ({ commit }, payload) => {
    commit("SET_STATE", payload);
  },
  saveOpen: ({ commit }, payload) => {
    commit("SET_OPEN", payload);
  },
};

const getters = {
  getState: (state) => state,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
