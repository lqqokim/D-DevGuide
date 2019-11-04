import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from '@/store';

export interface UserState {
  user: User; // 유저 정보
  isEmp: boolean; // 직원 여
  login: ILogin; // loginId, loginPw
  isMemberGW: boolean; // 그룹웨어에 존재하는지 여부
  userDBS: any; // DBS 유저 정
}

export interface User {
  loginId: string; // DBS 로그인 계정 (loginId)
  loginPw: string; // DBS 로그인 패스워드
  token: string; // DBS가 생성한 유저 토큰

  id: string; // 그룹웨어 계장
  positionName: string; // 직급
  deptName: string; // 직책
  photoUrl: string; // 직원 사진
  empName: string; // 직원 이름
  deptPath: string; // 소속
  compName: string; // 회사명
}

export interface ILogin {
  loginId: string;
  loginPw: string;
}

interface IResponse {
  config: object;
  data: {
    data: any;
    msg: string;
  };
  headers: object;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}

export const state = (): UserState => ({
  user: {
    loginId: '',
    loginPw: '',
    token: '',

    id: '',
    positionName: '',
    deptName: '',
    photoUrl: '',
    empName: '',
    deptPath: '',
    compName: '',
  },
  isEmp: false,
  login: {
    loginId: '',
    loginPw: '',
  },
  isMemberGW: false,
  userDBS: {
    email: '',
    name: '',
    authority: '',
  },
});

export const namespaced: boolean = true;

export const getters: GetterTree<UserState, RootState> = {
  currentUser(state) {
    return state.user;
  },

  isUserEmp(state): boolean {
    return state.isEmp;
  },

  isMember_gw(state) {
    return state.isMemberGW;
  },
};

export const mutations: MutationTree<UserState> = {
  setLogin(state, payload: ILogin) {
    state.login = payload;
  },

  setUser(state, payload: User) {
    state.user = payload;
  },

  setUserToken(state, payload: string) {
    state.user.token = payload;

    const storage = window.sessionStorage;
    storage.setItem('KEY', state.user.token);
  },

  setIsEmp(state, payload: boolean) {
    state.isEmp = payload;
  },

  setIsMember_gw(state, payload: boolean) {
    state.isMemberGW = payload;
  },

  setUserDBS(state, payload: any) {
    state.userDBS = payload;
  },
};

export const actions: ActionTree<UserState, RootState> = {
  async userLogin({ commit, state }, payload: ILogin): Promise<any> {
    try {
      const res: IResponse = await this.$axios.post(
        'api/auth/login/userLogin',
        {
          user: {
            loginId: payload.loginId,
            loginPw: payload.loginPw,
          },
        }
      );

      console.log('res :: ', res);

      const key: string = res.data.data;
      if (res.status === 200 && key) {
        sessionStorage.setItem('KEY', key);
      }
    } catch (e) {
      console.error(e);
    }
  },

  // checkLogin_gw({ commit, state }): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //     this.$axios
  //       .post('api/auth/gw/checkLogin', {
  //         user: {
  //           loginId: state.login.loginId,
  //           loginPw: state.login.loginPw,
  //         },
  //       })
  //       .then((res) => {
  //         commit('setIsMember_gw', res.data);
  //         resolve(res.data);
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   });
  // },
  //
  // memberCheck({ commit, state }): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.$axios
  //       .post('api/auth/dbs/memberCheck', {
  //         user: {
  //           loginId: state.login.loginId + '@douzone.com',
  //           loginPw: state.login.loginPw,
  //         },
  //       })
  //       .then((res) => {
  //         // 일단 state에 저장은 한다.
  //         commit('setUserDBS', res.data);
  //         console.log('res :::  ', res);
  //         resolve(res.data);
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   });
  // },
  //
  // createToken({ commit, state }): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.$axios
  //       .post('api/auth/dbs/createToken', {
  //         user: {
  //           loginId: state.login.loginId + '@douzone.com',
  //           loginPw: state.login.loginId,
  //         },
  //       })
  //       .then((res) => {
  //         commit('setUserToken', res.data);
  //         resolve(res.data);
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   });
  // },
  //
  // updateAuth({ commit, state }, payload: string): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.$axios
  //       .post('api/auth/dbs/updateAuthority', {
  //         user: {
  //           loginId: state.login.loginId + '@douzone.com',
  //           authority: payload,
  //         },
  //       })
  //       .then((res) => {
  //         commit('setIsEmp', payload === 'E');
  //         resolve(res.data);
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   });
  // },
  //
  // searchUser_gw({ commit, state }): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.$axios
  //       .post('api/auth/gw/searchUser', {
  //         user: {
  //           loginId: state.login.loginId,
  //         },
  //       })
  //       .then((res) => {
  //         resolve(res.data);
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   });
  // },
  //
  // createUser({ commit, state }): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.$axios
  //       .post('api/auth/dbs/createUser', {
  //         user: {
  //           loginId: state.login.loginId,
  //           /***
  //            *  query += " insert into TB_MEMBER(MEMBER_ID, MEMBER_PW, EMAIL, BIRTHDAY, NAME, SEX, INS_ID, AUTHORITY) ";
  //            *  query += " values('"+txtId+"', '"+checkPW+"', '"+txtEmail+"', '"+txtBirth+"', '"+txtName+"', '"+txtSex+"', '"+txtId+"', 'M') ";
  //            */
  //         },
  //       })
  //       .then((res) => {
  //         resolve(res.data);
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   });
  // },

  // async getUser({ commit }, payload: { loginId: string; loginPw: string }) {
  //   try {
  //     const memberCheckRes = await this.$axios.post('api/auth/dbs', {
  //       user: {
  //         loginId: payload.loginId + '@douzone.com',
  //         loginPw: payload.loginPw,
  //       },
  //     });
  //
  //     const loginUserRes: any = await this.$axios.post('api/auth/login', {
  //       user: {
  //         loginId: payload.loginId,
  //         loginPw: payload.loginPw,
  //       },
  //     });
  //
  //     const userTokenRes: any = await this.$axios.post('api/auth/dbs', {
  //       user: {
  //         loginId: payload.loginId,
  //         loginPw: payload.loginPw,
  //       },
  //     });
  //
  //     commit('setUser', loginUserRes.data.result.user);
  //     commit('setUserToken', userTokenRes.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // },
};
