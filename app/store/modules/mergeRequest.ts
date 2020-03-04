/* eslint-disable */
import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from '@/store';
import { BranchDiffData } from '~/store/modules/branch';
import { ALERT_TYPE } from '~/store/modules/common';

interface MergeRequestState {
  mergeRequest: MergeRequest;
  mergeRequestList: [];
  mergeRequestDiffData: Array<BranchDiffData>;
}

interface Response {
  config: object;
  data: any;
  headers: object;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}

export interface MergeRequest {
  id: number;
  title: string;
  description: string;
  state: string;
  targetBranch: string;
  sourceBranch: string;
}

export const state = (): MergeRequestState => ({
  mergeRequest: {
    id: -1,
    title: '',
    description: '',
    state: '',
    targetBranch: '',
    sourceBranch: '',
  },
  mergeRequestList: [],
  mergeRequestDiffData: [],
});

export const namespaced: boolean = true;

export const getters: GetterTree<MergeRequestState, RootState> = {
  // getMergeRequestList(state) {
  //   return state.mergeRequestList;
  // },
};

export const mutations: MutationTree<MergeRequestState> = {
  setMergeRequestList(state, payload: []) {
    state.mergeRequestList = payload;
  },
  setMergeRequestDiffData(state, payload: Array<BranchDiffData>) {
    state.mergeRequestDiffData = payload;
  },
};

export const actions: ActionTree<MergeRequestState, RootState> = {
  async getMergeRequestList(
    { commit, state },
    payload: { productCode: string; gitlabToken: string }
  ): Promise<any> {
    try {
      if (!payload.gitlabToken) {
        return;
      }

      const productData: Response = await this.$axios.get(
        'api/docs/product/getProjectId',
        {
          params: {
            productCode: payload.productCode,
          },
        }
      );

      const mergeRequestList: Response = await this.$axios.get(
        'api/docs/mergeRequest/getMergeRequestList',
        {
          params: {
            projectId: productData.data.projectId,
            gitlabToken: payload.gitlabToken,
          },
        }
      );
      const docMergeRequest: Array<any> = [];
      mergeRequestList.data.forEach((mergeRequest) => {
        if (mergeRequest.source_branch.indexOf('DOC_') === 0) {
          docMergeRequest.push(mergeRequest);
        }
      });

      commit('setMergeRequestList', docMergeRequest);
    } catch (err) {
      console.error(err);
    }
  },
  async createMergeRequest(
    { commit, state, dispatch },
    payload: {
      projectId: string;
      productCode: string;
      sourceBranch: string;
      targetBranch: string;
      title: string;
      description: string;
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
          msg: '병합요청중입니다.',
        },
        { root: true }
      );

      await this.$axios.get('api/docs/mergeRequest/createMergeRequest', {
        params: {
          projectId: payload.projectId,
          sourceBranch: payload.sourceBranch,
          targetBranch: payload.targetBranch,
          title: payload.title,
          description: payload.description,
          gitlabToken: payload.gitlabToken,
        },
      });

      await dispatch('getMergeRequestList', {
        productCode: payload.productCode,
        gitlabToken: payload.gitlabToken,
      });

      // Loading Alert Close
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: false,
          msg: '병합요청중입니다.',
        },
        { root: true }
      );
    } catch (err) {
      console.error(err);
    }
  },
  async removeMergeRequest(
    { commit, state, dispatch },
    payload: {
      projectId: string;
      productCode: string;
      mergeRequestIId: number;
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
          msg: '병합요청을 삭제중입니다.',
        },
        { root: true }
      );

      await this.$axios.get('api/docs/mergeRequest/removeMergeRequest', {
        params: {
          projectId: payload.projectId,
          mergeRequestIId: payload.mergeRequestIId,
          gitlabToken: payload.gitlabToken,
        },
      });

      await dispatch('getMergeRequestList', {
        productCode: payload.productCode,
        gitlabToken: payload.gitlabToken,
      });

      // Loading Alert Close
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: false,
          msg: '병합요청을 삭제중입니다.',
        },
        { root: true }
      );
    } catch (err) {
      console.error(err);
    }
  },
  acceptMergeRequest(
    { commit, state, dispatch },
    payload: {
      projectId: string;
      productCode: string;
      mergeRequestIId: number;
      gitlabToken: string;
    }
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        // Loading Alert
        dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.LOADING,
            isShow: true,
            msg: '병합요청 승인중입니다.',
          },
          { root: true }
        );

        const { data } = await this.$axios.get(
          'api/docs/mergeRequest/acceptMergeRequest',
          {
            params: {
              projectId: payload.projectId,
              mergeRequestIId: payload.mergeRequestIId,
              gitlabToken: payload.gitlabToken,
            },
          }
        );

        await dispatch('getMergeRequestList', {
          productCode: payload.productCode,
          gitlabToken: payload.gitlabToken,
        });

        // Loading Alert Close
        dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.LOADING,
            isShow: false,
            msg: '병합요청 승인중입니다.',
          },
          { root: true }
        );
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  },
  async getChangesData(
    { commit, state, dispatch },
    payload: {
      productCode: string;
      mergeRequestIId: number;
      gitlabToken: string;
    }
  ): Promise<any> {
    try {
      if (!payload.gitlabToken) {
        return;
      }

      // Loading Alert
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: true,
          msg: '비교내용을 불러오는 중입니다.',
        },
        { root: true }
      );

      const productData: Response = await this.$axios.get(
        'api/docs/product/getProjectId',
        {
          params: {
            productCode: payload.productCode,
          },
        }
      );

      const mergeRequestChangesData: Response = await this.$axios.get(
        'api/docs/mergeRequest/getChangesData',
        {
          params: {
            projectId: productData.data.projectId,
            mergeRequestIId: payload.mergeRequestIId,
            gitlabToken: payload.gitlabToken,
          },
        }
      );
      commit('setMergeRequestDiffData', mergeRequestChangesData.data.changes);

      // Loading Alert Close
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: false,
          msg: '비교내용을 불러오는 중입니다.',
        },
        { root: true }
      );
    } catch (err) {
      console.error(err);
    }
  },
};
