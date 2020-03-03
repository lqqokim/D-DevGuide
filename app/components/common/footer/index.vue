<template>
  <footer>
    <div class="floating-button-group">
      <ul>
        <!--<li id="Back" class="btn-back" @click="$router.go(-1)">뒤로</li>-->
        <li v-if="showTopBtn" id="Top" class="btn-top" @click="onClickTop">
          상단으로
        </li>
        <li
          id="Refresh"
          class="btn-refresh"
          @click="
            $router.go({
              path: $route.path,
              force: true,
            })
          "
        >
          새로고침
        </li>
      </ul>
    </div>
    <div class="footer-wrap">
      <h1 class="footer-logo">
        <img src="~/assets/images/logo_bottom.png" alt="dbs_logo" />
      </h1>
      <ul class="footer-inner">
        <li class="foot-copy-link">
          <nuxt-link to="/clause" tag="a" class="foot-link"
            >정책 및 약관</nuxt-link
          >
        </li>
        <li class="foot-copy-link">
          <nuxt-link to="/policy" tag="a" class="foot-link"
            >개인정보처리방침</nuxt-link
          >
        </li>
      </ul>
      <p class="copyright">Copyright(c) DOUZONE Bizon. All Rights Reserved.</p>
    </div>
  </footer>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class FooterComp extends Vue {
  readonly dbsPath = '/html/PagePanel.html';
  showTopBtn: boolean = false;

  mounted() {
    const footerTop = window.document.getElementsByClassName(
      'footer-wrap'
    )[0] as HTMLElement;
    // const top = footerTop.offsetTop;
    const ulTag = window.document.getElementsByClassName(
      'floating-button-group'
    )[0].children[0] as HTMLElement;
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 0 && window.scrollY <= 100) {
        this.showTopBtn = false;
        //   this.showTopBtn = true;
      } else {
        this.showTopBtn = true;
      }

      const calc = window.outerHeight - footerTop.getBoundingClientRect().top;
      if (calc > 0 && calc < 30) {
        ulTag.style.bottom = '17px';
      } else if (calc >= 30 && calc < 60) {
        ulTag.style.bottom = '34px';
      } else if (calc >= 60 && calc < 90) {
        ulTag.style.bottom = '51px';
      } else if (calc >= 90 && calc < 120) {
        ulTag.style.bottom = '68px';
      } else if (calc >= 120 && calc < 150) {
        ulTag.style.bottom = '75px';
      } else if (calc >= 150 && calc < 180) {
        ulTag.style.bottom = '92px';
      } else if (calc >= 180) {
        ulTag.style.bottom = '120px';
      }
    });
  }

  onClickTop() {
    window.scrollTo(0, 0);
  }
}
</script>
