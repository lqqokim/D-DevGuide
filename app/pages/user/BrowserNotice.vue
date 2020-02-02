<template>
  <div class="base-wrap">
    <header>
      <div class="gnb-simple">
        <h1 class="logo">
          <img src="/_nuxt/app/assets/images/logo_top.png" alt="dbs_logo" />
        </h1>
      </div>
    </header>
    <div class="dbs-container-wrap">
      <div class="dbs-container">
        <div class="content">
          <p class="error_title">
            현재 접속하신 브라우저로 이용하실 경우<br />
            일부 기능의 이용이 제한되거나 오류가 발생할 수 있습니다.
          </p>
          <p class="error-desc">
            IE 9 이하의 브라우저는 더이상 지원하지 않습니다.
          </p>
          <p class="error-info">
            브라우저 환경의 보안을 강화하고 기능을 향상하려면<br />
            사용하시는 운영체제(OS)에 맞는 최신 브라우저를 설치해 주시기
            바랍니다.
          </p>
          <ul class="list-browser">
            <li>
              <a
                href="https://www.google.com/chrome/browser/desktop/index.html"
                target="_blank"
                ><img
                  src="data:image/png;base64,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"
                  alt="Chrome logo"
              /></a>
              <a
                class="link"
                role="button"
                href="https://www.google.com/chrome/browser/desktop/index.html"
                target="_blank"
                alt="Chrome 다운로드"
                >Chrome 다운로드</a
              >
            </li>
            <li>
              <a
                href="https://support.microsoft.com/ko-kr/help/17621/internet-explorer-downloads"
                target="_blank"
                ><img
                  src="data:image/png;base64,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"
                  alt="IE logo"
              /></a>
              <a
                class="link"
                role="button"
                href="https://support.microsoft.com/ko-kr/help/17621/internet-explorer-downloads"
                target="_blank"
                alt="IE11 다운로드"
                >IE 11 다운로드</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import BrowserNotice from '~/components/browserNotice/index.vue';

@Component({
  layout: 'login',
  components: {
    BrowserNotice,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
