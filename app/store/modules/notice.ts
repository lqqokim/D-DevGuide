import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from '@/store';
import { ALERT_TYPE } from '~/store/modules/common';

interface NoticeState {
  noticeList: Notice[];
}

interface Response {
  config: object;
  data: any;
  headers: object;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}

export interface Notice {
  productCode: string; // 제품 코드
  category: string; // 카테고리
  noticeTitle: string; // 공지사항 제목
  noticeDescription: string; // 공지사항 설명
  filePath: string; // 연결될 파일 path
  pageTitle: string; // 연결될 파일의 페이지명
  writeTime: string; // 작성 시간
  writer: string; // 작성자
  index: number; // 공지사항 순서 관리를 위한 index 값
}

export const state = (): NoticeState => ({
  noticeList: [],
});

export const namespaced: boolean = true;

export const getters: GetterTree<NoticeState, RootState> = {};

export const mutations: MutationTree<NoticeState> = {
  setNoticeList(state, payload: Notice[]) {
    state.noticeList = payload;
  },
};

export const actions: ActionTree<NoticeState, RootState> = {
  async getNoticeList(
    { commit, state, dispatch },
    payload: {
      productCode: string;
    }
  ): Promise<any> {
    try {
      const { data } = await this.$axios.get('api/docs/notice/getNoticeList', {
        params: { productCode: payload.productCode },
      });

      if (data.success && data.data) {
        commit('setNoticeList', data.data);
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
  async noticeRegister(
    { commit, state, dispatch },
    payload: Notice
  ): Promise<any> {
    try {
      // Loading Alert
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: true,
          msg: '공지사항을 등록중입니다.',
        },
        { root: true }
      );

      payload.writeTime = payload.writeTime.replace('T', ' ').split('.')[0];
      await this.$axios.post('api/docs/notice/noticeRegister', payload);

      await dispatch('getNoticeList', {
        productCode: payload.productCode,
      });

      // Loading Alert Close
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: false,
          msg: '공지사항을 등록중입니다.',
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

  // 공지사항 목록 순서 수정
  async updateNoticeIndex(
    { commit, dispatch },
    payload: Notice[]
  ): Promise<any> {
    try {
      const { data } = await this.$axios.put(
        'api/docs/notice/updateNoticeIndex',
        payload
      );

      if (data.success && data.data) {
        commit('setNoticeList', data.data);
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

  async noticeDelete(
    { commit, state, dispatch },
    payload: Notice
  ): Promise<any> {
    try {
      // Loading Alert
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: true,
          msg: '공지사항을 삭제중입니다.',
        },
        { root: true }
      );

      const { data } = await this.$axios.get('api/docs/notice/noticeDelete', {
        params: payload,
      });

      if (data.success && data.data) {
        await dispatch('getNoticeList', {
          productCode: payload.productCode,
        });

        const { data } = await this.$axios.put(
          'api/docs/notice/updateNoticeIndex',
          state.noticeList
        );

        if (data.success && data.data) {
          commit('setNoticeList', data.data);
        }
      }

      // Loading Alert Close
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: false,
          msg: '공지사항을 삭제중입니다.',
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
};
