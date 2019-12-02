<template>
  <footer>
    <div class="floating-button-group">
      <ul>
        <li id="Back" class="btn-back" @click="$router.go(-1)">뒤로</li>
        <li id="Top" class="btn-top" @click="window.scrollTo(0, 0)">
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
          <a href="" class="foot-link">정책 및 약관</a>
        </li>
        <li class="foot-copy-link">
          <a href="" class="foot-link bold">개인정보처리방침</a>
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
  created() {
    // console.log('created ', this.$route);
  }
}
</script>
