import VuexPersistence from 'vuex-persist';
import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from '@/store';
import { actions as CommonActions, ALERT_TYPE } from '@/store/modules/common';

export interface UserState {
  user: IUser; // 유저 정보
  userToken: string | null; // 유저 토큰
  loginInfo: ILogin;
  isSetToken: boolean; // ssr 발생시, beforeEach 반복 집입 문제에 대한 flag
}

export interface IUser {
  loginId: string; // DBS 로그인 계정 (loginId)
  loginPw: string; // DBS 로그인 패스워드
  // token: string; // DBS가 생성한 유저 토큰

  // id: string; // 그룹웨어 계장
  positionName: string; // 직급
  deptName: string; // 직책
  photoUrl: string; // 직원 사진
  name: string; // 유저 이름
  deptPath: string; // 소속
  compName: string; // 회사명

  authToken: string | null; // 유저 토큰
  gitlabToken: string; // 깃랩 토큰
  authority: string; // 권한

  _id?: string;
}

export interface UserByToken {
  AUTHORITY: string;
  ID: string;
  IDX: string;
  NAME: string;
}

export interface ILogin {
  loginId: string;
  loginPw: string;
}

interface IResponse {
  config: object;
  data: any;
  headers: object;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}

export const state = (): UserState => ({
  user: {
    loginId: '',
    loginPw: '',

    positionName: '',
    deptName: '',
    photoUrl: '',
    name: '', // 직원일 수도 있고 아닐 수도 있다.
    deptPath: '',
    compName: '',

    authToken: '',
    gitlabToken: '',
    authority: '',
    _id: '',
  },
  userToken: null,
  loginInfo: {
    loginId: '',
    loginPw: '',
  },
  isSetToken: false,
});

export const namespaced: boolean = true;
export const getters: GetterTree<UserState, RootState> = {
  getToken(state): boolean {
    return state.userToken !== null;
  },
};

export const mutations: MutationTree<UserState> = {
  isSetToken(state, payload) {
    state.isSetToken = payload;
  },
  SET_USER_TOKEN(state, payload: string): void {
    state.userToken = payload;
  },
  SET_USER_INFO(state, payload: any): void {
    // 개발자사이트 직원로그인
    if (payload.authority === 'E') {
      state.user = payload;
    }
    // 개발자사이트 관리자로그인
    else if (payload.authority === 'S') {
      state.user = payload;
    }
    // dbs 일반로그인
    else {
      if (payload.ID === 'admin@test.com') {
        payload.ID = 'admin';
      }

      state.user.loginId = payload.ID;
      state.user.name = payload.NAME;
      state.user.authority = payload.AUTHORITY;
    }

    state.user.authToken = state.userToken;
  },
  SET_GITLAB_TOKEN(state, payload: string): void {
    state.user.gitlabToken = payload;
  },
  userLogout(state): void {
    // sessionStorage 토큰 삭제
    // sessionStorage.clear();
    // 쿠키 제거
    // @ts-ignore
    // this.$cookies.remove('KEY');
    // 유저 토큰 제거
    state.userToken = null;
    state.user = CURRENT_USER();
    location.reload();
  },
};

