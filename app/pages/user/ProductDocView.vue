<template>
  <product-doc-view></product-doc-view>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ProductDocView from '~/components/productDocView/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    ProductDocView,
  },
})
export default class extends Vue {}
</script>

<style scoped></style>
