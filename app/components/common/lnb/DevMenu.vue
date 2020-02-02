<template>
  <div class="left-menu">
    <p class="tit-con-left"><strong>개발자 문서 관리</strong></p>
    <div class="ui-accordion-left-pnl">
      <ul>
        <li
          class="nav-item depth-1 folder"
          :class="{ selected: showDocManageLnb }"
        >
          <a class="nav-text" @click="onClickDocManageBtn">문서관리</a>
          <ul
            class="nav-container depth-2"
            :style="{ display: showDocManageLnb ? 'block' : 'none' }"
          >
            <li
              v-for="product in productList"
              :key="product.projectId"
              class="nav-item depth-2 folder selected"
            >
              <a href="#" class="nav-text">{{ product.productName }}</a>
              <ul class="nav-container depth-3" style="display: block;">
                <li
                  class="nav-item depth-3 page"
                  :class="{
                    selected:
                      product.projectId ===
                        $store.state.product.product.projectId &&
                      ($route.name === 'branchManagement' ||
                        $route.name === 'branchChangeHistory' ||
                        $route.name === 'branchCompare'),
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
                      product.projectId ===
                        $store.state.product.product.projectId &&
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
                      product.projectId ===
                        $store.state.product.product.projectId &&
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
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class DevMenu extends Vue {
  showDocManageLnb: boolean = true;
  productList: Array<any> = [];

  created() {
    if (this.$route.name === 'productManagement') {
      this.showDocManageLnb = false;
    }
    this.$store.state.product.productList.forEach((product) => {
      product.staffs.forEach((staff) => {
        if (staff.empId === this.$store.state.user.user.loginId) {
          this.productList.push(product);
        }
      });
    });
  }

  onClickDocManageBtn() {
    this.showDocManageLnb = !this.showDocManageLnb;
  }
}
</script>

<style scoped></style>
