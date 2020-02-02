/* eslint-disable */
import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from '@/store';

interface BranchState {
  // branch: Branch;
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
  // branch: {
  //   can_push: true,
  //   commit: {},
  //   name: '',
  // },
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
  // removeBranch(state, payload: string) {
  //   state.branchList = state.branchList.filter((branch) => {
  //     return branch.name !== payload;
  //   });
  //   state.branchNameList = state.branchNameList.filter((branchName) => {
  //     return branchName !== payload;
  //   });
  //   console.log(state.branchList);
  //   console.log(state.branchNameList);
  // },
};

export const actions: ActionTree<BranchState, RootState> = {
  async getBranchList(
    { commit },
    payload: { productCode: string; projectId: number; gitlabToken: string }
  ): Promise<any> {
    try {
      console.log('gitlabToken: ', payload.gitlabToken);
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
    } catch (err) {
      console.error(err);
      alert('존재하지 않는 프로젝트입니다.');
    }
  },
  async getBranchNameList(
    { commit, state },
    payload: { projectId: number; gitlabToken: string }
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
      docBranchName.push('master');
      branchList.data.forEach((branch) => {
        if (branch.name.indexOf('DOC_') === 0) {
          docBranchName.push(branch.name);
        }
      });
      commit('setBranchNameList', docBranchName);
    } catch (err) {
      console.error(err.response.status);
    }
  },
  async getBranchChangesData(
    { commit, state },
    payload: {
      projectId: number;
      branchName: string;
      targetBranch: string;
      gitlabToken: string;
    }
  ): Promise<any> {
    try {
      const branchChangesData: Response = await this.$axios.get(
        'api/docs/repository/getBranchChangesData',
        {
          params: {
            projectId: payload.projectId,
            from: payload.targetBranch,
            to: payload.branchName,
            gitlabToken: payload.gitlabToken,
          },
        }
      );

      commit('setMergeRequestDiffData', branchChangesData.data.diffs);
    } catch (err) {
      console.error(err);
    }
  },
  // async removeBranch(
  //   { commit, state, dispatch },
  //   payload: {
  //     projectId: number;
  //     productCode: string;
  //     branchName: string;
  //   }
  // ): Promise<any> {
  //   try {
  //     const { data } = await this.$axios.get('api/docs/branch/removeBranch', {
  //       params: {
  //         projectId: payload.projectId,
  //         branchName: payload.branchName,
  //       },
  //     });
  //
  //     if (data.success) {
  //       commit('removeBranch', payload.branchName);
  //     }
  //     // dispatch('getBranchList', {
  //     //   productCode: payload.productCode,
  //     // });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // },
  async createBranch(
    { commit, state, dispatch },
    payload: {
      projectId: number;
      branchName: string;
      ref: string;
      gitlabToken: string;
    }
  ): Promise<any> {
    try {
      const { data } = await this.$axios.post(
        'api/docs/branch/createBranch',
        payload
      );

      if (data.success && data.data) {
        commit('createBranch', data.data);
      }
    } catch (err) {
      console.error(err);
    }
  },
};
