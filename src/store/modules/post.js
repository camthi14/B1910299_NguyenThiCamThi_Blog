import postApi from "@/apis/postApi";
import moment from "moment/moment";
import toast from "./toast";

const state = () => ({
  posts: [],
  postSlides: [],
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
    state.filters = {
      ...state.filters,
      limit: payload.meta.pagination.limit || 5,
    };
  },
  fetchAllHomeSuccess: (state, payload) => {
    state.isLoading = false;
    state.posts.push(...payload.elements);
    state.pagination = payload.meta.pagination;
    state.filters = {
      ...state.filters,
      limit: payload.meta.pagination.limit || 5,
    };
  },
  fetchAllSlideSuccess: (state, payload) => {
    state.isLoading = false;
    state.postSlides = payload.elements;
    state.filters = {
      ...state.filters,
      limit: payload.meta.pagination.limit || 5,
    };
  },
  fetchUpdateSuccess: (state) => {
    state.isLoading = false;
  },
  fetchFail: (state, error) => {
    state.isLoading = false;
    state.error = error;
  },
  setFilter: (state, payload) => {
    state.filters = {
      ...state.filters,
      ...payload,
    };
  },
  resetValue: (state) => {
    state.filters = {
      page: 1,
      limit: 5,
      where: "",
    };
    state.pagination = {
      page: 1,
      limit: 5,
      totalRows: 5,
    };
    state.posts = [];
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
      commit("setFilter", {
        page: payload.page,
        limit: payload.limit,
        where: payload.where,
      });

      const response = await postApi.getAll(payload);

      if (response && response.elements) {
        if (payload?.isHome) {
          commit("fetchAllHomeSuccess", response);
        } else {
          commit("fetchAllSuccess", response);
        }
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

  fetchAllPostSlide: async ({ commit, dispatch }, payload) => {
    try {
      commit("fetchStart");

      const response = await postApi.getAllSlide(payload);

      if (response && response.elements) {
        commit("fetchAllSlideSuccess", response);
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

  fetchDeletePost: async ({ commit, dispatch, state }, payload) => {
    try {
      commit("fetchStart");

      const response = await postApi.delete(payload);

      if (response) {
        const payload = {
          text: "Xoá bài viết thành công!",
          color: "success",
          open: true,
        };
        dispatch("toast/startToast", payload, { root: true });
        dispatch("fetchAllPost", { ...state.filters });
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

  fetchUpdatePost: ({ commit, dispatch }, payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        commit("fetchStart");
        const response = await postApi.update(payload);
        if (response && response.elements) {
          const payload = {
            text: "Cập nhật bài viết thành công!",
            color: "success",
            open: true,
            timeout: 2000,
          };
          dispatch("toast/startToast", payload, { root: true });
          commit("fetchUpdateSuccess");
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
  changeFilter: ({ commit }, payload) => {
    commit("setFilter", payload);
  },
  reset({ commit }) {
    commit("resetValue");
  },
};

const getters = {
  getPost: (state) => {
    if (state.posts.length > 0) {
      return state.posts.map((post) => ({
        ...post,
        createdAt: moment(post.createdAt).format("YYYY-MM-DD h:mm A"),
      }));
    }
    return [];
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
