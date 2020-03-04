/* eslint-disable */
import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from '@/store';
import { ALERT_TYPE } from '~/store/modules/common';

interface searchGWUserState {
  searchGWUserList: Array<searchGWUser>;
}

interface Response {
  config: object;
  data: any;
  headers: object;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}

export interface searchGWUser {
  empName: string;
  positionName: string;
  deptPath: string;
  loginId: string;
}

export const state = (): searchGWUserState => ({
  searchGWUserList: [],
});

export const namespaced: boolean = true;

export const getters: GetterTree<searchGWUserState, RootState> = {
  // getProjectBranchList(state) {
  //   return state.branchList;
  // },
};

export const mutations: MutationTree<searchGWUserState> = {
  setSearchGWUserList(state, payload: Array<searchGWUser>) {
    if (payload.length > 0) {
      payload.forEach((data) => {
        data.deptPath = data.deptPath.split('|').join(' > ');
      });
    }
    state.searchGWUserList = payload;
  },
  emptySearchGWUserList(state) {
    state.searchGWUserList = [];
  },
};

export const actions: ActionTree<searchGWUserState, RootState> = {
  async getSearchGWUser(
    { commit, dispatch },
    payload: { empName: string; loginId: string }
  ): Promise<any> {
    try {
      // Loading Alert
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: true,
          msg: '그룹웨어 사용자를 검색 중입니다.',
        },
        { root: true }
      );

      let allSearchResult: Array<searchGWUser> = [];
      const nameResult: Response = await this.$axios.post(
        'api/auth/gw/searchUserByName',
        {
          user: payload,
        }
      );

      if (
        nameResult.data.success &&
        nameResult.data.data &&
        nameResult.data.data.result !== null
      ) {
        allSearchResult = allSearchResult.concat(
          nameResult.data.data.result.userList
        );
      }

      const idResult: Response = await this.$axios.post(
        'api/auth/gw/searchUserByID',
        {
          user: payload,
        }
      );

      if (
        idResult.data.success &&
        idResult.data.data &&
        idResult.data.data.result !== null &&
        idResult.data.data.result.user !== undefined
      ) {
        idResult.data.data.result.user.loginId = payload.loginId;
        allSearchResult.push(idResult.data.data.result.user);
      }

      await commit('setSearchGWUserList', allSearchResult);

      // Loading Alert Close
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: false,
          msg: '그룹웨어 사용자를 검색 중입니다.',
        },
        { root: true }
      );
    } catch (err) {
      console.error(err.response.status);
    }
  },
  async getSearchGWUserByName(
    { commit, dispatch },
    payload: { empName: string }
  ): Promise<any> {
    try {
      // Loading Alert
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: true,
          msg: '그룹웨어 사용자를 검색 중입니다.',
        },
        { root: true }
      );

      const { data } = await this.$axios.post('api/auth/gw/searchUserByName', {
        user: payload,
      });

      if (data.success && data.data && data.data.result !== null) {
        await commit('setSearchGWUserList', data.data.result.userList);
      } else {
        await commit('emptySearchGWUserList');
      }

      // Loading Alert Close
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: false,
          msg: '그룹웨어 사용자를 검색 중입니다.',
        },
        { root: true }
      );
    } catch (err) {
      console.error(err.response.status);
    }
  },
  async getSearchGWUserByID(
    { commit, dispatch },
    payload: { loginId: string }
  ): Promise<any> {
    try {
      // Loading Alert
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: true,
          msg: '그룹웨어 사용자를 검색 중입니다.',
        },
        { root: true }
      );

      const { data } = await this.$axios.post('api/auth/gw/searchUserByID', {
        user: payload,
      });

      if (
        data.success &&
        data.data &&
        data.data.result !== null &&
        data.data.result.user !== undefined
      ) {
        data.data.result.user.loginId = payload.loginId;
        await commit('setSearchGWUserList', [data.data.result.user]);
      } else {
        await commit('emptySearchGWUserList');
      }

      // Loading Alert Close
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: false,
          msg: '그룹웨어 사용자를 검색 중입니다.',
        },
        { root: true }
      );
    } catch (err) {
      console.error(err.response.status);
    }
  },
};
