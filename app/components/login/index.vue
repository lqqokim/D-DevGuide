<template>
  <div class="dbs-container-wrap">
    <div class="dbs-container">
      <div class="login-process">
        <div class="ui-tab login mgb-60">
          <div class="ui-tab-btns" role="tablist">
            <a href="/html/Login.html" class="ui-tab-btn"><i>고객</i></a>
            <a class="ui-tab-btn active"><i>직원</i></a>
          </div>
          <div class="ui-tab-pnls">
            <!--            <section id="tab1" class="ui-tab-pnl" role="tabpanel">-->
            <!--              <div class="login-form">-->
            <!--                <div class="login-title customer">-->
            <!--                  <h1>로그인</h1>-->
            <!--                  <p class="mgt-10">-->
            <!--                    로그인을 하시면 다양한 서비스를 이용할 수 있습니다.-->
            <!--                  </p>-->
            <!--                </div>-->
            <!--                <fieldset>-->
            <!--                  <div class="login-info">-->
            <!--                    <input-->
            <!--                      v-model="loginId"-->
            <!--                      type="text"-->
            <!--                      class="inp-large login"-->
            <!--                      placeholder="로그인"-->
            <!--                    />-->
            <!--                  </div>-->
            <!--                  <div class="login-info">-->
            <!--                    <input-->
            <!--                      v-model="loginPw"-->
            <!--                      type="password"-->
            <!--                      class="inp-large password"-->
            <!--                      placeholder="비밀번호"-->
            <!--                    />-->
            <!--                  </div>-->
            <!--                  <button-->
            <!--                    type="button"-->
            <!--                    class="btn-main blue w-100p h-54"-->
            <!--                    @click="login"-->
            <!--                  >-->
            <!--                    로그인-->
            <!--                  </button>-->
            <!--                  <div class="save-field">-->
            <!--                    <input id="uiCheck1" type="checkbox" name="uiCheck1" />-->
            <!--                    <label for="uiCheck1" class="dbs-checkbox"-->
            <!--                      >아이디 저장</label-->
            <!--                    >-->
            <!--                  </div>-->
            <!--                </fieldset>-->
            <!--                <div class="line"></div>-->
            <!--                &lt;!&ndash;                <div class="position-wrap mgt-5">&ndash;&gt;-->
            <!--                &lt;!&ndash;                  <ul class="fr">&ndash;&gt;-->
            <!--                &lt;!&ndash;                    <li><a href=""></a></li>&ndash;&gt;-->
            <!--                &lt;!&ndash;                    <span class="user-info"&ndash;&gt;-->
            <!--                &lt;!&ndash;                      ><a href="find-id.html">아이디 비밀번호 찾기</a> |&ndash;&gt;-->
            <!--                &lt;!&ndash;                      <a href="/html/Account.html">회원가입</a></span&ndash;&gt;-->
            <!--                &lt;!&ndash;                    >&ndash;&gt;-->
            <!--                &lt;!&ndash;                  </ul>&ndash;&gt;-->
            <!--                &lt;!&ndash;                </div>&ndash;&gt;-->
            <!--              </div>-->
            <!--            </section>-->
            <section id="emp_tab" class="ui-tab-pnl active" role="tabpanel">
              <div class="login-form">
                <div class="login-title member">
                  <h1>로그인</h1>
                  <p class="mgt-10">
                    로그인을 하시면 다양한 서비스를 이용할 수 있습니다.
                  </p>
                </div>
                <fieldset>
                  <div class="login-info">
                    <i class="icon login" />
                    <input
                      v-model="loginId"
                      type="text"
                      class="inp-large"
                      placeholder="그룹웨어 아이디"
                      @input="onInputLoginId"
                    />
                  </div>
                  <div class="login-info">
                    <i class="icon password" />
                    <input
                      v-model="loginPw"
                      type="password"
                      class="inp-large"
                      placeholder="비밀번호"
                      @input="onInputLoginPw"
                    />
                  </div>
                  <button
                    type="button"
                    class="btn-main blue w-100p h-54"
                    @click="login"
                  >
                    로그인
                  </button>
                  <!--                  TODO 아이디저장 숨김-->
                  <!--                  <div class="save-field">-->
                  <!--                    <input id="uiCheck2" type="checkbox" name="uiCheck2" />-->
                  <!--                    <label for="uiCheck2" class="dbs-checkbox"-->
                  <!--                      >아이디 저장</label-->
                  <!--                    >-->
                  <!--                  </div>-->
                </fieldset>
                <!--                <div class="line"></div>-->
                <!--                <div class="position-wrap mgt-5">-->
                <!--                  <ul class="fr">-->
                <!--                    <li><a href=""></a></li>-->
                <!--                    <span class="user-info"-->
                <!--                      ><a href="find-id.html">아이디 비밀번호 찾기</a> |-->
                <!--                      <a href="join.html">회원가입</a></span-->
                <!--                    >-->
                <!--                  </ul>-->
                <!--                </div>-->
              </div>
            </section>
          </div>
        </div>
      </div>
      <!--<div class="login-process">-->
      <!--<div class="login-form">-->
      <!--<div class="login-title">-->
      <!--<h1>로그인</h1>-->
      <!--<p class="mgt-10">-->
      <!--로그인을 하시면 다양한 서비스를 이용할 수 있습니다.-->
      <!--</p>-->
      <!--</div>-->
      <!--<fieldset>-->
      <!--<div class="login-info">-->
      <!--<input type="text" class="inp-large login" />-->
      <!--</div>-->
      <!--<div class="login-info">-->
      <!--<input type="password" class="inp-large password" />-->
      <!--</div>-->
      <!--<button type="button" class="btn-main blue w-100p h-54">-->
      <!--로그인-->
      <!--</button>-->
      <!--<div class="save-field">-->
      <!--<input id="uiCheck1" type="checkbox" name="uiCheck1" />-->
      <!--<label for="uiCheck1" class="dbs-checkbox">아이디 저장</label>-->
      <!--</div>-->
      <!--</fieldset>-->
      <!--<div class="line"></div>-->
      <!--<div class="position-wrap mgt-5">-->
      <!--<ul class="fr">-->
      <!--<li><a href=""></a></li>-->
      <!--<span class="user-info"-->
      <!--&gt;<a href="find-id.html">아이디 비밀번호 찾기</a> |-->
      <!--<a href="join.html">회원가입</a></span-->
      <!--&gt;-->
      <!--</ul>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
    </div>
  </div>
  <!--  <div class="page_start login">-->
  <!--    &lt;!&ndash; 상단 헤더 .header &ndash;&gt;-->
  <!--    <div class="header">-->
  <!--      <img class="logo" src="../../assets/images/logo_top_old.png" alt="로고" />-->
  <!--    </div>-->
  <!--    &lt;!&ndash; //상단 헤더 .header &ndash;&gt;-->
  <!--    <p class="title_wrap">DBS<span>D-Business School</span></p>-->
  <!--    <article class="form">-->
  <!--      <div class="switch-button">-->
  <!--        <input-->
  <!--          id="radio-one"-->
  <!--          type="radio"-->
  <!--          name="switch-member"-->
  <!--          value="employee"-->
  <!--          checked=""-->
  <!--        />-->
  <!--        <label for="radio-one">직원</label>-->
  <!--        <input-->
  <!--          id="radio-two"-->
  <!--          type="radio"-->
  <!--          name="switch-member"-->
  <!--          value="normal"-->
  <!--          @click="moveCustomer"-->
  <!--        />-->
  <!--        <label for="radio-two">고객</label>-->
  <!--      </div>-->
  <!--      <div class="input_wrap">-->
  <!--        <input-->
  <!--          id="member-id"-->
  <!--          v-model="loginId"-->
  <!--          type="email"-->
  <!--          placeholder="아이디(이메일)"-->
  <!--        />-->
  <!--      </div>-->
  <!--      <div class="input_wrap">-->
  <!--        <input-->
  <!--          id="member-pw"-->
  <!--          v-model="loginPw"-->
  <!--          type="password"-->
  <!--          placeholder="비밀번호"-->
  <!--        />-->
  <!--      </div>-->
  <!--      <div class="switch_wrap">-->
  <!--        <label>-->
  <!--          <input id="checkAuto" type="checkbox" name="check" class="switch" />-->
  <!--          <span></span>-->
  <!--          <div class="small_lbl">아이디 저장</div>-->
  <!--        </label>-->
  <!--      </div>-->
  <!--      <span class="txt_alert" style="visibility: hidden;"-->
  <!--        >아이디(이메일)이나 비밀번호를 다시 확인해 주세요.</span-->
  <!--      >-->
  <!--      <button-->
  <!--        id="btn-login"-->
  <!--        class="btn btn_blue btn_enter"-->
  <!--        type="submit"-->
  <!--        @click="login"-->
  <!--      >-->
  <!--        바로 시작-->
  <!--      </button>-->
  <!--      <ul class="btn_box">-->
  <!--        <li id="btnLoginFind">아이디/비밀번호 찾기</li>-->
  <!--        <li id="btnLoginAccount">회원가입</li>-->
  <!--      </ul>-->
  <!--    </article>-->
  <!--  </div>-->
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import { ILogin } from '@/store/modules/user';

