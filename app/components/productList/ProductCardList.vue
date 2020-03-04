<template>
  <div>
    <div class="position-wrap">
      <h1 class="tit-h1">제품</h1>
      <div class="pst-rbtn">
        <nuxt-link
          v-if="
            $store.state.user.user.authority === 'S' ||
              $store.state.user.user.authority === 'A'
          "
          :to="{
            name: 'productManagement',
          }"
          tag="button"
          class="btn-sub-large"
          >관리</nuxt-link
        >
      </div>
    </div>
    <div class="dbs-visual-wrap docs mgt-5 mgb-60">
      <a
        v-for="(product, index) in $store.state.product.productList"
        :key="product.projectId"
        class="dbs-visual-list"
        @mouseleave="buttonVisible = -1"
        @mouseover="mouseoverToProduct(index, product)"
      >
        <dl class="product.productName">
          <dt>{{ product.productName }}</dt>
          <dd>
            {{ product.description }}
          </dd>
        </dl>
        <nuxt-link
          v-if="index === buttonVisible"
          :to="{
            name: 'branchManagement',
            params: {
              productCode: product.productCode,
              data: product,
            },
          }"
          tag="button"
          class="ico-setting"
        >
          설정
        </nuxt-link>
        <p class="icon">
          <span>{{ product.productCode }}</span>
        </p>
        <nuxt-link
          :to="{
            name: 'detail',
            params: {
              productCode: product.productCode,
              data: product,
              pageType: 'Document',
              refType: 'targetBranch',
              targetBranch: product.targetBranch,
            },
          }"
          tag="button"
          class="btn-detail btn-sub-small"
        >
          자세히보기
        </nuxt-link>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class ProductCardList extends Vue {
  buttonVisible: number = -1;

  mouseoverToProduct(index, product): void {
    if (
      this.$store.state.user.user.authority === 'M' ||
      this.$store.state.user.user.authority === ''
    ) {
      this.buttonVisible = -1;
    } else if (
      this.$store.state.user.user.authority === 'S' ||
      this.$store.state.user.user.authority === 'A'
    ) {
      this.buttonVisible = index;
    } else if (this.$store.state.user.user.authority === 'E') {
      if (product.staffs.length > 0) {
        for (let idx = 0; idx < product.staffs.length; idx++) {
          if (
            product.staffs[idx].empId === this.$store.state.user.user.loginId
          ) {
            this.buttonVisible = index;
            return;
          }
        }
      }
    }
  }
}
</script>
<style></style>
