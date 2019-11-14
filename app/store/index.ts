import Vuex from 'vuex';
import * as root from './root';
import * as common from './modules/common';

import * as user from './modules/user';
import * as projects from './modules/projects';
import * as video from './modules/video';

export type RootState = root.State;

const createStore = () => {
  return new Vuex.Store({
    state: root.state(),
    getters: root.getters,
    mutations: root.mutations,
    actions: root.actions,
    modules: {
      common,
      user,
      projects,
      video,
    },
  });
};

export default createStore;
