/* eslint-disable */
import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from '@/store';
import { ALERT_TYPE } from '~/store/modules/common';

interface BranchState {
  branchList: Array<Branch>;
  commitList: Array<Commit>;
  branchNameList: Array<string>;
  branchDiffData: Array<BranchDiffData>;
}

interface Response {
  config: object;
  data: any;
  headers: object;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}

export interface Branch {
  can_push: boolean;
  commit: Commit;
  name: string;
}

export interface BranchDiffData {
  old_path: string;
  new_path: string;
  diff: string;
  new_file: boolean;
  renamed_file: boolean;
  deleted_file: boolean;
  a_mode: string;
  b_mode: string;
}

export interface Commit {
  author_email: string;
  author_name: string;
  authored_date: string;
  changed_time: string;
  committed_date: string;
  committed_email: string;
  committed_name: string;
  created_at: string;
  id: string;
  message: string;
  parent_ids: string;
  short_id: string;
  title: string;
}

export const state = (): BranchState => ({
  branchList: [],
  commitList: [],
  branchNameList: [],
  branchDiffData: [],
});

export const namespaced: boolean = true;

export const getters: GetterTree<BranchState, RootState> = {
  getProjectBranchList(state) {
    return state.branchList;
  },
};

export const mutations: MutationTree<BranchState> = {
  setBranchList(state, payload: []) {
    state.branchList = payload;
  },
  setBranchNameList(state, payload: []) {
    state.branchNameList = payload;
  },
  setCommitList(state, payload: []) {
    state.branchList = payload;
  },
  createBranch(state, payload: Branch) {
    state.branchList.push(payload);
    state.branchNameList.push(payload.name);
  },
  setMergeRequestDiffData(state, payload: Array<BranchDiffData>) {
    state.branchDiffData = payload;
  },
};

export const actions: ActionTree<BranchState, RootState> = {
  async getBranchList(
    { commit, dispatch },
    payload: { productCode: string; projectId: string; gitlabToken: string }
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
          msg: '브랜치 목록을 불러오는 중입니다.',
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
      const branchList: Response = await this.$axios.get(
        'api/docs/branch/getBranchList',
        {
          params: {
            projectId: productData.data.projectId,
            gitlabToken: payload.gitlabToken,
          },
        }
      );

      const docBranch: Array<any> = [];
      const docBranchName: Array<string> = [];
      if (productData.data.targetBranch !== 'master') {
        docBranchName.push(productData.data.targetBranch);
        docBranchName.push('master');
      } else {
        docBranchName.push('master');
      }
      branchList.data.forEach((branch) => {
        if (branch.name.indexOf('DOC_') === 0) {
          docBranch.push(branch);
          docBranchName.push(branch.name);
          const committedDate: number = new Date( // 커밋 시간
            branch.commit.committed_date
          ).valueOf();
          const currentDate: number = new Date().valueOf(); // 현재 시간
          let diffTime: number = currentDate - committedDate; // 현재 시간에서 커밋 시간 뺀 값
          const diffTimeToString: string = diffTime.toString();
          diffTime =
            parseInt(
              diffTimeToString.substring(0, diffTimeToString.length - 3)
            ) / 3600;
          if (diffTime / 24 >= 1) {
            branch.commit.changed_time = Math.floor(diffTime / 24) + '일전';
          } else {
            branch.commit.changed_time =
              Math.floor(diffTime) < 0 || Math.floor(diffTime) === 0
                ? '방금전'
                : Math.floor(diffTime) + '시간전';
          }
        }
      });
      commit('setBranchList', docBranch);
      commit('setBranchNameList', docBranchName);

      // Loading Alert Close
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: false,
          msg: '브랜치 목록을 불러오는 중입니다.',
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
      throw new Error(e.response.data.msg);
    }
  },
  async getBranchNameList(
    { commit, state },
    payload: { projectId: string; gitlabToken: string }
  ): Promise<any> {
    try {
      const branchList: Response = await this.$axios.get(
        'api/docs/branch/getBranchList',
        {
          params: {
            projectId: payload.projectId,
            gitlabToken: payload.gitlabToken,
          },
        }
      );
      const docBranchName: Array<string> = [];
      branchList.data.forEach((branch) => {
        docBranchName.push(branch.name);
      });
      commit('setBranchNameList', docBranchName);
    } catch (e) {
      console.error(e.response.status);
    }
  },
  async getBranchChangesData(
    { commit, state, dispatch },
    payload: {
      productCode: string;
      branchName: string;
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
          msg: '비교 내용을 불러오는 중입니다.',
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

      const branchChangesData: Response = await this.$axios.get(
        'api/docs/repository/getBranchChangesData',
        {
          params: {
            projectId: productData.data.projectId,
            from: productData.data.targetBranch,
            to: payload.branchName,
            gitlabToken: payload.gitlabToken,
          },
        }
      );

      commit('setMergeRequestDiffData', branchChangesData.data.diffs);

      // Loading Alert Close
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: false,
          msg: '비교 내용을 불러오는 중입니다.',
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
    }
  },
  async createBranch(
    { commit, state, dispatch },
    payload: {
      projectId: string;
      branchName: string;
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
          msg: '브랜치를 생성중입니다.',
        },
        { root: true }
      );

      const { data } = await this.$axios.post(
        'api/docs/branch/createBranch',
        payload
      );

      if (data.success && data.data) {
        commit('createBranch', data.data);
      }

      // Loading Alert Close
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: false,
          msg: '브랜치를 생성중입니다.',
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
    }
  },
};
