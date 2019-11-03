<template>
  <div>
    <!--<div>-->
    <!--제품 리스트 페이지-->
    <!--</div>-->

    <!--&lt;!&ndash; 메인 이미지 영역 &ndash;&gt;-->
    <!--<top-image></top-image>-->

    <!--&lt;!&ndash;   통합 검색  &ndash;&gt;-->
    <!--<search-bar></search-bar>-->

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
export default class ProductList extends Vue {
  mounted() {
    const token = window.sessionStorage.getItem('KEY');

    this.$axios
      .post('/api/token', {
        token,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // mounted() {
  //   const token = window.sessionStorage.getItem('KEY');
  //   const data = {
  //     key: token,
  //   };
  //
  //   const config = {
  //     headers: {
  //       Accept: 'text/plain, */*; q=0.01',
  //       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  //       // Referer: 'http://localhost:3000/html/PagePanel.html?pageId=dbs',
  //       'Sec-Fetch-Mode': 'cors',
  //       'Sec-Fetch-Site': 'same-origin',
  //       'User-Agent':
  //         'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36',
  //       'X-Requested-With': 'XMLHttpRequest',
  //     },
  //   };
  //
  //   this.$axios
  //     .post('http://localhost:3000/html/__LoginCheckBL.jsp', token, config)
  //     .then((res) => {
  //       console.log('결과 :: ', res);
  //     })
  //     .catch((err) => {
  //       console.log('에러 :: ', err);
  //     });
  // }
}
</script>

<style scoped></style>
