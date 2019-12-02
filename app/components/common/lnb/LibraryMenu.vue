<template>
  <!-- 좌측메뉴 S -->
  <div class="left-menu">
    <p class="tit-con-left"><strong>자료실</strong></p>
    <div class="ui-accordion-left-pnl">
      <ul>
        <li class="nav-item depth-1 folder selected">
          <a href="#" class="nav-text">동영상</a>
          <ul class="nav-container depth-2" style="display: block;">
            <li class="nav-item depth-2 page">
              <a href="#" class="nav-text">전체</a>
            </li>

            <!--동영상 제품 목록 S-->
            <li
              v-for="product in $store.state.video.products"
              :key="product._id"
              class="nav-item depth-2 page"
              :class="{
                selected: selectedProductId === product._id,
              }"
            >
              <a class="nav-text" @click="onclickMenuProduct(product)">{{
                product.productName
              }}</a>
            </li>
            <!--동영상 제품 목록 E-->

            <li class="nav-item depth-2 page">
              <nuxt-link to="/video/manage/product" class="nav-text"
                >제품 관리</nuxt-link
              >
            </li>
            <li class="nav-item depth-2 page">
              <a href="#" class="nav-text">홈 화면 관리</a>
            </li>
          </ul>
        </li>
        <li class="nav-item depth-1 folder">
          <a href="#" class="nav-text">문서</a>
        </li>
        <li class="nav-item depth-1 folder">
          <a href="#" class="nav-text">다운로드</a>
        </li>
      </ul>
    </div>
  </div>
  <!-- // 좌측메뉴 E -->
</template>
<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator';
import * as video from '@/store/modules/video';
import * as document from '@/store/modules/document';
import * as download from '@/store/modules/download';

const Video = namespace('video');
const Doc = namespace('document');
const File = namespace('download');

@Component
export default class extends Vue {
  @Video.Action('videoProducts') videoProductsAction!: () => void;
  @Doc.Action('docProducts') docProductsAction!: () => void;
  @File.Action('downloadProducts') downloadProductsAction!: () => void;

  selectedProductId = '';

  async created() {
    await this.videoProductsAction();
    await this.downloadProductsAction();
    await this.docProductsAction();
    this.selectedProductId = this.$store.state.video.products[0];
  }

  onclickMenuProduct(product) {
    this.selectedProductId = product._id;
  }
}
</script>
<style lang="scss"></style>
