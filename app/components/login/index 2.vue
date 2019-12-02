<template>
  <div class="login_area">
    <div class="switch-button">
      <input
        id="radio-one"
        type="radio"
        name="switch-member"
        value="employee"
        checked=""
      />
      <label for="radio-one">직원</label>
      <input
        id="radio-two"
        type="radio"
        name="switch-member"
        value="normal"
        @click="moveCustomer"
      />
      <label for="radio-two">고객</label>
    </div>
    <div>
      <span>아이디</span>
      <input v-model="loginId" type="text" />
    </div>
    <div>
      <span>비밀번호</span>
      <input v-model="loginPw" type="password" />
    </div>
    <input type="button" value="로그인" @click="login" />
    <!--    <input type="button" value="삭제" @click="remove" />-->
    <!--    <img :src="parseImg" alt="image" width="100" />-->
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import * as user from '@/store/modules/user';

const User = namespace('user');

export interface ILogin {
  loginId: string;
  loginPw: string;
}

@Component
export default class LoginComp extends Vue {
  loginId: string = '';
  loginPw: string = '';

  @User.Action('userLogin') userLoginAction!: ({
    loginId,
    loginPw,
  }: ILogin) => void;

  @User.Action('removeUser') userRemoveAction!: (string) => void;

  login() {
    if (!this.loginValidator()) return null;

    this.userLoginAction({
      loginId: this.loginId,
      loginPw: this.loginPw,
    });
  }

  remove() {
    this.userRemoveAction(this.loginId);
  }

  loginValidator(): boolean {
    return true;
  }

  moveCustomer(): void {
    // this.$router.push({
    //   name: '/html/Login.html?123',
    // });
    window.location.href = '/html/Login.html?';
    // this.$router.push({ path: '/html/Login.html', query: { no: '2000' } });
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