export const actions: ActionTree<UserState, RootState> = {
  // 로그인 수행
  async userLogin({ commit, state, dispatch }, payload: ILogin): Promise<any> {
    try {
      // [1] 로그인 정보로 Token 생성
      const loginUser: IResponse = await this.$axios.post('/api/auth/login', {
        user: {
          loginId: payload.loginId,
          loginPw: payload.loginPw,
        },
      });

      const loginData = loginUser.data;

      // console.log('loginData ', loginData);

      if (loginData.success && loginData.data) {
        const token: string = loginData.data;

        // dbs 이동시 유저정보 얻기위해 sessionStorage 저장
        sessionStorage.setItem('KEY', token);

        // 쿠키 방식
        // @ts-ignore
        // this.$cookies.set('KEY', token, {
        //   path: '/',
        //   maxAge: 60 * 60 * 24 * 7, // 7days
        // });

        commit('SET_USER_TOKEN', token);

        // [2] 토큰에서 획득한 유저 아이디로 디테일 정보 조회 후 스토어 세팅
        const { data } = await this.$axios.get(
          '/api/auth/user/' + payload.loginId
        );

        if (data.success && data.data.length) {
          const mongoUser: IUser = data.data[0];
          commit('SET_USER_INFO', mongoUser);

          this.$router.push({
            path: '/',
          });
        } else if (data.success && !data.data.length) {
          await dispatch(
            'common/alert',
            {
              type: ALERT_TYPE.WARN,
              isShow: true,
              msg: data.msg,
            },
            {
              root: true,
            }
          );
        }
      } else {
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.WARN,
            isShow: true,
            msg: loginData.msg,
          },
          {
            root: true,
          }
        );
      }
    } catch (e) {
      await dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.ERROR,
          isShow: true,
          msg: `[${e.response.status}] ${e.response.data.msg}`,
        },
        {
          root: true,
        }
      );
    }
  },

  // sessionStorage 기반 로그인정책으로 사용x
  // async encryptToken({ commit, state, dispatch }, token: string): Promise<any> {
  //   try {
  //     commit('SET_USER_TOKEN', token);
  //
  //     // [1] 토큰에서 유저 정보 획득
  //     const { data } = await this.$axios.post('api/auth/token', {
  //       token,
  //     });
  //
  //     const userInfo: UserByToken = data.data;
  //     let loginId: string;
  //     // if (userInfo) {
  //     //   loginId = userInfo.ID;
  //     // } else {
  //     //   // 토큰 세션 종료 ...
  //     //   await commit('userLogout');
  //     //   return;
  //     // }
  //
  //     if (data.res && data.data) {
  //       loginId = userInfo.ID;
  //     } else {
  //       commit('userLogout');
  //       return;
  //     }
  //
  //     // [2] 토큰에서 획득한 유저 아이디로 mongodb 유저 정보 조회
  //     const userDetailRes = await this.$axios.get('api/auth/user/' + loginId);
  //     const userData = userDetailRes.data;
  //
  //     // console.log('[encryptToken MongoDB] ', userData);
  //     if (userData.success && userData.data.length) {
  //       /**
  //        * 개발자 사이트에서 생성한 토큰 : mongodb 직원 정보 store 저장
  //        * 1) 개발자 사이트에서 Refresh
  //        * 2) dbs -> 개발자 사이트 이동
  //        */
  //       const user: IUser = userData.data[0];
  //       // console.info('[ mongodb 조회 Success ]', user);
  //       commit('SET_USER_INFO', user);
  //     } else {
  //       /**
  //        * dbs 에서 생성한 토큰 : 토큰 정보에 담겨진 정보 store 저장
  //        * 1) 개발자 사이트에서 Refresh
  //        * 2) dbs -> 개발자 사이트 이동
  //        */
  //       // console.info('[ mongodb 조회 Fail ]', userByToken);
  //       commit('SET_USER_INFO', userInfo);
  //     }
  //   } catch (e) {
  //     await dispatch(
  //       'common/alert',
  //       {
  //         type: ALERT_TYPE.ERROR,
  //         isShow: true,
  //         msg: `[${e.response.status}]` + e.response.data.msg,
  //       },
  //       { root: true }
  //     );
  //   }
  // },

  // 깃랩 토큰 등록
  async createGitLabToken({ state, commit, dispatch }, payload): Promise<any> {
    try {
      const { data } = await this.$axios.put(
        'api/auth/user/gitlabToken/' + state.user.loginId,
        {
          gitlabToken: payload,
        }
      );

      if (data.success && data.data) {
        commit('SET_USER_INFO', data.data);
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.CHECK,
            isShow: true,
            msg: '토큰등록을 완료하였습니다.',
          },
          { root: true }
        );
      } else {
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.WARN,
            isShow: true,
            msg: data.msg,
          },
          { root: true }
        );
      }
    } catch (e) {
      await dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.ERROR,
          isShow: true,
          msg: `[${e.response.status}]` + e.response.data.msg,
        },
        { root: true }
      );
    }
  },
  async userLogout({ commit }) {
    await commit('userLogout');
  },
  // gitlab token 유효성 체크
  checkGitlabToken({ state, commit }, payload): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.$axios.get(
          'api/docs/product/checkGitlabToken',
          { params: { gitlabToken: payload } }
        );

        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  },

  // 미들웨어 함수에 의해 호출(~/middleware/check-auth.js)
  // async initAuth({ commit }, { app, req }) {
  //   let userToken;
  //   // sever-side
  //
  //   if (req) {
  //     // token = app.$cookies.get('jwt');
  //     console.log('SSR 탐');
  //     userToken = app.$cookies.get('KEY');
  //   }
  //   // client-side
  //   else {
  //     userToken = sessionStorage.getItem('KEY');
  //   }
  //
  //   console.log('유저토큰', userToken);
  //
  //   if (userToken) {
  //     console.log('쿠키에서 가져온 유효한 토큰이 있음');
  //
  //     try {
  //       const decryptUserInfo = await this.$axios.$post('api/auth/token', {
  //         token: userToken,
  //       });
  //       console.log('decryptUserInfo :: ', decryptUserInfo.data);
  //       commit('SET_USER_TOKEN', userToken);
  //       commit('SET_USER_INFO', decryptUserInfo.data);
  //     } catch (e) {}
  //   }
  // },
};

const CURRENT_USER = (): IUser => {
  return {
    loginId: '',
    loginPw: '',

    positionName: '',
    deptName: '',
    photoUrl: '',
    name: '',
    deptPath: '',
    compName: '',

    authToken: '',
    gitlabToken: '',
    authority: '',
    _id: '',
  };
};
