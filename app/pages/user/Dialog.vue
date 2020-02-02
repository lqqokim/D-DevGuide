<template>
  <div class="base-wrap not-scroll">
    <!-- 새 브랜치 작성 S-->
    <div class="dbs-message-wrap" style="display: block;">
      <div class="message-wrap">
        <a class="pst-closed" role="button">닫기</a>
        <div class="dbs-message-icon check">
          <p class="dbs-message-sub">성공적으로 완료되었습니다.</p>
        </div>
        <!-- button 영역 -->
        <div class="dbs-message-footer">
          <div class="btn-wrap">
            <button type="button" class="dbs-icon-button text">
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="dbs-overlay"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component({
  layout: 'login',
})
export default class extends Vue {
  /**
   * check, error, information, question, warning
   */
}
</script>

<style></style>
