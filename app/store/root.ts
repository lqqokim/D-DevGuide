import { GetterTree, ActionContext, ActionTree, MutationTree } from 'vuex';
import { RootState } from 'store';

export const types = {};

export interface State {}

export const state = (): State => ({});

export const getters: GetterTree<State, RootState> = {};

export interface Actions<S, R> extends ActionTree<S, R> {
  nuxtServerInit(context: ActionContext<S, R>): void;
}

export const actions: Actions<State, RootState> = {
  // @ts-ignore
  async nuxtServerInit({ commit, dispatch }, { app, req }) {
    console.log('nuxtServerInit');
    let userToken;

    // sever-side-render
    if (req) {
      userToken = app.$cookies.get('KEY');
      console.log('1) sever-side-render', userToken);
    }
    // client-side-render
    else {
      userToken = sessionStorage.getItem('KEY');
      console.log('2) client-side-render', userToken);
    }

    // 쿠키에서 가져온 유효한 토큰이 있는 경우
    if (userToken) {
      commit('user/setTokenLogin', userToken);

      try {
        await dispatch('user/encryptToken', userToken);
        // // @ts-ignore
        // const decryptUserInfo = await this.$axios.$post('api/auth/token', {
        //   token: userToken,
        // });
        // console.log(
        //   '쿠키에서 가져온 유효한 토큰이 있는 경우 decryptUserInfo :: ',
        //   decryptUserInfo.data
        // );
        //
        // /**
        //  *
        //  * mongodb 정보 가져오는 로직
        //  *
        //  */
        //
        // commit('user/setTokenLogin', userToken);
        // commit('user/setUser', decryptUserInfo.data);
      } catch (e) {}
    }
  },
};

export const mutations: MutationTree<State> = {};
