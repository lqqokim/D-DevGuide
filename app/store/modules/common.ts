import { ActionTree, MutationTree } from 'vuex';
import { RootState, store } from '@/store';

export interface CommonState {
  authRequiredPages: string[];
  sortOptions: SortOptions[];
  countOptions: SortOptions[];
  forumSortOptions: SortOptions[];
  pages: number[];
  alert: IAlert;
  clickedAlertButton: IClick;
  ALERT_TYPE: IAlertType;
}

export interface IClick {
  ok: boolean;
  cancel: boolean;
}

export interface IAlert {
  type: IAlertType[keyof IAlertType];
  isShow: boolean;
  msg: string;
}

export interface IAlertType {
  // CHECK: string;
  // ERROR: string;
  // INFO: string;
  // QUESTION: string;
  // WARN: string;
  readonly CHECK: 'check';
  readonly ERROR: 'error';
  readonly INFO: 'info';
  readonly QUESTION: 'question';
  readonly WARN: 'warning';
}

export const ALERT_TYPE: IAlertType = {
  CHECK: 'check',
  ERROR: 'error',
  INFO: 'info',
  QUESTION: 'question',
  WARN: 'warning',
};

export interface SortOptions {
  code: string;
  name: string;
}

export const namespaced: boolean = true;

export const state = (): CommonState => ({
  authRequiredPages: [
    '/myInfo',
    '/qna/:categoryName',
    '/qna/:productId/:rowId',
    '/qna/search',
    '/qna/register',
  ],
  sortOptions: [
    { code: '-uploadDate', name: '최신순' },
    { code: '-downloadCount', name: '다운로드순' },
  ],
  countOptions: [
    { code: '5', name: '5개씩 보기' },
    { code: '15', name: '15개씩 보기' },
    { code: '30', name: '30개씩 보기' },
  ],
  forumSortOptions: [
    { code: '-regDate', name: '최신순' },
    { code: '-like', name: '추천순' },
  ],
  pages: [1, 2, 3, 4, 5],
  alert: INIT_ALERT(),
  clickedAlertButton: INIT_CLICK_ALERT_BUTTON(),
  ALERT_TYPE: {
    CHECK: 'check',
    ERROR: 'error',
    INFO: 'info',
    QUESTION: 'question',
    WARN: 'warning',
  } as IAlertType,
});

export const mutations: MutationTree<CommonState> = {
  ALERT_CLICK_BUTTON(state, payload): void {
    state.clickedAlertButton = payload;
  },
  ALERT(state, payload): void {
    state.alert = payload;
  },
};

export const actions: ActionTree<CommonState, RootState> = {
  alert({ commit, state, rootState }, payload): Promise<any> {
    return new Promise((resolve, reject) => {
      // type 에 따른 alert 을 띄우고 닫는다.
      console.log('alert :: ', rootState.user.userToken);
      // if (rootState.user.userToken) return;
      commit('ALERT', payload);

      if (payload.isShow === false) {
        return;
      }

      store.subscribe((mutation, rootState) => {
        if (mutation.type === 'common/ALERT_CLICK_BUTTON') {
          if (state.clickedAlertButton.ok) {
            resolve({
              ok: true,
              cancel: false,
            });
          } else if (state.clickedAlertButton.cancel) {
            resolve({
              ok: false,
              cancel: true,
            });
          } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('error');
          }
        }
      });
    }).catch((err) => {
      console.error(err);
    });
  },
  async alertButton({ commit, state, dispatch }, payload): Promise<any> {
    try {
      // clickedAlertButton 설정
      await commit('ALERT_CLICK_BUTTON', payload);
      // type, isShow, msg 초기화 (isShow: false 로 alert close)
      await dispatch('alert', INIT_ALERT());
    } catch (e) {
      console.error(e);
    }
  },
};

const INIT_ALERT = (): IAlert => {
  return {
    type: 'warning',
    isShow: false,
    msg: '',
  };
};

const INIT_CLICK_ALERT_BUTTON = (): IClick => {
  return {
    ok: false,
    cancel: false,
  };
};
