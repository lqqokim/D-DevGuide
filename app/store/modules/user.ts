import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from '@/store';
import { actions as CommonActions } from '@/store/modules/common';

export interface UserState {
  user: IUser; // 유저 정보
  userToken: string | null; // 유저 토큰
  loginInfo: ILogin;
  isSetToken: boolean;
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
  getGitLabToken(state): string {
    return state.user.gitlabToken;
  },
};

export const mutations: MutationTree<UserState> = {
  setTokenTest(state, payload: string): string {
    return state.user.gitlabToken;
  },
  // 직원 로그인에서 로그인 했을 경우 : session, store 저장
  setTokenLogin(state, payload: string): void {
    // store 저장
    // console.log('[setTokenLogin] ssr 작동');
    state.userToken = payload;
  },
  isSetToken(state, payload) {
    state.isSetToken = payload;
  },
  // SSR 발생 했을 경우 : store 저장
  setTokenSSR(state, payload: string): void {
    state.userToken = payload;
  },
  setUser(state, payload: any): void {
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
      state.user.loginId = payload.ID;
      state.user.name = payload.NAME;
      state.user.authority = payload.AUTHORITY;
    }

    state.user.authToken = state.userToken;
    // console.log('[로그인 유저정보]', JSON.stringify(state.user));

    // state.user.name = '김인수A';
    // state.user.authority = 'E';
    // state.user.loginId = 'kis4204';
    // state.user.deptPath = '플랫폼개발1팀';
  },
  setGitLabToken(state, payload: string): void {
    state.user.gitlabToken = payload;
  },
  userLogout(state): void {
    // sessionStorage 토큰 삭제
    // sessionStorage.clear();
    // 쿠키 제거
    // @ts-ignore
    this.$cookies.remove('KEY');
    // 유저 토큰 제거
    state.userToken = null;
    state.user = CURRENT_USER();
  },
};

export const actions: ActionTree<UserState, RootState> = {
  // 로그인 수행
  userLogin({ commit, state, dispatch }, payload: ILogin): Promise<any> {
    return new Promise(async (resolve, reject) => {
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

          // sessionStorage 저장 : CRS 용도로라도 필요하다.
          // sessionStorage.setItem('KEY', key);
          // 쿠키 저장
          // @ts-ignore
          this.$cookies.set('KEY', token, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7days
          });

          await commit('setTokenLogin', token);

          // [2] 토큰에서 획득한 유저 아이디로 디테일 정보 조회 후 스토어 세팅
          const { data } = await this.$axios.get(
            '/api/auth/user/' + payload.loginId
          );

          if (data.success && data.data.length) {
            const mongoUser: IUser = data.data[0];
            await commit('setUser', mongoUser);

            // resolve(mongoUser.name + '님 반갑습니다.');

            this.$router.push({
              path: '/',
            });
          } else if (data.success && !data.data.length) {
            await dispatch(
              'common/alert',
              {
                type: 'warning',
                isShow: true,
                msg: data.msg,
              },
              { root: true }
            );
            // resolve(data.msg);
          }
        } else {
          await dispatch(
            'common/alert',
            {
              type: 'warning',
              isShow: true,
              msg: loginData.msg,
            },
            { root: true }
          );
          // resolve(loginData.msg);
        }
      } catch (e) {
        dispatch(
          'common/alert',
          {
            type: 'warning',
            isShow: true,
            msg: e,
          },
          { root: true }
        );
        // reject(e);
      }
    });
  },

  async encryptToken({ commit, state }): Promise<any> {
    try {
      // [1] 토큰에서 유저 정보 획득
      const { data } = await this.$axios.post('api/auth/token', {
        token: state.userToken,
      });

      const userByToken: UserByToken = data.data;
      let loginId: string;
      if (userByToken) {
        loginId = userByToken.ID;
      } else {
        // 토큰 세션 종료 ...
        await commit('userLogout');
        return;
      }

      // [2] 토큰에서 획득한 유저 아이디로 mongodb 유저 정보 조회
      const userDetailRes = await this.$axios.get('api/auth/user/' + loginId);
      const userData = userDetailRes.data;

      // console.log('[encryptToken Mongo] ', userData);
      if (userData.success && userData.data.length) {
        /**
         * 개발자 사이트에서 생성한 토큰 : mongodb 직원 정보 store 저장
         * 1) 개발자 사이트에서 Refresh
         * 2) dbs -> 개발자 사이트 이동
         */
        const user: IUser = userData.data[0];
        console.info('[ mongodb 조회 Success ]', user);
        await commit('setUser', user);
      } else {
        /**
         * dbs 에서 생성한 토큰 : 토큰 정보에 담겨진 정보 store 저장
         * 1) 개발자 사이트에서 Refresh
         * 2) dbs -> 개발자 사이트 이동
         */
        console.info('[ mongodb 조회 Fail ]', userByToken);
        await commit('setUser', userByToken);
      }
    } catch (e) {
      console.error(e);
    }
  },
  // 깃랩 토큰 등록
  createGitLabToken({ state, commit }, payload): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.$axios.put(
          'api/auth/user/gitlabToken/' + state.user.loginId,
          {
            gitlabToken: payload,
          }
        );

        if (data.success && data.data) {
          await commit('setUser', data.data);
        }

        resolve(data);
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  },
  userLogout({ commit }) {
    commit('userLogout');
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
  //       commit('setTokenLogin', userToken);
  //       commit('setUser', decryptUserInfo.data);
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
