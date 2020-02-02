import { GetterTree, ActionContext, ActionTree, MutationTree } from 'vuex';
import { RootState } from 'store';
import { CommonState, state as commonState } from '@/store/modules/common';
import {
  DownloadState,
  state as downloadState,
} from '@/store/modules/download';
import { UserState, state as userState } from '@/store/modules/user';
import { VideoState, state as videoState } from '@/store/modules/video';
import { ForumState, state as forumState } from '~/store/modules/forum';

export const types = {};

export interface State {
  common: CommonState;
  download: DownloadState;
  user: UserState;
  video: VideoState;
  forum: ForumState;
}

export const state = (): State => ({
  common: commonState(),
  download: downloadState(),
  user: userState(),
  video: videoState(),
  forum: forumState(),
});

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
      commit('user/isSetToken', true);
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
    } else {
      console.log('토큰이 존재하지 않음');
      // commit('user/setUser', {
      //   ID: 'kis4204',
      //   NAME: '김인수A',
      //   deptPath: '더존비즈온|ERP개발본부|플랫폼개발센터|플랫폼개발1팀|팀원',
      //   AUTHORITY: 'E',
      // });
    }
  },
};

export const mutations: MutationTree<State> = {};
