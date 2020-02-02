<template>
  <login-comp />
  <!--  <div class="dbs-container-wrap">-->
  <!--    <div class="dbs-container">-->
  <!--      <div class="login-process">-->
  <!--        <div class="ui-tab login mgb-60">-->
  <!--          <div class="ui-tab-btns" role="tablist">-->
  <!--            <a href="#tab1" class="ui-tab-btn active"><i>고객</i></a>-->
  <!--            <a href="#tab2" class="ui-tab-btn"><i>직원</i></a>-->
  <!--          </div>-->
  <!--          <div class="ui-tab-pnls">-->
  <!--            <section id="tab1" class="ui-tab-pnl active" role="tabpanel">-->
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
  <!--                      type="text"-->
  <!--                      class="inp-large login"-->
  <!--                      placeholder="로그인"-->
  <!--                    />-->
  <!--                  </div>-->
  <!--                  <div class="login-info">-->
  <!--                    <input-->
  <!--                      type="password"-->
  <!--                      class="inp-large password"-->
  <!--                      placeholder="비밀번호"-->
  <!--                    />-->
  <!--                  </div>-->
  <!--                  <button type="button" class="btn-main blue w-100p h-54">-->
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
  <!--                <div class="position-wrap mgt-5">-->
  <!--                  <ul class="fr">-->
  <!--                    <li><a href=""></a></li>-->
  <!--                    <span class="user-info"-->
  <!--                      ><a href="find-id.html">아이디 비밀번호 찾기</a> |-->
  <!--                      <a href="join.html">회원가입</a></span-->
  <!--                    >-->
  <!--                  </ul>-->
  <!--                </div>-->
  <!--              </div>-->
  <!--            </section>-->
  <!--            <section id="tab2" class="ui-tab-pnl" role="tabpanel">-->
  <!--              <div class="login-form">-->
  <!--                <div class="login-title member">-->
  <!--                  <h1>로그인</h1>-->
  <!--                  <p class="mgt-10">-->
  <!--                    로그인을 하시면 다양한 서비스를 이용할 수 있습니다.-->
  <!--                  </p>-->
  <!--                </div>-->
  <!--                <fieldset>-->
  <!--                  <div class="login-info">-->
  <!--                    <input-->
  <!--                      type="text"-->
  <!--                      class="inp-large login"-->
  <!--                      placeholder="그룹웨어 아이디"-->
  <!--                    />-->
  <!--                  </div>-->
  <!--                  <div class="login-info">-->
  <!--                    <input-->
  <!--                      type="password"-->
  <!--                      class="inp-large password"-->
  <!--                      placeholder="비밀번호"-->
  <!--                    />-->
  <!--                  </div>-->
  <!--                  <button type="button" class="btn-main blue w-100p h-54">-->
  <!--                    로그인-->
  <!--                  </button>-->
  <!--                  <div class="save-field">-->
  <!--                    <input id="uiCheck2" type="checkbox" name="uiCheck2" />-->
  <!--                    <label for="uiCheck2" class="dbs-checkbox"-->
  <!--                      >아이디 저장</label-->
  <!--                    >-->
  <!--                  </div>-->
  <!--                </fieldset>-->
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
  <!--              </div>-->
  <!--            </section>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--      &lt;!&ndash;<div class="login-process">&ndash;&gt;-->
  <!--      &lt;!&ndash;<div class="login-form">&ndash;&gt;-->
  <!--      &lt;!&ndash;<div class="login-title">&ndash;&gt;-->
  <!--      &lt;!&ndash;<h1>로그인</h1>&ndash;&gt;-->
  <!--      &lt;!&ndash;<p class="mgt-10">&ndash;&gt;-->
  <!--      &lt;!&ndash;로그인을 하시면 다양한 서비스를 이용할 수 있습니다.&ndash;&gt;-->
  <!--      &lt;!&ndash;</p>&ndash;&gt;-->
  <!--      &lt;!&ndash;</div>&ndash;&gt;-->
  <!--      &lt;!&ndash;<fieldset>&ndash;&gt;-->
  <!--      &lt;!&ndash;<div class="login-info">&ndash;&gt;-->
  <!--      &lt;!&ndash;<input type="text" class="inp-large login" />&ndash;&gt;-->
  <!--      &lt;!&ndash;</div>&ndash;&gt;-->
  <!--      &lt;!&ndash;<div class="login-info">&ndash;&gt;-->
  <!--      &lt;!&ndash;<input type="password" class="inp-large password" />&ndash;&gt;-->
  <!--      &lt;!&ndash;</div>&ndash;&gt;-->
  <!--      &lt;!&ndash;<button type="button" class="btn-main blue w-100p h-54">&ndash;&gt;-->
  <!--      &lt;!&ndash;로그인&ndash;&gt;-->
  <!--      &lt;!&ndash;</button>&ndash;&gt;-->
  <!--      &lt;!&ndash;<div class="save-field">&ndash;&gt;-->
  <!--      &lt;!&ndash;<input id="uiCheck1" type="checkbox" name="uiCheck1" />&ndash;&gt;-->
  <!--      &lt;!&ndash;<label for="uiCheck1" class="dbs-checkbox">아이디 저장</label>&ndash;&gt;-->
  <!--      &lt;!&ndash;</div>&ndash;&gt;-->
  <!--      &lt;!&ndash;</fieldset>&ndash;&gt;-->
  <!--      &lt;!&ndash;<div class="line"></div>&ndash;&gt;-->
  <!--      &lt;!&ndash;<div class="position-wrap mgt-5">&ndash;&gt;-->
  <!--      &lt;!&ndash;<ul class="fr">&ndash;&gt;-->
  <!--      &lt;!&ndash;<li><a href=""></a></li>&ndash;&gt;-->
  <!--      &lt;!&ndash;<span class="user-info"&ndash;&gt;-->
  <!--      &lt;!&ndash;&gt;<a href="find-id.html">아이디 비밀번호 찾기</a> |&ndash;&gt;-->
  <!--      &lt;!&ndash;<a href="join.html">회원가입</a></span&ndash;&gt;-->
  <!--      &lt;!&ndash;&gt;&ndash;&gt;-->
  <!--      &lt;!&ndash;</ul>&ndash;&gt;-->
  <!--      &lt;!&ndash;</div>&ndash;&gt;-->
  <!--      &lt;!&ndash;</div>&ndash;&gt;-->
  <!--      &lt;!&ndash;</div>&ndash;&gt;-->
  <!--    </div>-->
  <!--  </div>-->
  <!--<login-comp></login-comp>-->
  <!--  <div class="page_start login">-->
  <!--    &lt;!&ndash; 상단 헤더 .header &ndash;&gt;-->
  <!--    <div class="header">-->
  <!--      <img class="logo" src="../../assets/images/logo_top_old.png" alt="로고" />-->
  <!--    </div>-->
  <!--    &lt;!&ndash; //상단 헤더 .header &ndash;&gt;-->
  <!--    <p class="title_wrap">DBS<span>D-Business School</span></p>-->
  <!--    <article class="form">-->
  <!--      <div class="switch-button">-->
  <!--        <input id="radio-one" type="radio" name="switch-member" value="yes" />-->
  <!--        <label for="radio-one">직원</label>-->
  <!--        <input-->
  <!--          id="radio-two"-->
  <!--          type="radio"-->
  <!--          name="switch-member"-->
  <!--          value="no"-->
  <!--          checked=""-->
  <!--        />-->
  <!--        <label for="radio-two">고객</label>-->
  <!--      </div>-->
  <!--      <div class="input_wrap">-->
  <!--        <input id="member-id" type="email" placeholder="아이디(이메일)" />-->
  <!--      </div>-->
  <!--      <div class="input_wrap">-->
  <!--        <input id="member-pw" type="password" placeholder="비밀번호" />-->
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
  <!--      <button id="btn-login" class="btn btn_blue btn_enter" type="submit">-->
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
import { Vue, Component } from 'nuxt-property-decorator';
import LoginComp from '~/components/login/index.vue';

@Component({
  layout: 'default',
  components: {
    LoginComp,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
