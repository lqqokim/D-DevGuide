<template>
  <!-- 제품군에 따라 class 를 다르게 줘서 이미지 나오도록 수정 필요 -->
  <div class="dbs-visual-wrap mgt-60">
    <div
      v-for="product in productList"
      :key="product.projectId"
      class="dbs-visual-item"
    >
      <strong>{{ product.productName }}</strong>
      <span>{{ product.productDescription }}</span>
      <p class="btn-detail">
        <!--<a href="" class="btn-normal" @click.prevent="moveToDetail(product)"-->
        <!--&gt;자세히보기</a-->
        <!--&gt;-->
        <nuxt-link
          :to="{
            name: 'detail',
            params: {
              productId: product.projectId,
              data: product,
              pageType: 'Documents',
            },
          }"
          tag="a"
          class="btn-normal"
        >
          자세히보기
        </nuxt-link>
      </p>
    </div>
    <!--<div class="dbs-visual-item dews-ui">-->
    <!--<strong>DEWS UI</strong>-->
    <!--<span>Project Sub Description</span>-->
    <!--<p class="btn-detail">-->
    <!--<a href="" class="btn-normal">자세히보기</a>-->
    <!--</p>-->
    <!--</div>-->
    <!--<div class="dbs-visual-item dews-j">-->
    <!--<strong>DEWS J</strong>-->
    <!--<span>Project Sub Description</span>-->
    <!--<p class="btn-detail">-->
    <!--<a href="" class="btn-normal">자세히보기</a>-->
    <!--</p>-->
    <!--</div>-->
    <!--<div class="dbs-visual-item dews-fd">-->
    <!--<strong>DEWS FD</strong>-->
    <!--<span>Project Sub Description</span>-->
    <!--<p class="btn-detail">-->
    <!--<a href="" class="btn-normal">자세히보기</a>-->
    <!--</p>-->
    <!--</div>-->
    <!--<div class="dbs-visual-item dews-bd">-->
    <!--<strong>DEWS BD</strong>-->
    <!--<span>Project Sub Description</span>-->
    <!--<p class="btn-detail">-->
    <!--<a href="" class="btn-normal">자세히보기</a>-->
    <!--</p>-->
    <!--</div>-->
    <!--<div class="dbs-visual-item dews-q">-->
    <!--<strong>DEWS Q</strong>-->
    <!--<span>Project Sub Description</span>-->
    <!--<p class="btn-detail">-->
    <!--<a href="" class="btn-normal">자세히보기</a>-->
    <!--</p>-->
    <!--</div>-->
    <!--<div class="dbs-visual-item d-erp">-->
    <!--<strong>D_ERP</strong>-->
    <!--<span>Project Sub Description</span>-->
    <!--<p class="btn-detail">-->
    <!--<a href="" class="btn-normal">자세히보기</a>-->
    <!--</p>-->
    <!--</div>-->
    <!-- 임의로 추가한 버튼 -->
    <button @click="moveToProductRegister">제품 등록</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import ProductCardListItem from '~/components/productList/ProductCardListItem.vue';
import * as projects from '@/store/modules/projects';

const Projects = namespace('projects');

@Component({
  components: {
    ProductCardListItem,
  },
})
export default class ProductCardList extends Vue {
  @Projects.Action('getProductList') getProductListAction;
  @Projects.Getter('wholeProductList') productList!: projects.Product;

  created() {
    this.getProductListAction({});
  }

  moveToProductRegister(): void {
    this.$router.push('/docs/register');
  }
}
</script>
