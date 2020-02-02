<template>
  <div>
    <div class="position-wrap">
      <h1 class="tit-h1">제품</h1>
      <div class="pst-rbtn">
        <nuxt-link
          v-if="
            $store.state.user.user.authority === 'E' ||
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
        @mouseover="mouseoverToProduct(index)"
      >
        <dl class="product.productName">
          <dt>{{ product.productName }}</dt>
          <dd>
            {{ product.description }}
          </dd>
        </dl>
        <div v-for="staff in product.staffs" :key="staff.empId">
          <nuxt-link
            v-if="staff.empId === $store.state.user.user.loginId"
            v-show="index === buttonVisible"
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
        </div>
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

  mouseoverToProduct(index): void {
    this.buttonVisible =
      this.$store.state.user.user.authority === 'E' ? index : -1;
  }
}
</script>
<style>
.on {
  display: block;
}
.none {
  display: none;
}
</style>
