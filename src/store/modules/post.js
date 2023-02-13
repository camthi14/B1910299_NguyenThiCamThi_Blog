import postApi from "@/apis/postApi";
import toast from "./toast";

const state = () => ({
  posts: [],
  isLoading: false,
  error: "",
  filters: {
    page: 1,
    limit: 5,
    where: "",
  },
  pagination: {
    page: 1,
    limit: 5,
    totalRows: 5,
  },
});

const mutations = {
  fetchStart: (state) => {
    state.isLoading = true;
  },
  fetchCreateSuccess: (state) => {
    state.isLoading = false;
  },
  fetchAllSuccess: (state, payload) => {
    state.isLoading = false;
    state.posts = payload.elements;
    state.pagination = payload.meta.pagination;
  },
  fetchFail: (state, error) => {
    state.isLoading = false;
    state.error = error;
  },
};

const actions = {
  fetchCreatePost: ({ commit, dispatch }, payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        commit("fetchStart");
        const response = await postApi.create(payload);
        if (response && response.elements) {
          const payload = {
            text: "Thêm bài viết thành công!",
            color: "success",
            open: true,
            timeout: 2000,
          };
          dispatch("toast/startToast", payload, { root: true });
          commit("fetchCreateSuccess");
          resolve(true);
        }
      } catch (error) {
        let payload = {
          text: error.message,
          color: "error",
          open: true,
          timeout: 2000,
        };
        if (error.response) {
          payload = {
            ...payload,
            text: error.response.data.errors.message,
          };
          commit("fetchFail", error.response.data.errors.message);
        } else {
          commit("fetchFail", error.message);
        }
        dispatch("toast/startToast", payload, { root: true });
        reject(error);
      }
    });
  },
  fetchAllPost: async ({ commit, dispatch }, payload) => {
    try {
      commit("fetchStart");

      const response = await postApi.getAll(payload);

      if (response && response.elements) {
        commit("fetchAllSuccess", response);
      }
    } catch (error) {
      if (!error.response) {
        const payload = {
          text: error.message,
          color: "error",
          open: true,
        };
        dispatch("toast/startToast", payload, { root: true });
        commit("fetchFail", error.message);
      }
    }
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
