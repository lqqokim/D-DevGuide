<template>
  <my-info />
  <!--  <div class="dbs-container-wrap">-->
  <!--    <div class="dbs-top-image-wrap login">-->
  <!--      <div class="dbs-top-image">-->
  <!--        <dl>-->
  <!--          <dt>마이 페이지</dt>-->
  <!--          <dd>-->
  <!--            내 프로필과 로그인 정보를 확인할 수 있습니다.<br />-->
  <!--            Gitlab Access Token을 등록 할 수 있습니다.-->
  <!--          </dd>-->
  <!--        </dl>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--    <div class="dbs-container">-->
  <!--      <div class="view-top mgt-45">-->
  <!--        <h1 class="tit-con-text">내 정보</h1>-->
  <!--      </div>-->
  <!--      <div class="mypage mgb-50">-->
  <!--        <div class="divide">-->
  <!--          <div class="profile tbl-wrap bdr-bot-none">-->
  <!--            <table class="tbl-base-ver tbl-fixed">-->
  <!--              <colgroup>-->
  <!--                <col style="width: 145px;" />-->
  <!--                <col style="width: auto;" />-->
  <!--              </colgroup>-->
  <!--              <tbody>-->
  <!--                <tr>-->
  <!--                  <th><label for="name">이름</label></th>-->
  <!--                  <td>-->
  <!--                    <input-->
  <!--                      id="name"-->
  <!--                      type="text"-->
  <!--                      class="inp-base w-100p h-40"-->
  <!--                      readonly-->
  <!--                      value="관리자"-->
  <!--                    />-->
  <!--                  </td>-->
  <!--                </tr>-->
  <!--                <tr>-->
  <!--                  <th><label for="id">아이디</label></th>-->
  <!--                  <td>-->
  <!--                    <input-->
  <!--                      id="id"-->
  <!--                      type="text"-->
  <!--                      class="inp-base w-100p h-40"-->
  <!--                      readonly-->
  <!--                      value="kimdouzone@douzone.com"-->
  <!--                    />-->
  <!--                  </td>-->
  <!--                </tr>-->
  <!--                <tr>-->
  <!--                  <th class="verti-top">-->
  <!--                    <label for="token">Gitlab <br />Access Token</label>-->
  <!--                  </th>-->
  <!--                  <td>-->
  <!--                    <div class="mail-wrap">-->
  <!--                      <input id="token" type="text" class="inp-base h-40" />-->
  <!--                      <button type="button" class="dbs-icon-button text">-->
  <!--                        토큰등록-->
  <!--                      </button>-->
  <!--                    </div>-->
  <!--                    <p class="txt-alert">-->
  <!--                      개발자 문서를 편집하시기 위해서는 프로젝트 깃랩에서-->
  <!--                      Personal Access Token을 발급받아 등록하셔야 합니다.-->
  <!--                    </p>-->
  <!--                  </td>-->
  <!--                </tr>-->
  <!--              </tbody>-->
  <!--            </table>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--        <div class="divide">-->
  <!--          <div class="profile tbl-wrap bdr-bot-none">-->
  <!--            <table class="tbl-base-ver tbl-fixed">-->
  <!--              <colgroup>-->
  <!--                <col style="width: 145px;" />-->
  <!--                <col style="width: auto;" />-->
  <!--              </colgroup>-->
  <!--              <tbody>-->
  <!--                <tr>-->
  <!--                  <th><label for="company">회사명</label></th>-->
  <!--                  <td>-->
  <!--                    <input-->
  <!--                      id="company"-->
  <!--                      type="text"-->
  <!--                      class="inp-base w-100p h-40"-->
  <!--                      readonly-->
  <!--                      value="더존 비즈온"-->
  <!--                    />-->
  <!--                  </td>-->
  <!--                </tr>-->
  <!--                <tr>-->
  <!--                  <th><label for="department">부서명</label></th>-->
  <!--                  <td>-->
  <!--                    <input-->
  <!--                      id="department"-->
  <!--                      type="text"-->
  <!--                      class="inp-base w-100p h-40"-->
  <!--                      readonly-->
  <!--                      value="플랫폼 개발 1팀"-->
  <!--                    />-->
  <!--                  </td>-->
  <!--                </tr>-->
  <!--                <tr>-->
  <!--                  <th><label for="position">직급</label></th>-->
  <!--                  <td>-->
  <!--                    <input-->
  <!--                      id="position"-->
  <!--                      type="text"-->
  <!--                      class="inp-base w-100p h-40"-->
  <!--                      readonly-->
  <!--                      value="수석"-->
  <!--                    />-->
  <!--                  </td>-->
  <!--                </tr>-->
  <!--                <tr>-->
  <!--                  <th><label for="job">직책</label></th>-->
  <!--                  <td>-->
  <!--                    <input-->
  <!--                      id="job"-->
  <!--                      type="text"-->
  <!--                      class="inp-base w-100p h-40"-->
  <!--                      readonly-->
  <!--                      value="팀장"-->
  <!--                    />-->
  <!--                  </td>-->
  <!--                </tr>-->
  <!--              </tbody>-->
  <!--            </table>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
  <!--<my-info />-->
  <!--  <div class="my-page mypage_info">-->
  <!--    <div class="inner_center">-->
  <!--      <nav id="menuSetting" class="left_menu_wrap">-->
  <!--        <div id="wrapMenuSetting" class="menu_wrap">-->
  <!--          <ul class="menu_my">-->
  <!--            <li id="btnSetMy" class="on"><span>내 정보</span></li>-->
  <!--          </ul>-->
  <!--        </div>-->
  <!--      </nav>-->

  <!--      <form-->
  <!--        id="uploadForm"-->
  <!--        method="post"-->
  <!--        enctype="multipart/form-data"-->
  <!--        onsubmit="return false;"-->
  <!--      >-->
  <!--        <input id="memberIDX" type="hidden" name="memberIDX" />-->
  <!--        <input id="memberPassWD" type="hidden" name="memberPassWD" />-->
  <!--        <input id="memberSEX" type="hidden" name="memberSEX" />-->
  <!--        <input id="savedImg" type="hidden" name="savedImg" />-->
  <!--        <input id="deleteImg" type="hidden" name="deleteImg" />-->
  <!--        <input id="mobileInsImg" type="hidden" name="mobileInsImg" />-->
  <!--        <section class="right_cont_wrap">-->
  <!--          <h2>-->
  <!--            내 정보-->
  <!--          </h2>-->
  <!--          <article class="profile_area">-->
  <!--            <h3>프로필</h3>-->
  <!--            <div id="profile-image" class="left">-->
  <!--              <button id="insert-image-btn" class="btn_select"></button-->
  <!--              ><input-->
  <!--                id="insert-image"-->
  <!--                type="file"-->
  <!--                name="fileMyInfo"-->
  <!--                style="width: 0; height: 0;"-->
  <!--              />-->
  <!--              <button-->
  <!--                id="delete-image-btn"-->
  <!--                class="btn_delete"-->
  <!--                type="button"-->
  <!--              ></button>-->
  <!--            </div>-->
  <!--            <div class="right">-->
  <!--              <div class="input_group input_add_lbl">-->
  <!--                <label>이름</label>-->
  <!--                <div class="input_wrap">-->
  <!--                  <input-->
  <!--                    id="memberNM"-->
  <!--                    type="text"-->
  <!--                    name="memberNM"-->
  <!--                    placeholder="이름을 입력해 주세요."-->
  <!--                  />-->
  <!--                </div>-->
  <!--              </div>-->
  <!--              <div class="input_group input_add_lbl">-->
  <!--                <label>생년월일</label>-->
  <!--                <div class="input_wrap">-->
  <!--                  <input-->
  <!--                    id="birthDay"-->
  <!--                    type="text"-->
  <!--                    name="birthDay"-->
  <!--                    placeholder="ex) 19880101"-->
  <!--                  />-->
  <!--                </div>-->
  <!--              </div>-->
  <!--              <div class="input_group input_add_lbl">-->
  <!--                <label>성별</label>-->
  <!--                <div class="radiobox_wrap">-->
  <!--                  <label>-->
  <!--                    <input type="radio" name="sex" class="radiobox" value="M" />-->
  <!--                    <span></span>-->
  <!--                    <div class="small_lbl">남자</div>-->
  <!--                  </label>-->
  <!--                </div>-->
  <!--                <div class="radiobox_wrap">-->
  <!--                  <label>-->
  <!--                    <input type="radio" name="sex" class="radiobox" value="F" />-->
  <!--                    <span></span>-->
  <!--                    <div class="small_lbl">여자</div>-->
  <!--                  </label>-->
  <!--                </div>-->
  <!--              </div>-->
  <!--            </div>-->
  <!--          </article>-->
  <!--          <article class="login_area">-->
  <!--            <h3>로그인 정보</h3>-->
  <!--            <div class="input_group input_add_lbl">-->
  <!--              <label>아이디</label>-->
  <!--              <div class="input_wrap">-->
  <!--                <input id="memberID1" type="text" name="memberID1" readonly />-->
  <!--              </div>-->
  <!--            </div>-->
  <!--            <div class="input_group input_add_lbl">-->
  <!--              <label>gitlab Access Token</label>-->
  <!--              <div class="input_wrap" style="width: 65%;">-->
  <!--                <input id="token" type="AccessToken" name="AccessToken" />-->
  <!--              </div>-->
  <!--              <button type="button" class="btn-gray">-->
  <!--                <span>토근등록</span>-->
  <!--              </button>-->
  <!--              <span class="txt_consult"-->
  <!--                >개발자 문서를 편집하시기 위해서는 프로젝트 깃랩에서 Personal-->
  <!--                Access Tockens을 발급받아 등록하셔야 합니다.</span-->
  <!--              >-->
  <!--            </div>-->
  <!--          </article>-->
  <!--          <article class="login_area">-->
  <!--            <h3>로그인 정보</h3>-->
  <!--            <div class="input_group input_add_lbl">-->
  <!--              <label>아이디</label>-->
  <!--              <div class="input_wrap">-->
  <!--                <input id="memberID" type="text" name="memberID" readonly />-->
  <!--              </div>-->
  <!--            </div>-->
  <!--            <div class="input_group input_add_lbl">-->
  <!--              <label>비밀번호</label>-->
  <!--              <div class="input_wrap">-->
  <!--                <input-->
  <!--                  id="memberPW"-->
  <!--                  type="password"-->
  <!--                  name="memberPW"-->
  <!--                  placeholder="현재 비밀번호"-->
  <!--                />-->
  <!--              </div>-->
  <!--              &lt;!&ndash;span class="txt_alert" style="visibility: hidden;">비밀번호가 일치하지 않습니다.</span&ndash;&gt;-->
  <!--            </div>-->
  <!--            <div class="input_group input_add_lbl">-->
  <!--              <label></label>-->
  <!--              <div class="input_wrap">-->
  <!--                <input-->
  <!--                  id="updatePW"-->
  <!--                  type="password"-->
  <!--                  name="updatePW"-->
  <!--                  placeholder="변경할 비밀번호"-->
  <!--                />-->
  <!--              </div>-->
  <!--              &lt;!&ndash;span class="txt_alert" style="visibility: hidden;">6~16자 영문 대/소문자, 숫자, 특수문자를 사용하세요.</span&ndash;&gt;-->
  <!--            </div>-->
  <!--            <div class="input_group input_add_lbl">-->
  <!--              <label></label>-->
  <!--              <div class="input_wrap">-->
  <!--                <input-->
  <!--                  id="confirmPW"-->
  <!--                  type="password"-->
  <!--                  name="confirmPW"-->
  <!--                  placeholder="변경할 비밀번호 재입력"-->
  <!--                />-->
  <!--              </div>-->
  <!--              &lt;!&ndash;span class="txt_alert" style="visibility: hidden;">비밀번호가 일치하지 않습니다.</span&ndash;&gt;-->
  <!--            </div>-->
  <!--            <div class="input_group input_add_lbl">-->
  <!--              <label>본인확인 이메일</label>-->
  <!--              <div class="input_wrap">-->
  <!--                <input-->
  <!--                  id="memberEmail"-->
  <!--                  type="email"-->
  <!--                  name="memberEmail"-->
  <!--                  placeholder="본인확인용 이메일을 입력해 주세요."-->
  <!--                />-->
  <!--              </div>-->
  <!--              <span class="txt_consult"-->
  <!--                >아이디를 잊어버리신 경우 필요한 이메일로 가입 아이디와 다른-->
  <!--                이메일을 입력해주세요.</span-->
  <!--              >-->
  <!--            </div>-->
  <!--          </article>-->
  <!--          <button-->
  <!--            id="update-info-btn"-->
  <!--            class="btn btn_blue btn_send"-->
  <!--            type="button"-->
  <!--          >-->
  <!--            수정-->
  <!--          </button>-->
  <!--        </section>-->
  <!--      </form>-->
  <!--    </div>-->
  <!--  </div>-->
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';

import MyInfo from '~/components/myInfo/index.vue';

const User = namespace('user');

@Component({
  layout: 'default',
  components: {
    MyInfo,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
