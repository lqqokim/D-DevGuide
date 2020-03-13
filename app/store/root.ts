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
  nuxtServerInit({ commit, dispatch }, { app, req }) {
    console.log('nuxtServerInit ');
    // // console.log(app.$cookies.getAll());
    // let userToken;
    //
    // // server-side-render
    // if (req) {
    //   userToken = app.$cookies.get('KEY');
    //   console.log('Server Side Render token', userToken !== undefined);
    //   commit('user/isSetToken', true);
    // }
    // // client-side-render
    // else {
    //   userToken = sessionStorage.getItem('KEY');
    //   console.log('Client Side Render token', userToken !== undefined);
    // }
    //
    // // /**
    // //  * 토큰이 없을 경우
    // //  */
    // // userToken = 'token';
    // try {
    //   // 쿠키에서 가져온 유효한 토큰이 있는 경우
    //   if (userToken) {
    //     await dispatch('user/encryptToken', userToken);
    //   } else {
    //     console.log('토큰이 존재하지 않음');
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  },
};

export const mutations: MutationTree<State> = {};
