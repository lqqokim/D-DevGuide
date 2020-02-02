import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from '@/store';

interface CommitState {
  commit: Commit;
  commitList: Array<any>;
  diff: [];
}

export interface Commit {
  id: string;
  // short_id: string;
  title: string;
  // author_name: string;
  // author_email: string;
  // authored_date: string;
  // created_at: string;
  // committer_name: string;
  // committer_email: string;
  // committed_date: string;
  message: string;
  // parent_ids: object;
}

interface Response {
  config: object;
  data: any;
  headers: object;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}

export const state = (): CommitState => ({
  commit: {
    id: '',
    // short_id: '',
    title: '',
    // author_name: '',
    // author_email: '',
    // authored_date: '',
    // created_at: '',
    // committer_name: '',
    // committer_email: '',
    // committed_date: '',
    message: '',
    // parent_ids: [],
  },
  commitList: [],
  diff: [],
});

export const namespaced: boolean = true;

export const getters: GetterTree<CommitState, RootState> = {};

export const mutations: MutationTree<CommitState> = {
  setCommitList(state, payload: Array<any>) {
    // state.commitList.push(payload);
    state.commitList = payload;
  },
  setCommitDiff(state, payload: any) {
    state.diff = payload;
  },
};

export const actions: ActionTree<CommitState, RootState> = {
  async getCommitList(
    { commit, state },
    payload: { productCode: string; branchName: string; gitlabToken: string }
  ): Promise<any> {
    try {
      const productData: Response = await this.$axios.get(
        'api/docs/product/getProjectId',
        {
          params: {
            productCode: payload.productCode,
          },
        }
      );

      const commitData: Response = await this.$axios.get(
        'api/docs/commit/getCommitList',
        {
          params: {
            projectId: productData.data.projectId,
            branchName: payload.branchName,
            gitlabToken: payload.gitlabToken,
          },
        }
      );

      // TODO 일단 10개만 돌림
      for (let i = 0; i < 10; i++) {
        const testDiff: Response = await this.$axios.get(
          'api/docs/commit/getCommitDiff',
          {
            params: {
              projectId: productData.data.projectId,
              sha: commitData.data[i].short_id,
              gitlabToken: payload.gitlabToken,
            },
          }
        );
        commitData.data[i].diffData = testDiff.data;

        const committedDate: number = new Date( // 커밋 시간
          commitData.data[i].committed_date
        ).valueOf();
        const currentDate: number = new Date().valueOf(); // 현재 시간
        let diffTime: number = currentDate - committedDate; // 현재 시간에서 커밋 시간 뺀 값
        const diffTimeToString: string = diffTime.toString();
        diffTime =
          parseInt(diffTimeToString.substring(0, diffTimeToString.length - 3)) /
          3600;
        if (diffTime / 24 >= 1) {
          const splitCommittedDate = commitData.data[i].committed_date.split(
            'T'
          )[0];
          commitData.data[i].changed_time = splitCommittedDate;
        } else {
          commitData.data[i].changed_time =
            Math.floor(diffTime) < 0 || Math.floor(diffTime) === 0
              ? '방금전'
              : Math.floor(diffTime) + '시간전';
        }

        const referenceData: Response = await this.$axios.get(
          'api/docs/commit/getReference',
          {
            params: {
              projectId: productData.data.projectId,
              sha: commitData.data[i].short_id,
              gitlabToken: payload.gitlabToken,
            },
          }
        );
      }

      commit('setCommitList', commitData.data);
    } catch (err) {
      console.error(err);
    }
  },
  async getSingleCommit(
    { commit, state },
    payload: { projectId: number; sha: string; gitlabToken: string }
  ): Promise<any> {
    try {
      const commitData: Response = await this.$axios.get(
        'api/docs/commit/getSingleCommit',
        {
          params: {
            projectId: payload.projectId,
            sha: payload.sha,
            gitlabToken: payload.gitlabToken,
          },
        }
      );
    } catch (err) {
      console.error(err);
    }
  },
  async getCommitDiff(
    { commit, state },
    payload: { projectId: number; sha: string; gitlabToken: string }
  ): Promise<any> {
    try {
      const diffData: Response = await this.$axios.get(
        'api/docs/commit/getCommitDiff',
        {
          params: {
            projectId: payload.projectId,
            sha: payload.sha,
            gitlabToken: payload.gitlabToken,
          },
        }
      );
      commit('setCommitDiff', diffData.data);
    } catch (err) {
      console.error(err);
    }
  },
  async createCommit(
    { commit, state },
    payload: {
      productCode: string;
      branchName: string;
      commitMessage: string;
      actions: Array<any>;
      gitlabToken: string;
    }
  ): Promise<any> {
    try {
      const productData: Response = await this.$axios.get(
        'api/docs/product/getProjectId',
        {
          params: {
            productCode: payload.productCode,
          },
        }
      );

      await this.$axios.post('api/docs/commit/createCommit', {
        projectId: productData.data.projectId,
        branchName: payload.branchName,
        commitMessage: payload.commitMessage,
        actions: payload.actions,
        gitlabToken: payload.gitlabToken,
      });
    } catch (err) {
      console.error(err);
    }
  },
};
