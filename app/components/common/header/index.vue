<template>
  <header>
    <div class="gnb-header">
      <div class="aside">
        <p class="notification">
          <span class="noti"
            ><nuxt-link to="/" class="noti-link">Settings</nuxt-link></span
          >
          <span class="noti log"
            ><nuxt-link to="/login" class="noti-link" @click.native="clearToken"
              >로그아웃</nuxt-link
            ></span
          >
          <span class="noti mypage"
            ><nuxt-link to="/myinfo" class="noti-link"
              >마이페이지</nuxt-link
            ></span
          >
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
            <nuxt-link to="/docs">개발자 지원</nuxt-link>
          </li>
          <li class="ui-menu">
            <nuxt-link to="/qna/:categoryName">질문 / 답변</nuxt-link>
          </li>
          <li class="ui-menu">
            <nuxt-link to="/library/video">자료실</nuxt-link>
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
                  <nuxt-link to="/docs">제품리스트</nuxt-link>
                </li>
                <li class="mn-sub-list">
                  <nuxt-link to="docs/register">제품등록</nuxt-link>
                </li>
                <li class="mn-sub-list">
                  <nuxt-link
                    to="/docs/:productId/branch/:branchName/:pageType/:pageId"
                    >문서뷰/편집</nuxt-link
                  >
                </li>
              </ul>
            </li>
            <li class="mn-list">
              <ul class="menu-sub-list">
                <li class="mn-sub-list">
                  <nuxt-link to="/qna/:categoryName">나의 문의내역</nuxt-link>
                </li>
                <li class="mn-sub-list">
                  <nuxt-link to="/qna/:categoryName">제품별 통합질문</nuxt-link>
                </li>
              </ul>
            </li>
            <li class="mn-list">
              <ul class="menu-sub-list">
                <li class="mn-sub-list">
                  <nuxt-link to="/library/video">동영상</nuxt-link>
                </li>
                <li class="mn-sub-list">
                  <nuxt-link to="/library/doc">문서</nuxt-link>
                </li>
                <li class="mn-sub-list">
                  <nuxt-link to="/library/download">다운로드</nuxt-link>
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
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class HeaderComp extends Vue {
  readonly dbsPath = 'html/PagePanel.html';
  $refs!: {
    submenu: HTMLFormElement;
    bar: HTMLFormElement;
  };

  openSubMenu($event): void {
    this.$refs.submenu.style.display = 'block';
    this.$refs.bar.style.display = 'block';
  }

  closeSubMenu($event): void {
    this.$refs.submenu.style.display = 'none';
    this.$refs.bar.style.display = 'none';
  }

  clearToken(): void {
    const storage = window.sessionStorage;
    if (storage.KEY) {
      storage.removeItem('KEY');
    }
  }
}
</script>
<style lang="css">
.gnb {
  color: #437fe3;
}
</style>
