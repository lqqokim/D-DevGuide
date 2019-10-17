<template>
  <div>
    <div>
      제품 리스트 페이지
    </div>

    <!-- 메인 이미지 영역 -->
    <top-image></top-image>

    <!--   통합 검색  -->
    <search-bar></search-bar>

    <!--   프로젝트 리스트 영역 -->
    <product-card-list></product-card-list>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ProductCardList from './ProductCardList.vue';
import TopImage from './TopImage.vue';
import SearchBar from './SearchBar.vue';

@Component({
  layout: 'TypeA',
  components: {
    ProductCardList,
    TopImage,
    SearchBar,
  },
})
export default class ProductList extends Vue {}
</script>

<style scoped></style>
