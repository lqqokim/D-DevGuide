<template>
  <!-- 좌측메뉴 S -->
  <div class="left-menu">
    <p class="tit-con-left"><strong>자료실</strong></p>
    <div class="ui-accordion-left-pnl">
      <ul>
        <li class="nav-item depth-1 folder selected">
          <a class="nav-text">동영상</a>
          <ul class="nav-container depth-2" style="display: block;">
            <li class="nav-item depth-2 page">
              <!--             TODO 전체 숨김-->
              <!--              <a class="nav-text">전체</a>-->
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
              <a
                class="nav-text"
                @click="
                  onclickMenuProduct(product, {
                    type: 'video',
                    product,
                  })
                "
                >{{ product.productName }}</a
              >
            </li>
            <!--동영상 제품 목록 E-->

            <template v-if="isAdmin()">
              <li class="nav-item depth-2 page">
                <nuxt-link :to="{ name: 'videoProductManage' }" class="nav-text"
                  >제품 관리</nuxt-link
                >
              </li>
              <li class="nav-item depth-2 page">
                <nuxt-link :to="{ name: 'videoHomeManage' }" class="nav-text"
                  >홈 화면 관리</nuxt-link
                >
              </li>
            </template>
          </ul>
        </li>
        <li class="nav-item depth-1 folder">
          <a class="nav-text">문서</a>
          <ul class="nav-container depth-2" style="display: block;">
            <li class="nav-item depth-2 page">
              <!--             TODO 전체 숨김-->
              <!--              <a class="nav-text">전체</a>-->
            </li>

            <!--문서 제품 목록 S-->
            <li
              v-for="product in $store.state.document.products"
              :key="product._id"
              class="nav-item depth-2 page"
              :class="{
                selected: selectedProductId === product._id,
              }"
            >
              <a
                class="nav-text"
                @click="
                  onclickMenuProduct(product, {
                    page: 'doc',
                    product,
                  })
                "
                >{{ product.productName }}</a
              >
            </li>
            <!--문서 제품 목록 E-->

            <template v-if="isAdmin()">
              <li class="nav-item depth-2 page">
                <nuxt-link :to="{ name: 'docProductManage' }" class="nav-text"
                  >제품 관리</nuxt-link
                >
              </li>
              <li class="nav-item depth-2 page">
                <nuxt-link :to="{ name: 'docHomeManage' }" class="nav-text"
                  >홈 화면 관리</nuxt-link
                >
              </li>
            </template>
          </ul>
        </li>
        <li class="nav-item depth-1 folder">
          <a class="nav-text">다운로드</a>
          <ul class="nav-container depth-2" style="display: block;">
            <li class="nav-item depth-2 page">
              <!--             TODO 전체 숨김-->
              <!--              <a class="nav-text">전체</a>-->
            </li>

            <!--다운로드 제품 목록 S-->
            <li
              v-for="product in $store.state.download.products"
              :key="product._id"
              class="nav-item depth-2 page"
              :class="{
                selected: selectedProductId === product._id,
              }"
            >
              <a
                class="nav-text"
                @click="
                  onclickMenuProduct(product, {
                    type: 'download',
                    product,
                  })
                "
                >{{ product.productName }}</a
              >
            </li>
            <!--다운로드 제품 목록 E-->

            <template v-if="isAdmin()">
              <li class="nav-item depth-2 page">
                <nuxt-link
                  :to="{ name: 'downloadProductManage' }"
                  class="nav-text"
                  >제품 관리</nuxt-link
                >
              </li>
              <li class="nav-item depth-2 page">
                <nuxt-link :to="{ name: 'downloadHomeManage' }" class="nav-text"
                  >홈 화면 관리</nuxt-link
                >
              </li>
            </template>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  <!-- // 좌측메뉴 E -->
</template>
<script lang="ts">
import { Component, namespace, Vue, Watch } from 'nuxt-property-decorator';
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
  @File.Action('fileProducts') fileProductsAction!: () => void;

  selectedProductId = '';

  isProductFolder: boolean = true;
  isProductSelected: boolean = true;
  navContainerDisplay: string = 'block';
  selectedProductCode!: string;

  @Watch('$route.params.productCode')
  onChangeMenu(value, oldValue) {
    this.selectedProductCode = value;
    // console.log('onChangeMenu :: ', this.selectedProductCode);
  }

  isAdmin(): boolean {
    return this.$store.state.user.user.loginId === 'admin';
  }

  async created() {
    if (!this.$store.state.video.products.length) {
      await this.videoProductsAction();
    }

    if (!this.$store.state.download.products.length) {
      await this.fileProductsAction();
    }

    if (!this.$store.state.document.products.length) {
      await this.docProductsAction();
    }

    // this.selectedProductId = this.$route.params.productCode;
    console.log('this.route', this.$route);
  }

  onclickMenuProduct(
    product,
    params: {
      type: string;
      product: any;
    }
  ): void {
    this.selectedProductId = product._id;
    let routerName: string;

    if (params.type === 'video') {
      routerName = 'videoList';
    } else if (params.type === 'doc') {
      routerName = 'docList';
    } else {
      routerName = 'downloadList';
    }

    this.$router.push({
      name: routerName,
      params: {
        productCode: product.productCode,
        product,
      },
    });
  }
}
</script>
<style lang="scss"></style>
