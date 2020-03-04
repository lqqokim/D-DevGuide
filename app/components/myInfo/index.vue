<template>
  <div class="dbs-container-wrap">
    <div class="dbs-top-image-wrap login">
      <div class="dbs-top-image">
        <dl>
          <dt>마이 페이지</dt>
          <dd>
            내 프로필과 로그인 정보를 확인할 수 있습니다.<br />
            Gitlab Access Token을 등록 할 수 있습니다.
          </dd>
        </dl>
      </div>
    </div>
    <div class="dbs-container">
      <div class="view-top mgt-45">
        <h1 class="tit-con-text">내 정보</h1>
      </div>
      <div class="mypage mgb-50">
        <div class="divide">
          <div class="profile tbl-wrap bdr-bot-none">
            <table class="tbl-base-ver tbl-fixed">
              <colgroup>
                <col style="width: 145px;" />
                <col style="width: auto;" />
              </colgroup>
              <tbody>
                <tr>
                  <th><label for="name">이름</label></th>
                  <td>
                    <input
                      id="name"
                      type="text"
                      class="inp-base w-100p h-40"
                      readonly
                      :value="user.name"
                    />
                  </td>
                </tr>
                <tr>
                  <th><label for="id">아이디</label></th>
                  <td>
                    <input
                      id="id"
                      type="text"
                      class="inp-base w-100p h-40"
                      readonly
                      :value="user.loginId"
                    />
                  </td>
                </tr>
                <tr>
                  <th class="verti-top">
                    <label for="token">Gitlab <br />Access Token</label>
                  </th>
                  <td>
                    <div class="mail-wrap">
                      <input
                        id="token"
                        v-model="gitlabToken"
                        type="text"
                        class="inp-base h-40"
                      />
                      <button
                        type="button"
                        class="dbs-icon-button text"
                        @click="onclickUpdateInfo"
                      >
                        토큰등록
                      </button>
                    </div>
                    <p class="txt-alert">
                      개발자 문서를 편집하시기 위해서는 프로젝트 깃랩에서
                      Personal Access Token을 발급받아 등록하셔야 합니다.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="divide">
          <div class="profile tbl-wrap bdr-bot-none">
            <table class="tbl-base-ver tbl-fixed">
              <colgroup>
                <col style="width: 145px;" />
                <col style="width: auto;" />
              </colgroup>
              <tbody>
                <tr>
                  <th><label for="company">회사명</label></th>
                  <td>
                    <input
                      id="company"
                      type="text"
                      class="inp-base w-100p h-40"
                      readonly
                      :value="user.compName"
                    />
                  </td>
                </tr>
                <tr>
                  <th><label for="department">부서명</label></th>
                  <td>
                    <input
                      id="department"
                      type="text"
                      class="inp-base w-100p h-40"
                      readonly
                      :value="user.deptPath.split('|')[3]"
                    />
                  </td>
                </tr>
                <tr>
                  <th><label for="position">직급</label></th>
                  <td>
                    <input
                      id="position"
                      type="text"
                      class="inp-base w-100p h-40"
                      readonly
                      :value="user.positionName"
                    />
                  </td>
                </tr>
                <tr>
                  <th><label for="job">직책</label></th>
                  <td>
                    <input
                      id="job"
                      type="text"
                      class="inp-base w-100p h-40"
                      readonly
                      :value="user.deptName"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

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
  <!--                    :value="user.name"-->
  <!--                    type="text"-->
  <!--                    name="memberNM"-->
  <!--                    disabled-->
  <!--                  />-->
  <!--                </div>-->
  <!--              </div>-->
  <!--              <div class="input_group input_add_lbl">-->
  <!--                <label>아이디</label>-->
  <!--                <div class="input_wrap">-->
  <!--                  <input-->
  <!--                    id="loginId"-->
  <!--                    :value="user.loginId"-->
  <!--                    type="text"-->
  <!--                    name="loginId"-->
  <!--                    disabled-->
  <!--                  />-->
  <!--                </div>-->
  <!--              </div>-->
  <!--              <div class="input_group input_add_lbl">-->
  <!--                <label>회사명</label>-->
  <!--                <div class="input_wrap">-->
  <!--                  <input-->
  <!--                    id="compName"-->
  <!--                    :value="user.compName"-->
  <!--                    type="text"-->
  <!--                    name="compName"-->
  <!--                    disabled-->
  <!--                  />-->
  <!--                </div>-->
  <!--              </div>-->
  <!--              <div class="input_group input_add_lbl">-->
  <!--                <label>부서명</label>-->
  <!--                <div class="input_wrap">-->
  <!--                  <input-->
  <!--                    id="deptPath"-->
  <!--                    :value="user.deptPath"-->
  <!--                    type="text"-->
  <!--                    name="deptPath"-->
  <!--                    disabled-->
  <!--                  />-->
  <!--                </div>-->
  <!--              </div>-->
  <!--              <div class="input_group input_add_lbl">-->
  <!--                <label>직급</label>-->
  <!--                <div class="input_wrap">-->
  <!--                  <input-->
  <!--                    id="positionName"-->
  <!--                    :value="user.positionName"-->
  <!--                    type="text"-->
  <!--                    name="positionName"-->
  <!--                    disabled-->
  <!--                  />-->
  <!--                </div>-->
  <!--              </div>-->
  <!--              <div class="input_group input_add_lbl">-->
  <!--                <label>직책</label>-->
  <!--                <div class="input_wrap">-->
  <!--                  <input-->
  <!--                    id="deptName"-->
  <!--                    :value="user.deptName"-->
  <!--                    type="text"-->
  <!--                    name="deptName"-->
  <!--                    disabled-->
  <!--                  />-->
  <!--                </div>-->
  <!--              </div>-->
  <!--            </div>-->
  <!--          </article>-->
  <!--          <article class="login_area">-->
  <!--            <h3>토큰 정보</h3>-->
  <!--            &lt;!&ndash;            <h3>로그인 정보</h3>&ndash;&gt;-->
  <!--            &lt;!&ndash;            <div class="input_group input_add_lbl">&ndash;&gt;-->
  <!--            &lt;!&ndash;              <label>아이디</label>&ndash;&gt;-->
  <!--            &lt;!&ndash;              <div class="input_wrap">&ndash;&gt;-->
  <!--            &lt;!&ndash;                <input id="memberID1" type="text" name="memberID1" readonly />&ndash;&gt;-->
  <!--            &lt;!&ndash;              </div>&ndash;&gt;-->
  <!--            &lt;!&ndash;            </div>&ndash;&gt;-->
  <!--            <div class="input_group input_add_lbl">-->
  <!--              <label>gitlab Access Token</label>-->
  <!--              <div class="input_wrap" style="width: 65%;">-->
  <!--                <input-->
  <!--                  id="token"-->
  <!--                  v-model="gitlabToken"-->
  <!--                  type="AccessToken"-->
  <!--                  name="AccessToken"-->
  <!--                />-->
  <!--              </div>-->
  <!--              &lt;!&ndash;              <button type="button" class="btn-gray">&ndash;&gt;-->
  <!--              &lt;!&ndash;                <span>토큰수정</span>&ndash;&gt;-->
  <!--              &lt;!&ndash;              </button>&ndash;&gt;-->
  <!--              &lt;!&ndash;              <button type="button" class="btn-gray">&ndash;&gt;-->
  <!--              &lt;!&ndash;                <span>토근등록</span>&ndash;&gt;-->
  <!--              &lt;!&ndash;              </button>&ndash;&gt;-->
  <!--              <span class="txt_consult"-->
  <!--                >개발자 문서를 편집하시기 위해서는 프로젝트 깃랩에서 Personal-->
  <!--                Access Tockens을 발급받아 등록하셔야 합니다.</span-->
  <!--              >-->
  <!--            </div>-->
  <!--          </article>-->
  <!--          &lt;!&ndash;          <article class="login_area">&ndash;&gt;-->
  <!--          &lt;!&ndash;            <h3>로그인 정보</h3>&ndash;&gt;-->
  <!--          &lt;!&ndash;            <div class="input_group input_add_lbl">&ndash;&gt;-->
  <!--          &lt;!&ndash;              <label>아이디</label>&ndash;&gt;-->
  <!--          &lt;!&ndash;              <div class="input_wrap">&ndash;&gt;-->
  <!--          &lt;!&ndash;                <input id="memberID" type="text" name="memberID" readonly />&ndash;&gt;-->
  <!--          &lt;!&ndash;              </div>&ndash;&gt;-->
  <!--          &lt;!&ndash;            </div>&ndash;&gt;-->
  <!--          &lt;!&ndash;            <div class="input_group input_add_lbl">&ndash;&gt;-->
  <!--          &lt;!&ndash;              <label>비밀번호</label>&ndash;&gt;-->
  <!--          &lt;!&ndash;              <div class="input_wrap">&ndash;&gt;-->
  <!--          &lt;!&ndash;                <input&ndash;&gt;-->
  <!--          &lt;!&ndash;                  id="memberPW"&ndash;&gt;-->
  <!--          &lt;!&ndash;                  type="password"&ndash;&gt;-->
  <!--          &lt;!&ndash;                  name="memberPW"&ndash;&gt;-->
  <!--          &lt;!&ndash;                  placeholder="현재 비밀번호"&ndash;&gt;-->
  <!--          &lt;!&ndash;                />&ndash;&gt;-->
  <!--          &lt;!&ndash;              </div>&ndash;&gt;-->
  <!--          &lt;!&ndash;              &lt;!&ndash;span class="txt_alert" style="visibility: hidden;">비밀번호가 일치하지 않습니다.</span&ndash;&gt;&ndash;&gt;-->
  <!--          &lt;!&ndash;            </div>&ndash;&gt;-->
  <!--          &lt;!&ndash;            <div class="input_group input_add_lbl">&ndash;&gt;-->
  <!--          &lt;!&ndash;              <label></label>&ndash;&gt;-->
  <!--          &lt;!&ndash;              <div class="input_wrap">&ndash;&gt;-->
  <!--          &lt;!&ndash;                <input&ndash;&gt;-->
  <!--          &lt;!&ndash;                  id="updatePW"&ndash;&gt;-->
  <!--          &lt;!&ndash;                  type="password"&ndash;&gt;-->
  <!--          &lt;!&ndash;                  name="updatePW"&ndash;&gt;-->
  <!--          &lt;!&ndash;                  placeholder="변경할 비밀번호"&ndash;&gt;-->
  <!--          &lt;!&ndash;                />&ndash;&gt;-->
  <!--          &lt;!&ndash;              </div>&ndash;&gt;-->
  <!--          &lt;!&ndash;              &lt;!&ndash;span class="txt_alert" style="visibility: hidden;">6~16자 영문 대/소문자, 숫자, 특수문자를 사용하세요.</span&ndash;&gt;&ndash;&gt;-->
  <!--          &lt;!&ndash;            </div>&ndash;&gt;-->
  <!--          &lt;!&ndash;            <div class="input_group input_add_lbl">&ndash;&gt;-->
  <!--          &lt;!&ndash;              <label></label>&ndash;&gt;-->
  <!--          &lt;!&ndash;              <div class="input_wrap">&ndash;&gt;-->
  <!--          &lt;!&ndash;                <input&ndash;&gt;-->
  <!--          &lt;!&ndash;                  id="confirmPW"&ndash;&gt;-->
  <!--          &lt;!&ndash;                  type="password"&ndash;&gt;-->
  <!--          &lt;!&ndash;                  name="confirmPW"&ndash;&gt;-->
  <!--          &lt;!&ndash;                  placeholder="변경할 비밀번호 재입력"&ndash;&gt;-->
  <!--          &lt;!&ndash;                />&ndash;&gt;-->
  <!--          &lt;!&ndash;              </div>&ndash;&gt;-->
  <!--          &lt;!&ndash;              &lt;!&ndash;span class="txt_alert" style="visibility: hidden;">비밀번호가 일치하지 않습니다.</span&ndash;&gt;&ndash;&gt;-->
  <!--          &lt;!&ndash;            </div>&ndash;&gt;-->
  <!--          &lt;!&ndash;            <div class="input_group input_add_lbl">&ndash;&gt;-->
  <!--          &lt;!&ndash;              <label>본인확인 이메일</label>&ndash;&gt;-->
  <!--          &lt;!&ndash;              <div class="input_wrap">&ndash;&gt;-->
  <!--          &lt;!&ndash;                <input&ndash;&gt;-->
  <!--          &lt;!&ndash;                  id="memberEmail"&ndash;&gt;-->
  <!--          &lt;!&ndash;                  type="email"&ndash;&gt;-->
  <!--          &lt;!&ndash;                  name="memberEmail"&ndash;&gt;-->
  <!--          &lt;!&ndash;                  placeholder="본인확인용 이메일을 입력해 주세요."&ndash;&gt;-->
  <!--          &lt;!&ndash;                />&ndash;&gt;-->
  <!--          &lt;!&ndash;              </div>&ndash;&gt;-->
  <!--          &lt;!&ndash;              <span class="txt_consult"&ndash;&gt;-->
  <!--          &lt;!&ndash;                >아이디를 잊어버리신 경우 필요한 이메일로 가입 아이디와 다른&ndash;&gt;-->
  <!--          &lt;!&ndash;                이메일을 입력해주세요.</span&ndash;&gt;-->
  <!--          &lt;!&ndash;              >&ndash;&gt;-->
  <!--          &lt;!&ndash;            </div>&ndash;&gt;-->
  <!--          &lt;!&ndash;          </article>&ndash;&gt;-->
  <!--          <button-->
  <!--            id="update-info-btn"-->
  <!--            class="btn btn_blue btn_send"-->
  <!--            type="button"-->
  <!--            @click="onclickUpdateInfo"-->
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
import { IUser } from '@/store/modules/user';
import { IAlert } from '~/store/modules/common';

const User = namespace('user');
const Common = namespace('common');

@Component
export default class MyInfo extends Vue {
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;
  @User.Action('createGitLabToken') createGitLabTokenAction!: (
    token: string
  ) => Promise<any>;
  @User.Action('checkGitlabToken') checkGitlabTokenAction!: (
    gitlabToken: string
  ) => Promise<any>;
  @User.Mutation('SET_GITLAB_TOKEN') gitlabTokenMutation!: (string) => void;

  isEdit: boolean = false;

  get user(): IUser {
    return this.$store.state.user.user;
  }

  token: string = '';

  get gitlabToken(): string {
    return this.token;
  }

  set gitlabToken(token: string) {
    this.token = token;
  }

  created() {
    this.token = this.user.gitlabToken;
  }

  onclickUpdateInfo(): void {
    this.checkGitlabTokenAction(this.gitlabToken)
      .then((checkRes) => {
        if (checkRes.success && checkRes.data) {
          this.createGitLabTokenAction(this.gitlabToken).then(() => {});
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          this.alertAction({
            type: 'warning',
            isShow: true,
            msg: `[${err.response.status}] 유효하지 않은 Token 입니다.`,
          }).then(() => {});
        }
      });
  }
}
</script>

<style scoped></style>
