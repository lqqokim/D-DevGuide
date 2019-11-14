import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from '@/store';

export interface UserState {
  user: User; // 유저 정보
  userToken: string | null; // 유저 토큰
}

export interface User {
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
  __v?: number;
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
    __v: 0,
  },
  userToken: null,
});

export const namespaced: boolean = true;
const EMPLOYEE_AUTH: string = 'E';

export const getters: GetterTree<UserState, RootState> = {
  getToken(state): boolean {
    return state.userToken !== null;
  },
  getGtiLabToken(state): string {
    return state.user.gitlabToken;
  },
};

export const mutations: MutationTree<UserState> = {
  // 직원 로그인에서 로그인 했을 경우 : session, store 저장
  setTokenLogin(state, payload: string): void {
    // store 저장
    console.log('[setTokenLogin] ssr 작동');
    state.userToken = payload;
  },
  // SSR 발생 했을 경우 : store 저장
  setTokenSSR(state, payload: string): void {
    state.userToken = payload;
  },
  setUser(state, payload: any): void {
    if (payload.authority === EMPLOYEE_AUTH) {
      state.user = payload;
    } else {
      state.user.loginId = payload.ID;
      state.user.name = payload.NAME;
      state.user.authority = payload.AUTHORITY;
    }

    state.user.authToken = state.userToken;
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
    initUser(state);
  },
};

export const actions: ActionTree<UserState, RootState> = {
  // 로그인 수행
  async userLogin({ commit, state }, payload: ILogin): Promise<any> {
    try {
      // [1] 로그인 정보로 Token 생성
      const authLoginRes: IResponse = await this.$axios.post('api/auth/login', {
        user: {
          loginId: payload.loginId,
          loginPw: payload.loginPw,
        },
      });

      console.log('[auth Login] ', authLoginRes.data);
      const key: string = authLoginRes.data.data.key;

      if (authLoginRes.status === 200 && key) {
        // sessionStorage 저장 : CRS 용도로라도 필요하다.
        // sessionStorage.setItem('KEY', key);
        // 쿠키 저장
        // @ts-ignore
        this.$cookies.set('KEY', key, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 7days
        });

        commit('setTokenLogin', key);

        // [2] 토큰에서 획득한 유저 아이디로 디테일 정보 조회 후 스토어 세팅
        const userMongoRes: IResponse = await this.$axios.get(
          'api/auth/user/' + payload.loginId
        );
        console.log('[user Mongo] ', userMongoRes.data);
        const userEmployee: User = userMongoRes.data[0];

        commit('setUser', userEmployee);

        // 메인페이지 이동
        this.$router.push({
          path: '/',
        });
      } else {
        alert(`로그인 도중 문제가 발생하였습니다. (${authLoginRes.data.msg})`);
      }
    } catch (e) {
      console.error(e);
    }
  },

  async encryptToken({ commit, state }): Promise<any> {
    try {
      // [1] 토큰에서 유저 정보 획득
      const authTokenRes: IResponse = await this.$axios.post('api/auth/token', {
        token: state.userToken,
      });

      console.log('[SSR : auth Token] ', authTokenRes.data);
      const userByToken: UserByToken = authTokenRes.data.data;
      console.log('userByToken ::::::: ', userByToken);
      let loginId: string;
      if (userByToken) {
        loginId = userByToken.ID;
      } else {
        // 토큰 세션 종료 ...
        commit('userLogout');
        alert(authTokenRes.data.msg);
        return;
      }

      // [2] 토큰에서 획득한 유저 아이디로 디테일 정보 조회
      const userMongoRes: IResponse = await this.$axios.get(
        'api/auth/user/' + loginId
      );
      // console.log('[user Mongo] ', userMongoRes);
      if (userMongoRes.data.length) {
        /**
         * 개발자 사이트에서 생성한 토큰 : mongodb 직원 정보 store 저장
         * 1) 개발자 사이트에서 Refresh
         * 2) dbs -> 개발자 사이트 이동
         */
        const userEmployee: User = userMongoRes.data[0];
        commit('setUser', userEmployee);
      } else {
        /**
         * dbs 에서 생성한 토큰 : 토큰 정보에 담겨진 정보 store 저장
         * 1) 개발자 사이트에서 Refresh
         * 2) dbs -> 개발자 사이트 이동
         */
        commit('setUser', userByToken);
      }
    } catch (e) {
      console.error(e);
    }
  },
  // 깃랩 토큰 등록
  async registerGitLabToken({ state }): Promise<any> {
    try {
      const gitlabTokenRes = await this.$axios.put(
        'api/auth/user/gitlabToken/' + state.user.loginId,
        {
          gitlabToken: state.user.gitlabToken,
        }
      );

      console.log('[gitlabTokenRes] ', gitlabTokenRes);
      if (gitlabTokenRes.data.success) {
        alert('토큰 등록을 완료하였습니다.');
      } else {
        alert('토큰 등록을 실패하였습니다.');
      }
    } catch (e) {
      console.error(e);
    }
  },
  userLogout({ commit }) {
    commit('userLogout');
  },
  // 유저 삭제
  async removeUser({ state }, payload): Promise<any> {
    try {
      const removeRes = await this.$axios.delete(
        'api/auth/user/remove/' + payload
      );

      console.log('removeRes ', removeRes);

      if (removeRes.data.success) {
        alert('삭제 완료.');
      } else {
        alert('토큰 등록을 실패하였습니다.');
      }
    } catch (e) {
      console.error(e);
    }
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

const initUser = (state): void => {
  state.user = {
    loginId: '',
    loginPw: '',

    positionName: '',
    deptName: '',
    photoUrl: '',
    empName: '',
    deptPath: '',
    compName: '',

    authToken: '',
    gitlabToken: '',
    authority: '',
    _id: '',
    __v: 0,
  };
};
