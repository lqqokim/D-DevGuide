<template>
  <product-register></product-register>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ProductRegister from '~/components/product/ProductRegister.vue';

@Component({
  layout: 'TypeA',
  components: {
    ProductRegister,
  },
})
export default class extends Vue {}
</script>

<style scoped></style>
