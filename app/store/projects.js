// import { GET_PROJECT_LIST, SET_PROJECT_LIST } from '~/utils/storeTypes';
//
// export const state = () => ({
//   list: [],
// });
//
// export const mutations = {
//   [SET_PROJECT_LIST](state, payload) {
//     state.list = payload;
//   },
// };
//
// export const actions = {
//   async [GET_PROJECT_LIST]({ commit }) {
//     const url = '/api/projects';
//     const projects = await this.$axios.$get(url);
//
//     commit(SET_PROJECT_LIST, projects);
//   },
// };
import { GET_PROJECT_LIST, SET_PROJECT_LIST } from '~/utils/storeTypes';

export const state = () => ({
  list: [],
});

export const mutations = {
  [SET_PROJECT_LIST](state, payload) {
    state.list = payload;
  },
};

export const actions = {
  async [GET_PROJECT_LIST]({ commit }) {
    const url = '/api/product/productList';
    const projects = await this.$axios.$get(url);

    commit(SET_PROJECT_LIST, projects);
  },
};
