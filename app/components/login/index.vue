<template>
  <div class="login_area">
    <!--<p style="font-size: 15px;">{{ user.empName }}님 반갑습니다!</p>-->
    <div>
      <span>아이디</span>
      <input v-model="loginId" />
    </div>
    <div>
      <span>비밀번호</span>
      <input v-model="loginPw" />
    </div>
    <button @click="login">로그인</button>

    <!--<p>{{ user }}</p>-->
    <!--<img :src="parseImg" alt="image" width="100" />-->
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import * as user from '@/store/modules/user';

const User = namespace('user');

export interface Login {
  loginId: string;
  loginPw: string;
}

@Component
export default class Login extends Vue {
  loginId: string = '';
  loginPw: string = '';

  @User.Mutation('setLogin') setLogin!: (Login) => void; // loginId, loginPw state에 저정
  @User.Action('checkLogin_gw') checkLoginAction!: () => Promise<boolean>; // 그룹웨어 직원 여부
  @User.Getter('isMember_gw') isMember!: () => boolean; // 그룹웨어 직원 여부
  @User.Action('memberCheck') memberCheckAction!: () => Promise<any>; // DBS 직원 조회
  @User.Getter('isEmp') isEmp!: () => boolean; // DBS AUTHORITY 'E' 여부

  @User.Action('createToken') createTokenAction!: () => void; // 토큰 생성 및 저장
  @User.Action('updateAuth') updateAuthAction!: (string) => void; // DBS AUTHORITY 변경
  @User.Action('searchUser_gw') searchUser!: () => void; // 그룹웨어 직원 조회
  @User.Action('createUser') createUserAction!: () => void; // DBS 직원 추가
  //
  // @User.Action('getUser') userAction: any;
  // @User.Getter('currentUser')
  // user!: user.User;

  async login() {
    if (!this.loginValidator()) return;

    this.setLogin({
      loginId: this.loginId,
      loginPw: this.loginPw,
    });

    try {
      // 그룹웨어 직원 여부
      if (await this.checkLoginAction()) {
        // DBS 직원 여부
        if (await this.memberCheckAction()) {
          // DBS AUTHORITY 'E' 여부
          if (this.isEmp()) {
            // 토큰 생성
            this.createTokenAction();
          } else {
            // AUTHORITY 'E 변경
            await this.updateAuthAction('E');
            this.createTokenAction();
          }
        } else {
          await this.searchUser();
          this.createUserAction();
        }
      } else {
        // DBS 직원 여부
        if (await this.memberCheckAction()) {
          // DBS AUTHORITY 'E' 여부
          if (this.isEmp()) {
            // AUTHORITY 'E 변경
            await this.updateAuthAction('E');
            this.createTokenAction();
          } else {
            alert('직원정보를 찾을 수 없습니다.');
          }
        } else {
          alert('회원정보를 찾을 수 없습니다.');
        }

        console.log('a');
      }
    } catch (e) {
      console.error(e);
    }
  }

  loginValidator(): boolean {
    return true;
  }

  // get parseImg() {
  //   return this.user.photoUrl.replace('HTTP', 'https');
  // }
}
</script>
<style scoped>
.login_area {
  margin: 300px 300px 300px 300px;
}
</style>