const User = namespace('user');
const Common = namespace('common');

@Component
export default class LoginComp extends Vue {
  loginId: string = '';
  loginPw: string = '';

  @User.Action('userLogin') userLoginAction!: ({
    loginId,
    loginPw,
  }: ILogin) => Promise<any>;

  @Common.Action('alert') alertAction!: (payload: {
    type: string;
    isShow: boolean;
    msg: string;
  }) => Promise<any>;

  mounted() {
    Array.from(document.querySelectorAll('.login-info input')).forEach((el) => {
      // @ts-ignore
      el.addEventListener('keypress', (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          this.login();
        }
      });
    });
  }

  async login(): Promise<any> {
    if (!this.loginValidator()) {
      return;
    }

    await this.userLoginAction({
      loginId: this.loginId,
      loginPw: this.loginPw,
    });
  }

  onInputLoginId(e): void {
    this.loginId = e.target.value;
  }

  onInputLoginPw(e): void {
    this.loginPw = e.target.value;
  }

  loginValidator(): boolean {
    let isValid: boolean = true;

    if (!this.loginId) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '아이디를 입력해주세요.',
      });

      isValid = false;
    } else if (!this.loginPw) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '비밀번호를 입력해주세요.',
      });

      isValid = false;
    } else if (this.loginId.includes('@')) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '그룹웨어 계정으로 로그인해주세요.',
      });

      isValid = false;
    }

    return isValid;
  }

  // get parseImg() {
  //   return this.user.photoUrl.replace('HTTP', 'https');
  // }
}
</script>
<style scoped></style>
