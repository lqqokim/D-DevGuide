<template>
  <product-register></product-register>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ProductRegister from '~/components/productRegister/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    ProductRegister,
  },
})
export default class extends Vue {}
</script>

<style scoped></style>
