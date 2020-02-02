import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from '@/store';

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
    { commit, state },
    payload: {
      productCode: string;
    }
  ): Promise<any> {
    try {
      const noticeList: Response = await this.$axios.get(
        'api/docs/notice/getNoticeList',
        {
          params: { productCode: payload.productCode },
        }
      );
      commit('setNoticeList', noticeList.data);
    } catch (err) {
      console.error(err);
    }
  },
  async noticeRegister(
    { commit, state, dispatch },
    payload: {
      productCode: string;
      category: string;
      noticeTitle: string;
      noticeDescription: string;
      filePath: string;
      pageTitle: string;
      writeTime: string;
      writer: string;
    }
  ): Promise<any> {
    try {
      payload.writeTime = payload.writeTime.replace('T', ' ').split('.')[0];
      await this.$axios.post('api/docs/notice/noticeRegister', {
        productCode: payload.productCode,
        category: payload.category,
        noticeTitle: payload.noticeTitle,
        noticeDescription: payload.noticeDescription,
        filePath: payload.filePath,
        pageTitle: payload.pageTitle,
        writeTime: payload.writeTime,
        writer: payload.writer,
      });

      await dispatch('getNoticeList', {
        productCode: payload.productCode,
      });
    } catch (err) {
      console.error(err);
    }
  },
  async noticeDelete(
    { commit, state, dispatch },
    payload: {
      productCode: string;
      category: string;
      noticeTitle: string;
      noticeDescription: string;
      filePath: string;
      pageTitle: string;
      writeTime: string;
      writer: string;
    }
  ): Promise<any> {
    try {
      await this.$axios.get('api/docs/notice/noticeDelete', {
        params: {
          productCode: payload.productCode,
          category: payload.category,
          noticeTitle: payload.noticeTitle,
          noticeDescription: payload.noticeDescription,
          filePath: payload.filePath,
          pageTitle: payload.pageTitle,
          writeTime: payload.writeTime,
          writer: payload.writer,
        },
      });

      await dispatch('getNoticeList', {
        productCode: payload.productCode,
      });
    } catch (err) {
      console.error(err);
    }
  },
};
