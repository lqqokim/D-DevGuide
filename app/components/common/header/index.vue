<template>
  <header>
    <div class="gnb-header">
      <div class="aside">
        <p class="notification">
          <template v-if="$store.state.user.user.authToken">
            <span class="noti">
              {{ $store.state.user.user.name }} 님 반갑습니다.
            </span>
            <span class="noti">
              [권한 : {{ $store.state.user.user.authority }}]
            </span>
            <span class="noti"
              ><nuxt-link to="/admin/video" class="noti-link"
                >Settings</nuxt-link
              ></span
            >
            <span v-if="token" class="noti log">
              <a class="noti-link" @click="logout">로그아웃</a>
            </span>
            <span v-if="token" class="noti mypage"
              ><nuxt-link to="/myinfo" class="noti-link"
                >마이페이지</nuxt-link
              ></span
            >
          </template>
          <template v-else>
            <span class="noti log"
              ><nuxt-link to="/login" class="noti-link">로그인</nuxt-link></span
            >
          </template>
        </p>
      </div>
    </div>
    <div class="gnb" @mouseover="openSubMenu" @mouseleave="closeSubMenu">
      <h1 class="logo">
        <img src="~/assets/images/logo_top.png" alt="dbs_logo" />
      </h1>
      <div class="gnb-navi">
        <ul class="ui-menu-list">
          <li class="ui-menu">
            <a :href="dbsPath + '?pageId=dbs'">비지니스 스쿨</a>
          </li>
          <li class="ui-menu"><a :href="dbsPath + '?pageId=forum'">포럼</a></li>
          <li class="ui-menu selected">
            <nuxt-link to="/docs">DEWS 개발자 지원</nuxt-link>
          </li>
        </ul>
        <!-- 마우스 오버시 display: block 되어야 함 -->
        <div ref="submenu" class="gnb-menu-wrap" @mouseleave="closeSubMenu">
          <ul class="menu-list">
            <li class="mn-list">
              <ul class="menu-sub-list">
                <li class="mn-sub-list">
                  <a :href="dbsPath + '?pageId=dbs'">DBS란</a>
                </li>
                <li class="mn-sub-list">
                  <a :href="dbsPath + '?pageId=game'">학습하기</a>
                </li>
                <li class="mn-sub-list">
                  <a :href="dbsPath + '?pageId=service'">서비스 신청</a>
                </li>
              </ul>
            </li>
            <li class="mn-list">
              <ul class="menu-sub-list">
                <li class="mn-sub-list">
                  <a :href="dbsPath + '?pageId=forum'">포럼 홈</a>
                </li>
                <li class="mn-sub-list">
                  <a :href="dbsPath + '?pageId=forummy'">마이 포럼</a>
                </li>
              </ul>
            </li>
            <li class="mn-list">
              <ul class="menu-sub-list">
                <li class="mn-sub-list">
                  <nuxt-link to="/docs">개발자 문서</nuxt-link>
                </li>
                <li class="mn-sub-list">
                  <nuxt-link to="/qna">질문/답변</nuxt-link>
                </li>
                <li class="mn-sub-list">
                  <nuxt-link to="/library">자료실</nuxt-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <ul class="right-icon-area">
        <li><a href="#" class="ico-chat"></a></li>
        <li><a href="#" class="ico-notice"></a></li>
        <li><a href="#" class="ico-memo"></a></li>
      </ul>
    </div>
    <!-- 마우스 오버시 display: block 되어야 함 -->
    <div ref="bar" class="bar">
      <div class="barwrap"></div>
    </div>
  </header>
</template>
<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator';
import * as user from '@/store/modules/user';
import * as common from '@/store/modules/common';

const User = namespace('user');
const Common = namespace('common');

@Component
export default class HeaderComp extends Vue {
  // @User.Action('encryptToken') encryptTokenAction!: () => void;
  // @User.Mutation('setTokenSSR') setTokenSSRMutation!: (any) => void;
  @User.Mutation('userLogout') logoutAction!: () => void;
  @User.Getter('getToken') authToken!: string | null;
  @Common.State('authPages') authPages!: string[];

  readonly dbsPath: string = '/html/PagePanel.html';
  $refs!: {
    submenu: HTMLFormElement;
    bar: HTMLFormElement;
  };

  get token() {
    return this.authToken;
  }

  mounted() {
    // @ts-ignore
    const cookie: string | null = this.$cookies.get('KEY');

    // if (cookie) {
    //   this.setTokenSSRMutation(cookie);
    //   // 토큰으로 유저정보를 가져옴
    //   this.encryptTokenAction();
    //
    //   // white_list 아닌 페이지에 대한 SSR 담당
    // }

    if (!cookie) {
      this.logoutAction();

      if (this.authPages.includes(this.$route.path)) {
        // TODO 퍼블리싱 작업으로 임시 주석
        // this.$router.push({
        //   path: '/',
        // });
      }
    }
  }

  openSubMenu($event): void {
    if (this.$refs.submenu) {
      this.$refs.submenu.style.display = 'block';
    }

    if (this.$refs.bar) {
      this.$refs.bar.style.display = 'block';
    }
  }

  closeSubMenu($event): void {
    if (this.$refs.submenu) {
      this.$refs.submenu.style.display = 'none';
    }

    if (this.$refs.bar) {
      this.$refs.bar.style.display = 'none';
    }
  }

  logout(): void {
    this.logoutAction();

    if (this.authPages.includes(this.$route.path)) {
      this.$router.push({
        path: '/',
      });
    }
  }
}
</script>
<style lang="css">
.gnb {
  color: #437fe3;
}
</style>
