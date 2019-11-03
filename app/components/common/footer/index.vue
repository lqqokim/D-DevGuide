<template>
  <footer>
    <div class="footer-wrap">
      <div class="foot-menu">
        <strong>비지니스 스쿨</strong>
        <ul class="foot-sub-menu">
          <li>
            <a :href="dbsPath + '?pageId=dbs'" class="foot-sub-link">DBS란</a>
          </li>
          <li>
            <a :href="dbsPath + '?pageId=game'" class="foot-sub-link"
              >학습하기</a
            >
          </li>
          <li>
            <a :href="dbsPath + '?pageId=service'" class="foot-sub-link"
              >서비스 신청</a
            >
          </li>
        </ul>
      </div>
      <div class="foot-menu">
        <strong>포럼</strong>
        <ul class="foot-sub-menu">
          <li>
            <a :href="dbsPath + '?pageId=forum'" class="foot-sub-link"
              >포럼 홈</a
            >
          </li>
          <li>
            <a :href="dbsPath + '?pageId=forummy'" class="foot-sub-link"
              >마이 포럼</a
            >
          </li>
        </ul>
      </div>
      <div class="foot-menu">
        <strong>개발자 가이드</strong>
        <ul class="foot-sub-menu">
          <li>
            <nuxt-link to="/docs" class="foot-sub-link">제품 리스트</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/docs/register" class="foot-sub-link"
              >제품 등록</nuxt-link
            >
          </li>
          <li>
            <nuxt-link
              to="/docs/:productId/branch/:branchName/:pageType/:pageId"
              class="foot-sub-link"
              >문서뷰 / 편집</nuxt-link
            >
          </li>
        </ul>
      </div>
      <div class="foot-menu">
        <strong>질문 / 답변</strong>
        <ul class="foot-sub-menu">
          <li>
            <nuxt-link to="/qna/:categoryName" class="foot-sub-link"
              >나의 문의내역</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/qna/:categoryName" class="foot-sub-link"
              >제품별 통합질문</nuxt-link
            >
          </li>
        </ul>
      </div>
      <div class="foot-menu">
        <strong>자료실</strong>
        <ul class="foot-sub-menu">
          <li>
            <nuxt-link to="/library/video" class="foot-sub-link"
              >동영상</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/library/doc" class="foot-sub-link">문서</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/library/download" class="foot-sub-link"
              >다운로드</nuxt-link
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="footer-copyright">
      <h1 class="footer-logo">
        <img src="~/assets/images/logo_bottom.png" alt="dbs_logo" />
      </h1>
      <p>
        <span class="foot-copy-link"
          ><a href="" class="foot-link">공지사항</a></span
        >
        <span class="foot-copy-link"
          ><a href="" class="foot-link">문의사항</a></span
        >
        <span class="foot-copy-link"><a href="" class="foot-link">FAQ</a></span>
        <span class="foot-copy-link"
          ><a href="" class="foot-link">정책 및 약관</a></span
        >
        <span class="foot-copy-link"
          ><a href="" class="foot-link">개인정보처리방침</a></span
        >
      </p>
      <p class="copyright">Copyright(c) DOUZONE Bizon. All Rights Reserved.</p>
    </div>
  </footer>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class FooterComp extends Vue {}
</script>
