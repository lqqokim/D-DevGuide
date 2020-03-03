<template>
  <div class="left-menu">
    <p class="tit-con-left">
      <strong>개발자 문서 관리</strong>
    </p>
    <div class="ui-accordion-left-pnl">
      <ul>
        <li
          class="nav-item depth-1 folder"
          :class="{ selected: showDocManageLnb }"
        >
          <a class="nav-text" @click="onClickDocManageBtn">문서관리</a>
          <ul
            v-show="productList.length > 0"
            class="nav-container depth-2"
            :style="{ display: showDocManageLnb ? 'block' : 'none' }"
          >
            <li
              v-for="product in productList"
              :key="product.projectId"
              class="nav-item depth-2 folder"
            >
              <nuxt-link
                :to="{
                  name: 'detail',
                  params: {
                    productCode: product.productCode,
                    pageType: 'Document',
                  },
                }"
                >{{ product.productName }}</nuxt-link
              >
              <ul class="nav-container depth-3" style="display: block;">
                <li
                  class="nav-item depth-3 page"
                  :class="{
                    selected:
                      ($route.name === 'branchManagement' ||
                        $route.name === 'branchChangeHistory' ||
                        $route.name === 'branchCompare' ||
                        $route.name === 'mergeRequestCompare') &&
                      product.productCode === $route.params.productCode,
                  }"
                >
                  <nuxt-link
                    :to="{
                      name: 'branchManagement',
                      params: {
                        productCode: product.productCode,
                        data: product,
                      },
                    }"
                    tag="a"
                    class="nav-text"
                  >
                    작업 브랜치 관리
                  </nuxt-link>
                </li>
                <li
                  class="nav-item depth-3 page"
                  :class="{
                    selected:
                      product.productCode === $route.params.productCode &&
                      $route.name === 'versionManagement',
                  }"
                >
                  <nuxt-link
                    :to="{
                      name: 'versionManagement',
                      params: {
                        productCode: product.productCode,
                        data: product,
                      },
                    }"
                    tag="a"
                    class="nav-text"
                  >
                    버전 관리
                  </nuxt-link>
                </li>
                <li
                  class="nav-item depth-3 page"
                  :class="{
                    selected:
                      product.productCode === $route.params.productCode &&
                      $route.name === 'noticeManagement',
                  }"
                >
                  <nuxt-link
                    :to="{
                      name: 'noticeManagement',
                      params: {
                        productCode: product.productCode,
                      },
                    }"
                    tag="a"
                    class="nav-text"
                  >
                    공지사항 관리
                  </nuxt-link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li
          v-if="
            $store.state.user.user.authority === 'S' ||
              $store.state.user.user.authority === 'A'
          "
          class="nav-item depth-1 page"
          :class="{ selected: $route.name === 'productManagement' }"
        >
          <nuxt-link
            :to="{ name: 'productManagement' }"
            tag="a"
            class="nav-text"
            >제품관리</nuxt-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, namespace } from 'nuxt-property-decorator';
import * as product from '@/store/modules/product';

const Product = namespace('product');

@Component
export default class DevMenu extends Vue {
  @Product.Action('getProductList') getProductListAction;
  @Product.Action('selectProduct') selectProductAction;
  showDocManageLnb: boolean = true;
  productList: Array<any> = [];

  async created() {
    if (!this.$store.state.user.user.gitlabToken) {
      return;
    }
    await this.getProductListAction();
    if (
      this.$store.state.user.user.authority === 'S' ||
      this.$store.state.user.user.authority === 'A'
    ) {
      this.productList = this.$store.state.product.productList.slice();
    } else {
      this.$store.state.product.productList.forEach((product) => {
        product.staffs.forEach((staff) => {
          if (staff.empId === this.$store.state.user.user.loginId) {
            this.productList.push(product);
          }
        });
      });
    }

    if (this.$route.name === 'productManagement') {
      this.showDocManageLnb = false;
    }
  }

  onClickDocManageBtn() {
    this.showDocManageLnb = !this.showDocManageLnb;
  }

  @Watch('$route.name')
  onRouteNameChange(routeName) {
    if (routeName === 'productManagement') {
      this.showDocManageLnb = false;
    }
  }

  @Watch('$store.state.product.productList')
  onChangeProductList() {
    if (
      this.$store.state.user.user.authority === 'S' ||
      this.$store.state.user.user.authority === 'A'
    ) {
      this.productList = this.$store.state.product.productList.slice();
    } else {
      this.$store.state.product.productList.forEach((product) => {
        product.staffs.forEach((staff) => {
          if (staff.empId === this.$store.state.user.user.loginId) {
            this.productList.push(product);
          }
        });
      });
    }
  }
}
</script>

<style scoped></style>
