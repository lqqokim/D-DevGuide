import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from '@/store';

interface VersionState {
  versionList: Array<any>;
}

export interface Version {}

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

export const getters: GetterTree<VersionState, RootState> = {
  // getFilePath(state) {
  //   const fullFilePath = state.filePath.split('/');
  //   return fullFilePath[fullFilePath.length - 1].split('.md')[0];
  // },
};

export const mutations: MutationTree<VersionState> = {
  setVersionList(state, payload: []) {
    state.versionList = payload;
  },
};

export const actions: ActionTree<VersionState, RootState> = {
  async getVersionList(
    { commit, state },
    payload: { productCode: string }
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
      const versionListData: Response = await this.$axios.get(
        'api/docs/version/getVersionList',
        {
          params: {
            projectId: productData.data.projectId,
          },
        }
      );
      versionListData.data.forEach((versionData) => {
        versionData.created_at = versionData.created_at
          .replace('T', ' ')
          .split('.')[0];
      });
      commit('setVersionList', versionListData.data);
    } catch (err) {
      console.error(err);
    }
  },
  async createVersion(
    { commit, state, dispatch },
    payload: {
      projectId: number;
      productCode: string;
      tagName: string;
      versionName: string;
      ref: string;
      gitlabToken: string;
    }
  ): Promise<any> {
    try {
      await this.$axios.get('api/docs/version/createVersion', {
        params: {
          projectId: payload.projectId,
          tagName: payload.tagName,
          tagDescription: payload.versionName,
          ref: payload.ref,
          gitlabToken: payload.gitlabToken,
        },
      });
      await dispatch('getVersionList', {
        productCode: payload.productCode,
      });
    } catch (err) {
      console.error(err);
    }
  },
  async removeVersion(
    { commit, state, dispatch },
    payload: {
      projectId: number;
      tagName: string;
      productCode: string;
      gitlabToken: string;
    }
  ): Promise<any> {
    try {
      await this.$axios.get('api/docs/version/removeVersion', {
        params: {
          projectId: payload.projectId,
          tagName: payload.tagName,
          gitlabToken: payload.gitlabToken,
        },
      });
      await dispatch('getVersionList', {
        productCode: payload.productCode,
      });
    } catch (err) {
      console.error(err);
    }
  },
};
