import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import * as root from './root';
import * as common from './modules/common';

import * as user from './modules/user';
import * as video from './modules/video';
import * as document from './modules/document';
import * as download from './modules/download';
import * as product from './modules/product';
import * as branch from './modules/branch';
import * as repository from './modules/repository';
import * as mergeRequest from './modules/mergeRequest';
import * as commit from './modules/commit';
import * as version from './modules/version';
import * as notice from './modules/notice';
import * as forum from './modules/forum';
import * as search from './modules/search';
import * as searchGWUser from './modules/searchGWUser';

export type RootState = root.State;
Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
});

export const store = new Vuex.Store({
  state: root.state(),
  getters: root.getters,
  mutations: root.mutations,
  actions: root.actions,
  // @ts-ignore
  plugins: [vuexLocal.plugin],
  modules: {
    common,
    user,
    video,
    document,
    download,
    product,
    branch,
    repository,
    mergeRequest,
    commit,
    version,
    notice,
    forum,
    search,
    searchGWUser,
  },
});

const createStore = () => {
  return store;
};

export default createStore;
