<template>
  <product-edit></product-edit>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ProductEdit from '~/components/product/ProductEdit.vue';

@Component({
  layout: 'TypeA',
  components: {
    ProductEdit,
  },
})
export default class extends Vue {}
</script>

<style scoped></style>
