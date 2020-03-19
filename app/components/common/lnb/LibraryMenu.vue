<template>
  <!-- 좌측메뉴 S -->
  <div class="left-menu">
    <p class="tit-con-left"><strong>자료실</strong></p>
    <div class="ui-accordion-left-pnl">
      <ul>
        <li class="nav-item depth-1" :class="{ folder: isVideoFolder }">
          <a class="nav-text" @click="isVideoFolder = !isVideoFolder">동영상</a>
          <ul
            v-show="isVideoFolder"
            class="nav-container depth-2"
            style="display: block;"
          >
            <!--동영상 제품 목록 S-->
            <li
              v-for="product in $store.state.video.products"
              :key="product._id"
              class="nav-item depth-2 page"
              :class="{
                selected:
                  selectedProductCode === product.productCode &&
                  path === '/video/' + product.productCode,
              }"
            >
              <a
                class="nav-text"
                @click="onclickMenuProduct(product, 'video')"
                >{{ product.productName }}</a
              >
            </li>
            <!--동영상 제품 목록 E-->

            <template v-if="isAdmin()">
              <li
                class="nav-item depth-2 page"
                :class="{ selected: path === '/video/manage/product' }"
              >
                <nuxt-link :to="{ name: 'videoProductManage' }" class="nav-text"
                  >제품 관리</nuxt-link
                >
              </li>
              <li
                class="nav-item depth-2 page"
                :class="{ selected: path === '/video/manage/home' }"
              >
                <nuxt-link :to="{ name: 'videoHomeManage' }" class="nav-text"
                  >홈 화면 관리</nuxt-link
                >
              </li>
            </template>
          </ul>
        </li>
        <li class="nav-item depth-1 " :class="{ folder: isDocFolder }">
          <a class="nav-text" @click="isDocFolder = !isDocFolder">문서</a>
          <ul
            v-show="isDocFolder"
            class="nav-container depth-2"
            style="display: block;"
          >
            <!--문서 제품 목록 S-->
            <li
              v-for="product in $store.state.document.products"
              :key="product._id"
              class="nav-item depth-2 page"
              :class="{
                selected:
                  selectedProductCode === product.productCode &&
                  path === '/doc/' + product.productCode,
              }"
            >
              <a class="nav-text" @click="onclickMenuProduct(product, 'doc')">{{
                product.productName
              }}</a>
            </li>
            <!--문서 제품 목록 E-->

            <template v-if="isAdmin()">
              <li
                class="nav-item depth-2 page"
                :class="{ selected: path === '/doc/manage/product' }"
              >
                <nuxt-link :to="{ name: 'docProductManage' }" class="nav-text"
                  >제품 관리</nuxt-link
                >
              </li>
              <li
                class="nav-item depth-2 page"
                :class="{ selected: path === '/doc/manage/home' }"
              >
                <nuxt-link :to="{ name: 'docHomeManage' }" class="nav-text"
                  >홈 화면 관리</nuxt-link
                >
              </li>
            </template>
          </ul>
        </li>
        <li class="nav-item depth-1" :class="{ folder: isDownloadFolder }">
          <a class="nav-text" @click="isDownloadFolder = !isDownloadFolder"
            >다운로드</a
          >
          <ul
            v-show="isDownloadFolder"
            class="nav-container depth-2"
            style="display: block;"
          >
            <!--다운로드 제품 목록 S-->
            <li
              v-for="product in $store.state.download.products"
              :key="product._id"
              class="nav-item depth-2 page"
              :class="{
                selected:
                  selectedProductCode === product.productCode &&
                  path === '/download/' + product.productCode,
              }"
            >
              <a
                class="nav-text"
                @click="onclickMenuProduct(product, 'download')"
                >{{ product.productName }}</a
              >
            </li>
            <!--다운로드 제품 목록 E-->

            <template v-if="isAdmin()">
              <li
                class="nav-item depth-2 page"
                :class="{ selected: path === '/download/manage/product' }"
              >
                <nuxt-link
                  :to="{ name: 'downloadProductManage' }"
                  class="nav-text"
                  >제품 관리</nuxt-link
                >
              </li>
              <li
                class="nav-item depth-2 page"
                :class="{ selected: path === '/download/manage/home' }"
              >
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
  @Video.Action('videoProducts') videoProductsAction!: () => Promise<any>;
  @Doc.Action('docProducts') docProductsAction!: () => Promise<any>;
  @File.Action('fileProducts') fileProductsAction!: () => Promise<any>;

  @Watch('$route.params.productCode', { deep: true, immediate: true })
  onChangeMenu(value, oldValue) {
    this.selectedProductCode = value;
    this.path = this.$route.path;
  }

  selectedProductCode!: string;
  isVideoFolder: boolean = true;
  isDocFolder: boolean = true;
  isDownloadFolder: boolean = true;
  path: string = '';

  async created() {
    this.path = this.$route.path;
    this.selectedProductCode = this.$route.params.productCode;

    // production mode 에서 새로고침했을 때 this.$store.state.video.products 가 존재하여 if 문에 걸려서 product 가져오는 action 을 수행하지 못 함
    await this.videoProductsAction();
    // if (!this.$store.state.video.products.length) {
    // }

    await this.fileProductsAction();
    // if (!this.$store.state.download.products.length) {
    // }

    await this.docProductsAction();
    // if (!this.$store.state.document.products.length) {
    // }
  }

  isAdmin(): boolean {
    return this.$store.state.user.user.authority === 'S';
  }

  onclickMenuProduct(product, categoryName): void {
    // 동일한 메뉴 카테고리 내 선택한 목록 다시 선택했을 경우
    if (this.$route.path === `/${categoryName}/${product.productCode}`) {
      return;
    }

    this.$router.push({
      name: `${categoryName}List`,
      params: {
        productCode: product.productCode,
        product,
      },
    });
  }
}
</script>
<style lang="scss"></style>
