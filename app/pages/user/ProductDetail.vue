<template>
  <product-detail></product-detail>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ProductDetail from '~/components/productDetail/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    ProductDetail,
  },
})
export default class extends Vue {}
</script>

<style scoped></style>
