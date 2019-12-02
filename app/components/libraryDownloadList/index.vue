<template>
  <div class="container-panel">
    <div class="view-top">
      <h3 class="tit-con-text">다운로드 {{ $route.params.productName }}</h3>
      <div class="position-wrap">
        <input type="button" value="추가" @click="onclickRegister" />
      </div>
    </div>

    <div>
      테이블
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class LibraryDownloadList extends Vue {
  onclickRegister() {
    this.$router.push({
      name: 'downloadRegister',
      params: {
        productName: this.$route.params.productName,
      },
    });
  }
}
</script>

<style scoped></style>
