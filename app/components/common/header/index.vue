<template>
  <header>
    <div class="gnb-header">
      <div class="aside">
        <p class="notification">
          <template v-if="token">
            <span class="noti">
              {{ $store.state.user.user.name }} 님 반갑습니다.
            </span>
            <!--            <span class="noti">-->
            <!--              [권한 : {{ $store.state.user.user.authority }}]-->
            <!--            </span>-->
            <!--            <span class="noti"-->
            <!--              ><nuxt-link to="/admin/video" class="noti-link"-->
            <!--                >Settings</nuxt-link-->
            <!--              ></span-->
            <!--            >-->
            <span class="noti log">
              <a class="noti-link" @click="logout">로그아웃</a>
            </span>
            <span class="noti mypage"
              ><a class="noti-link" @click="onclickMyInfo">마이페이지</a></span
            >
          </template>
          <template v-else>
            <span class="noti log">
              <!--              <nuxt-link to="/html/Login.html" class="noti-link"-->
              <!--              >로그인</nuxt-link>-->
              <a href="/html/Login.html" class="noti-link">로그인</a>
            </span>
          </template>
        </p>
      </div>
    </div>
    <div class="gnb" @mouseover="openSubMenu" @mouseleave="closeSubMenu">
      <h1 class="logo">
        <img
          src="~/assets/images/logo_top.png"
          alt="dbs_logo"
          style="cursor: pointer;"
          @click="onClickDBSLogo"
        />
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
        <li><a class="ico-chat disabled"></a></li>
        <li><a class="ico-notice disabled"></a></li>
        <li><a class="ico-memo disabled"></a></li>
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
import { IAlert } from '~/store/modules/common';
import * as user from '@/store/modules/user';
import * as common from '@/store/modules/common';

const User = namespace('user');
const Common = namespace('common');

@Component
export default class HeaderComp extends Vue {
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;
  @User.Mutation('userLogout') logoutAction!: () => void;

  authRequiredPages!: string[];

  readonly dbsPath: string = '/html/PagePanel.html';
  $refs!: {
    submenu: HTMLFormElement;
    bar: HTMLFormElement;
  };

  get token() {
    return this.$store.state.user.user.authToken;
  }

  created() {
    this.authRequiredPages = this.$store.state.common.authRequiredPages;
  }

  mounted() {
    //  configuration for dbs initialize
    this.$axios.post('/ei8n001i5t');

    // const instance = this.$axios.create({
    //   baseURL: process.env.BASE_URL,
    //   timeout: 10000,
    //   params: {}, // do not remove this, its added to add params later in the config
    // });

    // // Add a request interceptor
    // this.$axios.interceptors.request.use(
    //   (config) => {
    //     console.info('interceptors.request :: ', config);
    //     // config.headers.genericKey = 'someGenericValue';
    //     return config;
    //   },
    //   (error) => {
    //     console.error(error);
    //     return Promise.reject(error);
    //   }
    // );
    //
    // // Add a response interceptor
    // this.$axios.interceptors.response.use(
    //   (response) => {
    //     /** In dev, intercepts request and logs it into console for dev */
    //     console.info('interceptors.response :: ', response);
    //     return response;
    //   },
    //   (error) => {
    //     console.error(error);
    //     return Promise.reject(error);
    //   }
    // );
  }

  onclickMyInfo(): void {
    const user = this.$store.state.user.user;
    if (user.authority) {
      if (user.authority === 'M' || user.authority === 'A') {
        location.href = this.dbsPath + '?pageId=myinfo';
      } else if (user.authority === 'E' || user.authority === 'S') {
        this.$router.push({
          path: '/myInfo',
        });
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

  async logout(): Promise<any> {
    sessionStorage.clear();
    await this.logoutAction();
  }

  onClickDBSLogo(): void {
    if (this.$route.path !== '/') {
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
