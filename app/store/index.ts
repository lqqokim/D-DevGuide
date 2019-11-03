import Vuex from 'vuex';
import * as root from './root';
import * as user from './modules/user';
import * as projects from './modules/projects';

export type RootState = root.State;

const createStore = () => {
  return new Vuex.Store({
    state: root.state(),
    getters: root.getters,
    mutations: root.mutations,
    actions: root.actions,
    modules: {
      user,
      projects,
    },
  });
};

export default createStore;
