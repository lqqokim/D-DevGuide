<template>
  <div class="view-content">
    <product-repository-file-viewer></product-repository-file-viewer>
    <product-repository-file-t-o-c></product-repository-file-t-o-c>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ProductRepositoryFileViewer from './ProductRepositoryFileViewer.vue';
import ProductRepositoryFileTOC from './ProductRepositoryFileTOC.vue';

@Component({
  components: {
    ProductRepositoryFileViewer,
    ProductRepositoryFileTOC,
  },
})
export default class ProductDocView extends Vue {}
</script>

<style scoped></style>
