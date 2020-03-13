/* eslint-disable */
import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from '@/store';
import { Notice } from '~/store/modules/notice';
import { ALERT_TYPE } from '~/store/modules/common';

interface VersionState {
  versionList: Array<Version>;
}

export interface Version {
  productCode: string;
  tagName: string;
  createdAt: string;
  description: string;
  authorName: string;
  authorID: string;
}

interface Response {
  config: object;
  data: any;
  headers: object;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}

export const state = (): VersionState => ({
  versionList: [],
});

export const namespaced: boolean = true;

export const getters: GetterTree<VersionState, RootState> = {};

export const mutations: MutationTree<VersionState> = {
  setVersionList(state, payload: Array<Version>) {
    state.versionList = payload;
  },
};

export const actions: ActionTree<VersionState, RootState> = {
  // version 목록 가져오기
  async getVersionList(
    { commit, state, dispatch },
    payload: { productCode: string }
  ): Promise<any> {
    try {
      // Loading Alert
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: true,
          msg: '버전 리스트를 가져오는 중입니다.',
        },
        { root: true }
      );

      const { data } = await this.$axios.get(
        'api/docs/version/getVersionList',
        {
          params: payload,
        }
      );

      if (data.success && data.data) {
        commit('setVersionList', data.data);
      }

      // Loading Alert Close
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: false,
          msg: '버전 리스트를 가져오는 중입니다.',
        },
        { root: true }
      );
    } catch (e) {
      await dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.ERROR,
          isShow: true,
          msg: `[${e.response.status}] ${e.response.data.msg}`,
        },
        { root: true }
      );
      // error 가 나면 이후 코드를 실행하지 않기 위해 throw error 를 해줌
      throw new Error(e.response.data.msg);
    }
  },
  // version 생성
  async createVersion(
    { commit, state, dispatch },
    payload: {
      projectId: string;
      productCode: string;
      tagName: string;
      versionName: string;
      ref: string;
      gitlabToken: string;
    }
  ): Promise<any> {
    try {
      // Loading Alert
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: true,
          msg: '버전을 생성 중입니다.',
        },
        { root: true }
      );

      // gitlab 에 버전 생성
      const { data } = await this.$axios.get('api/docs/version/createVersion', {
        params: {
          projectId: payload.projectId,
          tagName: 'DOC_' + payload.tagName,
          tagDescription: payload.versionName,
          ref: payload.ref,
          gitlabToken: payload.gitlabToken,
        },
      });
      if (data.success && data.data) {
        // mongoDB 에 버전 생성
        const insertInMongo: Response = await this.$axios.post(
          'api/docs/version/insertVersion',
          {
            productCode: payload.productCode,
            tagName: payload.tagName,
            createdAt: data.data.created_at.replace('T', ' ').split('.')[0],
            description: payload.versionName,
            authorName: data.data.author.name,
            authorID: data.data.author.username,
          }
        );

        if (insertInMongo.data.success && insertInMongo.data.data) {
          await dispatch('getVersionList', {
            productCode: payload.productCode,
          });
        }
      }

      // Loading Alert Close
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: false,
          msg: '버전을 생성 중입니다.',
        },
        { root: true }
      );
    } catch (e) {
      await dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.ERROR,
          isShow: true,
          msg: `[${e.response.status}] ${e.response.data.msg}`,
        },
        { root: true }
      );
      // error 가 나면 이후 코드를 실행하지 않기 위해 throw error 를 해줌
      throw new Error(e.response.data.msg);
    }
  },
  // version 삭제
  async removeVersion(
    { commit, state, dispatch },
    payload: {
      projectId: string;
      tagName: string;
      productCode: string;
      gitlabToken: string;
      description: string;
      authorName: string;
      authorID: string;
    }
  ): Promise<any> {
    try {
      // Loading Alert
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: true,
          msg: '버전을 삭제 중입니다.',
        },
        { root: true }
      );

      // gitlab 에서 버전 삭제
      await this.$axios.get('api/docs/version/removeVersion', {
        params: {
          projectId: payload.projectId,
          tagName: 'DOC_' + payload.tagName,
          gitlabToken: payload.gitlabToken,
        },
      });

      // mongoDB 에서 버전 삭제
      await this.$axios.get('api/docs/version/deleteVersion', {
        params: {
          productCode: payload.productCode,
          tagName: payload.tagName,
          description: payload.description,
          authorName: payload.authorName,
          authorID: payload.authorID,
        },
      });

      await dispatch('getVersionList', {
        productCode: payload.productCode,
      });

      // Loading Alert
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: false,
          msg: '버전을 삭제 중입니다.',
        },
        { root: true }
      );
    } catch (e) {
      await dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.ERROR,
          isShow: true,
          msg: `[${e.response.status}] ${e.response.data.msg}`,
        },
        { root: true }
      );
      // error 가 나면 이후 코드를 실행하지 않기 위해 throw error 를 해줌
      throw new Error(e.response.data.msg);
    }
  },

  // 버전 목록 순서 수정
  async updateVersionIndex(
    { commit, dispatch },
    payload: Version[]
  ): Promise<any> {
    try {
      const { data } = await this.$axios.put(
        'api/docs/version/updateVersionIndex',
        payload
      );

      if (data.success && data.data) {
        commit('setVersionList', data.data);
      }
    } catch (e) {
      await dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.ERROR,
          isShow: true,
          msg: `[${e.response.status}] ${e.response.data.msg}`,
        },
        { root: true }
      );
      // error 가 나면 이후 코드를 실행하지 않기 위해 throw error 를 해줌
      throw new Error(e.response.data.msg);
    }
  },
};
