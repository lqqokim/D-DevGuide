<template>
  <div class="dbs-container">
    <!-- 검색 -->
    <search-bar></search-bar>
    <!--   프로젝트 리스트 영역 -->
    <product-card-list></product-card-list>
    <!--   공지사항 리스트 영역 -->
    <product-notice-list></product-notice-list>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ProductCardList from './ProductCardList.vue';
import ProductNoticeList from './ProductNoticeList.vue';
import SearchBar from '@/components/common/search/searchBar.vue';

@Component({
  layout: 'default',
  components: {
    ProductCardList,
    SearchBar,
    ProductNoticeList,
  },
})
export default class ProductList extends Vue {
  mounted() {
    // this.$axios
    //   .post('/api/token', {
    //     token: this.$store.state.user.user.authToken,
    //   })
    //   .then((res) => {
    //     // console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }
}
</script>

<style scoped></style>
