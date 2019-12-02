<template>
  <div class="left-proc-menu">
    <div class="dbs-visual-wrap manage">
      <a
        v-for="product in products"
        :key="product._id"
        class="dbs-visual-list"
        @click="onclickCard(product)"
      >
        <dl class="dews-ui">
          <dt>{{ product.productName }}</dt>
          <dd>{{ product.description }}</dd>
        </dl>
        <p class="icon">
          <span>{{ product.productCode }}</span>
        </p>
        <p class="btn-move">이동</p>
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Emit, Prop } from 'nuxt-property-decorator';

@Component
export default class ProductCardList extends Vue {
  @Prop() products!: any[];

  @Emit('selectedManageProduct')
  onclickCard(product) {
    return product;
  }
}
</script>
