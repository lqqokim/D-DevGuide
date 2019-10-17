<template>
  <div>
    <div>
      제품 문서 뷰 페이지
    </div>

    <!-- 제품 문서 메뉴 영역-->
    <doc-menu></doc-menu>

    <!-- 제품 문서 컨텐츠 영역-->
    <doc-contents></doc-contents>

    <!-- 검색 및 컨텐츠 영역-->
    <search-contents></search-contents>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import DocMenu from './DocMenu.vue';
import DocContents from './DocContents.vue';
import SearchContents from './SearchContents.vue';

@Component({
  components: {
    DocMenu,
    DocContents,
    SearchContents,
  },
})
export default class ProductDocView extends Vue {}
</script>

<style scoped></style>
